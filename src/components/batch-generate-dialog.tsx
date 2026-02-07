'use client';

import { useState } from 'react';
import { Level, POS } from '@/types';
import {
  batchGenerateTermsAction,
  addTermToBacklogAction,
} from '@/app/actions/ai-actions';
import { useLanguage } from '@/lib/i18n';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';

interface BatchGenerateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BatchGenerateDialog({
  open,
  onOpenChange,
  onSuccess,
}: BatchGenerateDialogProps) {
  const [level, setLevel] = useState<Level>('B1');
  const [pos, setPos] = useState<POS>('noun');
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const { t } = useLanguage();

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress({ current: 0, total: count });

    const loadingToast = toast.loading(t.dialogs.generatingWords);

    try {
      const result = await batchGenerateTermsAction(
        level,
        pos,
        topic || undefined,
        count
      );

      if (!result.success) {
        toast.error(result.error, { id: loadingToast });
        return;
      }

      // Add all generated terms to backlog
      let addedCount = 0;
      for (const term of result.data) {
        const addResult = await addTermToBacklogAction(
          term.term,
          term.term_normalized,
          term.level,
          term.pos,
          term.topic || undefined
        );

        if (addResult.success) {
          addedCount++;
          setProgress({ current: addedCount, total: result.data.length });
        }
      }

      toast.success(`${addedCount} ${t.dialogs.wordsAddedToBacklog}`, {
        id: loadingToast,
      });
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(t.dialogs.errorGenerating, { id: loadingToast });
    } finally {
      setGenerating(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Batch Generate Terms
          </Dialog.Title>

          <div className="space-y-4">
            {/* Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                CEFR Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as Level)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={generating}
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </div>

            {/* Part of Speech */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Part of Speech
              </label>
              <select
                value={pos}
                onChange={(e) => setPos(e.target.value as POS)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={generating}
              >
                <option value="noun">Nomen (Noun)</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjektiv (Adjective)</option>
                <option value="adverb">Adverb</option>
                <option value="nomen-verb">Nomen-Verb Verbindung</option>
                <option value="idiom">Redewendung (Idiom)</option>
                <option value="phrase">Phrase / Ausdruck</option>
                <option value="other">Sonstige (Other)</option>
              </select>
            </div>

            {/* Topic (optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Topic (optional)
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., travel, food, business"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={generating}
              />
            </div>

            {/* Count */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Terms (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={generating}
              />
            </div>

            {/* Progress */}
            {generating && progress.total > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress</span>
                  <span>
                    {progress.current} / {progress.total}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{
                      width: `${(progress.current / progress.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <button
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={generating}
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
