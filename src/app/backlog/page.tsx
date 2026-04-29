'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Nav } from '@/components/nav';
import { BacklogItem } from '@/types';
import { normalizeTerm, calculateAvailableNewCardSlots } from '@/lib/utils';
import { completeBacklogToCardAction, generatePersianCardBackAction } from '@/app/actions/ai-actions';
import { BatchGenerateDialog } from '@/components/batch-generate-dialog';
import { OCRUploadDialog } from '@/components/ocr-upload-dialog';
import { CSVImportDialog } from '@/components/csv-import-dialog';
import { ManualCardDialog } from '@/components/manual-card-dialog';
import { AILoadingModal } from '@/components/ai-loading-modal';
import { PersianCardPreviewDialog } from '@/components/persian-card-preview-dialog';
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
  const [showAILoading, setShowAILoading] = useState(false);
  const [manualItem, setManualItem] = useState<BacklogItem | null>(null);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(10);
  const [box1DueToday, setBox1DueToday] = useState(0);
  const [activeTab, setActiveTab] = useState<'german' | 'persian'>('german');
  const [persianSentence, setPersianSentence] = useState('');
  const [germanTranslation, setGermanTranslation] = useState('');
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
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
      .select('id, user_id, term, term_normalized, level, pos, topic, direction, metadata, created_at')
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

  const handleAddGermanToBacklog = async (e: React.FormEvent) => {
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
      .select('id, box')
      .eq('user_id', user.id)
      .eq('term_normalized', normalized)
      .maybeSingle();

    if (existingCard) {
      toast.error(`${t.backlog.alreadyInCards} (Box ${existingCard.box})`);
      return;
    }
    
    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term: newTerm.trim(),
      term_normalized: normalized,
      direction: 'de-fa',
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

  const handleAddPersianSentence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!persianSentence.trim()) return;

    // Show preview dialog
    setShowPreviewDialog(true);
  };

  const handleTranslateWithAI = async () => {
    if (!persianSentence.trim()) {
      toast.error('Please enter a Persian sentence first');
      return;
    }

    setIsTranslating(true);
    try {
      // Import the translation action dynamically to avoid circular dependencies
      const { translatePersianToGermanAction } = await import('@/app/actions/ai-actions');
      const result = await translatePersianToGermanAction(persianSentence);

      if (result.success) {
        setGermanTranslation(result.german);
        setShowPreviewDialog(true);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Translation error:', error);
      toast.error(t.backlog.translationError);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAddPersianToBacklog = async () => {
    if (!persianSentence.trim() || !germanTranslation.trim()) {
      toast.error(t.backlog.editBothSides);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error(t.errors.pleaseLogin);
      return;
    }

    const normalized = normalizeTerm(persianSentence);

    // Store Persian sentence with translation in metadata
    const metadata = {
      germanTranslation: germanTranslation.trim(),
    };

    const { error } = await supabase.from('backlog').insert({
      user_id: user.id,
      term: persianSentence.trim(),
      term_normalized: normalized,
      direction: 'fa-de',
      metadata: metadata,
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
      setPersianSentence('');
      setGermanTranslation('');
      setShowPreviewDialog(false);
      loadBacklog();
    }
  };


  const handleConvertToCard = async (item: BacklogItem) => {
    setConverting(item.id);

    // For Persian sentences, use AI to generate focused card back
    if (item.direction === 'fa-de') {
      setShowAILoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          toast.error(t.errors.pleaseLogin);
          setConverting(null);
          setShowAILoading(false);
          return;
        }

        // Check available slots
        const slotsData = await calculateAvailableNewCardSlots(supabase, user.id);
        if (slotsData.availableSlots <= 0) {
          toast.error('Daily limit reached. Review existing cards first.');
          setConverting(null);
          setShowAILoading(false);
          return;
        }

        // Generate rich card back with AI
        const result = await generatePersianCardBackAction(item.term);
        
        if (!result.success) {
          toast.error(result.error || 'Failed to generate card content');
          setConverting(null);
          setShowAILoading(false);
          return;
        }

        // Build minimalist card back
        const cardBack = {
          term: item.term,
          language: 'de' as const,
          level: result.level,
          pos: 'phrase' as const,
          ipa: null,
          meaning_fa: result.translations,
          meaning_en: [],
          examples: result.examples.map(ex => ({
            de: ex.de,
            fa: ex.fa,
            note: null,
          })),
          synonyms: [],
          antonyms: [],
          collocations: [],
          register_note: result.register,
          grammar: {},
          learning_tips: [],
        };

        const { error: cardError } = await supabase.from('cards').insert({
          user_id: user.id,
          term: item.term,
          term_normalized: item.term_normalized,
          level: result.level,
          pos: 'phrase',
          box: 1,
          due_date: new Date().toISOString().split('T')[0],
          back_json: cardBack,
          direction: 'fa-de',
        });

        if (cardError) {
          if (cardError.code === '23505') {
            toast.error('This card already exists');
          } else {
            toast.error('Error creating card');
            console.error('Error creating card:', cardError);
          }
          setConverting(null);
          setShowAILoading(false);
          return;
        }

        // Delete from backlog
        await supabase.from('backlog').delete().eq('id', item.id);
        
        setShowAILoading(false);
        toast.success(t.backlog.cardCreated);
        loadBacklog();
      } catch (error) {
        toast.error(t.backlog.cardError);
        console.error('Error converting Persian card:', error);
        setShowAILoading(false);
      } finally {
        setConverting(null);
      }
      return;
    }

    // For German words, use AI generation
    setShowAILoading(true);
    try {
      const result = await completeBacklogToCardAction(item.id, 'ai');

      setShowAILoading(false);

      if (result.success) {
        toast.success(t.backlog.cardCreated);
        loadBacklog();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setShowAILoading(false);
      toast.error(t.backlog.cardError);
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
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-border">
                <span className="text-xs text-text-muted">Due Today:</span>
                <span className="text-sm font-semibold text-warning">{box1DueToday}</span>
                <span className="text-xs text-text-muted">/</span>
                <span className="text-sm font-semibold text-accent">{dailyLimit}</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${availableSlots > 0 ? 'bg-success/10 border-success/30' : 'bg-warning/10 border-warning/30'}`}>
                <span className={`text-xs font-medium ${availableSlots > 0 ? 'text-success' : 'text-warning'}`}>
                  {availableSlots > 0 ? `✓ ${availableSlots} slots available` : '⚠ Limit reached'}
                </span>
              </div>
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

        {/* Tabs for German/Persian */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('german')}
            className={`px-6 py-3 text-sm font-medium transition-colors min-h-[44px] ${
              activeTab === 'german'
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {t.backlog.germanWords}
          </button>
          <button
            onClick={() => setActiveTab('persian')}
            className={`px-6 py-3 text-sm font-medium transition-colors min-h-[44px] ${
              activeTab === 'persian'
                ? 'text-accent border-b-2 border-accent'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {t.backlog.persianSentences}
          </button>
        </div>

        {/* German Words Form */}
        {activeTab === 'german' && (
          <Card padding="md">
            <form onSubmit={handleAddGermanToBacklog} className="flex gap-3">
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
                className="min-h-[44px]"
              >
                {t.common.add}
              </Button>
            </form>
          </Card>
        )}

        {/* Persian Sentences Form */}
        {activeTab === 'persian' && (
          <Card padding="md">
            <form onSubmit={handleAddPersianSentence} className="space-y-3">
              <textarea
                value={persianSentence}
                onChange={(e) => setPersianSentence(e.target.value)}
                placeholder={t.backlog.persianPlaceholder}
                className="w-full px-4 py-3 text-base bg-input border border-border rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                rows={3}
                dir="rtl"
              />
              <div className="flex gap-2 flex-wrap">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="min-h-[44px] flex-1 sm:flex-none"
                  disabled={!persianSentence.trim()}
                >
                  {t.backlog.addToBacklog}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  className="min-h-[44px] flex-1 sm:flex-none"
                  onClick={handleTranslateWithAI}
                  disabled={!persianSentence.trim() || isTranslating}
                >
                  {isTranslating ? t.backlog.translating : `🤖 ${t.backlog.translateWithAI}`}
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Info message */}
        {backlog.length > 0 && (
          <Card padding="md" className={availableSlots === 0 ? "border-warning/50 bg-warning/5" : "border-success/50 bg-success/5"}>
            <CardContent>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{availableSlots === 0 ? '⚠️' : '✨'}</span>
                <div className="flex-1">
                  {availableSlots === 0 ? (
                    <>
                      <div className="font-medium text-text">Daily capacity reached</div>
                      <div className="text-sm text-text-muted">
                        You can still add words to backlog. Review today's {box1DueToday} cards to free up slots for tomorrow.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="font-medium text-text">Ready to create cards!</div>
                      <div className="text-sm text-text-muted">
                        You can create {availableSlots} new cards today. They'll be ready for review tomorrow.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Backlog list */}
        {backlog.filter(item => 
          activeTab === 'german' ? item.direction === 'de-fa' : item.direction === 'fa-de'
        ).length === 0 ? (
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
            {backlog.filter(item => 
              activeTab === 'german' ? item.direction === 'de-fa' : item.direction === 'fa-de'
            ).map((item) => (
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
                    {item.direction === 'fa-de' ? (
                      // Persian sentence - simple create card button
                      <Button
                        variant="success"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleConvertToCard(item)}
                        disabled={converting === item.id || availableSlots === 0}
                        loading={converting === item.id}
                      >
                        ➕ Create Card
                      </Button>
                    ) : (
                      // German word - AI and Manual options
                      <>
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
                      </>
                    )}
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

        {/* AI Loading Modal */}
        <AILoadingModal open={showAILoading} estimatedTime={8} />

        {/* Persian Card Preview Dialog */}
        <PersianCardPreviewDialog
          open={showPreviewDialog}
          onOpenChange={setShowPreviewDialog}
          persianText={persianSentence}
          germanText={germanTranslation}
          onPersianChange={setPersianSentence}
          onGermanChange={setGermanTranslation}
          onAddToBacklog={handleAddPersianToBacklog}
        />
      </div>
    </div>
  );
}
