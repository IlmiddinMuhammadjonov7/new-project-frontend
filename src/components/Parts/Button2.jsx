// components/Parts/Button2.jsx
import { cn } from './utils';

export function Button({ children, className, variant = 'default', ...props }) {
  const base = 'px-4 py-2 rounded-lg transition-all';

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-400 text-gray-800 bg-white hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props} // MUHIM: onClick va boshqalarni uzatadi
    >
      {children}
    </button>
  );
}
