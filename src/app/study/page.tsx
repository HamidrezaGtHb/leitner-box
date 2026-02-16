'use client';

import { useRouter } from 'next/navigation';
import { Nav } from '@/components/nav';
import { studySets } from '@/data/study-sets';
import { Button, Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

export default function StudyPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-5xl mx-auto p-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-text tracking-tight">
            {t.study.title}
          </h1>
          <p className="text-text-muted mt-1">{t.study.description}</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studySets.map((set) => (
            <Card
              key={set.id}
              padding="lg"
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/study/${set.id}`)}
            >
              <CardContent className="space-y-4">
                {/* Icon and Title */}
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{set.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-text">
                      {set.title}
                    </h2>
                    <p className="text-sm text-text-muted mt-1">
                      {set.description}
                    </p>
                  </div>
                </div>

                {/* Card Count */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-text-muted">
                    <span className="font-semibold text-accent">
                      {set.cardCount}
                    </span>{' '}
                    {t.study.totalCards}
                  </div>
                  <Button variant="secondary" size="sm">
                    {t.study.browseCards}
                  </Button>
                </div>

                {/* Subcategories (if any) */}
                {set.subcategories && set.subcategories.length > 0 && (
                  <div className="pt-3 border-t">
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                      {t.study.selectSubcategory}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {set.subcategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="px-2 py-1 bg-surface-2 rounded text-xs text-text"
                        >
                          {sub.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
