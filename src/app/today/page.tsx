'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card as CardType, Settings } from '@/types';
import { getNextBox, formatDate, getNextDueDate } from '@/lib/utils';
import { Celebration } from '@/components/celebration';
import { Button, Card, CardContent, ArticleBadge, CopyButton } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  daily_limit: 10,
  hide_future_cards: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function TodayPage() {
  const [dueCards, setDueCards] = useState<CardType[]>([]);
  const [wordsAddedToday, setWordsAddedToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // Test mode state
  const [isTestMode, setIsTestMode] = useState(false);
  const [testQueue, setTestQueue] = useState<CardType[]>([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testResults, setTestResults] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });

  const supabase = createClient();
  const router = useRouter();
  const { t } = useLanguage();

  const dailyLimit = settings.daily_limit || 10;
  const quotaComplete = wordsAddedToday >= dailyLimit;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      toast.error(t.errors.pleaseLogin);
      return;
    }

    // Load settings
    const { data: settingsData } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const userSettings = settingsData || DEFAULT_SETTINGS;
    setSettings(userSettings);

    const today = formatDate(new Date());

    // Count words added today
    const { count: todayCount } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`);

    setWordsAddedToday(todayCount || 0);

    // Load all due cards - ordered by box ascending (1 → 5), then by due_date
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .lte('due_date', today)
      .order('box', { ascending: true })
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error loading due cards:', error);
      toast.error(t.errors.loadingCards);
    } else {
      setDueCards(data || []);
    }
    setLoading(false);
  };

  // Get box distribution for display
  const getBoxCounts = () => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    dueCards.forEach(card => {
      counts[card.box] = (counts[card.box] || 0) + 1;
    });
    return counts;
  };

  const handleStartReview = () => {
    if (dueCards.length === 0) {
      toast.error(t.today.noCardsToday);
      return;
    }
    setTestQueue(dueCards);
    setCurrentTestIndex(0);
    setShowAnswer(false);
    setTestResults({ correct: 0, wrong: 0 });
    setIsTestMode(true);
  };

  const handleTestAnswer = async (result: 'correct' | 'wrong') => {
    const card = testQueue[currentTestIndex];
    if (!card) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const newBox = getNextBox(card.box, result);
    const newDueDate = formatDate(getNextDueDate(newBox));

    // Update card
    const { error: updateError } = await supabase
      .from('cards')
      .update({
        box: newBox,
        due_date: newDueDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', card.id);

    if (updateError) {
      console.error('Error updating card:', updateError);
      toast.error(t.errors.updatingCard);
      return;
    }

    // Log review
    await supabase.from('reviews').insert({
      card_id: card.id,
      user_id: user.id,
      result,
      from_box: card.box,
      to_box: newBox,
    });

    // Update results
    setTestResults(prev => ({
      correct: prev.correct + (result === 'correct' ? 1 : 0),
      wrong: prev.wrong + (result === 'wrong' ? 1 : 0),
    }));

    // Show brief feedback
    if (result === 'correct') {
      toast.success(`${t.today.movedToBox} ${newBox}`, { duration: 1500 });
    } else {
      toast.error(t.today.backToBox1, { duration: 1500 });
    }

    // Move to next card
    setShowAnswer(false);
    if (currentTestIndex < testQueue.length - 1) {
      setCurrentTestIndex(currentTestIndex + 1);
    } else {
      // All cards reviewed!
      setIsTestMode(false);
      setCelebrate(true);
      toast.success(t.today.reviewComplete, { duration: 3000 });
      loadData();
    }
  };

  const handleExitTest = () => {
    if (confirm(t.today.exitConfirm)) {
      setIsTestMode(false);
      loadData();
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

  const boxCounts = getBoxCounts();
  const totalDueCards = dueCards.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Nav />
        <div className="max-w-5xl mx-auto p-4 text-center mt-20 text-text-muted">
          {t.common.loading}
        </div>
      </div>
    );
  }

  // TEST MODE - Full screen testing experience
  if (isTestMode && testQueue.length > 0) {
    const currentCard = testQueue[currentTestIndex];
    const article = currentCard.back_json.grammar.noun?.article;
    const cardVariant = getCardVariant(article);
    const progress = ((currentTestIndex + 1) / testQueue.length) * 100;

    return (
      <div className="min-h-screen bg-surface-2 flex flex-col">
        {/* Test Header */}
        <div className="bg-surface border-b p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleExitTest}
                className="text-text-muted hover:text-text text-sm flex items-center gap-1 transition-colors"
              >
                ← {t.today.exit}
              </button>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent/15 text-accent">
                  {t.common.box} {currentCard.box}
                </span>
                <span className="text-text text-sm font-medium">
                  {currentTestIndex + 1} / {testQueue.length}
                </span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Test Card - Flip Animation */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div
            className="w-full max-w-lg perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <div
              onClick={() => !showAnswer && setShowAnswer(true)}
              className={`relative w-full min-h-[500px] transition-transform duration-500 cursor-pointer ${!showAnswer ? 'hover:scale-[1.02]' : ''}`}
              style={{
                transformStyle: 'preserve-3d',
                transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front of card */}
              <Card
                variant={cardVariant}
                padding="lg"
                className="absolute inset-0 w-full h-full flex flex-col shadow-lg backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <CardContent className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="space-y-4">
                    {article && <ArticleBadge article={article} size="lg" />}
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-4xl md:text-5xl font-bold text-text">
                        {currentCard.term}
                      </div>
                      <CopyButton text={article ? `${article} ${currentCard.term}` : currentCard.term} size="md" />
                    </div>
                    <div className="text-sm text-text-muted">
                      {t.common.box} {currentCard.box}
                    </div>
                  </div>
                </CardContent>
                {/* Hint at bottom */}
                <div className="text-center pb-4 text-sm text-text-muted flex items-center justify-center gap-2">
                  <span className="opacity-60">👆</span>
                  {t.today.clickToSeeAnswer}
                </div>
              </Card>

              {/* Back of card */}
              <Card
                variant={cardVariant}
                padding="lg"
                className="absolute inset-0 w-full h-full flex flex-col shadow-lg"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <CardContent className="flex-1 flex flex-col overflow-hidden">
                  {/* Term */}
                  <div className="text-center pb-4 border-b mb-4 shrink-0">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {article && <ArticleBadge article={article} size="md" />}
                      <span className="text-2xl font-bold text-text">{currentCard.term}</span>
                      <CopyButton text={article ? `${article} ${currentCard.term}` : currentCard.term} size="md" />
                    </div>
                  </div>

                  {/* Answer content */}
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* Meanings */}
                    <div>
                      <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                        {t.today.meanings}
                      </div>
                      <ul className="space-y-1">
                        {currentCard.back_json.meaning_fa.map((meaning, i) => (
                          <li key={i} className="text-text text-lg">{meaning}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    {currentCard.back_json.examples.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                          {t.today.examples}
                        </div>
                        {currentCard.back_json.examples.slice(0, 2).map((ex, i) => (
                          <div key={i} className="mb-2 p-3 bg-surface-2 rounded-xl">
                            <div className="text-text font-medium">{ex.de}</div>
                            <div className="text-text-muted text-sm">{ex.fa}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Grammar Info */}
                    <div className="space-y-2 text-sm">
                      {/* IPA */}
                      {currentCard.back_json.ipa && (
                        <div className="text-text-muted">
                          <span className="font-mono text-accent">[{currentCard.back_json.ipa}]</span>
                        </div>
                      )}

                      {/* Noun: Plural */}
                      {currentCard.back_json.grammar.noun?.plural && (
                        <div className="text-text-muted">
                          <strong className="text-text">{t.common.plural}:</strong> {currentCard.back_json.grammar.noun.plural}
                        </div>
                      )}

                      {/* Verb: Präteritum, Perfekt, Rektion */}
                      {currentCard.back_json.grammar.verb && (
                        <div className="flex flex-wrap gap-2 text-text-muted">
                          {currentCard.back_json.grammar.verb.praeteritum && (
                            <span className="px-2 py-0.5 bg-surface-2 rounded">
                              Prät: <span className="text-text">{currentCard.back_json.grammar.verb.praeteritum}</span>
                            </span>
                          )}
                          {currentCard.back_json.grammar.verb.partizip2 && (
                            <span className="px-2 py-0.5 bg-surface-2 rounded">
                              Perf: <span className="text-text">{currentCard.back_json.grammar.verb.perfekt_aux} {currentCard.back_json.grammar.verb.partizip2}</span>
                            </span>
                          )}
                          {currentCard.back_json.grammar.verb.rektion && (
                            <span className="px-2 py-0.5 bg-accent/10 rounded text-accent font-medium">
                              {currentCard.back_json.grammar.verb.rektion}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Adjective: Comparative, Superlative */}
                      {currentCard.back_json.grammar.adjective && (
                        <div className="flex flex-wrap gap-2 text-text-muted">
                          {currentCard.back_json.grammar.adjective.comparative && (
                            <span className="px-2 py-0.5 bg-surface-2 rounded">
                              Komp: <span className="text-text">{currentCard.back_json.grammar.adjective.comparative}</span>
                            </span>
                          )}
                          {currentCard.back_json.grammar.adjective.superlative && (
                            <span className="px-2 py-0.5 bg-surface-2 rounded">
                              Sup: <span className="text-text">{currentCard.back_json.grammar.adjective.superlative}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Collocations */}
                    {currentCard.back_json.collocations.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                          {t.today.collocations}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentCard.back_json.collocations.slice(0, 4).map((col, i) => (
                            <span key={i} className="px-2 py-1 bg-surface-2 rounded-lg text-sm text-text">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Answer buttons */}
                  <div className="flex gap-3 pt-4 mt-4 border-t shrink-0">
                    <Button
                      variant="danger"
                      size="xl"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestAnswer('wrong');
                      }}
                    >
                      ✗ {t.common.wrong}
                    </Button>
                    <Button
                      variant="success"
                      size="xl"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTestAnswer('correct');
                      }}
                    >
                      ✓ {t.common.correct}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN VIEW
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <Celebration trigger={celebrate} />

      <div className="max-w-5xl mx-auto p-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text tracking-tight">{t.today.title}</h1>
        </div>

        {/* Daily Word Quota Card */}
        <Card padding="lg" className={!quotaComplete ? 'border-warning/50 bg-warning/5' : 'border-success/50 bg-success/5'}>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{quotaComplete ? '✅' : '📝'}</span>
                <div>
                  <div className="font-medium text-text">
                    {quotaComplete ? t.today.quotaComplete : t.today.completeQuotaFirst}
                  </div>
                  <div className="text-sm text-text-muted">
                    {wordsAddedToday} / {dailyLimit} {t.today.words}
                  </div>
                </div>
              </div>
              {!quotaComplete && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push('/backlog')}
                >
                  ➕ {t.today.addWord}
                </Button>
              )}
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${quotaComplete ? 'bg-success' : 'bg-warning'}`}
                style={{ width: `${Math.min((wordsAddedToday / dailyLimit) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Review Card */}
        <Card padding="lg">
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <div className="font-medium text-text">
                    {totalDueCards > 0 ? `${totalDueCards} ${t.today.cardsForReview}` : t.today.noCardsForReview}
                  </div>
                  {totalDueCards > 0 && (
                    <div className="text-sm text-text-muted">
                      {[1, 2, 3, 4, 5].filter(b => boxCounts[b] > 0).map(b =>
                        `${t.common.box} ${b}: ${boxCounts[b]}`
                      ).join(' • ')}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {totalDueCards > 0 && (
              <Button
                variant={quotaComplete ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
                disabled={!quotaComplete}
                onClick={handleStartReview}
              >
                {quotaComplete ? (
                  <>▶ {t.today.startReview}</>
                ) : (
                  <>🔒 {t.today.quotaLocked}</>
                )}
              </Button>
            )}

            {totalDueCards === 0 && quotaComplete && (
              <div className="text-center py-8 space-y-4">
                <div className="text-6xl">🎉</div>
                <div>
                  <h2 className="text-xl font-semibold text-text">{t.today.noCardsToday}</h2>
                  <p className="text-text-muted">{t.today.comeBackTomorrow}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Box Distribution Preview (if has due cards) */}
        {totalDueCards > 0 && (
          <Card padding="lg">
            <CardContent>
              <h3 className="text-sm font-medium text-text mb-4">{t.today.boxDistribution}</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(box => {
                  const count = boxCounts[box] || 0;
                  const percentage = totalDueCards > 0 ? (count / totalDueCards) * 100 : 0;
                  return (
                    <div key={box} className="flex-1 text-center">
                      <div className="h-16 bg-muted rounded-lg relative overflow-hidden">
                        <div
                          className="absolute bottom-0 w-full bg-accent transition-all"
                          style={{ height: `${Math.max(percentage, count > 0 ? 15 : 0)}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-bold text-text">{count}</span>
                        </div>
                      </div>
                      <div className="text-xs text-text-muted mt-1">{t.common.box} {box}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
