import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200',
        primary: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900',
        secondary: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100',
        success: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
        warning: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
        danger: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300',
        info: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        // German Article badges (solid colors work in both modes)
        der: 'bg-sky-500 text-white',
        die: 'bg-rose-500 text-white',
        das: 'bg-emerald-500 text-white',
        // Soft article variants
        'der-soft': 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300',
        'die-soft': 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300',
        'das-soft': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
        // Box badges
        box1: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
        box2: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
        box3: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        box4: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300',
        box5: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300',
        // Level badges
        A1: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
        A2: 'bg-lime-100 dark:bg-lime-900/50 text-lime-700 dark:text-lime-300',
        B1: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
        B2: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
        C1: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
        C2: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
      },
      size: {
        xs: 'text-[10px] px-1.5 py-0.5 rounded',
        sm: 'text-xs px-2 py-0.5 rounded-md',
        md: 'text-sm px-2.5 py-1 rounded-lg',
        lg: 'text-base px-3 py-1.5 rounded-lg',
      },
      shape: {
        default: '',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      shape: 'default',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Specialized Article Badge
interface ArticleBadgeProps extends Omit<BadgeProps, 'variant'> {
  article: 'der' | 'die' | 'das' | string | null | undefined;
  soft?: boolean;
}

const ArticleBadge = forwardRef<HTMLSpanElement, ArticleBadgeProps>(
  ({ article, soft = false, size = 'md', shape = 'pill', className, ...props }, ref) => {
    if (!article) return null;

    const articleLower = article.toLowerCase();
    let variant: BadgeProps['variant'] = 'default';

    if (articleLower === 'der') variant = soft ? 'der-soft' : 'der';
    else if (articleLower === 'die') variant = soft ? 'die-soft' : 'die';
    else if (articleLower === 'das') variant = soft ? 'das-soft' : 'das';

    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        shape={shape}
        className={cn('font-bold', className)}
        {...props}
      >
        {article}
      </Badge>
    );
  }
);

ArticleBadge.displayName = 'ArticleBadge';

// Box Badge
interface BoxBadgeProps extends Omit<BadgeProps, 'variant'> {
  box: number;
}

const BoxBadge = forwardRef<HTMLSpanElement, BoxBadgeProps>(
  ({ box, size = 'sm', className, ...props }, ref) => {
    const variant = `box${box}` as BadgeProps['variant'];

    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        Box {box}
      </Badge>
    );
  }
);

BoxBadge.displayName = 'BoxBadge';

export { Badge, ArticleBadge, BoxBadge, badgeVariants };
