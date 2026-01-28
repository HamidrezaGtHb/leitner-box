'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/image-uploader';
import { WordSelector } from '@/components/word-selector';
import { BatchProgress } from '@/components/batch-progress';
import { extractGermanWordsFromImage, validateGermanWords } from '@/lib/ocr';
import { batchEnrichWords } from '@/lib/ai-agent';
import { useBacklog } from '@/hooks/use-backlog';
import { useLeitner } from '@/hooks/use-leitner';
import { Camera, Sparkles, CheckCircle2, Calendar } from 'lucide-react';
import Link from 'next/link';

type Step = 'upload' | 'extracting' | 'selecting' | 'validating' | 'enriching' | 'completed';

export default function OCRPage() {
  const { addManyToBacklog } = useBacklog();
  const { addWord } = useLeitner();
  const [step, setStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedWords, setExtractedWords] = useState<string[]>([]);
  const [validatedWords, setValidatedWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [enrichProgress, setEnrichProgress] = useState(0);
  const [enrichTotal, setEnrichTotal] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [error, setError] = useState('');

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setError('');
  };

  const handleExtract = async () => {
    if (!selectedFile) return;

    setStep('extracting');
    setError('');
    setOcrProgress(0);

    try {
      const words = await extractGermanWordsFromImage(
        selectedFile,
        (progress) => setOcrProgress(progress)
      );

      if (words.length === 0) {
        setError('No German words found in the image. Please try another image.');
        setStep('upload');
        return;
      }

      setExtractedWords(words);
      setStep('selecting');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract words');
      setStep('upload');
    }
  };

  const handleWordsSelected = (words: string[]) => {
    setSelectedWords(words);
    handleValidate(words);
  };

  const handleValidate = async (words: string[]) => {
    setStep('validating');
    setError('');

    try {
      const validated = await validateGermanWords(words, 'B1');
      setValidatedWords(validated);
      setStep('selecting');
    } catch (err) {
      // If validation fails, proceed with all selected words
      console.warn('Validation failed, using all selected words:', err);
      setValidatedWords(words);
      setStep('selecting');
    }
  };

  const handleEnrich = async (destination: 'active' | 'backlog') => {
    setStep('enriching');
    setEnrichProgress(0);
    setEnrichTotal(selectedWords.length);
    setError('');

    try {
      const enriched = await batchEnrichWords(
        selectedWords,
        'gemini',
        (current, total, word) => {
          setEnrichProgress(current);
          setEnrichTotal(total);
          setCurrentWord(word);
        }
      );

      if (enriched.length === 0) {
        setError('Failed to enrich any words. Please try again.');
        setStep('selecting');
        return;
      }

      if (destination === 'backlog') {
        addManyToBacklog(enriched, Date.now(), 'medium', 'ocr');
      } else {
        enriched.forEach((wordData) => addWord(wordData));
      }

      setStep('completed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enrich words');
      setStep('selecting');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setSelectedFile(null);
    setExtractedWords([]);
    setValidatedWords([]);
    setSelectedWords([]);
    setOcrProgress(0);
    setEnrichProgress(0);
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Camera className="h-8 w-8" />
          OCR - Extract Words from Image
        </h1>
        <p className="text-muted-foreground">
          Upload a photo of your textbook to extract German vocabulary
        </p>
      </div>

      {/* Upload Step */}
      {step === 'upload' && (
        <>
          <ImageUploader
            onImageSelect={handleImageSelect}
            onClear={handleReset}
          />
          
          {selectedFile && (
            <Button onClick={handleExtract} size="lg" className="w-full gap-2">
              <Sparkles className="h-5 w-5" />
              Extract Words from Image
            </Button>
          )}

          {error && (
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <CardContent className="py-4">
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="py-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Tips for best results
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1 list-disc list-inside">
                  <li>Use clear, well-lit photos</li>
                  <li>Ensure text is in focus and readable</li>
                  <li>Avoid handwritten text (use printed text)</li>
                  <li>Crop to show only the relevant vocabulary section</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Extracting Step */}
      {step === 'extracting' && (
        <BatchProgress
          current={ocrProgress}
          total={100}
          status="processing"
        />
      )}

      {/* Validating Step */}
      {step === 'validating' && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="mt-4 text-muted-foreground">
              Validating words with AI...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Selecting Step */}
      {step === 'selecting' && extractedWords.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Extracted {extractedWords.length} words</CardTitle>
              <CardDescription>
                Select the words you want to add to your collection
              </CardDescription>
            </CardHeader>
          </Card>

          <WordSelector
            words={extractedWords}
            onSelect={(words) => {
              setSelectedWords(words);
            }}
          />

          {selectedWords.length > 0 && (
            <div className="flex gap-3">
              <Button
                onClick={() => handleEnrich('active')}
                size="lg"
                className="flex-1 gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Enrich & Add to Active ({selectedWords.length})
              </Button>
              <Button
                onClick={() => handleEnrich('backlog')}
                variant="outline"
                size="lg"
                className="flex-1 gap-2"
              >
                <Calendar className="h-5 w-5" />
                Add to Backlog ({selectedWords.length})
              </Button>
            </div>
          )}

          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="w-full"
          >
            Cancel and Upload New Image
          </Button>
        </>
      )}

      {/* Enriching Step */}
      {step === 'enriching' && (
        <BatchProgress
          current={enrichProgress}
          total={enrichTotal}
          currentWord={currentWord}
          status="processing"
        />
      )}

      {/* Completed Step */}
      {step === 'completed' && (
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500" />
            <div>
              <h2 className="text-3xl font-bold">Words Added Successfully!</h2>
              <p className="text-muted-foreground">
                {enrichProgress} words have been processed and added
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset} variant="outline" size="lg">
                Extract More Words
              </Button>
              <Link href="/">
                <Button size="lg">Go to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
