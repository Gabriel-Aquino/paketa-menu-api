import z from "zod";

const createMenuSchema = z.object({
    name: z.string({ message: 'Name is required' }),
    relatedId: z.string().nullable().optional(),
});

export { createMenuSchema }