'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card as CardType, Settings } from '@/types';
import { getNextBox, formatDate, getNextDueDate } from '@/lib/utils';
import { Celebration } from '@/components/celebration';
import { Button, Card, CardContent, ArticleBadge, BoxBadge, Badge } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
import toast from 'react-hot-toast';

type ViewMode = 'learning' | 'testing';

const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  daily_limit: 10,
  hide_future_cards: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function TodayPage() {
  const [box1Cards, setBox1Cards] = useState<CardType[]>([]);
  const [testCards, setTestCards] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('learning');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
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
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error loading due cards:', error);
      toast.error(t.errors.loadingCards);
    } else {
      const allCards = data || [];
      // Separate Box 1 (Learning) from Box 2+ (Testing)
      const learning = allCards.filter((c) => c.box === 1);
      const testing = allCards.filter((c) => c.box > 1);

      setBox1Cards(learning);
      // Apply daily limit to test cards
      setTestCards(testing.slice(0, userSettings.daily_limit));

      // If there are Box 1 cards, start in learning mode
      // Otherwise, go to testing mode
      if (learning.length > 0) {
        setViewMode('learning');
      } else if (testing.length > 0) {
        setViewMode('testing');
      }
    }
    setLoading(false);
  };

  const handleAnswer = async (result: 'correct' | 'wrong') => {
    const cards = viewMode === 'learning' ? box1Cards : testCards;
    const card = cards[currentIndex];
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

    // Show feedback
    if (result === 'correct') {
      toast.success(`${t.today.movedToBox} ${newBox}`);
    } else {
      toast.error(t.today.backToBox1);
    }

    // Move to next card or finish
    setShowAnswer(false);

    if (viewMode === 'learning') {
      // Remove card from box1Cards
      const remaining = box1Cards.filter((c) => c.id !== card.id);
      setBox1Cards(remaining);

      if (remaining.length === 0) {
        // Box 1 done, check if there are test cards
        if (testCards.length > 0) {
          setViewMode('testing');
          setCurrentIndex(0);
          toast.success(t.today.learningDone);
        } else {
          setCelebrate(true);
          toast.success(t.today.allReviewsComplete, { duration: 4000 });
        }
      } else {
        setCurrentIndex(Math.min(currentIndex, remaining.length - 1));
      }
    } else {
      // Testing mode
      if (currentIndex < testCards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setTestCards([]);
        setCurrentIndex(0);
        setCelebrate(true);
        toast.success(t.today.allReviewsComplete, { duration: 4000 });
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-4xl mx-auto p-4 text-center mt-20 text-gray-600">
          {t.common.loading}
        </div>
      </div>
    );
  }

  // No cards at all
  if (box1Cards.length === 0 && testCards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-4xl mx-auto p-4">
          <Card padding="lg" className="text-center mt-20">
            <CardContent className="space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-gray-900">{t.today.noCardsToday}</h1>
              <p className="text-gray-600">
                {t.today.allReviewsDone}
              </p>
              <p className="text-sm text-gray-500">
                {t.today.comeBackTomorrow}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // LEARNING MODE - Box 1
  if (viewMode === 'learning' && box1Cards.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <Celebration trigger={celebrate} />
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.today.learningMode}</h1>
              <p className="text-sm text-gray-600">
                {t.today.learningDesc}
              </p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600">{box1Cards.length}</div>
              <div className="text-sm text-gray-600">{t.today.card}</div>
            </div>
          </div>

          {/* Mode Switch */}
          <div className="mb-6 flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
            >
              📖 {t.today.learning} ({box1Cards.length})
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              disabled={testCards.length === 0}
              onClick={() => setViewMode('testing')}
            >
              📝 {t.today.testing} ({testCards.length})
            </Button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {box1Cards.map((card) => {
              const article = card.back_json.grammar.noun?.article;
              const cardVariant = getCardVariant(article);
              return (
                <Card
                  key={card.id}
                  variant={cardVariant}
                  className="overflow-hidden"
                >
                  {/* Card Header - Always visible */}
                  <button
                    onClick={() => toggleCardExpand(card.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {article && <ArticleBadge article={article} size="md" />}
                      <span className="text-xl font-bold text-gray-900">{card.term}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                        {t.common.box} 1
                      </span>
                      <span className="text-gray-400 text-lg">
                        {expandedCard === card.id ? '▲' : '▼'}
                      </span>
                    </div>
                  </button>

                  {/* Card Details - Expandable */}
                  {expandedCard === card.id && (
                    <CardContent className="border-t bg-gray-50 space-y-4">
                      {/* Meanings */}
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                          {t.today.meanings}
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {card.back_json.meaning_fa.map((meaning, i) => (
                            <li key={i} className="text-gray-800">{meaning}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Examples */}
                      {card.back_json.examples.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">
                            {t.today.examples}
                          </div>
                          {card.back_json.examples.map((ex, i) => (
                            <Card key={i} padding="sm" className="mb-2">
                              <div className="text-gray-800 font-medium">{ex.de}</div>
                              <div className="text-gray-600 text-sm">{ex.fa}</div>
                            </Card>
                          ))}
                        </div>
                      )}

                      {/* Grammar */}
                      {card.back_json.grammar.noun && (
                        <div className="flex items-center gap-3 text-sm">
                          <ArticleBadge article={card.back_json.grammar.noun.article} size="sm" />
                          {card.back_json.grammar.noun.plural && (
                            <span className="text-gray-600">
                              <strong>{t.common.plural}:</strong> {card.back_json.grammar.noun.plural}
                            </span>
                          )}
                        </div>
                      )}

                      {card.back_json.grammar.verb && (
                        <div className="text-sm space-y-1 text-gray-700">
                          {card.back_json.grammar.verb.perfekt_aux && (
                            <div><strong>Perfekt:</strong> {card.back_json.grammar.verb.perfekt_aux} + {card.back_json.grammar.verb.partizip2}</div>
                          )}
                          {card.back_json.grammar.verb.praeteritum && (
                            <div><strong>Präteritum:</strong> {card.back_json.grammar.verb.praeteritum}</div>
                          )}
                        </div>
                      )}

                      {/* Collocations */}
                      {card.back_json.collocations.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">
                            {t.today.collocations}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {card.back_json.collocations.map((col, i) => (
                              <Badge key={i} variant="warning" size="sm">
                                {col}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Learning Tips */}
                      {card.back_json.learning_tips.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2">
                            {t.today.learningTips}
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {card.back_json.learning_tips.map((tip, i) => (
                              <li key={i}>💡 {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Test Button */}
                      <div className="pt-4 border-t">
                        <Button
                          variant="success"
                          size="lg"
                          className="w-full"
                          onClick={() => {
                            setCurrentIndex(box1Cards.findIndex(c => c.id === card.id));
                            setShowAnswer(true);
                            setExpandedCard(null);
                          }}
                        >
                          ✓ {t.today.iLearned}
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Test Modal for Box 1 */}
          {showAnswer && box1Cards[currentIndex] && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card padding="lg" className="max-w-md w-full">
                <CardContent className="space-y-4">
                  <h2 className="text-xl font-bold text-center text-gray-900">{t.today.test}</h2>
                  <p className="text-center text-gray-600">
                    {t.today.testQuestion}
                  </p>
                  <div className="text-3xl font-bold text-center py-4 text-gray-900">
                    {box1Cards[currentIndex].term}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="danger"
                      size="lg"
                      className="flex-1"
                      onClick={() => handleAnswer('wrong')}
                    >
                      {t.today.iDontKnow}
                    </Button>
                    <Button
                      variant="success"
                      size="lg"
                      className="flex-1"
                      onClick={() => handleAnswer('correct')}
                    >
                      {t.today.iKnow}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="md"
                    className="w-full"
                    onClick={() => setShowAnswer(false)}
                  >
                    {t.common.cancel}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  // TESTING MODE - Box 2+
  const currentCard = testCards[currentIndex];

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <Celebration trigger={celebrate} />
        <div className="max-w-4xl mx-auto p-4">
          <Card padding="lg" className="text-center mt-20">
            <CardContent className="space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-gray-900">{t.today.testFinished}</h1>
              <p className="text-gray-600">{t.today.reviewedAllCards}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentArticle = currentCard.back_json.grammar.noun?.article;
  const currentCardVariant = getCardVariant(currentArticle);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <Celebration trigger={celebrate} />
      <div className="max-w-2xl mx-auto p-4">
        {/* Mode Switch */}
        {box1Cards.length > 0 && (
          <div className="mb-6 flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1"
              onClick={() => setViewMode('learning')}
            >
              📖 {t.today.learning} ({box1Cards.length})
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
            >
              📝 {t.today.testing} ({testCards.length})
            </Button>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {t.today.card} {currentIndex + 1} / {testCards.length}
          </div>
          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
            {t.common.box} {currentCard.box}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / testCards.length) * 100}%`,
            }}
          />
        </div>

        {/* Card */}
        <Card variant={currentCardVariant} padding="lg" className="min-h-[400px] flex flex-col items-center justify-center shadow-lg">
          {!showAnswer ? (
            <CardContent className="text-center space-y-6 w-full">
              <div className="text-4xl font-bold text-gray-900">{currentCard.term}</div>
              <Button
                variant="primary"
                size="xl"
                onClick={() => setShowAnswer(true)}
              >
                {t.today.showAnswer}
              </Button>
            </CardContent>
          ) : (
            <CardContent className="w-full space-y-6">
              <div className="text-3xl font-bold text-center text-gray-900">
                {currentCard.term}
              </div>

              <div className="border-t pt-6 space-y-4">
                {/* Meanings */}
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    {t.today.meanings}
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {currentCard.back_json.meaning_fa.map((meaning, i) => (
                      <li key={i} className="text-gray-800">
                        {meaning}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Examples */}
                {currentCard.back_json.examples.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      {t.today.examples}
                    </div>
                    {currentCard.back_json.examples.slice(0, 2).map((ex, i) => (
                      <div key={i} className="mb-2 text-sm">
                        <div className="text-gray-800">{ex.de}</div>
                        <div className="text-gray-600">
                          {ex.fa}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grammar */}
                {currentCard.back_json.grammar.noun && (
                  <div className="flex items-center gap-3 text-sm">
                    <ArticleBadge article={currentCard.back_json.grammar.noun.article} size="sm" />
                    {currentCard.back_json.grammar.noun.plural && (
                      <span className="text-gray-600">
                        <strong>{t.common.plural}:</strong> {currentCard.back_json.grammar.noun.plural}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Answer buttons */}
              <div className="flex gap-3 mt-8">
                <Button
                  variant="danger"
                  size="xl"
                  className="flex-1"
                  onClick={() => handleAnswer('wrong')}
                >
                  {t.common.wrong}
                </Button>
                <Button
                  variant="success"
                  size="xl"
                  className="flex-1"
                  onClick={() => handleAnswer('correct')}
                >
                  {t.common.correct}
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
