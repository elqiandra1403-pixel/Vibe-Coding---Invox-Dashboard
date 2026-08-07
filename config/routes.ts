// Typed route constants — never use magic strings in <Link href="">
export const ROUTES = {
  auth: {
    login: "/login",
    invite: (token: string) => `/invite/${token}`,
  },
  app: {
    dashboard: "/dashboard",
    invoices: {
      list: "/invoices",
      new: "/invoices/new",
      detail: (id: string) => `/invoices/${id}`,
    },
    customers: {
      list: "/customers",
      detail: (id: string) => `/customers/${id}`,
    },
    payments: "/payments",
    analytics: "/analytics",
    reports: "/reports",
    settings: {
      organization: "/settings/organization",
      users: "/settings/users",
    },
    subscription: "/subscription",
    auditLog: "/audit-log",
  },
  portal: {
    invoices: "/invoices",
    detail: (id: string) => `/invoices/${id}`,
  },
} as const;
