import { clsx, type ClassValue } from "clsx";

// className merge utility (replaces twMerge for non-Tailwind projects)
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
