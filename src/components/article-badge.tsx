'use client';

import { getArticleStyle } from '@/lib/design-system';

interface ArticleBadgeProps {
  article: 'der' | 'die' | 'das' | string | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ArticleBadge({ article, size = 'md', showLabel = true }: ArticleBadgeProps) {
  if (!article) return null;

  const style = getArticleStyle(article);
  if (!style) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full ${style.badge} ${sizeClasses[size]}`}
    >
      {article}
      {showLabel && (
        <span className="ml-1 font-normal opacity-75">
          {article === 'der' && '♂'}
          {article === 'die' && '♀'}
          {article === 'das' && '⚪'}
        </span>
      )}
    </span>
  );
}

// Inline version for use within text
export function ArticleInline({ article }: { article: string | null | undefined }) {
  if (!article) return null;

  const style = getArticleStyle(article);
  if (!style) return <span>{article}</span>;

  return (
    <span className={`font-bold ${style.text}`}>
      {article}
    </span>
  );
}
