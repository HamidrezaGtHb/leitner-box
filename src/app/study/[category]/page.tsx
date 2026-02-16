'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Nav } from '@/components/nav';
import { StudyCardModal } from '@/components/study-card-modal';
import { 
  studySets, 
  getStudyCardsByCategory, 
  getStudyCardsBySubcategory 
} from '@/data/study-sets';
import { StudySetCategory, StudyCard } from '@/types';
import { Button, Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/lib/i18n';

export default function StudyCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  
  const category = params.category as StudySetCategory;
  const studySet = studySets.find((s) => s.id === category);
  
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  if (!studySet) {
    return (
      <div className="min-h-screen bg-bg">
        <Nav />
        <div className="max-w-5xl mx-auto p-4 text-center mt-20">
          <p className="text-text-muted">Category not found</p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => router.push('/study')}
            className="mt-4"
          >
            {t.study.backToCategories}
          </Button>
        </div>
      </div>
    );
  }

  // Get cards based on selected subcategory
  const allCards = getStudyCardsByCategory(category);
  const displayCards = selectedSubcategory
    ? getStudyCardsBySubcategory(category, selectedSubcategory)
    : allCards;

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedCardIndex(null);
  };

  const handlePrevious = () => {
    if (selectedCardIndex !== null && selectedCardIndex > 0) {
      setSelectedCardIndex(selectedCardIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedCardIndex !== null && selectedCardIndex < displayCards.length - 1) {
      setSelectedCardIndex(selectedCardIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <div className="max-w-5xl mx-auto p-4 py-6 space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/study')}
            className="mb-3 -ml-2"
          >
            ← {t.study.backToCategories}
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{studySet.icon}</span>
            <div>
              <h1 className="text-2xl font-semibold text-text">
                {language === 'de' ? studySet.title : studySet.titleFa}
              </h1>
              <p className="text-sm text-text-muted mt-1">
                {displayCards.length} {t.study.totalCards}
              </p>
            </div>
          </div>
        </div>

        {/* Subcategory Filter (if has subcategories) */}
        {studySet.subcategories && studySet.subcategories.length > 0 && (
          <Card padding="md">
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSubcategory === null ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedSubcategory(null)}
                >
                  {t.study.allSubcategories}
                </Button>
                {studySet.subcategories.map((sub) => (
                  <Button
                    key={sub.id}
                    variant={selectedSubcategory === sub.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSelectedSubcategory(sub.id)}
                  >
                    {language === 'de' ? sub.title : sub.titleFa}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cards List */}
        {displayCards.length === 0 ? (
          <Card padding="lg" className="text-center py-16">
            <CardContent>
              <div className="text-4xl mb-4">📚</div>
              <p className="text-text-muted">{t.study.noCardsYet}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayCards.map((card, index) => (
              <Card
                key={card.id}
                padding="md"
                className="hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                onClick={() => handleCardClick(index)}
              >
                <CardContent className="space-y-2">
                  <div className="font-semibold text-lg text-text text-center">
                    {card.front}
                  </div>
                  {card.subcategory && (
                    <div className="text-center">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded">
                        {card.subcategory}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-center text-text-muted">
                    {t.study.clickToView}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Study Card Modal */}
      {selectedCardIndex !== null && (
        <StudyCardModal
          card={displayCards[selectedCardIndex]}
          currentIndex={selectedCardIndex}
          totalCards={displayCards.length}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
