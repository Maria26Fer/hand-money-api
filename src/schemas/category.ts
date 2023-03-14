import { z } from "zod";

export const categorySchema = z.object({
  title: z.string().min(1),
  color: z.string().min(4)
})