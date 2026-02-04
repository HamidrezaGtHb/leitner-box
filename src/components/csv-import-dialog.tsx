'use client';

import { useState } from 'react';
import { parseCSVFile, generateSampleCSV, type CSVRow } from '@/lib/csv-parser';
import { normalizeTerm } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';

interface CSVImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CSVImportDialog({
  open,
  onOpenChange,
  onSuccess,
}: CSVImportDialogProps) {
  const [processing, setProcessing] = useState(false);
  const [parsedData, setParsedData] = useState<CSVRow[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const supabase = createClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      toast.error('لطفاً یک فایل CSV انتخاب کنید');
      return;
    }

    setProcessing(true);
    const loadingToast = toast.loading('در حال خواندن فایل CSV...');

    try {
      const result = await parseCSVFile(file);

      if (result.errors.length > 0) {
        setParseErrors(result.errors);
      }

      if (result.data.length === 0) {
        toast.error('هیچ داده معتبری یافت نشد', { id: loadingToast });
      } else {
        toast.success(`${result.data.length} رکورد یافت شد`, {
          id: loadingToast,
        });
        setParsedData(result.data);
      }
    } catch (error) {
      console.error('CSV parse error:', error);
      toast.error('خطا در خواندن فایل', { id: loadingToast });
    } finally {
      setProcessing(false);
    }
  };

  const handleImport = async () => {
    if (parsedData.length === 0) {
      toast.error('هیچ داده‌ای برای وارد کردن وجود ندارد');
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
    const loadingToast = toast.loading('در حال وارد کردن...');

    let addedCount = 0;
    let skippedCount = 0;

    for (const row of parsedData) {
      const normalized = normalizeTerm(row.term);

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
        term: row.term,
        term_normalized: normalized,
        level: row.level || null,
        pos: row.pos || null,
        topic: row.topic || null,
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
      toast.success(
        `${addedCount} کلمه وارد شد${skippedCount > 0 ? ` (${skippedCount} تکراری)` : ''}`,
        { id: loadingToast }
      );
      onSuccess();
      onOpenChange(false);
      // Reset
      setParsedData([]);
      setParseErrors([]);
    } else {
      toast.error('هیچ کلمه جدیدی وارد نشد', { id: loadingToast });
    }

    setProcessing(false);
  };

  const downloadSample = () => {
    const csv = generateSampleCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-vocabulary.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('نمونه فایل دانلود شد');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto z-50">
          <Dialog.Title className="text-2xl font-bold mb-4">
            📄 CSV Import
          </Dialog.Title>

          <div className="space-y-4">
            {/* Instructions */}
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-medium mb-1">CSV Format:</p>
              <p className="text-gray-700">
                Columns: <code className="bg-white px-1">term</code> (required),{' '}
                <code className="bg-white px-1">level</code> (optional),{' '}
                <code className="bg-white px-1">pos</code> (optional),{' '}
                <code className="bg-white px-1">topic</code> (optional)
              </p>
              <button
                onClick={downloadSample}
                className="mt-2 text-blue-600 hover:underline text-sm"
              >
                Download Sample CSV
              </button>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={processing}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Parse Errors */}
            {parseErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-medium text-red-800 mb-1">
                  Validation Errors:
                </p>
                <ul className="text-sm text-red-700 space-y-1">
                  {parseErrors.slice(0, 5).map((error, i) => (
                    <li key={i}>• {error}</li>
                  ))}
                  {parseErrors.length > 5 && (
                    <li>• ... and {parseErrors.length - 5} more errors</li>
                  )}
                </ul>
              </div>
            )}

            {/* Preview */}
            {parsedData.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">
                  Preview ({parsedData.length} terms)
                </div>
                <div className="max-h-60 overflow-y-auto border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-3 py-2 text-left">Term</th>
                        <th className="px-3 py-2 text-left">Level</th>
                        <th className="px-3 py-2 text-left">POS</th>
                        <th className="px-3 py-2 text-left">Topic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedData.slice(0, 10).map((row, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2 font-medium">{row.term}</td>
                          <td className="px-3 py-2">{row.level || '-'}</td>
                          <td className="px-3 py-2">{row.pos || '-'}</td>
                          <td className="px-3 py-2">{row.topic || '-'}</td>
                        </tr>
                      ))}
                      {parsedData.length > 10 && (
                        <tr className="border-t bg-gray-50">
                          <td colSpan={4} className="px-3 py-2 text-center text-gray-600">
                            ... and {parsedData.length - 10} more
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
              onClick={handleImport}
              disabled={processing || parsedData.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Importing...' : `Import ${parsedData.length} Terms`}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
