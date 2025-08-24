import * as z from 'zod'

export const GroupsSchema = z.object({
    name: z.string().min(1)
});

export const IdGroupsSchema = z.object({
   id: z.coerce.number().int().positive().min(1)
});
