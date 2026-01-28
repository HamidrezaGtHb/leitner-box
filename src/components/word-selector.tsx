'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface WordSelectorProps {
  words: string[];
  onSelect: (selectedWords: string[]) => void;
}

export function WordSelector({ words, onSelect }: WordSelectorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set(words));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWord = (word: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(word)) {
      newSelected.delete(word);
    } else {
      newSelected.add(word);
    }
    setSelected(newSelected);
  };

  const selectAll = () => {
    setSelected(new Set(filteredWords));
  };

  const selectNone = () => {
    setSelected(new Set());
  };

  const handleConfirm = () => {
    onSelect(Array.from(selected));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Select Words ({selected.size} of {words.length} selected)
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={selectNone}>
            Deselect All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="max-h-96 overflow-y-auto border rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredWords.map((word) => (
              <label
                key={word}
                className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.has(word)}
                  onChange={() => toggleWord(word)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm font-medium">{word}</span>
              </label>
            ))}
          </div>
        </div>

        <Button onClick={handleConfirm} className="w-full" size="lg">
          Continue with {selected.size} words
        </Button>
      </CardContent>
    </Card>
  );
}
