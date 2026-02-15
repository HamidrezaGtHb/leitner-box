'use client';

import { useState } from 'react';
import { Card, CardBackJSON } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';

interface EditCardDialogProps {
  card: Card;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TabId = 'basic' | 'related' | 'usage' | 'grammar';

export function EditCardDialog({
  card,
  onSuccess,
  open,
  onOpenChange,
}: EditCardDialogProps) {
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  
  // Basic tab
  const [meanings, setMeanings] = useState(card.back_json.meaning_fa.join('\n'));
  const [examples, setExamples] = useState(
    card.back_json.examples.map((ex) => `${ex.de}|${ex.fa}`).join('\n')
  );
  
  // Related words tab
  const [synonyms, setSynonyms] = useState(card.back_json.synonyms.join('\n'));
  const [antonyms, setAntonyms] = useState(card.back_json.antonyms.join('\n'));
  const [collocations, setCollocations] = useState(card.back_json.collocations.join('\n'));
  const [wordFamily, setWordFamily] = useState((card.back_json.word_family || []).join('\n'));
  
  // Usage tab
  const [usageContexts, setUsageContexts] = useState(
    (card.back_json.usage_context?.contexts || []).join('\n')
  );
  const [colloquialAlt, setColloquialAlt] = useState(
    card.back_json.usage_context?.colloquial_alternative || ''
  );
  const [register, setRegister] = useState<'formal' | 'informal' | 'colloquial'>(
    (card.back_json.usage_context?.register as 'formal' | 'informal' | 'colloquial') || 'informal'
  );
  
  // Grammar tab
  const [ipa, setIpa] = useState(card.back_json.ipa || '');
  const [plural, setPlural] = useState(card.back_json.grammar.noun?.plural || '');
  
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const { t } = useLanguage();

  const handleSave = async () => {
    setSaving(true);

    try {
      // Parse meanings
      const meaningsList = meanings
        .split('\n')
        .map((m) => m.trim())
        .filter((m) => m);

      // Parse examples
      const examplesList = examples
        .split('\n')
        .map((line) => {
          const [de, fa] = line.split('|').map((s) => s.trim());
          return de && fa ? { de, fa, note: null, register: 'general' } : null;
        })
        .filter((ex) => ex !== null);

      // Parse synonyms, antonyms, collocations, word family
      const synonymsList = synonyms.split('\n').map(s => s.trim()).filter(s => s);
      const antonymsList = antonyms.split('\n').map(s => s.trim()).filter(s => s);
      const collocationsList = collocations.split('\n').map(s => s.trim()).filter(s => s);
      const wordFamilyList = wordFamily.split('\n').map(s => s.trim()).filter(s => s);
      
      // Parse usage contexts
      const contextsList = usageContexts.split('\n').map(s => s.trim()).filter(s => s);

      // Update back_json
      const updatedBackJson: CardBackJSON = {
        ...card.back_json,
        meaning_fa: meaningsList,
        examples: examplesList as any[],
        synonyms: synonymsList,
        antonyms: antonymsList,
        collocations: collocationsList,
        word_family: wordFamilyList,
        ipa: ipa.trim() || card.back_json.ipa,
        usage_context: {
          register: register,
          colloquial_alternative: colloquialAlt.trim() || undefined,
          contexts: contextsList
        },
        grammar: {
          ...card.back_json.grammar,
          noun: card.back_json.grammar.noun ? {
            ...card.back_json.grammar.noun,
            plural: plural.trim() || card.back_json.grammar.noun.plural
          } : undefined
        }
      };

      const { error } = await supabase
        .from('cards')
        .update({ back_json: updatedBackJson })
        .eq('id', card.id);

      if (error) {
        toast.error(t.dialogs.saveError);
        console.error(error);
      } else {
        toast.success(t.dialogs.saveSuccess);
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(t.dialogs.saveError);
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'basic', label: 'Basic' },
    { id: 'related', label: 'Related Words' },
    { id: 'usage', label: 'Usage Context' },
    { id: 'grammar', label: 'Grammar' },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-3xl max-h-[85vh] overflow-y-auto z-50">
          <Dialog.Title className="text-2xl font-bold mb-4">
            {t.dialogs.editCard}: {card.term}
          </Dialog.Title>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {/* Basic Tab */}
            {activeTab === 'basic' && (
              <>
                {/* Meanings */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.dialogs.meaningsLabel}
                  </label>
                  <textarea
                    value={meanings}
                    onChange={(e) => setMeanings(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t.dialogs.meaningPlaceholder}
                  />
                </div>

                {/* Examples */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.dialogs.examplesLabel}
                  </label>
                  <textarea
                    value={examples}
                    onChange={(e) => setExamples(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="German example | Persian translation"
                  />
                </div>
              </>
            )}

            {/* Related Words Tab */}
            {activeTab === 'related' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Synonyms</label>
                  <textarea
                    value={synonyms}
                    onChange={(e) => setSynonyms(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="One synonym per line..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Antonyms</label>
                  <textarea
                    value={antonyms}
                    onChange={(e) => setAntonyms(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="One antonym per line..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Collocations</label>
                  <textarea
                    value={collocations}
                    onChange={(e) => setCollocations(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="One collocation per line (e.g., einen Termin machen)..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Word Family</label>
                  <textarea
                    value={wordFamily}
                    onChange={(e) => setWordFamily(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="One related word per line (e.g., der Fahrer, die Fahrt)..."
                  />
                </div>
              </>
            )}

            {/* Usage Context Tab */}
            {activeTab === 'usage' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Register</label>
                  <select
                    value={register}
                    onChange={(e) => setRegister(e.target.value as 'formal' | 'informal' | 'colloquial')}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="formal">Formal</option>
                    <option value="informal">Informal</option>
                    <option value="colloquial">Colloquial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Colloquial Alternative</label>
                  <input
                    type="text"
                    value={colloquialAlt}
                    onChange={(e) => setColloquialAlt(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Informal/colloquial equivalent (if term is formal)..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Usage Contexts</label>
                  <textarea
                    value={usageContexts}
                    onChange={(e) => setUsageContexts(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="One context per line (e.g., business, daily conversation)..."
                  />
                </div>
              </>
            )}

            {/* Grammar Tab */}
            {activeTab === 'grammar' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">IPA Pronunciation</label>
                  <input
                    type="text"
                    value={ipa}
                    onChange={(e) => setIpa(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="[ˈvaʁtən]"
                  />
                </div>

                {card.back_json.grammar.noun && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Plural Form</label>
                    <input
                      type="text"
                      value={plural}
                      onChange={(e) => setPlural(e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="die Termine"
                    />
                  </div>
                )}

                <div className="p-4 bg-gray-50 rounded text-sm text-gray-600">
                  <p className="font-medium mb-2">Note:</p>
                  <p>Additional grammar fields (verb forms, adjective declensions, etc.) are managed by the AI generation system and cannot be directly edited here.</p>
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <button className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                {t.common.cancel}
              </button>
            </Dialog.Close>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? t.dialogs.saving : t.dialogs.saveChanges}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
