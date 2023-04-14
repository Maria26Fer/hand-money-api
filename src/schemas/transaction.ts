import { z } from "zod";

export const transactionSchema = z.object({
  category_id: z.string().uuid(),
  description: z.string().optional(),
  type: z.string(),
  title: z.string().max(60),
  value: z.number(),
  wallet_id: z.string().uuid()
})