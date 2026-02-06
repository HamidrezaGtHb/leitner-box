'use client';

import { useState } from 'react';
import { BacklogItem, CardBackJSON } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { Button, Input, Textarea } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';
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
  const { t } = useLanguage();

  const handleSave = async () => {
    if (!item) return;

    const meaningsList = meanings
      .split('\n')
      .map((m) => m.trim())
      .filter((m) => m);

    if (meaningsList.length === 0) {
      toast.error(t.errors.pleaseLogin);
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error(t.errors.pleaseLogin);
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
        toast.error(t.dialogs.cardCreateError);
        console.error(insertError);
        return;
      }

      // Remove from backlog
      await supabase.from('backlog').delete().eq('id', item.id);

      toast.success(t.dialogs.cardCreated);

      // Reset form
      setMeanings('');
      setArticle('');
      setPlural('');
      setExamples('');

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(t.dialogs.cardCreateError);
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
            {t.backlog.manual}
          </Dialog.Title>
          <div className="text-2xl font-bold text-accent mb-6">{item.term}</div>

          <div className="space-y-4">
            {/* Article (for nouns) */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                {t.dialogs.articleForNoun}
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
                label={t.common.plural}
                value={plural}
                onChange={(e) => setPlural(e.target.value)}
                placeholder="die Bücher"
                inputSize="md"
              />
            )}

            {/* Meanings */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                {t.today.meanings} *
              </label>
              <Textarea
                value={meanings}
                onChange={(e) => setMeanings(e.target.value)}
                rows={4}
                placeholder={t.dialogs.meaningPlaceholder}
                inputSize="md"
              />
            </div>

            {/* Examples */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                {t.today.examples}
              </label>
              <Textarea
                value={examples}
                onChange={(e) => setExamples(e.target.value)}
                rows={3}
                placeholder="Ich gehe zur Schule | I go to school"
                inputSize="md"
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <Button variant="secondary" size="md" className="flex-1">
                {t.common.cancel}
              </Button>
            </Dialog.Close>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={handleSave}
              loading={saving}
            >
              {t.dialogs.createCard}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
