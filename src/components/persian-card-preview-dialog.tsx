'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

interface PersianCardPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  persianText: string;
  germanText: string;
  onPersianChange: (text: string) => void;
  onGermanChange: (text: string) => void;
  onAddToBacklog: () => void;
}

export function PersianCardPreviewDialog({
  open,
  onOpenChange,
  persianText,
  germanText,
  onPersianChange,
  onGermanChange,
  onAddToBacklog,
}: PersianCardPreviewDialogProps) {
  const { t } = useLanguage();
  const [localPersian, setLocalPersian] = useState(persianText);
  const [localGerman, setLocalGerman] = useState(germanText);

  useEffect(() => {
    setLocalPersian(persianText);
    setLocalGerman(germanText);
  }, [persianText, germanText, open]);

  if (!open) return null;

  const handleAddToBacklog = () => {
    onPersianChange(localPersian);
    onGermanChange(localGerman);
    onAddToBacklog();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card 
        padding="none" 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-xl font-semibold text-text">
              {t.backlog.previewCard}
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="text-text-muted hover:text-text transition-colors p-2"
            >
              ✕
            </button>
          </div>

          {/* Front (Persian) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text">
              {t.backlog.frontPersian}
            </label>
            <textarea
              value={localPersian}
              onChange={(e) => setLocalPersian(e.target.value)}
              className="w-full px-4 py-3 text-base bg-input border border-border rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none min-h-[100px]"
              rows={4}
              dir="rtl"
            />
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center">
            <div className="text-2xl text-text-muted">↓</div>
          </div>

          {/* Back (German) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text">
              {t.backlog.backGerman}
            </label>
            <textarea
              value={localGerman}
              onChange={(e) => setLocalGerman(e.target.value)}
              className="w-full px-4 py-3 text-base bg-input border border-border rounded-lg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none min-h-[100px]"
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="secondary"
              size="md"
              className="flex-1 min-h-[44px]"
              onClick={() => onOpenChange(false)}
            >
              {t.common.cancel}
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 min-h-[44px]"
              onClick={handleAddToBacklog}
              disabled={!localPersian.trim() || !localGerman.trim()}
            >
              ➕ {t.backlog.addToBacklog}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
