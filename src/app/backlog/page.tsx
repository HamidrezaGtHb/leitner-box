'use client';

import { useState } from 'react';
import { useBacklog } from '@/hooks/use-backlog';
import { useLeitner } from '@/hooks/use-leitner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WordCard } from '@/components/word-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ArrowRight, Search, Trash2, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { BacklogItem, Priority } from '@/types';

export default function BacklogPage() {
  const { backlog, removeFromBacklog, updateBacklogItem, readyItems, futureItems, isLoaded } = useBacklog();
  const { addWord, canAddNewWord } = useLeitner();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToActive = (item: BacklogItem) => {
    if (!canAddNewWord()) {
      alert('Daily limit reached! Please adjust your limit in Settings or wait until tomorrow.');
      return;
    }
    
    addWord(item.wordData);
    removeFromBacklog(item.id);
  };

  const handleAddAllReady = () => {
    readyItems.forEach((item) => {
      if (canAddNewWord()) {
        addWord(item.wordData);
        removeFromBacklog(item.id);
      }
    });
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

      {backlog.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-4">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
            <div>
              <h2 className="text-2xl font-bold">No words in backlog</h2>
              <p className="text-muted-foreground">
                Add words from the Generate page to build your future learning queue
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="ready" className="w-full">
          <TabsList>
            <TabsTrigger value="ready">
              Ready Now ({readyItems.length})
            </TabsTrigger>
            <TabsTrigger value="future">
              Scheduled ({futureItems.length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({backlog.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="ready" className="space-y-4">
            {readyItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readyItems.map((item) => (
                  <BacklogCard
                    key={item.id}
                    item={item}
                    onAddToActive={handleAddToActive}
                    onDelete={removeFromBacklog}
                    onUpdateSchedule={handleUpdateSchedule}
                    onUpdatePriority={handleUpdatePriority}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No words ready to add today
              </div>
            )}
          </TabsContent>

          <TabsContent value="future" className="space-y-4">
            {futureItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {futureItems.map((item) => (
                  <BacklogCard
                    key={item.id}
                    item={item}
                    onAddToActive={handleAddToActive}
                    onDelete={removeFromBacklog}
                    onUpdateSchedule={handleUpdateSchedule}
                    onUpdatePriority={handleUpdatePriority}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No scheduled words
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {filteredBacklog.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBacklog.map((item) => (
                  <BacklogCard
                    key={item.id}
                    item={item}
                    onAddToActive={handleAddToActive}
                    onDelete={removeFromBacklog}
                    onUpdateSchedule={handleUpdateSchedule}
                    onUpdatePriority={handleUpdatePriority}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No words found matching "{searchQuery}"
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function BacklogCard({
  item,
  onAddToActive,
  onDelete,
  onUpdateSchedule,
  onUpdatePriority,
}: {
  item: BacklogItem;
  onAddToActive: (item: BacklogItem) => void;
  onDelete: (id: string) => void;
  onUpdateSchedule: (id: string, days: number) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
}) {
  const isReady = item.scheduledFor <= Date.now();
  const priorities: Priority[] = ['high', 'medium', 'low'];

  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  return (
    <div className="relative">
      <WordCard wordData={item.wordData} />
      
      <div className="mt-3 space-y-2">
        {/* Priority and Schedule Info */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex gap-1">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => onUpdatePriority(item.id, p)}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  item.priority === p
                    ? getPriorityColor(p)
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex-1 text-right">
            <span className={`text-xs ${isReady ? 'text-green-600' : 'text-muted-foreground'}`}>
              {isReady ? 'Ready!' : formatDate(item.scheduledFor)}
            </span>
          </div>
        </div>

        {/* Schedule Controls */}
        <div className="flex gap-1">
          {[1, 3, 7].map((days) => (
            <Button
              key={days}
              variant="outline"
              size="sm"
              onClick={() => onUpdateSchedule(item.id, days)}
              className="flex-1 text-xs"
            >
              +{days}d
            </Button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => onAddToActive(item)}
            variant="default"
            size="sm"
            className="flex-1 gap-1"
          >
            <ArrowRight className="h-3 w-3" />
            Add Now
          </Button>
          <Button
            onClick={() => onDelete(item.id)}
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
