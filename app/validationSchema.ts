import { z } from 'zod';

const IssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export { IssueSchema }