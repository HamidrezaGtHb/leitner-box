'use client';

import { useState } from 'react';
import { useLeitner } from '@/hooks/use-leitner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WordCard } from '@/components/word-card';
import { Search, BookOpen } from 'lucide-react';

export default function LibraryPage() {
  const { cards, deleteCard, isLoaded } = useLeitner();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Filter cards based on search query
  const filteredCards = cards.filter((card) => {
    const query = searchQuery.toLowerCase();
    return (
      card.wordData.word.toLowerCase().includes(query) ||
      card.wordData.meaning.toLowerCase().includes(query)
    );
  });

  // Separate by type
  const nouns = filteredCards.filter((c) => c.wordData.type === 'noun');
  const verbs = filteredCards.filter((c) => c.wordData.type === 'verb');
  const others = filteredCards.filter((c) => c.wordData.type === 'other');

  // Group by box
  const byBox = {
    1: filteredCards.filter((c) => c.box === 1),
    2: filteredCards.filter((c) => c.box === 2),
    3: filteredCards.filter((c) => c.box === 3),
    4: filteredCards.filter((c) => c.box === 4),
    5: filteredCards.filter((c) => c.box === 5),
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Word Library</h1>
        <p className="text-muted-foreground">Browse and manage your vocabulary</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {cards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-bold">No words yet</h2>
              <p className="text-muted-foreground">
                Start adding words from the Home page to build your library
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">
              All ({filteredCards.length})
            </TabsTrigger>
            <TabsTrigger value="nouns">
              Nouns ({nouns.length})
            </TabsTrigger>
            <TabsTrigger value="verbs">
              Verbs ({verbs.length})
            </TabsTrigger>
            <TabsTrigger value="others">
              Others ({others.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <div key={card.id} className="relative">
                    <WordCard
                      wordData={card.wordData}
                      onDelete={() => deleteCard(card.id)}
                      showDelete
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      Box {card.box}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No words found matching "{searchQuery}"
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="nouns" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nouns.length > 0 ? (
                nouns.map((card) => (
                  <div key={card.id} className="relative">
                    <WordCard
                      wordData={card.wordData}
                      onDelete={() => deleteCard(card.id)}
                      showDelete
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      Box {card.box}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No nouns found
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="verbs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verbs.length > 0 ? (
                verbs.map((card) => (
                  <div key={card.id} className="relative">
                    <WordCard
                      wordData={card.wordData}
                      onDelete={() => deleteCard(card.id)}
                      showDelete
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      Box {card.box}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No verbs found
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="others" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.length > 0 ? (
                others.map((card) => (
                  <div key={card.id} className="relative">
                    <WordCard
                      wordData={card.wordData}
                      onDelete={() => deleteCard(card.id)}
                      showDelete
                    />
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      Box {card.box}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No other words found
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
