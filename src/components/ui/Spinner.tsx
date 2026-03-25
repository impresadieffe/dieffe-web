type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

export default function Spinner({
  size = 'md',
  color = 'currentColor',
  className = '',
}: SpinnerProps) {
  const px = sizeMap[size];

  return (
    <svg
      className={`animate-spin ${className}`}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Caricamento…"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
