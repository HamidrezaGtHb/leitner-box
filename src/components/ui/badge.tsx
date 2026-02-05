import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-gray-900 text-white',
        secondary: 'bg-gray-200 text-gray-800',
        success: 'bg-emerald-100 text-emerald-700',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-rose-100 text-rose-700',
        info: 'bg-blue-100 text-blue-700',
        // German Article badges
        der: 'bg-sky-500 text-white',
        die: 'bg-rose-500 text-white',
        das: 'bg-emerald-500 text-white',
        // Soft article variants
        'der-soft': 'bg-sky-100 text-sky-700',
        'die-soft': 'bg-rose-100 text-rose-700',
        'das-soft': 'bg-emerald-100 text-emerald-700',
        // Box badges
        box1: 'bg-amber-100 text-amber-700',
        box2: 'bg-orange-100 text-orange-700',
        box3: 'bg-blue-100 text-blue-700',
        box4: 'bg-indigo-100 text-indigo-700',
        box5: 'bg-emerald-100 text-emerald-700',
        // Level badges
        A1: 'bg-green-100 text-green-700',
        A2: 'bg-lime-100 text-lime-700',
        B1: 'bg-yellow-100 text-yellow-700',
        B2: 'bg-orange-100 text-orange-700',
        C1: 'bg-red-100 text-red-700',
        C2: 'bg-purple-100 text-purple-700',
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
