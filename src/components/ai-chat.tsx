'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Paperclip, X, Bot, User, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { WordData } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cards?: WordData[];
  duplicates?: string[];
  imageUrl?: string;
  timestamp: number;
}

interface AIChatProps {
  onCardsCreated?: (cards: WordData[]) => void;
  className?: string;
}

export function AIChat({ onCardsCreated, className }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    setError('');
    setLoading(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      imageUrl: imagePreview || undefined,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      // Send to API
      const formData = new FormData();
      formData.append('message', input);
      if (image) {
        formData.append('image', image);
      }
      if (user?.id) {
        formData.append('userId', user.id);
      }

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        cards: data.cards || [],
        duplicates: data.duplicates || [],
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Notify parent
      if (data.cards && data.cards.length > 0 && onCardsCreated) {
        onCardsCreated(data.cards);
      }

      removeImage();
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      // Remove user message on error
      setMessages((prev) => prev.slice(0, -1));
      setInput(userMessage.content); // Restore input
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 space-y-4">
              <Bot className="h-12 w-12 mx-auto opacity-50" />
              <div>
                <p className="font-medium">How can I help you learn German today?</p>
                <p className="text-sm">Try:</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>"Generate 10 B2 words about travel"</li>
                  <li>"Add the word 'der Bahnhof'"</li>
                  <li>Upload an image with German text</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`flex flex-col gap-2 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.imageUrl && (
                        <div className="mt-2 rounded overflow-hidden">
                          <img src={message.imageUrl} alt="Uploaded" className="max-w-full h-auto max-h-48" />
                        </div>
                      )}
                    </div>
                    {message.cards && message.cards.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.cards.map((card, idx) => (
                          <Badge key={idx} variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {card.word}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {message.duplicates && message.duplicates.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.duplicates.map((word, idx) => (
                          <Badge key={idx} variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {word} (duplicate)
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full space-y-2">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-2 rounded-lg">
              {error}
            </div>
          )}
          {imagePreview && (
            <div className="relative inline-block">
              <img src={imagePreview} alt="Preview" className="h-20 rounded border" />
              <Button
                type="button"
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Ask me to generate words, add a word, or upload an image..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || (!input.trim() && !image)}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
