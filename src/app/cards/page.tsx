'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card as CardType, Settings } from '@/types';
import { EditCardDialog } from '@/components/edit-card-dialog';
import { formatDate } from '@/lib/utils';
import { Button, Card, CardHeader, CardTitle, CardContent, ArticleBadge } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
import {
  calculateStreak,
  calculateAccuracy,
  getBoxDistribution,
} from '@/lib/streak';
import toast from 'react-hot-toast';

const DEFAULT_SETTINGS: Settings = {
  user_id: 'default',
  intervals: { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 },
  daily_limit: 10,
  hide_future_cards: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function CardsPage() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [filterBox, setFilterBox] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalReviews: 0,
    streak: 0,
    accuracy: 0,
    boxDistribution: {} as Record<number, number>,
  });
  const supabase = createClient();
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: settingsData } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setSettings(settingsData || DEFAULT_SETTINGS);

    const { data } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setCards(data || []);

    const [streak, accuracy, boxDistribution, reviewsCount] = await Promise.all([
      calculateStreak(supabase, user.id),
      calculateAccuracy(supabase, user.id),
      getBoxDistribution(supabase, user.id),
      supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id),
    ]);

    setStats({
      totalCards: data?.length || 0,
      totalReviews: reviewsCount.count || 0,
      streak,
      accuracy,
      boxDistribution,
    });

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.cards.deleteConfirm)) return;

    const deleteToast = toast.loading(t.cards.deleting);
    const { error } = await supabase.from('cards').delete().eq('id', id);

    if (error) {
      toast.error(t.cards.deleteError, { id: deleteToast });
    } else {
      toast.success(t.cards.deleted, { id: deleteToast });
      loadData();
    }
  };

  const today = formatDate(new Date());

  const isCardHidden = (card: CardType): boolean => {
    if (!settings.hide_future_cards) return false;
    if (card.box === 1) return false;
    return card.due_date > today;
  };

  const getCardVariant = (article: string | null | undefined) => {
    if (!article) return 'default' as const;
    const lower = article.toLowerCase();
    if (lower === 'der') return 'der' as const;
    if (lower === 'die') return 'die' as const;
    if (lower === 'das') return 'das' as const;
    return 'default' as const;
  };

  const filteredCards = cards.filter((card) => card.box === filterBox);
  const boxCounts = [1, 2, 3, 4, 5].map((box) => ({
    box,
    count: cards.filter((c) => c.box === box).length,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-6xl mx-auto p-4 text-gray-600">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Stats Summary */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>{t.cards.performanceReport}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">{stats.totalCards}</div>
                <div className="text-sm text-gray-600">{t.cards.totalWords}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <div className="text-3xl font-bold text-emerald-600">{stats.totalReviews}</div>
                <div className="text-sm text-gray-600">{t.cards.totalReviews}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                <div className="text-3xl font-bold text-amber-600">{stats.streak}</div>
                <div className="text-sm text-gray-600">{t.cards.streak}</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl font-bold text-purple-600">{stats.accuracy}%</div>
                <div className="text-sm text-gray-600">{t.cards.accuracy}</div>
              </div>
            </div>

            {/* Box Distribution */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">{t.cards.boxDistribution}</h3>
              <div className="flex gap-3">
                {boxCounts.map(({ box, count }) => {
                  const percentage = stats.totalCards > 0 ? (count / stats.totalCards) * 100 : 0;
                  const bgColors = [
                    'from-amber-100 to-amber-50',
                    'from-orange-100 to-orange-50',
                    'from-blue-100 to-blue-50',
                    'from-indigo-100 to-indigo-50',
                    'from-emerald-100 to-emerald-50',
                  ];
                  const fillColors = [
                    'from-amber-400 to-amber-300',
                    'from-orange-400 to-orange-300',
                    'from-blue-400 to-blue-300',
                    'from-indigo-400 to-indigo-300',
                    'from-emerald-400 to-emerald-300',
                  ];
                  const textColors = [
                    'text-amber-700',
                    'text-orange-700',
                    'text-blue-700',
                    'text-indigo-700',
                    'text-emerald-700',
                  ];
                  return (
                    <div key={box} className="flex-1 text-center">
                      <div className={`h-20 bg-gradient-to-br ${bgColors[box - 1]} rounded-xl relative overflow-hidden border border-gray-100`}>
                        <div
                          className={`absolute bottom-0 w-full bg-gradient-to-t ${fillColors[box - 1]} transition-all duration-500`}
                          style={{ height: `${Math.max(percentage, count > 0 ? 15 : 0)}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`font-bold text-lg ${textColors[box - 1]}`}>{count}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 font-medium">{t.common.box} {box}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Box Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {boxCounts.map(({ box, count }) => {
            const isActive = filterBox === box;
            return (
              <Button
                key={box}
                variant={isActive ? 'primary' : 'secondary'}
                size="md"
                onClick={() => setFilterBox(box)}
                className="min-w-[100px]"
              >
                {t.common.box} {box} ({count})
              </Button>
            );
          })}
        </div>

        {/* Cards grid */}
        {filteredCards.length === 0 ? (
          <Card padding="lg" className="text-center py-16">
            <CardContent>
              <div className="text-4xl mb-4">📭</div>
              <p className="text-gray-500">{t.cards.noCardsInBox} {filterBox}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => {
              const hidden = isCardHidden(card);
              const article = card.back_json.grammar.noun?.article;
              const cardVariant = getCardVariant(article);

              return (
                <Card
                  key={card.id}
                  variant={cardVariant}
                  padding="md"
                  className={hidden ? 'opacity-50' : ''}
                >
                  <CardContent className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        {hidden ? (
                          <span className="text-gray-400 text-lg">🔒 {t.cards.hidden}</span>
                        ) : (
                          <div className="flex items-center gap-2 flex-wrap">
                            {article && <ArticleBadge article={article} size="sm" />}
                            <span className="font-semibold text-lg text-gray-900">{card.term}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                        {t.common.box} {card.box}
                      </span>
                    </div>

                    {hidden ? (
                      <div className="text-sm text-gray-500 py-6 text-center">
                        <div>📅 {t.common.review}: {card.due_date}</div>
                        <div className="text-xs mt-1">{t.cards.hiddenForReview}</div>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm text-gray-600 space-y-1">
                          {card.back_json.meaning_fa.slice(0, 2).map((m, i) => (
                            <div key={i} className="truncate">• {m}</div>
                          ))}
                        </div>

                        {card.back_json.grammar.noun?.plural && (
                          <div className="text-xs text-gray-500">
                            {t.common.plural}: <span className="font-medium">{card.back_json.grammar.noun.plural}</span>
                          </div>
                        )}

                        <div className="text-xs text-gray-400">
                          {t.common.review}: {card.due_date}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex-1"
                            onClick={() => setEditingCard(card)}
                          >
                            {t.common.edit}
                          </Button>
                          <Button
                            variant="danger-soft"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDelete(card.id)}
                          >
                            {t.common.delete}
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {editingCard && (
          <EditCardDialog
            card={editingCard}
            open={!!editingCard}
            onOpenChange={(open) => !open && setEditingCard(null)}
            onSuccess={loadData}
          />
        )}
      </div>
    </div>
  );
}
