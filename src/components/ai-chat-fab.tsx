'use client';

import { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { AIChat } from './ai-chat';
import { LeitnerCard } from '@/types';

interface AIChatFABProps {
  onCardsCreated?: (cards: LeitnerCard[]) => void;
}

export function AIChatFAB({ onCardsCreated }: AIChatFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button - Mobile Only */}
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg lg:hidden z-50"
      >
        <MessageSquarePlus className="h-6 w-6" />
      </Button>

      {/* Dialog for Mobile */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-full max-h-[90vh] h-[90vh] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center justify-between">
              <span>AI Assistant</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="h-full overflow-hidden">
            <AIChat
              onCardsCreated={(cards) => {
                onCardsCreated?.(cards);
                // Don't close automatically - let user continue chat
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
