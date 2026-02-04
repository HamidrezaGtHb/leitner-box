'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { BacklogItem } from '@/types';
import { normalizeTerm } from '@/lib/utils';
import { completeBacklogToCardAction } from '@/app/actions/ai-actions';
import { BatchGenerateDialog } from '@/components/batch-generate-dialog';
import { OCRUploadDialog } from '@/components/ocr-upload-dialog';
import { CSVImportDialog } from '@/components/csv-import-dialog';
import toast from 'react-hot-toast';

export default function BacklogPage() {
  const [backlog, setBacklog] = useState<BacklogItem[]>([]);
  const [newTerm, setNewTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState<string | null>(null);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [showOCRDialog, setShowOCRDialog] = useState(false);
  const [showCSVDialog, setShowCSVDialog] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadBacklog();
  }, []);

  const loadBacklog = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('backlog')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setBacklog(data || []);
    setLoading(false);
  };

  const handleAddToBacklog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error('لطفاً وارد شوید');
      return;
    }

    const normalized = normalizeTerm(newTerm);

    // Check if already exists in cards or backlog
    const { data: existingCard } = await supabase
      .from('cards')
      .select('id')
      .eq('user_id', user.id)
      .eq('term_normalized', normalized)
      .single();

    if (existingCard) {
      toast.error('این کلمه قبلاً در کارت‌ها وجود دارد');
      return;
    }

    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term: newTerm.trim(),
      term_normalized: normalized,
    });

    if (error) {
      if (error.code === '23505') {
        toast.error('این کلمه قبلاً در Backlog وجود دارد');
      } else {
        toast.error('خطا در افزودن کلمه');
        console.error('Error adding to backlog:', error);
      }
    } else {
      toast.success('کلمه به Backlog اضافه شد');
      setNewTerm('');
      loadBacklog();
    }
  };

  const handleConvertToCard = async (item: BacklogItem, useAI: boolean) => {
    setConverting(item.id);

    const loadingToast = toast.loading(
      useAI ? 'در حال تولید محتوا با AI...' : 'در حال ایجاد کارت...'
    );

    try {
      const result = await completeBacklogToCardAction(
        item.id,
        useAI ? 'ai' : 'manual'
      );

      if (result.success) {
        toast.success('کارت با موفقیت ایجاد شد', { id: loadingToast });
        loadBacklog();
      } else {
        toast.error(result.error, { id: loadingToast });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('خطا در ایجاد کارت', { id: loadingToast });
    } finally {
      setConverting(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('backlog').delete().eq('id', id);
    toast.success('کلمه حذف شد');
    loadBacklog();
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="max-w-4xl mx-auto p-4">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h1 className="text-2xl font-bold">Backlog</h1>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowBatchDialog(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm whitespace-nowrap"
            >
              ✨ Batch Generate
            </button>
            <button
              onClick={() => setShowOCRDialog(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm whitespace-nowrap"
            >
              📸 OCR Import
            </button>
            <button
              onClick={() => setShowCSVDialog(true)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm whitespace-nowrap"
            >
              📄 CSV Import
            </button>
          </div>
        </div>

        {/* Add form */}
        <form onSubmit={handleAddToBacklog} className="flex gap-2">
          <input
            type="text"
            value={newTerm}
            onChange={(e) => setNewTerm(e.target.value)}
            placeholder="Add a German term (e.g., der Bahnhof)"
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium min-w-[80px]"
          >
            Add
          </button>
        </form>

        {/* Backlog list */}
        {backlog.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            No items in backlog. Add some terms above!
          </div>
        ) : (
          <div className="space-y-3">
            {backlog.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg p-4 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-lg truncate">{item.term}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => handleConvertToCard(item, true)}
                    disabled={converting === item.id}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 min-w-[90px]"
                  >
                    {converting === item.id ? '...' : 'AI Complete'}
                  </button>
                  <button
                    onClick={() => handleConvertToCard(item, false)}
                    disabled={converting === item.id}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[80px]"
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 min-w-[70px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Batch Generate Dialog */}
        <BatchGenerateDialog
          open={showBatchDialog}
          onOpenChange={setShowBatchDialog}
          onSuccess={loadBacklog}
        />

        {/* OCR Upload Dialog */}
        <OCRUploadDialog
          open={showOCRDialog}
          onOpenChange={setShowOCRDialog}
          onSuccess={loadBacklog}
        />

        {/* CSV Import Dialog */}
        <CSVImportDialog
          open={showCSVDialog}
          onOpenChange={setShowCSVDialog}
          onSuccess={loadBacklog}
        />
      </div>
    </div>
  );
}
