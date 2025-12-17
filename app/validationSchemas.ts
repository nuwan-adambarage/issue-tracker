import z from "@/node_modules/zod/v4/classic/external.cjs";

export const issueSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long")
});
