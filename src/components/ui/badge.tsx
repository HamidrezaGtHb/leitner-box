import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface-2 text-text-muted border',
        primary: 'bg-accent text-accent-fg',
        secondary: 'bg-muted text-text',
        success: 'bg-success/15 text-success',
        warning: 'bg-warning/15 text-warning',
        danger: 'bg-danger/15 text-danger',
        info: 'bg-info/15 text-info',
        // German Article badges (solid colors)
        der: 'bg-der text-white',
        die: 'bg-die text-white',
        das: 'bg-das text-white',
        // Soft article variants
        'der-soft': 'bg-der/15 text-der',
        'die-soft': 'bg-die/15 text-die',
        'das-soft': 'bg-das/15 text-das',
        // Box badges
        box1: 'bg-warning/15 text-warning',
        box2: 'bg-warning/15 text-warning',
        box3: 'bg-info/15 text-info',
        box4: 'bg-accent/15 text-accent',
        box5: 'bg-success/15 text-success',
        // Level badges
        A1: 'bg-success/15 text-success',
        A2: 'bg-success/15 text-success',
        B1: 'bg-warning/15 text-warning',
        B2: 'bg-warning/15 text-warning',
        C1: 'bg-danger/15 text-danger',
        C2: 'bg-accent/15 text-accent',
      },
      size: {
        xs: 'text-[10px] px-1.5 py-0.5 rounded',
        sm: 'text-xs px-2 py-0.5 rounded-md',
        md: 'text-sm px-2.5 py-1 rounded-lg',
        lg: 'text-base px-3 py-1.5 rounded-xl',
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
