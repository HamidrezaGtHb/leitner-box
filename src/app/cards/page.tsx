'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { Card, Settings } from '@/types';
import { EditCardDialog } from '@/components/edit-card-dialog';
import { formatDate } from '@/lib/utils';
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
  const [cards, setCards] = useState<Card[]>([]);
  const [filterBox, setFilterBox] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const supabase = createClient();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Load settings
    const { data: settingsData } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    setSettings(settingsData || DEFAULT_SETTINGS);

    // Load cards
    const { data } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setCards(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('حذف این کارت؟')) return;

    const deleteToast = toast.loading('در حال حذف...');

    const { error } = await supabase.from('cards').delete().eq('id', id);

    if (error) {
      toast.error('خطا در حذف کارت', { id: deleteToast });
    } else {
      toast.success('کارت حذف شد', { id: deleteToast });
      loadData();
    }
  };

  const today = formatDate(new Date());

  // Check if a card should be hidden (Box 2+ and not due yet)
  const isCardHidden = (card: Card): boolean => {
    if (!settings.hide_future_cards) return false;
    if (card.box === 1) return false;
    return card.due_date > today;
  };

  const filteredCards = cards.filter((card) => {
    if (filterBox !== 'all' && card.box !== filterBox) return false;
    if (searchQuery && !card.term.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    return true;
  });

  // Count hidden cards
  const hiddenCount = filteredCards.filter(isCardHidden).length;

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-6xl mx-auto p-4">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">همه کارت‌ها ({cards.length})</h1>

        {/* Hidden cards warning */}
        {settings.hide_future_cards && hiddenCount > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <div className="font-medium text-yellow-800">
                {hiddenCount} کارت مخفی شده
              </div>
              <div className="text-sm text-yellow-700">
                کارت‌های باکس ۲ به بعد تا روز مرورشان مخفی هستند (جلوگیری از تقلب)
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی کلمات..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setFilterBox('all')}
              className={`px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap min-w-[60px] ${
                filterBox === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              همه
            </button>
            {[1, 2, 3, 4, 5].map((box) => (
              <button
                key={box}
                onClick={() => setFilterBox(box)}
                className={`px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap min-w-[70px] ${
                  filterBox === box
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                باکس {box}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            {searchQuery
              ? 'کارتی با این جستجو پیدا نشد'
              : filterBox !== 'all'
              ? `کارتی در باکس ${filterBox} نیست`
              : 'هنوز کارتی نداری. از Backlog اضافه کن!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCards.map((card) => {
              const hidden = isCardHidden(card);

              return (
                <div
                  key={card.id}
                  className={`bg-white border rounded-lg p-4 space-y-3 transition-shadow ${
                    hidden ? 'opacity-60' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-semibold text-lg flex-1 min-w-0 pr-2">
                      {hidden ? (
                        <span className="text-gray-400">🔒 مخفی</span>
                      ) : (
                        card.term
                      )}
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded whitespace-nowrap">
                      باکس {card.box}
                    </div>
                  </div>

                  {hidden ? (
                    <div className="text-sm text-gray-500 py-4 text-center">
                      <div>📅 مرور: {card.due_date}</div>
                      <div className="text-xs mt-1">
                        برای جلوگیری از تقلب مخفی شده
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600 space-y-1" dir="rtl">
                        {card.back_json.meaning_fa.slice(0, 2).map((m, i) => (
                          <div key={i}>• {m}</div>
                        ))}
                      </div>

                      {card.back_json.grammar.noun && (
                        <div className="text-xs text-gray-500">
                          {card.back_json.grammar.noun.article}
                          {card.back_json.grammar.noun.plural &&
                            `, Pl: ${card.back_json.grammar.noun.plural}`}
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        مرور: {card.due_date}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingCard(card)}
                          className="flex-1 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-medium"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => handleDelete(card.id)}
                          className="flex-1 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
                        >
                          حذف
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Edit Dialog */}
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
