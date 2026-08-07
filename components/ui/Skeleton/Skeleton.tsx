import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Skeleton.module.css";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      {...props}
    />
  );
}
