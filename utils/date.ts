// Date formatting utilities
const FORMAT_OPTIONS: Record<"short" | "medium" | "long", Intl.DateTimeFormatOptions> = {
  short:  { month: "numeric", day: "numeric", year: "2-digit" },
  medium: { month: "short", day: "numeric", year: "numeric" },
  long:   { month: "long", day: "numeric", year: "numeric" },
};

export function formatDate(date?: string | null, format: "short" | "medium" | "long" = "medium"): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  const options = FORMAT_OPTIONS[format];
  return new Intl.DateTimeFormat("en-US", options).format(d);
}

export function relativeDate(date?: string | null): string {
  if (!date) return "";
  const now = new Date();
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(date, "medium");
}

export function isOverdue(dueDate?: string | null): boolean {
  if (!dueDate) return false;
  const d = new Date(dueDate);
  if (isNaN(d.getTime())) return false;
  return d < new Date() && d.setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
}

export function daysDiff(dateA?: string | null, dateB?: string | null): number {
  if (!dateA || !dateB) return 0;
  const a = new Date(dateA);
  const b = new Date(dateB);
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return 0;
  return Math.abs(Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));
}
