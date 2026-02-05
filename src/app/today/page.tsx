'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card as CardType, Settings } from '@/types';
import { getNextBox, formatDate, getNextDueDate } from '@/lib/utils';
import { Celebration } from '@/components/celebration';
import { Button, Card, CardContent, ArticleBadge, Badge } from '@/components/ui';
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
  const [learningCards, setLearningCards] = useState<CardType[]>([]);
  const [reviewCards, setReviewCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Test mode state
  const [isTestMode, setIsTestMode] = useState(false);
  const [testQueue, setTestQueue] = useState<CardType[]>([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testResults, setTestResults] = useState<{ correct: number; wrong: number }>({ correct: 0, wrong: 0 });

  const supabase = createClient();
  const { t } = useLanguage();

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

    // Load all due cards
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .lte('due_date', today)
      .order('box', { ascending: true });

    if (error) {
      console.error('Error loading due cards:', error);
      toast.error(t.errors.loadingCards);
    } else {
      const allCards = data || [];
      // Box 1 = Learning, Box 2-5 = Review
      const learning = allCards.filter((c) => c.box === 1);
      const review = allCards.filter((c) => c.box > 1);

      setLearningCards(learning);
      // Apply daily limit
      setReviewCards(review.slice(0, userSettings.daily_limit));
    }
    setLoading(false);
  };

  const handleStartTest = () => {
    // Combine learning and review cards for testing
    const allDueCards = [...learningCards, ...reviewCards];
    if (allDueCards.length === 0) {
      toast.error(t.today.noCardsToday);
      return;
    }
    setTestQueue(allDueCards);
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
      // Test complete
      setIsTestMode(false);
      setCelebrate(true);
      toast.success(t.today.allReviewsComplete, { duration: 4000 });
      // Reload data to reflect changes
      loadData();
    }
  };

  const handleExitTest = () => {
    if (confirm('Exit test? Progress will be saved.')) {
      setIsTestMode(false);
      loadData();
    }
  };

  const toggleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const getCardVariant = (article: string | null | undefined) => {
    if (!article) return 'default' as const;
    const lower = article.toLowerCase();
    if (lower === 'der') return 'der' as const;
    if (lower === 'die') return 'die' as const;
    if (lower === 'das') return 'das' as const;
    return 'default' as const;
  };

  const totalDueCards = learningCards.length + reviewCards.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Nav />
        <div className="max-w-4xl mx-auto p-4 text-center mt-20 text-gray-600 dark:text-gray-400">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
        {/* Test Header */}
        <div className="bg-black/20 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handleExitTest}
                className="text-white/60 hover:text-white text-sm flex items-center gap-1"
              >
                ← {t.today.exitTest}
              </button>
              <div className="text-white/80 text-sm font-medium">
                {currentTestIndex + 1} / {testQueue.length}
              </div>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Test Card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card
            variant={cardVariant}
            padding="lg"
            className="w-full max-w-lg min-h-[400px] flex flex-col shadow-2xl"
          >
            {!showAnswer ? (
              <CardContent className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className="space-y-4">
                  {article && <ArticleBadge article={article} size="lg" />}
                  <div className="text-4xl md:text-5xl font-bold text-gray-900">
                    {currentCard.term}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t.common.box} {currentCard.box}
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="xl"
                  onClick={() => setShowAnswer(true)}
                  className="px-12"
                >
                  {t.today.showAnswer}
                </Button>
              </CardContent>
            ) : (
              <CardContent className="flex-1 flex flex-col">
                {/* Term */}
                <div className="text-center pb-4 border-b mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {article && <ArticleBadge article={article} size="md" />}
                    <span className="text-2xl font-bold text-gray-900">{currentCard.term}</span>
                  </div>
                </div>

                {/* Answer content */}
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {/* Meanings */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {t.today.meanings}
                    </div>
                    <ul className="space-y-1">
                      {currentCard.back_json.meaning_fa.map((meaning, i) => (
                        <li key={i} className="text-gray-800 text-lg">{meaning}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  {currentCard.back_json.examples.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        {t.today.examples}
                      </div>
                      {currentCard.back_json.examples.slice(0, 2).map((ex, i) => (
                        <div key={i} className="mb-2 p-3 bg-gray-50 rounded-lg">
                          <div className="text-gray-800 font-medium">{ex.de}</div>
                          <div className="text-gray-600 text-sm">{ex.fa}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Grammar */}
                  {currentCard.back_json.grammar.noun?.plural && (
                    <div className="text-sm text-gray-600">
                      <strong>{t.common.plural}:</strong> {currentCard.back_json.grammar.noun.plural}
                    </div>
                  )}
                </div>

                {/* Answer buttons */}
                <div className="flex gap-3 pt-4 mt-4 border-t">
                  <Button
                    variant="danger"
                    size="xl"
                    className="flex-1"
                    onClick={() => handleTestAnswer('wrong')}
                  >
                    ✗ {t.common.wrong}
                  </Button>
                  <Button
                    variant="success"
                    size="xl"
                    className="flex-1"
                    onClick={() => handleTestAnswer('correct')}
                  >
                    ✓ {t.common.correct}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    );
  }

  // MAIN VIEW - Show all cards
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Nav />
      <Celebration trigger={celebrate} />

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header with Start Test button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.today.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {totalDueCards > 0
                ? `${totalDueCards} ${t.common.cards} ${t.today.dueForReview.toLowerCase()}`
                : t.today.allReviewsDone}
            </p>
          </div>

          {totalDueCards > 0 && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartTest}
              className="sm:px-8"
            >
              ▶ {t.today.startTest} ({totalDueCards})
            </Button>
          )}
        </div>

        {/* No cards message */}
        {totalDueCards === 0 && (
          <Card padding="lg" className="text-center dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="py-12 space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.today.noCardsToday}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t.today.comeBackTomorrow}</p>
            </CardContent>
          </Card>
        )}

        {/* Learning Cards (Box 1) */}
        {learningCards.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-600 dark:text-amber-400 text-sm font-bold">1</span>
                {t.today.newWords}
              </h2>
              <Badge variant="warning" size="md">{learningCards.length} {t.common.cards}</Badge>
            </div>

            <div className="grid gap-3">
              {learningCards.map((card) => {
                const article = card.back_json.grammar.noun?.article;
                const cardVariant = getCardVariant(article);
                const isExpanded = expandedCard === card.id;

                return (
                  <Card key={card.id} variant={cardVariant} className="overflow-hidden">
                    {/* Card header - clickable */}
                    <button
                      onClick={() => toggleCardExpand(card.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        {article && <ArticleBadge article={article} size="md" />}
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{card.term}</span>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500 text-lg transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(180deg)' : '' }}>
                        ▼
                      </span>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <CardContent className="border-t dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 space-y-4">
                        {/* Meanings */}
                        <div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                            {t.today.meanings}
                          </div>
                          <ul className="space-y-1">
                            {card.back_json.meaning_fa.map((meaning, i) => (
                              <li key={i} className="text-gray-800 dark:text-gray-200">• {meaning}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Examples */}
                        {card.back_json.examples.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                              {t.today.examples}
                            </div>
                            {card.back_json.examples.slice(0, 2).map((ex, i) => (
                              <Card key={i} padding="sm" className="mb-2 dark:bg-gray-700 dark:border-gray-600">
                                <div className="text-gray-800 dark:text-gray-200 font-medium">{ex.de}</div>
                                <div className="text-gray-600 dark:text-gray-400 text-sm">{ex.fa}</div>
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* Grammar */}
                        {card.back_json.grammar.noun?.plural && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>{t.common.plural}:</strong> {card.back_json.grammar.noun.plural}
                          </div>
                        )}

                        {/* Collocations */}
                        {card.back_json.collocations.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                              {t.today.collocations}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {card.back_json.collocations.map((col, i) => (
                                <Badge key={i} variant="default" size="sm">{col}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Learning Tips */}
                        {card.back_json.learning_tips.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                              {t.today.learningTips}
                            </div>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                              {card.back_json.learning_tips.map((tip, i) => (
                                <li key={i}>💡 {tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Review Cards (Box 2-5) */}
        {reviewCards.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">2-5</span>
                {t.today.dueForReview}
              </h2>
              <Badge variant="info" size="md">{reviewCards.length} {t.common.cards}</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {reviewCards.map((card) => {
                const article = card.back_json.grammar.noun?.article;
                const cardVariant = getCardVariant(article);

                return (
                  <Card key={card.id} variant={cardVariant} padding="md" className="text-center">
                    <CardContent className="space-y-2">
                      {article && (
                        <div className="flex justify-center">
                          <ArticleBadge article={article} size="sm" />
                        </div>
                      )}
                      <div className="font-semibold text-gray-900 dark:text-white truncate">{card.term}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t.common.box} {card.box}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily limit info */}
        {reviewCards.length >= settings.daily_limit && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
            {t.settings.dailyLimit}: {settings.daily_limit} {t.common.cards}
          </div>
        )}
      </div>
    </div>
  );
}
