import Link from 'next/link';
import Spinner from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-dark focus-visible:ring-accent',
  secondary:
    'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
  outline:
    'border-2 border-accent text-accent hover:bg-accent hover:text-white focus-visible:ring-accent',
  ghost:
    'text-accent hover:underline underline-offset-4 focus-visible:ring-accent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

function buildClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  loading: boolean,
  disabled: boolean,
  className: string,
) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer';
  const disabledClass =
    disabled || loading ? 'opacity-50 pointer-events-none' : '';

  return [base, variantClasses[variant], sizeClasses[size], disabledClass, className]
    .filter(Boolean)
    .join(' ');
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  href,
  onClick,
}: ButtonProps) {
  const classes = buildClassName(variant, size, loading, disabled, className);

  const content = (
    <>
      {loading && <Spinner size="sm" color="currentColor" />}
      {children}
    </>
  );

  if (href !== undefined) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
