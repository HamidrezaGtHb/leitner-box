import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Calculate user's review streak (consecutive days with at least one review)
 */
export async function calculateStreak(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  // Get all review dates (distinct dates)
  const { data: reviews } = await supabase
    .from('reviews')
    .select('reviewed_at')
    .eq('user_id', userId)
    .order('reviewed_at', { ascending: false });

  if (!reviews || reviews.length === 0) {
    return 0;
  }

  // Extract unique dates (YYYY-MM-DD)
  const uniqueDates = Array.from(
    new Set(
      reviews.map((r) => new Date(r.reviewed_at).toISOString().split('T')[0])
    )
  ).sort((a, b) => b.localeCompare(a)); // Sort descending

  // Calculate streak starting from today
  const today = new Date().toISOString().split('T')[0];
  let streak = 0;
  let currentDate = new Date(today);

  for (let i = 0; i < uniqueDates.length; i++) {
    const reviewDate = uniqueDates[i];
    const expectedDate = currentDate.toISOString().split('T')[0];

    if (reviewDate === expectedDate) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (i === 0 && reviewDate < today) {
      // If first review is not today, streak is 0
      break;
    } else {
      // Gap in streak
      break;
    }
  }

  return streak;
}

/**
 * Calculate review accuracy (percentage of correct answers)
 */
export async function calculateAccuracy(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('result')
    .eq('user_id', userId);

  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const correctCount = reviews.filter((r) => r.result === 'correct').length;
  return Math.round((correctCount / reviews.length) * 100);
}

/**
 * Get next due card time
 */
export async function getNextDueTime(
  supabase: SupabaseClient,
  userId: string
): Promise<{ dueDate: string; hoursUntil: number } | null> {
  const today = new Date().toISOString().split('T')[0];

  const { data: nextCard } = await supabase
    .from('cards')
    .select('due_date')
    .eq('user_id', userId)
    .gt('due_date', today)
    .order('due_date', { ascending: true })
    .limit(1)
    .single();

  if (!nextCard) {
    return null;
  }

  const dueDate = new Date(nextCard.due_date);
  const now = new Date();
  const hoursUntil = Math.max(
    0,
    Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60))
  );

  return {
    dueDate: nextCard.due_date,
    hoursUntil,
  };
}

/**
 * Get cards distribution across boxes
 */
export async function getBoxDistribution(
  supabase: SupabaseClient,
  userId: string
): Promise<Record<number, number>> {
  const { data: cards } = await supabase
    .from('cards')
    .select('box')
    .eq('user_id', userId);

  const distribution: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (cards) {
    cards.forEach((card) => {
      distribution[card.box] = (distribution[card.box] || 0) + 1;
    });
  }

  return distribution;
}
