import * as z from 'zod'
import {MAX_SHORT_URL_LENGTH} from "../config/constants.js";

export const BaseUrlSchema = z.object({
    shortUrl: z.string().min(1).max(MAX_SHORT_URL_LENGTH),
    longUrl: z.url(),
    groupId: z.number().int().positive().min(1)
});


export const IdUrlSchema = z.object({
   id: z.coerce.number().int().positive().min(1),
});
