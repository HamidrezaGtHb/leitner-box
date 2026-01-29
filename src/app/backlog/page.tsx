'use client';

import { useState } from 'react';
import { useBacklog } from '@/hooks/use-backlog';
import { useLeitner } from '@/hooks/use-leitner';
import { useSettings } from '@/hooks/use-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WordCard } from '@/components/word-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ArrowRight, Search, Trash2, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { BacklogItem, Priority } from '@/types';
import { createCard } from '@/lib/leitner';

export default function BacklogPage() {
  const { backlog, removeFromBacklog, updateBacklogItem, readyItems, futureItems, isLoaded } = useBacklog();
  const { addCard } = useLeitner();
  const { settings } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToActive = async (item: BacklogItem) => {
    const todayCount = 0; // Would need to get from stats
    if (todayCount >= settings.dailyNewWords) {
      alert('Daily limit reached! Please adjust your limit in Settings or wait until tomorrow.');
      return;
    }
    
    const card = createCard(item.wordData);
    await addCard(card);
    removeFromBacklog(item.id);
  };

  const handleAddAllReady = async () => {
    for (const item of readyItems) {
      const card = createCard(item.wordData);
      await addCard(card);
      removeFromBacklog(item.id);
    }
  };

  const handleUpdateSchedule = (id: string, days: number) => {
    const newSchedule = Date.now() + days * 24 * 60 * 60 * 1000;
    updateBacklogItem(id, { scheduledFor: newSchedule });
  };

  const handleUpdatePriority = (id: string, priority: Priority) => {
    updateBacklogItem(id, { priority });
  };

  const filteredBacklog = backlog.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.wordData.word.toLowerCase().includes(query) ||
      item.wordData.meaning.toLowerCase().includes(query)
    );
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Backlog</h1>
          <p className="text-muted-foreground">
            Manage your future vocabulary queue
          </p>
        </div>
        {readyItems.length > 0 && (
          <Button onClick={handleAddAllReady} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Add All Ready ({readyItems.length})
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Ready Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {readyItems.length}
            </div>
            <p className="text-xs text-muted-foreground">Words available now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {futureItems.length}
            </div>
            <p className="text-xs text-muted-foreground">Words for later</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Backlog</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backlog.length}</div>
            <p className="text-xs text-muted-foreground">Total items</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search backlog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Backlog Items */}
      {backlog.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-bold">No items in backlog</h2>
              <p className="text-muted-foreground">
                Use the AI assistant to generate words and add them to your backlog
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="ready" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ready">
              Ready ({readyItems.length})
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              Scheduled ({futureItems.length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({backlog.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="ready" className="space-y-4 mt-6">
            {readyItems.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No words ready yet. Check back later!
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readyItems.map((item) => (
                  <Card key={item.id} className="relative">
                    <CardContent className="pt-6">
                      <WordCard wordData={item.wordData} />
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => handleAddToActive(item)}
                          size="sm"
                          className="flex-1 gap-2"
                        >
                          <ArrowRight className="h-4 w-4" />
                          Add to Active
                        </Button>
                        <Button
                          onClick={() => removeFromBacklog(item.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4 mt-6">
            {futureItems.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No scheduled words
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {futureItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <WordCard wordData={item.wordData} />
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Scheduled: {formatDate(item.scheduledFor)}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleUpdateSchedule(item.id, 0)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Make Ready
                          </Button>
                          <Button
                            onClick={() => removeFromBacklog(item.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBacklog.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <WordCard wordData={item.wordData} />
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {item.scheduledFor <= Date.now()
                          ? 'Ready now'
                          : `Scheduled: ${formatDate(item.scheduledFor)}`}
                      </p>
                      <div className="flex gap-2">
                        {item.scheduledFor <= Date.now() ? (
                          <Button
                            onClick={() => handleAddToActive(item)}
                            size="sm"
                            className="flex-1 gap-2"
                          >
                            <ArrowRight className="h-4 w-4" />
                            Add to Active
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUpdateSchedule(item.id, 0)}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            Make Ready
                          </Button>
                        )}
                        <Button
                          onClick={() => removeFromBacklog(item.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
