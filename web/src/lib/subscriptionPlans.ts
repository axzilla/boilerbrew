export type Statistics = 'basic' | 'advanced';
export type SubscriptionPlan = 'free' | 'pro' | 'premium';

export type PlanFeatures = {
	maxGoals: number;
	aiFeatures: boolean;
	statistics: Statistics;
};

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, PlanFeatures> = {
	free: {
		maxGoals: 1,
		aiFeatures: false,
		statistics: 'basic'
	},
	pro: {
		maxGoals: 5,
		aiFeatures: false,
		statistics: 'advanced'
	},
	premium: {
		maxGoals: Infinity,
		aiFeatures: true,
		statistics: 'advanced'
	}
};

export const ALL_SUBSCRIPTION_PLANS: SubscriptionPlan[] = ['free', 'pro', 'premium'];

export function getUserPermissions(subscriptionType: SubscriptionPlan | null): PlanFeatures {
	return subscriptionType ? SUBSCRIPTION_PLANS[subscriptionType] : SUBSCRIPTION_PLANS['free'];
}

export function getNextSubscriptionPlan(currentPlan: SubscriptionPlan): SubscriptionPlan | null {
	const index = ALL_SUBSCRIPTION_PLANS.indexOf(currentPlan);
	return index < ALL_SUBSCRIPTION_PLANS.length - 1 ? ALL_SUBSCRIPTION_PLANS[index + 1] : null;
}

export function isPlanEqualOrBetter(
	userPlan: SubscriptionPlan,
	requiredPlan: SubscriptionPlan
): boolean {
	return ALL_SUBSCRIPTION_PLANS.indexOf(userPlan) >= ALL_SUBSCRIPTION_PLANS.indexOf(requiredPlan);
}

export function getPlanName(plan: SubscriptionPlan): string {
	const names: Record<SubscriptionPlan, string> = {
		free: 'Kostenlos',
		pro: 'Pro',
		premium: 'Premium'
	};
	return names[plan];
}
