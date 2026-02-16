'use client';

import { useState, useEffect } from 'react';
import { StudyCard, StudyProgress } from '@/types';
import { Button, Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
import { getCardProgress, updateMasteryLevel } from '@/lib/study-progress';
import { MasteryBadge } from './mastery-badge';

interface StudyCardModalProps {
  card: StudyCard;
  currentIndex: number;
  totalCards: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onProgressUpdate?: () => void;
}

export function StudyCardModal({
  card,
  currentIndex,
  totalCards,
  onClose,
  onPrevious,
  onNext,
  onProgressUpdate,
}: StudyCardModalProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const [updating, setUpdating] = useState(false);
  const { t } = useLanguage();

  // Reset showAnswer when card changes
  useEffect(() => {
    setShowAnswer(false);
    loadProgress();
  }, [card.id]);

  async function loadProgress() {
    const data = await getCardProgress(card.id);
    setProgress(data);
  }

  async function handleKnew(knew: boolean) {
    setUpdating(true);
    const updated = await updateMasteryLevel(card.id, card.category, knew);
    if (updated) {
      setProgress(updated);
      // Notify parent to reload progress
      onProgressUpdate?.();
      // Automatically move to next card after short delay
      setTimeout(() => {
        if (currentIndex < totalCards - 1) {
          onNext();
        }
      }, 500);
    } else {
      console.error('Failed to update mastery level');
      alert('Failed to save progress. Please make sure you are logged in.');
    }
    setUpdating(false);
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) onPrevious();
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < totalCards - 1) onNext();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setShowAnswer(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalCards, onClose, onPrevious, onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-surface border-b rounded-t-xl p-4 mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text text-sm flex items-center gap-1 transition-colors"
            >
              ← {t.common.close}
            </button>
            <div className="flex items-center gap-3">
              {card.subcategory && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/15 text-accent">
                  {card.subcategory}
                </span>
              )}
              <span className="text-text text-sm font-medium">
                {t.study.cardNumber} {currentIndex + 1} {t.study.of} {totalCards}
              </span>
            </div>
          </div>
        </div>

        {/* Card with Flip Animation */}
        <div className="perspective-1000" style={{ perspective: '1000px' }}>
          <div
            onClick={() => !showAnswer && setShowAnswer(true)}
            className={`relative min-h-[500px] transition-transform duration-500 ${
              !showAnswer ? 'cursor-pointer hover:scale-[1.01]' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front of card */}
            <Card
              padding="lg"
              className="absolute inset-0 w-full h-full flex flex-col backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-text mb-4">{card.front}</div>
                {!showAnswer && (
                  <div className="text-sm text-text-muted flex items-center gap-2 mt-8">
                    <span className="opacity-60">👆</span>
                    {t.today.clickToSeeAnswer}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Back of card */}
            <Card
              padding="lg"
              className="absolute inset-0 w-full h-full flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardContent className="flex-1 flex flex-col overflow-hidden">
                {/* Term Header */}
                <div className="text-center pb-3 border-b mb-3 shrink-0">
                  <div className="text-2xl font-bold text-text">{card.front}</div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {/* Preposition + Case (for verbs with prepositions) */}
                  {card.back.preposition && (
                    <div className="p-3 bg-accent/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                          {t.study.preposition}:
                        </span>
                        <span className="font-bold text-accent text-lg">
                          {card.back.preposition}
                        </span>
                        {card.back.case && (
                          <>
                            <span className="text-text-muted">+</span>
                            <span className="font-medium text-text">{card.back.case}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Case only (for prepositions with cases) */}
                  {!card.back.preposition && card.back.case && (
                    <div className="p-3 bg-accent/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                          {t.study.case}:
                        </span>
                        <span className="font-bold text-accent text-lg">{card.back.case}</span>
                      </div>
                    </div>
                  )}

                  {/* Verb Forms (for irregular verbs) */}
                  {card.back.verb_forms && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                        {t.study.verbForms}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-2 bg-surface-2 rounded-lg flex-1 min-w-[120px]">
                          <div className="text-xs text-text-muted">{t.study.infinitiv}</div>
                          <div className="font-medium text-text">
                            {card.back.verb_forms.infinitiv}
                          </div>
                        </div>
                        <div className="px-3 py-2 bg-surface-2 rounded-lg flex-1 min-w-[120px]">
                          <div className="text-xs text-text-muted">{t.study.praeteritum}</div>
                          <div className="font-medium text-text">
                            {card.back.verb_forms.praeteritum}
                          </div>
                        </div>
                        <div className="px-3 py-2 bg-surface-2 rounded-lg flex-1 min-w-[120px]">
                          <div className="text-xs text-text-muted">{t.study.perfekt}</div>
                          <div className="font-medium text-text">
                            {card.back.verb_forms.perfekt}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meanings */}
                  {card.back.meanings && card.back.meanings.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                        {t.study.meanings}
                      </div>
                      <ul className="space-y-0.5">
                        {card.back.meanings.map((meaning, i) => (
                          <li key={i} className="text-text text-base">
                            • {meaning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Examples */}
                  {card.back.examples.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                        {t.study.examples}
                      </div>
                      {card.back.examples.map((ex, i) => (
                        <div key={i} className="mb-2 p-2.5 bg-surface-2 rounded-xl">
                          <div className="text-text font-medium text-sm">{ex.de}</div>
                          <div className="text-text-muted text-xs mt-1">{ex.fa}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {card.back.notes && card.back.notes.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
                        {t.study.notes}
                      </div>
                      <div className="p-2.5 bg-info/10 rounded-xl">
                        {card.back.notes.map((note, i) => (
                          <div key={i} className="text-sm text-text">
                            {note}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mastery Level & Actions */}
        <div className="bg-surface border-t p-4 mt-2">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-muted">{t.study.mastery}:</span>
              <MasteryBadge level={progress?.mastery_level ?? 0} size="md" />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleKnew(false)}
                disabled={updating || !showAnswer}
              >
                {t.study.dontKnow}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => handleKnew(true)}
                disabled={updating || !showAnswer}
              >
                {t.study.iKnowIt}
              </Button>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="flex-1"
            >
              ← {t.study.previous}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onNext}
              disabled={currentIndex === totalCards - 1}
              className="flex-1"
            >
              {t.study.next} →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
