import z from "@/node_modules/zod/v4/classic/external.cjs";

export const issueSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(255),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(65535),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255)
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(65535)
    .optional(),
  assignToUserId: z
    .string()
    .min(1, "Assigning user Id is required")
    .max(255)
    .optional()
    .nullable(),
});
