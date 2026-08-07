# Invox Architecture

See the full architecture blueprint in the Phase 1 implementation plan.

## Quick Reference

- **Frontend:** Next.js 14 App Router, React Server Components, TypeScript
- **Backend:** Next.js API Routes (server-authoritative), Supabase Postgres + RLS
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **State:** TanStack Query (server state) + Zustand (3 global stores)
- **Email:** Resend/SendGrid + React Email templates
- **Hosting:** Vercel (frontend + API + Cron) + Supabase (DB + Storage)
- **Testing:** Vitest (unit/integration) + Playwright (E2E)
