'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { BacklogItem } from '@/types';
import { normalizeTerm, calculateAvailableNewCardSlots } from '@/lib/utils';
import { completeBacklogToCardAction } from '@/app/actions/ai-actions';
import { BatchGenerateDialog } from '@/components/batch-generate-dialog';
import { OCRUploadDialog } from '@/components/ocr-upload-dialog';
import { CSVImportDialog } from '@/components/csv-import-dialog';
import { ManualCardDialog } from '@/components/manual-card-dialog';
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
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [manualItem, setManualItem] = useState<BacklogItem | null>(null);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(10);
  const [box1DueToday, setBox1DueToday] = useState(0);
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
    
    // Load available slots using pure Leitner logic
    const slotsData = await calculateAvailableNewCardSlots(supabase, user.id);
    setAvailableSlots(slotsData.availableSlots);
    setBox1DueToday(slotsData.box1DueToday);
    setDailyLimit(slotsData.dailyLimit);
    
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

  const handleConvertToCard = async (item: BacklogItem) => {
    setConverting(item.id);

    const loadingToast = toast.loading(t.backlog.generatingAI);

    try {
      const result = await completeBacklogToCardAction(item.id, 'ai');

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

  const handleManualCard = (item: BacklogItem) => {
    setManualItem(item);
    setShowManualDialog(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('backlog').delete().eq('id', id);
    toast.success(t.backlog.wordDeleted);
    loadBacklog();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg">
        <Nav />
        <div className="max-w-4xl mx-auto p-4 text-text-muted">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-text">{t.backlog.title}</h1>
            <div className="text-sm text-text-muted mt-1">
              <span className="text-text-muted">Box 1: {box1DueToday} / {dailyLimit}</span>
              {' • '}
              {availableSlots > 0 ? (
                <span className="text-success font-medium">
                  {availableSlots} slots available
                </span>
              ) : (
                <span className="text-warning font-medium">
                  Daily limit reached
                </span>
              )}
            </div>
          </div>
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

        {/* Info message */}
        {availableSlots === 0 && backlog.length > 0 && (
          <Card padding="md" className="border-info/50 bg-info/5">
            <CardContent>
              <div className="flex items-center gap-3">
                <span className="text-2xl">ℹ️</span>
                <div>
                  <div className="font-medium text-text">Daily limit reached</div>
                  <div className="text-sm text-text-muted">
                    You can still add words to backlog. After tomorrow's review, more slots will be available.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Backlog list */}
        {backlog.length === 0 ? (
          <Card padding="lg" className="text-center py-16">
            <CardContent>
              <div className="text-4xl mb-4">📝</div>
              <p className="text-text-muted">
                {t.backlog.emptyBacklog}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {backlog.map((item) => (
              <Card key={item.id} padding="md">
                <CardContent className="space-y-3">
                  {/* Term and date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-lg text-text break-words">{item.term}</div>
                      <div className="text-sm text-text-muted">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {/* Delete button - always visible */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-text-muted hover:text-danger shrink-0"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Action buttons - stack on mobile */}
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleConvertToCard(item)}
                      disabled={converting === item.id || availableSlots === 0}
                      loading={converting === item.id}
                    >
                      ✨ {t.backlog.aiComplete}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleManualCard(item)}
                      disabled={converting === item.id || availableSlots === 0}
                    >
                      ✏️ {t.backlog.manual}
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

        {/* Manual Card Dialog */}
        <ManualCardDialog
          item={manualItem}
          open={showManualDialog}
          onOpenChange={setShowManualDialog}
          onSuccess={loadBacklog}
        />
      </div>
    </div>
  );
}
