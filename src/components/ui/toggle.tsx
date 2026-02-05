'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toggleVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus:ring-gray-900 dark:focus:ring-white',
        success: 'focus:ring-emerald-500',
        primary: 'focus:ring-blue-500',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, checked = false, onChange, label, description, disabled, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    const thumbOffset = {
      sm: checked ? 'translate-x-4' : 'translate-x-0.5',
      md: checked ? 'translate-x-5' : 'translate-x-0.5',
      lg: checked ? 'translate-x-7' : 'translate-x-0.5',
    };

    const bgColor = checked
      ? variant === 'success'
        ? 'bg-emerald-600'
        : variant === 'primary'
        ? 'bg-blue-600'
        : 'bg-gray-900 dark:bg-white'
      : 'bg-gray-300 dark:bg-gray-600';

    if (label || description) {
      return (
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            {label && (
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {description}
              </span>
            )}
          </div>
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={handleClick}
            className={cn(toggleVariants({ variant, size }), bgColor, className)}
            {...props}
          >
            <span
              className={cn(
                thumbVariants({ size }),
                thumbOffset[size || 'md'],
                'mt-0.5'
              )}
            />
          </button>
        </div>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(toggleVariants({ variant, size }), bgColor, className)}
        {...props}
      >
        <span
          className={cn(
            thumbVariants({ size }),
            thumbOffset[size || 'md'],
            'mt-0.5'
          )}
        />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle, toggleVariants };
