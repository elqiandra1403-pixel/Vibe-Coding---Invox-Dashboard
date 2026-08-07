import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");
export const phoneSchema = z.string().regex(/^[\d\s\+\-]+$/, "Invalid phone format").optional();
export const isoDateSchema = z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date format");
export const currencyCodeSchema = z.string().length(3, "Must be a valid ISO 4217 currency code");
export const uuidSchema = z.string().uuid("Invalid ID format");
export const positiveNumber = z.number().positive("Must be greater than 0");
export const nonNegativeNumber = z.number().min(0, "Must be 0 or greater");
export const percentageSchema = z.number().min(0).max(100, "Must be between 0 and 100");
