export type PlanTier = "starter" | "professional" | "enterprise";

export interface Subscription {
  id: string;
  org_id: string;
  plan_tier: PlanTier;
  seats_used: number;
  seats_limit: number;
  billing_cycle: "monthly" | "annual";
  status: "active" | "past_due" | "cancelled";
  next_billing_date?: string;
}
