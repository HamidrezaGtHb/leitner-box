import { createClient } from './supabase/client';
import type { StudyProgress, MasteryLevel, StudySetCategory, StudyStats } from '@/types';

// Get progress for a specific card
export async function getCardProgress(cardId: string): Promise<StudyProgress | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('study_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', cardId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching progress:', error);
    return null;
  }

  return data;
}

// Get all progress for a category
export async function getCategoryProgress(category: StudySetCategory): Promise<StudyProgress[]> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('study_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('category', category);

  if (error) {
    console.error('Error fetching category progress:', error);
    return [];
  }

  return data || [];
}

// Update mastery level (Know/Don't Know)
export async function updateMasteryLevel(
  cardId: string,
  category: StudySetCategory,
  knew: boolean
): Promise<StudyProgress | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  try {
    // Get current progress using same supabase instance
    const { data: current } = await supabase
      .from('study_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('card_id', cardId)
      .maybeSingle();

    const currentLevel = current?.mastery_level ?? 0;

    // Calculate new level
    let newLevel: MasteryLevel;
    if (knew) {
      // I Know It: increment level (max 3)
      newLevel = Math.min(3, currentLevel + 1) as MasteryLevel;
    } else {
      // Don't Know: reset to 0
      newLevel = 0;
    }

    // Upsert
    const { data, error } = await supabase
      .from('study_progress')
      .upsert({
        user_id: user.id,
        card_id: cardId,
        category,
        mastery_level: newLevel,
        last_reviewed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating mastery:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Exception in updateMasteryLevel:', err);
    return null;
  }
}

// Calculate stats for a category
export async function getCategoryStats(
  category: StudySetCategory,
  totalCards: number
): Promise<StudyStats> {
  const progress = await getCategoryProgress(category);
  
  const stats: StudyStats = {
    total: totalCards,
    notStarted: 0,
    bronze: 0,
    silver: 0,
    gold: 0,
  };

  // Count by level
  const levelCounts = progress.reduce((acc, p) => {
    acc[p.mastery_level] = (acc[p.mastery_level] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  stats.bronze = levelCounts[1] || 0;
  stats.silver = levelCounts[2] || 0;
  stats.gold = levelCounts[3] || 0;
  stats.notStarted = totalCards - (stats.bronze + stats.silver + stats.gold);

  return stats;
}
