'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card } from '@/types';
import { isDueToday, getNextBox, formatDate, getNextDueDate } from '@/lib/utils';

export default function TodayPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadDueCards();
  }, []);

  const loadDueCards = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const today = formatDate(new Date());

    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .lte('due_date', today)
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error loading due cards:', error);
    } else {
      setCards(data || []);
    }
    setLoading(false);
  };

  const handleAnswer = async (result: 'correct' | 'wrong') => {
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

    // Move to next card
    setShowAnswer(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All done
      setCards([]);
      setCurrentIndex(0);
    }
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4 text-center mt-20">
          Loading...
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4">
          <div className="text-center mt-20 space-y-4">
            <h1 className="text-3xl font-bold">No cards due today!</h1>
            <p className="text-gray-600">
              You've completed all your reviews for today.
            </p>
            <p className="text-sm text-gray-500">
              Check back tomorrow or add new cards from the Backlog.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div>
      <Nav />
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Card {currentIndex + 1} of {cards.length}
          </div>
          <div className="text-sm text-gray-600">Box {currentCard.box}</div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${((currentIndex + 1) / cards.length) * 100}%`,
            }}
          />
        </div>

        {/* Card */}
        <div className="bg-white border rounded-lg p-8 min-h-[300px] flex flex-col items-center justify-center">
          {!showAnswer ? (
            <div className="text-center space-y-6">
              <div className="text-4xl font-bold">{currentCard.term}</div>
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Show answer
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
                    Meanings (Persian):
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
                      Examples:
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
                  className="flex-1 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Wrong
                </button>
                <button
                  onClick={() => handleAnswer('correct')}
                  className="flex-1 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Correct
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
