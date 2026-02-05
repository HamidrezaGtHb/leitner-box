import { forwardRef, InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
  {
    variants: {
      variant: {
        default: 'border bg-surface focus:border-transparent',
        filled: 'border-0 bg-surface-2 focus:bg-muted',
        outline: 'border-2 bg-transparent focus:border-accent',
        ghost: 'border-0 bg-transparent focus:bg-surface-2',
      },
      inputSize: {
        sm: 'text-sm px-3 py-2 rounded-lg',
        md: 'text-base px-4 py-3 rounded-xl',
        lg: 'text-lg px-5 py-4 rounded-xl',
      },
      error: {
        true: 'border-danger focus:ring-danger',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, error, label, helperText, errorMessage, ...props }, ref) => {
    const hasError = error || !!errorMessage;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ variant, inputSize, error: hasError }),
            className
          )}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p className={cn(
            'mt-1.5 text-sm',
            hasError ? 'text-danger' : 'text-text-muted'
          )}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea variant
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, inputSize, error, label, helperText, errorMessage, ...props }, ref) => {
    const hasError = error || !!errorMessage;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            inputVariants({ variant, inputSize, error: hasError }),
            'min-h-[100px] resize-y',
            className
          )}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p className={cn(
            'mt-1.5 text-sm',
            hasError ? 'text-danger' : 'text-text-muted'
          )}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea, inputVariants };
