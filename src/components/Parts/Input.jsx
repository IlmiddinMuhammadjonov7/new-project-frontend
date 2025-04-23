import { cn } from "./utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-gray-300 px-4 py-2 text-sm shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}
