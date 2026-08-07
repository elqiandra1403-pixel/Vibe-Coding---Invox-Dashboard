// Type-safe environment variable access
// Phase 2: Use t3-env or similar for runtime validation
export const env = {
  // Public (safe to expose to client)
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,

  // Server-only (never expose to client)
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  resendApiKey: process.env.RESEND_API_KEY,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
  googleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
  sentryDsn: process.env.SENTRY_DSN,
  cronSecret: process.env.CRON_SECRET!,
} as const;
