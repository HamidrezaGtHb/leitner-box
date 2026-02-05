'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card, Settings } from '@/types';
import { getNextBox, formatDate, getNextDueDate } from '@/lib/utils';
import { Celebration } from '@/components/celebration';
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
  const [box1Cards, setBox1Cards] = useState<Card[]>([]);
  const [testCards, setTestCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [celebrate, setCelebrate] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('learning');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const supabase = createClient();

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
      toast.error('لطفاً وارد شوید');
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
      toast.error('خطا در بارگذاری کارت‌ها');
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
      toast.error('خطا در به‌روزرسانی کارت');
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
      toast.success(`عالی! به باکس ${newBox} منتقل شد`);
    } else {
      toast.error('برگشت به باکس 1');
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
          toast.success('یادگیری تمام! حالا آزمون باکس‌های بعدی');
        } else {
          setCelebrate(true);
          toast.success('🎉 تمام مرورهای امروز تکمیل شد!', { duration: 4000 });
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
        toast.success('🎉 تمام مرورهای امروز تکمیل شد!', { duration: 4000 });
      }
    }
  };

  const toggleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4 text-center mt-20">
          در حال بارگذاری...
        </div>
      </div>
    );
  }

  // No cards at all
  if (box1Cards.length === 0 && testCards.length === 0) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mt-20 space-y-4">
            <h1 className="text-3xl font-bold">کارتی برای امروز نیست!</h1>
            <p className="text-gray-600">
              همه مرورهای امروز تکمیل شده.
            </p>
            <p className="text-sm text-gray-500">
              فردا برگرد یا از Backlog کارت جدید اضافه کن.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // LEARNING MODE - Box 1
  if (viewMode === 'learning' && box1Cards.length > 0) {
    return (
      <div>
        <Nav />
        <Celebration trigger={celebrate} />
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">حالت یادگیری</h1>
              <p className="text-sm text-gray-600">
                باکس ۱ - روی هر کارت کلیک کن تا جزئیات رو ببینی
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{box1Cards.length}</div>
              <div className="text-sm text-gray-600">کارت برای یادگیری</div>
            </div>
          </div>

          {/* Mode Switch */}
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setViewMode('learning')}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              📖 یادگیری ({box1Cards.length})
            </button>
            <button
              onClick={() => setViewMode('testing')}
              disabled={testCards.length === 0}
              className={`flex-1 py-3 rounded-lg font-medium ${
                testCards.length > 0
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              📝 آزمون ({testCards.length})
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {box1Cards.map((card) => (
              <div
                key={card.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm"
              >
                {/* Card Header - Always visible */}
                <button
                  onClick={() => toggleCardExpand(card.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="text-xl font-bold">{card.term}</div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      باکس ۱
                    </span>
                    <span className="text-gray-400">
                      {expandedCard === card.id ? '▲' : '▼'}
                    </span>
                  </div>
                </button>

                {/* Card Details - Expandable */}
                {expandedCard === card.id && (
                  <div className="p-4 border-t bg-gray-50 space-y-4">
                    {/* Meanings */}
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        معانی:
                      </div>
                      <ul className="list-disc list-inside space-y-1" dir="rtl">
                        {card.back_json.meaning_fa.map((meaning, i) => (
                          <li key={i} className="text-gray-800">{meaning}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    {card.back_json.examples.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-2">
                          مثال‌ها:
                        </div>
                        {card.back_json.examples.map((ex, i) => (
                          <div key={i} className="mb-2 p-3 bg-white rounded border">
                            <div className="text-gray-800 font-medium">{ex.de}</div>
                            <div className="text-gray-600 text-sm" dir="rtl">{ex.fa}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Grammar */}
                    {card.back_json.grammar.noun && (
                      <div className="text-sm">
                        <strong>Article:</strong> {card.back_json.grammar.noun.article}
                        {card.back_json.grammar.noun.plural && (
                          <> | <strong>Plural:</strong> {card.back_json.grammar.noun.plural}</>
                        )}
                      </div>
                    )}

                    {card.back_json.grammar.verb && (
                      <div className="text-sm space-y-1">
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
                        <div className="text-sm font-semibold text-gray-700 mb-1">
                          ترکیب‌های رایج:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {card.back_json.collocations.map((col, i) => (
                            <span key={i} className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Tips */}
                    {card.back_json.learning_tips.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">
                          نکات یادگیری:
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1" dir="rtl">
                          {card.back_json.learning_tips.map((tip, i) => (
                            <li key={i}>💡 {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Test Button */}
                    <div className="pt-4 border-t flex gap-3">
                      <button
                        onClick={() => {
                          setCurrentIndex(box1Cards.findIndex(c => c.id === card.id));
                          setShowAnswer(true);
                          setExpandedCard(null);
                        }}
                        className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                      >
                        ✓ یاد گرفتم - تست بده
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Test Modal for Box 1 */}
          {showAnswer && box1Cards[currentIndex] && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4">
                <h2 className="text-xl font-bold text-center">آزمون</h2>
                <p className="text-center text-gray-600">
                  آیا معنی این کلمه رو بلدی؟
                </p>
                <div className="text-3xl font-bold text-center py-4">
                  {box1Cards[currentIndex].term}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleAnswer('wrong')}
                    className="flex-1 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-lg"
                  >
                    نه، بلد نیستم
                  </button>
                  <button
                    onClick={() => handleAnswer('correct')}
                    className="flex-1 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg"
                  >
                    بله، بلدم
                  </button>
                </div>
                <button
                  onClick={() => setShowAnswer(false)}
                  className="w-full py-2 text-gray-600 hover:text-gray-800"
                >
                  انصراف
                </button>
              </div>
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
      <div>
        <Nav />
        <Celebration trigger={celebrate} />
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mt-20 space-y-4">
            <h1 className="text-3xl font-bold">آزمون تمام شد!</h1>
            <p className="text-gray-600">همه کارت‌های امروز رو مرور کردی.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <Celebration trigger={celebrate} />
      <div className="max-w-2xl mx-auto p-4">
        {/* Mode Switch */}
        {box1Cards.length > 0 && (
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setViewMode('learning')}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              📖 یادگیری ({box1Cards.length})
            </button>
            <button
              onClick={() => setViewMode('testing')}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              📝 آزمون ({testCards.length})
            </button>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            کارت {currentIndex + 1} از {testCards.length}
          </div>
          <div className="text-sm text-gray-600">باکس {currentCard.box}</div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${((currentIndex + 1) / testCards.length) * 100}%`,
            }}
          />
        </div>

        {/* Card */}
        <div className="bg-white border rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center shadow-lg">
          {!showAnswer ? (
            <div className="text-center space-y-6 w-full">
              <div className="text-4xl font-bold">{currentCard.term}</div>
              <button
                onClick={() => setShowAnswer(true)}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium min-w-[200px]"
              >
                نمایش جواب
              </button>
            </div>
          ) : (
            <div className="w-full space-y-6">
              <div className="text-3xl font-bold text-center">
                {currentCard.term}
              </div>

              <div className="border-t pt-6 space-y-4">
                {/* Meanings */}
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">
                    معانی:
                  </div>
                  <ul className="list-disc list-inside space-y-1" dir="rtl">
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
                      مثال‌ها:
                    </div>
                    {currentCard.back_json.examples.slice(0, 2).map((ex, i) => (
                      <div key={i} className="mb-2 text-sm">
                        <div className="text-gray-800">{ex.de}</div>
                        <div className="text-gray-600" dir="rtl">
                          {ex.fa}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grammar */}
                {currentCard.back_json.grammar.noun && (
                  <div className="text-sm">
                    <strong>Article:</strong>{' '}
                    {currentCard.back_json.grammar.noun.article}
                    {currentCard.back_json.grammar.noun.plural && (
                      <>
                        {' '}
                        | <strong>Plural:</strong>{' '}
                        {currentCard.back_json.grammar.noun.plural}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Answer buttons */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => handleAnswer('wrong')}
                  className="flex-1 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-lg"
                >
                  غلط
                </button>
                <button
                  onClick={() => handleAnswer('correct')}
                  className="flex-1 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-lg"
                >
                  درست
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
