import {z} from "zod";

export const cardSchema = z.object({
  alias: z.string().max(60).trim(),
  type: z.enum(["CREDIT","DEBIT"]),
  lastNumbers: z.number().int(),
  user_id: z.string().uuid()
})