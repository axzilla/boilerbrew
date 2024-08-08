import { z } from 'zod';

export const LoginUserSchema = z.object({
	login: z
		.string({ required_error: 'Username or email is required' })
		.min(1, { message: 'Username or email is required' }),
	password: z.string({ required_error: 'Password is required' })
});

export const RegisterUserSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email must be a valid email' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const UpdateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const UpdateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const UpdatePasswordSchema = z
	.object({
		oldPassword: z
			.string({ required_error: 'Old password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const MilestoneSchema = z.object({
	id: z.string(),
	notes: z.string(),
	goal_id: z.string().optional(),
	user_id: z.string().optional(),
	created: z.union([z.date().optional(), z.string().optional()]),
	updated: z.union([z.date().optional(), z.string().optional()])
});
export type Milestone = z.infer<typeof MilestoneSchema>;

export const GoalSchema = z.object({
	id: z.string(),
	title: z
		.string({ required_error: 'Title is required' })
		.min(1, { message: 'Title is required' }),
	description: z.string(),
	progress: z.number(),
	index: z.number(),
	milestone: z.array(MilestoneSchema).optional(),
	user_id: z.string().optional(),
	created: z.union([z.date().optional(), z.string().optional()]),
	updated: z.union([z.date().optional(), z.string().optional()])
});
export type Goal = z.infer<typeof GoalSchema>;

export const DeleteUserSchema = z.object({
	word: z.string()
});
export type DeleteUser = z.infer<typeof DeleteUserSchema>;
