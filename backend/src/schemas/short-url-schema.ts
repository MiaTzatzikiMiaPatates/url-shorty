import * as z from "zod"

export const ShortUrlSchema = z.object({
   shortUrl: z.string().min(1)
});