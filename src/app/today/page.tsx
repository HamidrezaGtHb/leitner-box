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

// Box colors for visual distinction
const BOX_COLORS: Record<number, { bg: string; text: string; badge: 'warning' | 'info' | 'success' }> = {
  5: { bg: 'bg-emerald-500/15', text: 'text-emerald-600', badge: 'success' },
  4: { bg: 'bg-indigo-500/15', text: 'text-indigo-600', badge: 'info' },
  3: { bg: 'bg-blue-500/15', text: 'text-blue-600', badge: 'info' },
  2: { bg: 'bg-orange-500/15', text: 'text-orange-600', badge: 'warning' },
  1: { bg: 'bg-amber-500/15', text: 'text-amber-600', badge: 'warning' },
};

export default function TodayPage() {
  const [cardsByBox, setCardsByBox] = useState<Record<number, CardType[]>>({});
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [showNotification, setShowNotification] = useState(true);

  // Card detail modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCards, setModalCards] = useState<CardType[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  // Test mode state
  const [isTestMode, setIsTestMode] = useState(false);
  const [testBox, setTestBox] = useState<number>(0);
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

    // Load all due cards - ordered by box descending (5 → 1)
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .lte('due_date', today)
      .order('box', { ascending: false });

    if (error) {
      console.error('Error loading due cards:', error);
      toast.error(t.errors.loadingCards);
    } else {
      const allCards = data || [];
      // Group by box
      const grouped: Record<number, CardType[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
      allCards.forEach(card => {
        if (grouped[card.box]) {
          grouped[card.box].push(card);
        }
      });
      setCardsByBox(grouped);
    }
    setLoading(false);
  };

  // Get which box should be reviewed next (highest box with due cards)
  const getNextReviewBox = (): number | null => {
    for (let box = 5; box >= 1; box--) {
      if (cardsByBox[box]?.length > 0) {
        return box;
      }
    }
    return null;
  };

  // Check if a box is locked (higher box has unreviewed cards)
  const isBoxLocked = (box: number): boolean => {
    for (let higherBox = 5; higherBox > box; higherBox--) {
      if (cardsByBox[higherBox]?.length > 0) {
        return true;
      }
    }
    return false;
  };

  const handleStartBoxTest = (box: number) => {
    const cards = cardsByBox[box] || [];
    if (cards.length === 0) {
      toast.error(t.today.noCardsToday);
      return;
    }
    setTestBox(box);
    setTestQueue(cards);
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
      // Box test complete
      setIsTestMode(false);
      setCelebrate(true);
      toast.success(`باکس ${testBox} تمام شد!`, { duration: 3000 });
      // Reload data to reflect changes
      loadData();
    }
  };

  const handleExitTest = () => {
    if (confirm('خارج شوید؟ پیشرفت ذخیره می‌شود.')) {
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

  const totalDueCards = Object.values(cardsByBox).reduce((sum, cards) => sum + cards.length, 0);
  const nextReviewBox = getNextReviewBox();

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
    const boxColor = BOX_COLORS[testBox];

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
                ← خروج
              </button>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${boxColor.bg} ${boxColor.text}`}>
                  باکس {testBox}
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
              className={`relative w-full min-h-[400px] transition-transform duration-500 cursor-pointer ${!showAnswer ? 'hover:scale-[1.02]' : ''}`}
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
                  برای دیدن پاسخ کلیک کنید
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

                    {/* Grammar */}
                    {currentCard.back_json.grammar.noun?.plural && (
                      <div className="text-sm text-text-muted">
                        <strong className="text-text">{t.common.plural}:</strong> {currentCard.back_json.grammar.noun.plural}
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

  // MAIN VIEW - Show boxes in order 5 → 4 → 3 → 2 → 1
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <Celebration trigger={celebrate} />

      <div className="max-w-5xl mx-auto p-4 py-6 space-y-6">
        {/* Notification Banner */}
        {showNotification && totalDueCards > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <div className="font-medium text-text">
                  {totalDueCards} کارت برای مرور امروز
                </div>
                <div className="text-sm text-text-muted">
                  {nextReviewBox && `از باکس ${nextReviewBox} شروع کنید`}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-text-muted hover:text-text p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text tracking-tight">{t.today.title}</h1>
          <p className="text-text-muted text-sm">
            {totalDueCards > 0
              ? 'باکس‌های بالاتر اولویت بیشتری دارند'
              : t.today.allReviewsDone}
          </p>
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

        {/* Boxes - from 5 to 1 */}
        {[5, 4, 3, 2, 1].map((box) => {
          const cards = cardsByBox[box] || [];
          const boxColor = BOX_COLORS[box];
          const locked = isBoxLocked(box);
          const isNextBox = nextReviewBox === box;

          if (cards.length === 0) return null;

          return (
            <div key={box} className={`space-y-4 ${locked ? 'opacity-50' : ''}`}>
              {/* Box Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 ${boxColor.bg} rounded-xl flex items-center justify-center ${boxColor.text} text-lg font-bold`}>
                    {box}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-text">
                      باکس {box}
                      {box === 1 && ' (کلمات جدید)'}
                      {box === 5 && ' (تسلط)'}
                    </h2>
                    {locked && (
                      <p className="text-xs text-text-muted">
                        🔒 اول باکس‌های بالاتر را مرور کنید
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={boxColor.badge} size="md">
                    {cards.length} کارت
                  </Badge>
                  {!locked && (
                    <Button
                      variant={isNextBox ? 'primary' : 'secondary'}
                      size="md"
                      onClick={() => handleStartBoxTest(box)}
                    >
                      ▶ مرور
                    </Button>
                  )}
                </div>
              </div>

              {/* Cards Grid */}
              {!locked && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cards.map((card, index) => {
                    const article = card.back_json.grammar.noun?.article;
                    const cardVariant = getCardVariant(article);

                    return (
                      <Card
                        key={card.id}
                        variant={cardVariant}
                        padding="md"
                        className="cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all"
                        onClick={() => openCardModal(cards, index)}
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
              )}
            </div>
          );
        })}

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
