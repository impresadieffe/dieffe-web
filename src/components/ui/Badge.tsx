type BadgeColor = 'accent' | 'primary' | 'green' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
}

const colorMap: Record<BadgeColor, string> = {
  accent: 'bg-accent/10 text-accent',
  primary: 'bg-primary/10 text-primary',
  green: 'bg-green-100 text-green-700',
  gray: 'bg-gray-100 text-gray-600',
};

export default function Badge({ children, color = 'accent' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}
