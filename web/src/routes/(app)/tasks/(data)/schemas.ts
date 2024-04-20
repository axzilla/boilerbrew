import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.string(),
	details: z.string({ required_error: 'Details is required' }),
	status: z.string({ required_error: 'Status is required' }),
	priority: z.string({ required_error: 'Priority is required' })
});

export type Task = z.infer<typeof taskSchema>;
