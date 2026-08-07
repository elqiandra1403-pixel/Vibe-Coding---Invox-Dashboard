import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondaryPill" | "outline" | "darkUtility" | "pearlCapsule" | "storeHero" | "iconCircular";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(styles.buttonBase, styles[variant], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
