import "server-only";
// Email provider client (Resend or SendGrid)
// Phase 2: Initialize with RESEND_API_KEY or SENDGRID_API_KEY
export const emailClient = {
  send: async (_options: { to: string; subject: string; html: string }) => {},
};
