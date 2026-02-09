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
  const [selectedStartDate, setSelectedStartDate] = useState<string>('today');
  const [customDate, setCustomDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState<string | null>(null);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [showOCRDialog, setShowOCRDialog] = useState(false);
  const [showCSVDialog, setShowCSVDialog] = useState(false);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [manualItem, setManualItem] = useState<BacklogItem | null>(null);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(10);
  const [filterTab, setFilterTab] = useState<'ready' | 'scheduled' | 'all'>('all');
  const supabase = createClient();
  const { t } = useLanguage();

  const getStartDateValue = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (selectedStartDate) {
      case 'today':
        return today.toISOString().split('T')[0];
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
      case 'in3days':
        const in3days = new Date(today);
        in3days.setDate(in3days.getDate() + 3);
        return in3days.toISOString().split('T')[0];
      case 'in1week':
        const in1week = new Date(today);
        in1week.setDate(in1week.getDate() + 7);
        return in1week.toISOString().split('T')[0];
      case 'custom':
        return customDate || today.toISOString().split('T')[0];
      default:
        return today.toISOString().split('T')[0];
    }
  };

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
      .order('start_date', { ascending: true })
      .order('created_at', { ascending: false });

    setBacklog(data || []);
    
    // Load available slots
    const slotsData = await calculateAvailableNewCardSlots(supabase, user.id);
    setAvailableSlots(slotsData.availableSlots);
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

    const startDate = getStartDateValue();
    
    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term: newTerm.trim(),
      term_normalized: normalized,
      start_date: startDate,
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
      setSelectedStartDate('today');
      setCustomDate('');
      loadBacklog();
    }
  };

  const getDateBadge = (startDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (startDate === today) {
      return { text: t.backlog.today, color: 'bg-success/15 text-success' };
    } else if (startDate === tomorrowStr) {
      return { text: t.backlog.tomorrow, color: 'bg-warning/15 text-warning' };
    } else if (startDate < today) {
      return { text: t.backlog.readyToLearn, color: 'bg-success/15 text-success' };
    } else {
      return { text: new Date(startDate).toLocaleDateString(), color: 'bg-muted text-text-muted' };
    }
  };

  const filteredBacklog = backlog.filter(item => {
    const today = new Date().toISOString().split('T')[0];
    if (filterTab === 'ready') {
      return item.start_date <= today;
    } else if (filterTab === 'scheduled') {
      return item.start_date > today;
    }
    return true;
  });

  const readyCount = backlog.filter(item => item.start_date <= new Date().toISOString().split('T')[0]).length;
  const scheduledCount = backlog.filter(item => item.start_date > new Date().toISOString().split('T')[0]).length;

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
              {availableSlots > 0 ? (
                <span className="text-success font-medium">
                  {t.today.availableSlots}: {availableSlots} / {dailyLimit}
                </span>
              ) : (
                <span className="text-warning font-medium">
                  {t.today.dailyLimitReached}
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
          <form onSubmit={handleAddToBacklog} className="space-y-3">
            <div className="flex gap-3">
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
            </div>
            
            {/* Schedule buttons */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-text-muted self-center mr-2">{t.backlog.scheduleFor}:</span>
              <Button
                type="button"
                variant={selectedStartDate === 'today' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStartDate('today')}
              >
                {t.backlog.learnToday}
              </Button>
              <Button
                type="button"
                variant={selectedStartDate === 'tomorrow' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStartDate('tomorrow')}
              >
                {t.backlog.learnTomorrow}
              </Button>
              <Button
                type="button"
                variant={selectedStartDate === 'in3days' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStartDate('in3days')}
              >
                {t.backlog.in3Days}
              </Button>
              <Button
                type="button"
                variant={selectedStartDate === 'in1week' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedStartDate('in1week')}
              >
                {t.backlog.in1Week}
              </Button>
              <div className="flex gap-2 items-center">
                <Button
                  type="button"
                  variant={selectedStartDate === 'custom' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedStartDate('custom')}
                >
                  {t.backlog.customDate}
                </Button>
                {selectedStartDate === 'custom' && (
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="px-2 py-1 text-sm border rounded bg-surface text-text border-border"
                    min={new Date().toISOString().split('T')[0]}
                  />
                )}
              </div>
            </div>
          </form>
        </Card>

        {/* Warning message if no slots available */}
        {availableSlots === 0 && readyCount > 0 && (
          <Card padding="md" className="border-warning/50 bg-warning/5">
            <CardContent>
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <div className="font-medium text-text">{t.today.dailyLimitReached}</div>
                  <div className="text-sm text-text-muted">{t.today.reviewToFreeSlots}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter tabs */}
        {backlog.length > 0 && (
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filterTab === 'all'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {t.common.cards} ({backlog.length})
            </button>
            <button
              onClick={() => setFilterTab('ready')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filterTab === 'ready'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {t.backlog.readyToLearn} ({readyCount})
            </button>
            <button
              onClick={() => setFilterTab('scheduled')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                filterTab === 'scheduled'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {t.backlog.scheduled} ({scheduledCount})
            </button>
          </div>
        )}

        {/* Backlog list */}
        {filteredBacklog.length === 0 && backlog.length === 0 ? (
          <Card padding="lg" className="text-center py-16">
            <CardContent>
              <div className="text-4xl mb-4">📝</div>
              <p className="text-text-muted">
                {t.backlog.emptyBacklog}
              </p>
            </CardContent>
          </Card>
        ) : filteredBacklog.length === 0 ? (
          <Card padding="lg" className="text-center py-16">
            <CardContent>
              <div className="text-4xl mb-4">📝</div>
              <p className="text-text-muted">
                {filterTab === 'ready' ? 'No words ready to learn' : 'No scheduled words'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredBacklog.map((item) => {
              const badge = getDateBadge(item.start_date);
              const isReady = item.start_date <= new Date().toISOString().split('T')[0];
              
              return (
              <Card key={item.id} padding="md">
                <CardContent className="space-y-3">
                  {/* Term and date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-semibold text-lg text-text break-words">{item.term}</div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                          {badge.text}
                        </span>
                      </div>
                      <div className="text-sm text-text-muted">
                        {t.common.add}: {new Date(item.created_at).toLocaleDateString()}
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
                      disabled={converting === item.id || (availableSlots === 0 && isReady)}
                      loading={converting === item.id}
                    >
                      ✨ {t.backlog.aiComplete}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleManualCard(item)}
                      disabled={converting === item.id || (availableSlots === 0 && isReady)}
                    >
                      ✏️ {t.backlog.manual}
                    </Button>
                  </div>
                  
                  {!isReady && (
                    <div className="text-xs text-text-muted pt-2 border-t">
                      {t.backlog.scheduledForFuture}
                    </div>
                  )}
                </CardContent>
              </Card>
              );
            })}
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
