import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({
  size = "md",
  className,
  ...props
}: SpinnerProps) {
  return (
    <div className={cn(styles.spinner, styles[size], className)} {...props}>
      <span className={styles.circle} />
    </div>
  );
}
