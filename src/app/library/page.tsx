'use client';

import { useState } from 'react';
import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WordCard } from '@/components/word-card';
import { Search, BookOpen, Lock, Unlock, Clock } from 'lucide-react';
import { canViewLibrary, getEnhancedLockedModeState } from '@/lib/locked-mode';
import { Badge } from '@/components/ui/badge';
import { CountdownFromMillis } from '@/components/countdown-timer';

export default function LibraryPage() {
  const { cards, deleteCard, isLoaded } = useLeitner();
  const { settings } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnlockWarning, setShowUnlockWarning] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // Locked Mode: Block or blur library
  const canView = canViewLibrary(settings.isLockedMode);

  if (!canView && !showUnlockWarning) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center space-y-6">
            <Lock className="h-16 w-16 mx-auto text-yellow-500" />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Library Locked</h2>
              <p className="text-muted-foreground">
                Library browsing is disabled in Locked Mode to maintain focus on due reviews.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => setShowUnlockWarning(true)}
              >
                <Unlock className="h-4 w-4 mr-2" />
                Temporarily Unlock
              </Button>
            </div>
          </CardContent>
        </Card>
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
    1: filteredCards.filter((c) => c.boxIndex === 1),
    2: filteredCards.filter((c) => c.boxIndex === 2),
    3: filteredCards.filter((c) => c.boxIndex === 3),
    4: filteredCards.filter((c) => c.boxIndex === 4),
    5: filteredCards.filter((c) => c.boxIndex === 5),
  };

  // Get enhanced locked mode state for per-box info
  const lockedState = getEnhancedLockedModeState(cards, settings.isLockedMode);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Word Library</h1>
          <p className="text-muted-foreground">Browse and manage your vocabulary</p>
        </div>
        {settings.isLockedMode && showUnlockWarning && (
          <div className="flex items-center gap-2 text-yellow-600">
            <Lock className="h-5 w-5" />
            <span className="text-sm">Temporarily Unlocked</span>
          </div>
        )}
      </div>

      {/* Unlock Warning Banner */}
      {settings.isLockedMode && showUnlockWarning && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="py-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Library is temporarily unlocked. Card backs are visible. Return to Settings to re-enable Locked Mode for focused study.
            </p>
          </CardContent>
        </Card>
      )}

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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({filteredCards.length})</TabsTrigger>
            <TabsTrigger value="nouns">Nouns ({nouns.length})</TabsTrigger>
            <TabsTrigger value="verbs">Verbs ({verbs.length})</TabsTrigger>
            <TabsTrigger value="others">Other ({others.length})</TabsTrigger>
            <TabsTrigger value="boxes">By Box</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map((card) => (
                <WordCard
                  key={card.id}
                  wordData={card.wordData}
                  onDelete={() => deleteCard(card.id)}
                  blurBack={settings.isLockedMode && !showUnlockWarning}
                  showDelete={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nouns" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nouns.map((card) => (
                <WordCard
                  key={card.id}
                  wordData={card.wordData}
                  onDelete={() => deleteCard(card.id)}
                  blurBack={settings.isLockedMode && !showUnlockWarning}
                  showDelete={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="verbs" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verbs.map((card) => (
                <WordCard
                  key={card.id}
                  wordData={card.wordData}
                  onDelete={() => deleteCard(card.id)}
                  blurBack={settings.isLockedMode && !showUnlockWarning}
                  showDelete={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="others" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((card) => (
                <WordCard
                  key={card.id}
                  wordData={card.wordData}
                  onDelete={() => deleteCard(card.id)}
                  blurBack={settings.isLockedMode && !showUnlockWarning}
                  showDelete={true}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="boxes" className="space-y-6 mt-6">
            {([1, 2, 3, 4, 5] as const).map((boxNum) => {
              const boxState = lockedState.boxStates[boxNum];
              const isBoxAccessible = !settings.isLockedMode || boxState.accessible || showUnlockWarning;

              return (
                <div key={boxNum}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      Box {boxNum} ({byBox[boxNum].length} cards)
                    </h3>
                    <div className="flex items-center gap-2">
                      {boxState.dueCount > 0 && (
                        <Badge variant="destructive">{boxState.dueCount} due</Badge>
                      )}
                      {settings.isLockedMode && !boxState.accessible && boxState.nextDueIn && !showUnlockWarning && (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" />
                          <CountdownFromMillis milliseconds={boxState.nextDueIn} />
                        </Badge>
                      )}
                      {settings.isLockedMode && !boxState.accessible && !showUnlockWarning && (
                        <Badge variant="secondary" className="gap-1">
                          <Lock className="h-3 w-3" />
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                  {byBox[boxNum].length > 0 ? (
                    isBoxAccessible ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {byBox[boxNum].map((card) => (
                          <WordCard
                            key={card.id}
                            wordData={card.wordData}
                            onDelete={() => deleteCard(card.id)}
                            blurBack={settings.isLockedMode && !showUnlockWarning}
                            showDelete={true}
                          />
                        ))}
                      </div>
                    ) : (
                      <Card className="bg-muted/50">
                        <CardContent className="py-8 text-center">
                          <Lock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            Box locked until cards are due
                          </p>
                        </CardContent>
                      </Card>
                    )
                  ) : (
                    <p className="text-sm text-muted-foreground">No cards in this box yet</p>
                  )}
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
