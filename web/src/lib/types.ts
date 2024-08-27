import type { RecordModel } from 'pocketbase';

export type StripeAction = 'create' | 'update' | 'cancel';

export interface User extends RecordModel {
	id: string;
	username: string;
	email: string;
	name?: string;
	avatar?: string;
	subscription?: string;
	stripeCustomerId?: string;
	stripeSubscriptionId?: string;
	stripeSubscriptionItemId?: string;
	stripePlanId?: string;
	stripeSubscriptionStatus?: string;
	stripeSubscriptionPeriodEnd?: number;
}

export interface Goal extends RecordModel {
	title: string;
	description: string;
	progress: number;
	milestones: Milestone[];
}

export interface Milestone extends RecordModel {
	notes: string;
	goal_id: string;
	user_id: string;
}
