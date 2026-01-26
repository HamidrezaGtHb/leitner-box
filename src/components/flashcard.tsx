'use client';

import { useState } from 'react';
import { WordData } from '@/types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Volume2, RotateCcw } from 'lucide-react';
import { getGenderColor, cn } from '@/lib/utils';

interface FlashcardProps {
  wordData: WordData;
  onCorrect: () => void;
  onIncorrect: () => void;
  showActions?: boolean;
}

export function Flashcard({
  wordData,
  onCorrect,
  onIncorrect,
  showActions = true,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="perspective-1000">
        <Card
          className={cn(
            'min-h-[400px] cursor-pointer transition-all duration-500 transform-style-3d',
            isFlipped && 'rotate-y-180'
          )}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {!isFlipped ? (
            // Front of card
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-8">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  {wordData.article && (
                    <span
                      className={cn(
                        'text-3xl font-bold',
                        getGenderColor(wordData.article)
                      )}
                    >
                      {wordData.article}
                    </span>
                  )}
                  <h2 className="text-5xl font-bold">{wordData.word}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak();
                    }}
                    className="ml-2"
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </div>

                {wordData.plural && (
                  <p className="text-xl text-muted-foreground">
                    Plural: {wordData.plural}
                  </p>
                )}

                {wordData.verbForms && (
                  <div className="space-y-2 text-lg">
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Präsens:</span>{' '}
                      {wordData.verbForms.presens}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Präteritum:</span>{' '}
                      {wordData.verbForms.preteritum}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Perfekt:</span>{' '}
                      {wordData.verbForms.perfekt}
                    </p>
                  </div>
                )}

                {wordData.prepositions && (
                  <p className="text-lg text-muted-foreground">
                    <span className="font-semibold">Prepositions:</span>{' '}
                    {wordData.prepositions}
                  </p>
                )}

                <p className="text-sm text-muted-foreground mt-8">
                  Click to see translation
                </p>
              </div>
            </CardContent>
          ) : (
            // Back of card
            <CardContent className="flex flex-col items-center justify-center min-h-[400px] p-8 rotate-y-180">
              <div className="text-center space-y-6 w-full">
                <h3
                  className="text-4xl font-bold font-vazirmatn"
                  dir="rtl"
                >
                  {wordData.meaning}
                </h3>

                <div className="space-y-4 mt-8">
                  {wordData.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-primary pl-4 text-left space-y-2"
                    >
                      <p className="text-lg">{example.de}</p>
                      <p
                        className="text-lg font-vazirmatn text-muted-foreground"
                        dir="rtl"
                      >
                        {example.fa}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
                  <RotateCcw className="h-4 w-4" />
                  <p className="text-sm">Click to flip back</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {showActions && isFlipped && (
        <div className="flex gap-4 mt-6 justify-center">
          <Button
            variant="destructive"
            size="lg"
            onClick={onIncorrect}
            className="flex-1 max-w-xs"
          >
            I didn't know
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={onCorrect}
            className="flex-1 max-w-xs"
          >
            I knew it!
          </Button>
        </div>
      )}
    </div>
  );
}
