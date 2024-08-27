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
