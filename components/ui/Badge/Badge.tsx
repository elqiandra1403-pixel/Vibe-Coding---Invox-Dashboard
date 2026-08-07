import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Badge.module.css";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "outline" | "muted";
}

export function Badge({ 
  children, 
  variant = "primary", 
  className,
  ...props 
}: BadgeProps) {
  return (
    <span 
      className={cn(styles.badge, styles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
