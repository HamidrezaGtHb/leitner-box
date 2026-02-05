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
import { Button, Card, CardContent, Input } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
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
  const { t } = useLanguage();

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
      toast.error(t.errors.pleaseLogin);
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
      toast.error(t.backlog.alreadyInCards);
      return;
    }

    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term: newTerm.trim(),
      term_normalized: normalized,
    });

    if (error) {
      if (error.code === '23505') {
        toast.error(t.backlog.alreadyInBacklog);
      } else {
        toast.error(t.backlog.addError);
        console.error('Error adding to backlog:', error);
      }
    } else {
      toast.success(t.backlog.addedToBacklog);
      setNewTerm('');
      loadBacklog();
    }
  };

  const handleConvertToCard = async (item: BacklogItem, useAI: boolean) => {
    setConverting(item.id);

    const loadingToast = toast.loading(
      useAI ? t.backlog.generatingAI : t.backlog.creatingCard
    );

    try {
      const result = await completeBacklogToCardAction(
        item.id,
        useAI ? 'ai' : 'manual'
      );

      if (result.success) {
        toast.success(t.backlog.cardCreated, { id: loadingToast });
        loadBacklog();
      } else {
        toast.error(result.error, { id: loadingToast });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t.backlog.cardError, { id: loadingToast });
    } finally {
      setConverting(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('backlog').delete().eq('id', id);
    toast.success(t.backlog.wordDeleted);
    loadBacklog();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <div className="max-w-4xl mx-auto p-4 text-gray-600">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-900">{t.backlog.title}</h1>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowBatchDialog(true)}
            >
              ✨ {t.backlog.batchGenerate}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowOCRDialog(true)}
            >
              📸 {t.backlog.ocrImport}
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={() => setShowCSVDialog(true)}
            >
              📄 {t.backlog.csvImport}
            </Button>
          </div>
        </div>

        {/* Add form */}
        <Card padding="md">
          <form onSubmit={handleAddToBacklog} className="flex gap-3">
            <div className="flex-1">
              <Input
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                placeholder={t.backlog.inputPlaceholder}
                inputSize="md"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
            >
              {t.common.add}
            </Button>
          </form>
        </Card>

        {/* Backlog list */}
        {backlog.length === 0 ? (
          <Card padding="lg" className="text-center py-16">
            <CardContent>
              <div className="text-4xl mb-4">📝</div>
              <p className="text-gray-600">
                {t.backlog.emptyBacklog}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {backlog.map((item) => (
              <Card key={item.id} padding="md">
                <CardContent className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-lg text-gray-900 truncate">{item.term}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleConvertToCard(item, true)}
                      disabled={converting === item.id}
                      loading={converting === item.id}
                    >
                      {t.backlog.aiComplete}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleConvertToCard(item, false)}
                      disabled={converting === item.id}
                    >
                      {t.backlog.manual}
                    </Button>
                    <Button
                      variant="danger-soft"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      {t.common.delete}
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
