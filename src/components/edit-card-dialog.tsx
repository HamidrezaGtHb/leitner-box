'use client';

import { useState } from 'react';
import { Card, CardBackJSON } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';

interface EditCardDialogProps {
  card: Card;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCardDialog({
  card,
  onSuccess,
  open,
  onOpenChange,
}: EditCardDialogProps) {
  const [meanings, setMeanings] = useState(card.back_json.meaning_fa.join('\n'));
  const [examples, setExamples] = useState(
    card.back_json.examples.map((ex) => `${ex.de}|${ex.fa}`).join('\n')
  );
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const { t } = useLanguage();

  const handleSave = async () => {
    setSaving(true);

    try {
      // Parse meanings
      const meaningsList = meanings
        .split('\n')
        .map((m) => m.trim())
        .filter((m) => m);

      // Parse examples
      const examplesList = examples
        .split('\n')
        .map((line) => {
          const [de, fa] = line.split('|').map((s) => s.trim());
          return de && fa ? { de, fa, note: null } : null;
        })
        .filter((ex) => ex !== null);

      // Update back_json
      const updatedBackJson: CardBackJSON = {
        ...card.back_json,
        meaning_fa: meaningsList,
        examples: examplesList as any[],
      };

      const { error } = await supabase
        .from('cards')
        .update({ back_json: updatedBackJson })
        .eq('id', card.id);

      if (error) {
        toast.error(t.dialogs.saveError);
        console.error(error);
      } else {
        toast.success(t.dialogs.saveSuccess);
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(t.dialogs.saveError);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto z-50">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {t.dialogs.editCard}: {card.term}
          </Dialog.Title>

          <div className="space-y-4">
            {/* Meanings */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t.dialogs.meaningsLabel}
              </label>
              <textarea
                value={meanings}
                onChange={(e) => setMeanings(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={t.dialogs.meaningPlaceholder}
              />
            </div>

            {/* Examples */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {t.dialogs.examplesLabel}
              </label>
              <textarea
                value={examples}
                onChange={(e) => setExamples(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Ich gehe zur Schule|I go to school"
              />
              <p className="text-xs text-gray-500 mt-1">
                {t.dialogs.examplesHint}
              </p>
            </div>

            {/* Grammar info (read-only for simplicity) */}
            {card.back_json.grammar.noun && (
              <div className="p-3 bg-gray-50 rounded text-sm">
                <strong>{t.dialogs.grammar}:</strong> {card.back_json.grammar.noun.article}
                {card.back_json.grammar.noun.plural &&
                  `, Plural: ${card.back_json.grammar.noun.plural}`}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <button className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                {t.common.cancel}
              </button>
            </Dialog.Close>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? t.dialogs.saving : t.dialogs.saveChanges}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
