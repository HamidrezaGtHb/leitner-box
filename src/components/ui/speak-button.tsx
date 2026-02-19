'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SpeakButtonProps {
  text: string;
  lang?: 'de-DE' | 'en-US' | 'fa-IR';
  className?: string;
  size?: 'sm' | 'md';
}

export function SpeakButton({ text, lang = 'de-DE', className, size = 'sm' }: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isSupported || !text) return;

    // If already speaking, stop it
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9; // Slightly slower for better clarity
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed to speak:', err);
      setIsSpeaking(false);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={handleSpeak}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all',
        'text-text-muted hover:text-text hover:bg-muted/50',
        isSpeaking && 'text-accent bg-accent/10',
        size === 'sm' ? 'p-1.5' : 'p-2',
        className
      )}
      title={isSpeaking ? 'Stop' : 'Listen'}
    >
      {isSpeaking ? (
        // Pause/Stop icon (minimal)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size === 'sm' ? 16 : 20}
          height={size === 'sm' ? 16 : 20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        // Volume/Speaker icon (minimal, Tailwind-like)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size === 'sm' ? 16 : 20}
          height={size === 'sm' ? 16 : 20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
