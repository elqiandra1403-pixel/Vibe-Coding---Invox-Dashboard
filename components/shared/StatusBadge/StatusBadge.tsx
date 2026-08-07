import * as React from "react";
import { InvoiceStatus } from "@/features/invoices/types";
import { INVOICE_STATUS_CONFIG } from "@/constants/invoiceStatus";
import { cn } from "@/utils/cn";
import styles from "./StatusBadge.module.css";

export function StatusBadge({ 
  status, 
  className 
}: { 
  status: InvoiceStatus;
  className?: string;
}) {
  const config = INVOICE_STATUS_CONFIG[status];
  
  return (
    <span className={cn(styles.badge, styles[`status_${status}`], className)}>
      <span className={styles.dot} aria-hidden="true" />
      {config.label}
    </span>
  );
}
