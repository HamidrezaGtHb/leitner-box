'use client';

import { useState } from 'react';
import { BacklogItem, CardBackJSON } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Textarea } from '@/components/ui';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';

interface ManualCardDialogProps {
  item: BacklogItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ManualCardDialog({
  item,
  open,
  onOpenChange,
  onSuccess,
}: ManualCardDialogProps) {
  const [meanings, setMeanings] = useState('');
  const [article, setArticle] = useState<'der' | 'die' | 'das' | ''>('');
  const [plural, setPlural] = useState('');
  const [examples, setExamples] = useState('');
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleSave = async () => {
    if (!item) return;

    const meaningsList = meanings
      .split('\n')
      .map((m) => m.trim())
      .filter((m) => m);

    if (meaningsList.length === 0) {
      toast.error('لطفاً حداقل یک معنی وارد کنید');
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('لطفاً ابتدا وارد شوید');
        return;
      }

      // Parse examples
      const examplesList = examples
        .split('\n')
        .map((line) => {
          const [de, fa] = line.split('|').map((s) => s.trim());
          return de && fa ? { de, fa, note: null } : null;
        })
        .filter((ex) => ex !== null);

      // Build card back JSON
      const cardBack: CardBackJSON = {
        term: item.term,
        language: 'de' as const,
        level: item.level || 'B1',
        pos: (item.pos || 'noun') as any,
        ipa: null,
        meaning_fa: meaningsList,
        meaning_en: [],
        examples: examplesList as any[],
        synonyms: [],
        antonyms: [],
        collocations: [],
        register_note: null,
        grammar: article ? {
          noun: {
            article: article,
            plural: plural || null,
          }
        } : {},
        learning_tips: [],
      };

      // Insert card
      const { error: insertError } = await supabase.from('cards').insert({
        user_id: user.id,
        term: item.term,
        term_normalized: item.term_normalized,
        level: item.level,
        pos: item.pos || 'noun',
        box: 1,
        due_date: new Date().toISOString().split('T')[0],
        back_json: cardBack,
      });

      if (insertError) {
        toast.error('خطا در ایجاد کارت');
        console.error(insertError);
        return;
      }

      // Remove from backlog
      await supabase.from('backlog').delete().eq('id', item.id);

      toast.success('کارت ایجاد شد');

      // Reset form
      setMeanings('');
      setArticle('');
      setPlural('');
      setExamples('');

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('خطا در ایجاد کارت');
    } finally {
      setSaving(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface border rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto z-50 shadow-xl">
          <Dialog.Title className="text-xl font-bold text-text mb-1">
            ورود دستی
          </Dialog.Title>
          <div className="text-2xl font-bold text-accent mb-6">{item.term}</div>

          <div className="space-y-4">
            {/* Article (for nouns) */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                حرف تعریف (برای اسم)
              </label>
              <div className="flex gap-2">
                {(['der', 'die', 'das'] as const).map((art) => (
                  <Button
                    key={art}
                    variant={article === art ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setArticle(article === art ? '' : art)}
                  >
                    {art}
                  </Button>
                ))}
              </div>
            </div>

            {/* Plural */}
            {article && (
              <Input
                label="جمع"
                value={plural}
                onChange={(e) => setPlural(e.target.value)}
                placeholder="die Bücher"
                inputSize="md"
              />
            )}

            {/* Meanings */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                معانی *
              </label>
              <Textarea
                value={meanings}
                onChange={(e) => setMeanings(e.target.value)}
                rows={4}
                placeholder={'معنی اول\nمعنی دوم'}
                dir="rtl"
                inputSize="md"
              />
              <p className="text-xs text-text-muted mt-1">
                هر معنی در یک خط
              </p>
            </div>

            {/* Examples */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                مثال‌ها
              </label>
              <Textarea
                value={examples}
                onChange={(e) => setExamples(e.target.value)}
                rows={3}
                placeholder="Ich gehe zur Schule|من به مدرسه می‌روم"
                inputSize="md"
                className="font-mono text-sm"
              />
              <p className="text-xs text-text-muted mt-1">
                فرمت: آلمانی|فارسی (هر مثال در یک خط)
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <Button variant="secondary" size="md" className="flex-1">
                انصراف
              </Button>
            </Dialog.Close>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleSave}
              loading={saving}
            >
              ایجاد کارت
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
