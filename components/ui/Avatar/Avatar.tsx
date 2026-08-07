import * as React from "react";
import { cn } from "@/utils/cn";
import styles from "./Avatar.module.css";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={cn(styles.avatar, styles[size], className)} {...props}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={styles.fallback}>
          {fallback ? fallback.slice(0, 2).toUpperCase() : alt.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
