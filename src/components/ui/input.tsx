import { forwardRef, InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'w-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400',
  {
    variants: {
      variant: {
        default: 'border border-gray-200 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10',
        filled: 'border-0 bg-gray-100 focus:bg-gray-50 focus:ring-2 focus:ring-gray-900/10',
        outline: 'border-2 border-gray-200 bg-transparent focus:border-gray-900',
        ghost: 'border-0 bg-transparent focus:bg-gray-50',
      },
      inputSize: {
        sm: 'text-sm px-3 py-2 rounded-lg',
        md: 'text-base px-4 py-3 rounded-xl',
        lg: 'text-lg px-5 py-4 rounded-xl',
      },
      error: {
        true: 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10',
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ variant, inputSize, error: hasError }),
            'focus:outline-none',
            className
          )}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p className={cn(
            'mt-1.5 text-sm',
            hasError ? 'text-rose-600' : 'text-gray-500'
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
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            inputVariants({ variant, inputSize, error: hasError }),
            'focus:outline-none min-h-[100px] resize-y',
            className
          )}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p className={cn(
            'mt-1.5 text-sm',
            hasError ? 'text-rose-600' : 'text-gray-500'
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
