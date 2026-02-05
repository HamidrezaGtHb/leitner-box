import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base styles with focus ring using tokens
  'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-fg shadow-sm hover:opacity-90 active:opacity-85',
        secondary: 'bg-surface-2 text-text border hover:bg-muted',
        success: 'bg-success text-success-fg shadow-sm hover:opacity-90',
        danger: 'bg-danger text-danger-fg shadow-sm hover:opacity-90',
        'danger-soft': 'bg-danger/10 text-danger hover:bg-danger/20',
        warning: 'bg-warning text-warning-fg shadow-sm hover:opacity-90',
        ghost: 'text-text hover:bg-muted',
        outline: 'border-2 text-text hover:bg-surface-2',
        // Article colors (solid colors)
        der: 'bg-der text-white shadow-sm hover:opacity-90',
        die: 'bg-die text-white shadow-sm hover:opacity-90',
        das: 'bg-das text-white shadow-sm hover:opacity-90',
      },
      size: {
        xs: 'text-xs px-2 py-1 rounded-md',
        sm: 'text-sm px-3 py-1.5 rounded-lg',
        md: 'text-sm px-4 py-2.5 rounded-xl',
        lg: 'text-base px-6 py-3 rounded-xl',
        xl: 'text-lg px-8 py-4 rounded-2xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
