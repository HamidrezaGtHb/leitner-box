'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useLanguage } from '@/lib/i18n';

interface AILoadingModalProps {
  open: boolean;
  estimatedTime?: number;
}

export function AILoadingModal({ open, estimatedTime = 8 }: AILoadingModalProps) {
  const { t } = useLanguage();
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl max-w-md w-[90vw]">
            {/* Spinner */}
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-accent/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-text text-center mb-2">
              {t.backlog.generatingAI}{dots}
            </h3>

            {/* Description */}
            <p className="text-sm text-text-muted text-center mb-4">
              AI is creating high-quality flashcard content with meanings, examples, and grammar information.
            </p>

            {/* Estimated Time */}
            <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Estimated time: {estimatedTime} seconds</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 w-full bg-surface-2 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full animate-pulse"
                style={{
                  width: '70%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
            </div>

            {/* Tips */}
            <p className="mt-6 text-xs text-center text-text-muted italic">
              💡 Tip: The AI generates authentic German content based on your term's level and part of speech
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
