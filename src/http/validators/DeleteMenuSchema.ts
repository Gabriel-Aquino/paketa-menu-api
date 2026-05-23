import z from "zod";

const deleteMenuSchema = z.object({
    id: z.string({ message: 'Id is required' }),
});

export { deleteMenuSchema }