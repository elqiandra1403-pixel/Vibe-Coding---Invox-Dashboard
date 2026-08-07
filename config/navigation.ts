import { Role } from "@/types/auth";

export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide-react icon name
  roles: Role[];
  group: "operational" | "insights" | "administrative";
}

// Sidebar navigation — filtered by user role at render time
export const NAV_ITEMS: NavItem[] = [
  // Operational
  { label: "Dashboard",    href: "/dashboard",            icon: "LayoutDashboard", roles: ["admin", "finance"],         group: "operational" },
  { label: "Invoices",     href: "/invoices",             icon: "FileText",        roles: ["admin", "finance", "client"], group: "operational" },
  { label: "Customers",    href: "/customers",            icon: "Users",           roles: ["admin", "finance"],         group: "operational" },
  { label: "Payments",     href: "/payments",             icon: "CreditCard",      roles: ["admin", "finance"],         group: "operational" },
  // Insights
  { label: "Analytics",   href: "/analytics",            icon: "BarChart3",       roles: ["admin", "finance"],         group: "insights" },
  { label: "Reports",     href: "/reports",              icon: "Download",        roles: ["admin", "finance"],         group: "insights" },
  // Administrative
  { label: "Subscription", href: "/subscription",         icon: "Star",            roles: ["admin"],                    group: "administrative" },
  { label: "Settings",    href: "/settings/organization", icon: "Settings",        roles: ["admin"],                    group: "administrative" },
  { label: "Audit Log",   href: "/audit-log",            icon: "Shield",          roles: ["admin"],                    group: "administrative" },
];

export function filterNavByRole(role: Role): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
