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
			.min(8, { message: 'Password must be at least 8 characters long' }),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.min(8, { message: 'Password must be at least 8 characters long' }),
		subsciption: z.string()
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm']
	});

export const RequestVerificationSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const ForgotPasswordSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const UpdateAvatarSchema = z.object({
	avatar: z.union([z.instanceof(File), z.string(), z.null()]).optional()
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
			.min(8, { message: 'Password must be at least 8 characters long' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(8, { message: 'Password must be at least 8 characters long' }),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.min(8, { message: 'Password must be at least 8 characters long' })
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['passwordConfirm']
	});

export const DeleteUserSchema = z.object({
	word: z.string().refine((data) => data === 'DELETE', { message: 'Word must be "DELETE"' })
});

export const MilestoneSchema = z.object({
	id: z.string(),
	notes: z.string(),
	goal_id: z.string().optional(),
	user_id: z.string().optional(),
	created: z.union([z.date().optional(), z.string().optional()]),
	updated: z.union([z.date().optional(), z.string().optional()])
});

export const GoalSchema = z.object({
	id: z.string(),
	title: z.string({ required_error: 'Title is required' }).min(1, { message: 'Title is required' }),
	description: z.string(),
	progress: z.number(),
	index: z.number(),
	milestones: z.array(MilestoneSchema).optional(),
	user_id: z.string().optional(),
	created: z.union([z.date().optional(), z.string().optional()]),
	updated: z.union([z.date().optional(), z.string().optional()])
});

export const emailSchema = z.object({
	email: z.string().email('Invalid email address')
});
