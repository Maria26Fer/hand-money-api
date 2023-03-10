import {z} from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  url_avatar: z.string(),
});