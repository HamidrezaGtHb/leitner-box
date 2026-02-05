'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card as CardType, Settings } from '@/types';
import { getNextBox, formatDate, getNextDueDate } from '@/lib/utils';
import { Celebration } from '@/components/celebration';
import { Button, Card, CardContent, ArticleBadge, Badge, CopyButton } from '@/components/ui';
import { CardDetailModal } from '@/components/card-detail-modal';
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

  // Card detail modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCards, setModalCards] = useState<CardType[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

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

  const openCardModal = (cards: CardType[], index: number) => {
    setModalCards(cards);
    setModalIndex(index);
    setModalOpen(true);
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
                ← {t.today.exitTest}
              </button>
              <div className="text-text text-sm font-medium">
                {currentTestIndex + 1} / {testQueue.length}
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

        {/* Test Card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card
            variant={cardVariant}
            padding="lg"
            className="w-full max-w-lg min-h-[400px] flex flex-col shadow-lg"
          >
            {!showAnswer ? (
              <CardContent className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
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

                  {/* Grammar */}
                  {currentCard.back_json.grammar.noun?.plural && (
                    <div className="text-sm text-text-muted">
                      <strong className="text-text">{t.common.plural}:</strong> {currentCard.back_json.grammar.noun.plural}
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
    <div className="min-h-screen bg-bg">
      <Nav />
      <Celebration trigger={celebrate} />

      <div className="max-w-5xl mx-auto p-4 py-6 space-y-6">
        {/* Header with Start Test button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-text tracking-tight">{t.today.title}</h1>
            <p className="text-text-muted text-sm">
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
          <Card padding="lg" className="text-center">
            <CardContent className="py-12 space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-xl font-semibold text-text">{t.today.noCardsToday}</h2>
              <p className="text-text-muted">{t.today.comeBackTomorrow}</p>
            </CardContent>
          </Card>
        )}

        {/* Learning Cards (Box 1) */}
        {learningCards.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text flex items-center gap-2">
                <span className="w-8 h-8 bg-warning/15 rounded-xl flex items-center justify-center text-warning text-sm font-bold">1</span>
                {t.today.newWords}
              </h2>
              <Badge variant="warning" size="md">{learningCards.length} {t.common.cards}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {learningCards.map((card, index) => {
                const article = card.back_json.grammar.noun?.article;
                const cardVariant = getCardVariant(article);

                return (
                  <Card
                    key={card.id}
                    variant={cardVariant}
                    padding="md"
                    className="cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all"
                    onClick={() => openCardModal(learningCards, index)}
                  >
                    <CardContent className="text-center space-y-2">
                      {article && (
                        <div className="flex justify-center">
                          <ArticleBadge article={article} size="sm" />
                        </div>
                      )}
                      <div className="font-semibold text-text truncate">{card.term}</div>
                      <div className="text-xs text-text-muted truncate">
                        {card.back_json.meaning_fa[0]}
                      </div>
                    </CardContent>
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
              <h2 className="text-lg font-semibold text-text flex items-center gap-2">
                <span className="w-8 h-8 bg-info/15 rounded-xl flex items-center justify-center text-info text-sm font-bold">2-5</span>
                {t.today.dueForReview}
              </h2>
              <Badge variant="info" size="md">{reviewCards.length} {t.common.cards}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {reviewCards.map((card, index) => {
                const article = card.back_json.grammar.noun?.article;
                const cardVariant = getCardVariant(article);

                return (
                  <Card
                    key={card.id}
                    variant={cardVariant}
                    padding="md"
                    className="cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all"
                    onClick={() => openCardModal(reviewCards, index)}
                  >
                    <CardContent className="text-center space-y-2">
                      {article && (
                        <div className="flex justify-center">
                          <ArticleBadge article={article} size="sm" />
                        </div>
                      )}
                      <div className="font-semibold text-text truncate">{card.term}</div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-xs bg-info/15 text-info px-2 py-0.5 rounded-full font-medium">
                          {t.common.box} {card.box}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Daily limit info */}
        {reviewCards.length >= settings.daily_limit && (
          <div className="text-center text-sm text-text-muted py-2">
            {t.settings.dailyLimit}: {settings.daily_limit} {t.common.cards}
          </div>
        )}

        {/* Card Detail Modal */}
        <CardDetailModal
          cards={modalCards}
          currentIndex={modalIndex}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onNavigate={setModalIndex}
        />
      </div>
    </div>
  );
}
