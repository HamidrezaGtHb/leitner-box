'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { Card as CardType } from '@/types';
import { Card, CardContent, ArticleBadge, Badge, CopyButton, Button } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
import * as Dialog from '@radix-ui/react-dialog';

interface CardDetailModalProps {
  cards: CardType[];
  currentIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
  onEdit?: (card: CardType) => void;
  onDelete?: (card: CardType) => void;
}

export function CardDetailModal({
  cards,
  currentIndex,
  open,
  onOpenChange,
  onNavigate,
  onEdit,
  onDelete,
}: CardDetailModalProps) {
  const { t } = useLanguage();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const card = cards[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < cards.length - 1;

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, currentIndex, hasPrev, hasNext, onNavigate, onOpenChange]);

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasNext) {
      onNavigate(currentIndex + 1);
    } else if (isRightSwipe && hasPrev) {
      onNavigate(currentIndex - 1);
    }
  };

  const getCardVariant = (article: string | null | undefined) => {
    if (!article) return 'default' as const;
    const lower = article.toLowerCase();
    if (lower === 'der') return 'der' as const;
    if (lower === 'die') return 'die' as const;
    if (lower === 'das') return 'das' as const;
    return 'default' as const;
  };

  if (!card) return null;

  const article = card.back_json.grammar.noun?.article;
  const cardVariant = getCardVariant(article);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40 animate-in fade-in duration-200" />
        <Dialog.Content
          className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full z-50 flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full max-h-[85vh] flex flex-col">
            {/* Navigation arrows - desktop */}
            <div className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2">
              <button
                onClick={() => hasPrev && onNavigate(currentIndex - 1)}
                disabled={!hasPrev}
                className="w-10 h-10 rounded-full bg-surface/90 text-text flex items-center justify-center hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                ←
              </button>
            </div>
            <div className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2">
              <button
                onClick={() => hasNext && onNavigate(currentIndex + 1)}
                disabled={!hasNext}
                className="w-10 h-10 rounded-full bg-surface/90 text-text flex items-center justify-center hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                →
              </button>
            </div>

            {/* Close button */}
            <Dialog.Close asChild>
              <button className="absolute -top-2 -right-2 md:top-0 md:right-0 z-10 w-8 h-8 rounded-full bg-surface text-text-muted hover:text-text flex items-center justify-center shadow-lg transition-colors">
                ✕
              </button>
            </Dialog.Close>

            {/* Card content */}
            <Card variant={cardVariant} padding="none" className="overflow-hidden shadow-2xl">
              <div ref={contentRef} className="max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b bg-surface">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {article && <ArticleBadge article={article} size="lg" />}
                    <span className="text-3xl font-bold text-text">{card.term}</span>
                    <CopyButton text={article ? `${article} ${card.term}` : card.term} size="md" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Badge
                      variant={card.box === 1 ? 'warning' : 'info'}
                      size="sm"
                    >
                      {t.common.box} {card.box}
                    </Badge>
                    <span className="text-sm text-text-muted">
                      {currentIndex + 1} / {cards.length}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 space-y-5">
                  {/* IPA */}
                  {card.back_json.ipa && (
                    <div className="text-center">
                      <span className="font-mono text-sm text-accent">[{card.back_json.ipa}]</span>
                    </div>
                  )}

                  {/* Meanings */}
                  <div>
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                      {t.today.meanings}
                    </div>
                    <ul className="space-y-2">
                      {card.back_json.meaning_fa.map((meaning, i) => (
                        <li key={i} className="text-text text-lg flex items-start gap-2">
                          <span className="text-accent">•</span>
                          <span>{meaning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grammar: Noun */}
                  {card.back_json.grammar.noun?.plural && (
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <span className="text-text-muted">{t.common.plural}: </span>
                      <span className="text-text font-medium">{card.back_json.grammar.noun.plural}</span>
                    </div>
                  )}

                  {/* Grammar: Verb */}
                  {card.back_json.grammar.verb && (
                    <div className="flex flex-wrap gap-2">
                      {card.back_json.grammar.verb.prasens && (
                        <span className="px-3 py-1 bg-surface-2 rounded-lg text-sm text-text-muted">
                          Präs: <span className="text-text font-medium">{card.back_json.grammar.verb.prasens}</span>
                        </span>
                      )}
                      {card.back_json.grammar.verb.praeteritum && (
                        <span className="px-3 py-1 bg-surface-2 rounded-lg text-sm text-text-muted">
                          Prät: <span className="text-text font-medium">{card.back_json.grammar.verb.praeteritum}</span>
                        </span>
                      )}
                      {card.back_json.grammar.verb.partizip2 && (
                        <span className="px-3 py-1 bg-surface-2 rounded-lg text-sm text-text-muted">
                          Perf: <span className="text-text font-medium">{card.back_json.grammar.verb.perfekt_aux} {card.back_json.grammar.verb.partizip2}</span>
                        </span>
                      )}
                      {card.back_json.grammar.verb.separable && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                          Trennbar
                        </span>
                      )}
                    </div>
                  )}

                  {/* Grammar: Adjective */}
                  {card.back_json.grammar.adjective && (
                    <div className="flex flex-wrap gap-2">
                      {card.back_json.grammar.adjective.comparative && (
                        <span className="px-3 py-1 bg-surface-2 rounded-lg text-sm text-text-muted">
                          Komp: <span className="text-text font-medium">{card.back_json.grammar.adjective.comparative}</span>
                        </span>
                      )}
                      {card.back_json.grammar.adjective.superlative && (
                        <span className="px-3 py-1 bg-surface-2 rounded-lg text-sm text-text-muted">
                          Sup: <span className="text-text font-medium">{card.back_json.grammar.adjective.superlative}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Prepositions */}
                  {card.back_json.grammar.prepositions && card.back_json.grammar.prepositions.length > 0 && (
                    <div className="space-y-2">
                      {card.back_json.grammar.prepositions.map((prep, i) => (
                        <div key={i} className="p-3 bg-accent/5 rounded-xl text-sm">
                          <span className="font-bold text-accent">{prep.preposition} + {prep.case}</span>
                          <div className="text-text-muted mt-1">{prep.example}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Examples with Register badges */}
                  {card.back_json.examples.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                        {t.today.examples}
                      </div>
                      <div className="space-y-3">
                        {card.back_json.examples.slice(0, 3).map((ex, i) => (
                          <div key={i} className="p-4 bg-surface-2 rounded-xl">
                            <div className="flex items-start gap-2">
                              <div className="flex-1">
                                <div className="text-text font-medium mb-1">{ex.de}</div>
                                <div className="text-text-muted">{ex.fa}</div>
                              </div>
                              {ex.register && ex.register !== 'general' && (
                                <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                                  ex.register === 'formal' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {ex.register === 'formal' ? 'Formell' : 'Umgangs.'}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Collocations */}
                  {card.back_json.collocations.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                        {t.today.collocations}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {card.back_json.collocations.map((col, i) => (
                          <Badge key={i} variant="default" size="md">{col}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Synonyms & Antonyms */}
                  {(card.back_json.synonyms.length > 0 || card.back_json.antonyms.length > 0) && (
                    <div className="flex flex-wrap gap-2">
                      {card.back_json.synonyms.map((s, i) => (
                        <span key={`s-${i}`} className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm">
                          = {s}
                        </span>
                      ))}
                      {card.back_json.antonyms.map((a, i) => (
                        <span key={`a-${i}`} className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm">
                          ≠ {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Word Family */}
                  {card.back_json.word_family && card.back_json.word_family.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                        {t.today.wordFamily}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {card.back_json.word_family.map((word, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm">
                            {word}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {card.back_json.common_mistakes && card.back_json.common_mistakes.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                        {t.today.commonMistakes}
                      </div>
                      <div className="space-y-2">
                        {card.back_json.common_mistakes.map((mistake, i) => (
                          <div key={i} className="p-3 bg-red-50 text-red-700 rounded-xl text-sm">
                            ⚠ {mistake}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Register note */}
                  {card.back_json.register_note && (
                    <div className="p-3 bg-muted/30 rounded-xl text-sm text-text-muted italic">
                      {card.back_json.register_note}
                    </div>
                  )}

                  {/* Edit/Delete Actions */}
                  {(onEdit || onDelete) && (
                    <div className="flex gap-3 pt-4 border-t border-border">
                      {onEdit && (
                        <Button
                          variant="secondary"
                          size="md"
                          className="flex-1"
                          onClick={() => {
                            onEdit(card);
                            onOpenChange(false);
                          }}
                        >
                          {t.common.edit}
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="danger-soft"
                          size="md"
                          className="flex-1"
                          onClick={() => {
                            onDelete(card);
                            onOpenChange(false);
                          }}
                        >
                          {t.common.delete}
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>

                {/* Mobile navigation */}
                <div className="md:hidden p-4 border-t bg-surface flex items-center justify-between">
                  <button
                    onClick={() => hasPrev && onNavigate(currentIndex - 1)}
                    disabled={!hasPrev}
                    className="px-4 py-2 rounded-xl bg-surface-2 text-text disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ←
                  </button>
                  <span className="text-sm text-text-muted">
                    {t.dialogs.swipeToNavigate}
                  </span>
                  <button
                    onClick={() => hasNext && onNavigate(currentIndex + 1)}
                    disabled={!hasNext}
                    className="px-4 py-2 rounded-xl bg-surface-2 text-text disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    →
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
