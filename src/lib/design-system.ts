/**
 * Leitner Box Design System
 * Minimal, clean, and functional
 */

// German Article Colors (for nouns)
export const articleColors = {
  der: {
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    border: 'border-sky-300',
    badge: 'bg-sky-500 text-white',
    gradient: 'from-sky-500 to-sky-600',
  },
  die: {
    bg: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-300',
    badge: 'bg-rose-500 text-white',
    gradient: 'from-rose-500 to-rose-600',
  },
  das: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    badge: 'bg-emerald-500 text-white',
    gradient: 'from-emerald-500 to-emerald-600',
  },
} as const;

// Get article style based on article value
export function getArticleStyle(article: string | null | undefined) {
  if (!article) return null;
  const key = article.toLowerCase() as keyof typeof articleColors;
  return articleColors[key] || null;
}

// Box Colors (Leitner boxes 1-5)
export const boxColors = {
  1: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    badge: 'bg-amber-500 text-white',
  },
  2: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    badge: 'bg-orange-500 text-white',
  },
  3: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    badge: 'bg-blue-500 text-white',
  },
  4: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    badge: 'bg-indigo-500 text-white',
  },
  5: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    badge: 'bg-emerald-500 text-white',
  },
} as const;

export function getBoxStyle(box: number) {
  return boxColors[box as keyof typeof boxColors] || boxColors[1];
}

// Common UI Styles
export const ui = {
  // Cards
  card: 'bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow',
  cardFlat: 'bg-white rounded-xl border border-gray-100',

  // Buttons
  btnPrimary: 'px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium transition-colors',
  btnSecondary: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors',
  btnSuccess: 'px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors',
  btnDanger: 'px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-medium transition-colors',
  btnGhost: 'px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors',

  // Inputs
  input: 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all',

  // Badges
  badge: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',

  // Text
  heading1: 'text-2xl font-bold text-gray-900',
  heading2: 'text-lg font-semibold text-gray-900',
  heading3: 'text-base font-medium text-gray-900',
  textMuted: 'text-sm text-gray-500',

  // Layout
  container: 'max-w-4xl mx-auto px-4',
  section: 'space-y-6',
} as const;

// Level Colors (A1-C2)
export const levelColors = {
  A1: 'bg-green-100 text-green-700',
  A2: 'bg-lime-100 text-lime-700',
  B1: 'bg-yellow-100 text-yellow-700',
  B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100 text-red-700',
  C2: 'bg-purple-100 text-purple-700',
} as const;

export function getLevelStyle(level: string | null | undefined) {
  if (!level) return 'bg-gray-100 text-gray-700';
  return levelColors[level as keyof typeof levelColors] || 'bg-gray-100 text-gray-700';
}
