import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {icon && (
          <div className={styles.iconLeft}>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            styles.input,
            icon && styles.hasIconLeft,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
