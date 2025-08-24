import * as z from "zod"

export const ClickstatsSchema = z.object({
   id: z.coerce.number().int().positive().min(1)
});