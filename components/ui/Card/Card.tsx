import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Card.module.css";

// Card — Design System Primitive
// Tokens: uses CSS custom properties from styles/tokens.css
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(styles.card, className)} {...props} />
  )
);
Card.displayName = "Card";
