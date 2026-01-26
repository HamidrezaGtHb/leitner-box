'use client';

import { WordData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Volume2, Trash2 } from 'lucide-react';
import { getGenderColor, cn } from '@/lib/utils';

interface WordCardProps {
  wordData: WordData;
  onDelete?: () => void;
  showDelete?: boolean;
}

export function WordCard({ wordData, onDelete, showDelete = false }: WordCardProps) {
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {wordData.article && (
              <span
                className={cn(
                  'text-2xl font-bold',
                  getGenderColor(wordData.article)
                )}
              >
                {wordData.article}
              </span>
            )}
            <CardTitle className="text-2xl">{wordData.word}</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleSpeak}>
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          {showDelete && onDelete && (
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
        {wordData.plural && (
          <p className="text-sm text-muted-foreground">Plural: {wordData.plural}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-vazirmatn text-lg" dir="rtl">
            {wordData.meaning}
          </p>
        </div>

        {wordData.verbForms && (
          <div className="space-y-1 text-sm bg-muted p-3 rounded-md">
            <p>
              <span className="font-semibold">Präsens:</span>{' '}
              {wordData.verbForms.presens}
            </p>
            <p>
              <span className="font-semibold">Präteritum:</span>{' '}
              {wordData.verbForms.preteritum}
            </p>
            <p>
              <span className="font-semibold">Perfekt:</span>{' '}
              {wordData.verbForms.perfekt}
            </p>
          </div>
        )}

        {wordData.prepositions && (
          <p className="text-sm">
            <span className="font-semibold">Prepositions:</span>{' '}
            {wordData.prepositions}
          </p>
        )}

        <div className="space-y-2">
          {wordData.examples.map((example, idx) => (
            <div key={idx} className="border-l-2 border-primary pl-3 space-y-1">
              <p className="text-sm">{example.de}</p>
              <p
                className="text-sm font-vazirmatn text-muted-foreground"
                dir="rtl"
              >
                {example.fa}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
