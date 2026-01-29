'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WordLevelSelector } from '@/components/word-level-selector';
import { BatchProgress } from '@/components/batch-progress';
import { generateWordList, batchEnrichWords } from '@/lib/ai-agent';
import { useLeitner } from '@/hooks/use-leitner';
import { useBacklog } from '@/hooks/use-backlog';
import { Sparkles, Plus, Download, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type Status = 'idle' | 'generating' | 'enriching' | 'completed' | 'error';

const COUNT_OPTIONS = [10, 25, 50, 100];

export default function GeneratePage() {
  const { addWord } = useLeitner();
  const { addManyToBacklog } = useBacklog();
  const [level, setLevel] = useState<Level>('B1');
  const [count, setCount] = useState(25);
  const [status, setStatus] = useState<Status>('idle');
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [enrichedCount, setEnrichedCount] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [failedCount, setFailedCount] = useState(0);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setStatus('generating');
    setError('');
    setGeneratedWords([]);
    setEnrichedCount(0);
    setFailedCount(0);

    try {
      const words = await generateWordList(level, count, 'gemini');
      setGeneratedWords(words);
      setStatus('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate words');
      setStatus('error');
    }
  };

  const handleEnrichAndAdd = async (destination: 'active' | 'backlog') => {
    setStatus('enriching');
    setEnrichedCount(0);
    setFailedCount(0);

    try {
      const enriched = await batchEnrichWords(
        generatedWords,
        'gemini',
        (current, total, word) => {
          setEnrichedCount(current);
          setCurrentWord(word);
        }
      );

      setFailedCount(generatedWords.length - enriched.length);

      if (destination === 'active') {
        // Add directly to active cards
        enriched.forEach((wordData) => {
          addWord(wordData);
        });
      } else {
        // Add to backlog
        addManyToBacklog(enriched, Date.now(), 'medium', 'generated');
      }

      setStatus('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enrich words');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          Generate Word List
        </h1>
        <p className="text-muted-foreground">
          AI-powered word list generation based on CEFR levels
        </p>
      </div>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Select level and number of words to generate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <WordLevelSelector selected={level} onSelect={setLevel} />

          <div className="space-y-3">
            <label className="text-sm font-medium">Number of Words</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {COUNT_OPTIONS.map((option) => (
                <Button
                  key={option}
                  variant={count === option ? 'default' : 'outline'}
                  onClick={() => setCount(option)}
                >
                  {option} words
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={status === 'generating' || status === 'enriching'}
            size="lg"
            className="w-full gap-2"
          >
            {status === 'generating' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate {count} {level} Level Words
              </>
            )}
          </Button>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      {(status === 'enriching' || status === 'completed') && generatedWords.length > 0 && (
        <BatchProgress
          current={enrichedCount}
          total={generatedWords.length}
          currentWord={currentWord}
          failed={failedCount}
          status={status === 'enriching' ? 'processing' : status}
        />
      )}

      {/* Generated Words Preview */}
      {generatedWords.length > 0 && status !== 'enriching' && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Words ({generatedWords.length})</CardTitle>
            <CardDescription>
              {status === 'completed'
                ? 'Preview the generated words before adding to your collection'
                : 'Words are ready to be enriched with AI'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto border rounded-lg p-4">
              {generatedWords.map((word, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 bg-muted rounded text-sm font-medium text-center"
                >
                  {word}
                </div>
              ))}
            </div>

            {status === 'completed' && enrichedCount === 0 && (
              <div className="flex gap-3">
                <Button
                  onClick={() => handleEnrichAndAdd('active')}
                  size="lg"
                  className="flex-1 gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Enrich & Add to Active Cards
                </Button>
                <Button
                  onClick={() => handleEnrichAndAdd('backlog')}
                  variant="outline"
                  size="lg"
                  className="flex-1 gap-2"
                  disabled
                  title="Backlog feature coming soon"
                >
                  <Download className="h-5 w-5" />
                  Add to Backlog
                </Button>
              </div>
            )}

            {enrichedCount > 0 && enrichedCount === generatedWords.length && (
              <div className="text-center space-y-4 py-6">
                <CheckCircle2 className="h-12 w-12 mx-auto text-green-500" />
                <div>
                  <h3 className="text-xl font-bold">Words Added Successfully!</h3>
                  <p className="text-muted-foreground">
                    {enrichedCount - failedCount} words added to your collection
                  </p>
                  {failedCount > 0 && (
                    <p className="text-sm text-red-500">
                      {failedCount} words failed to enrich
                    </p>
                  )}
                </div>
                <Link href="/">
                  <Button size="lg">Go to Home</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      {status === 'idle' && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="py-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                How it works
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1 list-disc list-inside">
                <li>AI generates a curated list of high-frequency words</li>
                <li>Words are selected based on CEFR level difficulty</li>
                <li>Each word is then enriched with meanings and examples</li>
                <li>Add all words at once to your collection</li>
              </ul>
              <p className="text-xs text-blue-600 dark:text-blue-300 mt-4">
                Note: This uses your AI API credits. Generating 50 words requires ~51 API calls.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
