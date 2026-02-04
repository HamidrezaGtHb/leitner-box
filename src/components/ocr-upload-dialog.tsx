'use client';

import { useState } from 'react';
import { extractTextFromImage, parseGermanTerms } from '@/lib/ocr';
import { normalizeTerm } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';

interface OCRUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function OCRUploadDialog({
  open,
  onOpenChange,
  onSuccess,
}: OCRUploadDialogProps) {
  const [processing, setProcessing] = useState(false);
  const [extractedTerms, setExtractedTerms] = useState<string[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<Set<string>>(new Set());
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const supabase = createClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('لطفاً یک فایل تصویری انتخاب کنید');
      return;
    }

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setProcessing(true);
    const loadingToast = toast.loading('در حال استخراج متن از تصویر...');

    try {
      const lines = await extractTextFromImage(file);
      const terms = parseGermanTerms(lines);

      if (terms.length === 0) {
        toast.error('هیچ کلمه آلمانی یافت نشد', { id: loadingToast });
      } else {
        toast.success(`${terms.length} کلمه یافت شد`, { id: loadingToast });
        setExtractedTerms(terms);
        // Select all by default
        setSelectedTerms(new Set(terms));
      }
    } catch (error) {
      console.error('OCR error:', error);
      toast.error('خطا در استخراج متن', { id: loadingToast });
    } finally {
      setProcessing(false);
    }
  };

  const toggleTerm = (term: string) => {
    const newSelected = new Set(selectedTerms);
    if (newSelected.has(term)) {
      newSelected.delete(term);
    } else {
      newSelected.add(term);
    }
    setSelectedTerms(newSelected);
  };

  const handleAddToBacklog = async () => {
    if (selectedTerms.size === 0) {
      toast.error('لطفاً حداقل یک کلمه انتخاب کنید');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error('لطفاً وارد شوید');
      return;
    }

    setProcessing(true);
    const loadingToast = toast.loading('در حال افزودن به Backlog...');

    let addedCount = 0;
    let skippedCount = 0;

    for (const term of Array.from(selectedTerms)) {
      const normalized = normalizeTerm(term);

      // Check for duplicates
      const { data: existing } = await supabase
        .from('cards')
        .select('id')
        .eq('user_id', user.id)
        .eq('term_normalized', normalized)
        .single();

      if (existing) {
        skippedCount++;
        continue;
      }

      const { error } = await supabase.from('backlog').insert({
        user_id: user.id,
        term: term,
        term_normalized: normalized,
      });

      if (error) {
        if (error.code === '23505') {
          skippedCount++;
        } else {
          console.error('Error adding term:', error);
        }
      } else {
        addedCount++;
      }
    }

    if (addedCount > 0) {
      toast.success(`${addedCount} کلمه اضافه شد${skippedCount > 0 ? ` (${skippedCount} تکراری)` : ''}`, {
        id: loadingToast,
      });
      onSuccess();
      onOpenChange(false);
      // Reset
      setExtractedTerms([]);
      setSelectedTerms(new Set());
      setImagePreview(null);
    } else {
      toast.error('هیچ کلمه جدیدی اضافه نشد', { id: loadingToast });
    }

    setProcessing(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto z-50">
          <Dialog.Title className="text-2xl font-bold mb-4">
            📸 OCR: Import from Image
          </Dialog.Title>

          <div className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Image (JPG, PNG)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={processing}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="border rounded-lg p-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 mx-auto"
                />
              </div>
            )}

            {/* Extracted Terms */}
            {extractedTerms.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    Extracted Terms ({selectedTerms.size} selected)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedTerms(new Set(extractedTerms))}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Select All
                    </button>
                    <button
                      onClick={() => setSelectedTerms(new Set())}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto border rounded-lg p-3 space-y-2">
                  {extractedTerms.map((term, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTerms.has(term)}
                        onChange={() => toggleTerm(term)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium">{term}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <Dialog.Close asChild>
              <button
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                disabled={processing}
              >
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleAddToBacklog}
              disabled={processing || selectedTerms.size === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Processing...' : `Add ${selectedTerms.size} to Backlog`}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
