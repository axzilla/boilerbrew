import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import type PocketBase from 'pocketbase';
import { config as serverConfig } from '$lib/config-server';
import { config as clientConfig } from '$lib/config-client';
import type { StripeAction } from '$lib/types';

const stripe = new Stripe(serverConfig.stripeSecretKey);

interface User {
	id: string;
	stripeCustomerId: string;
	stripeSubscriptionId?: string;
	email: string;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	const { action, priceId }: { action: StripeAction; priceId: string } = await request.json();
	const user = locals.user as User;

	try {
		let result;
		let message = '';
		switch (action) {
			case 'create':
				result = await createSubscription(user, priceId, locals.pb);
				return json({ success: true, sessionId: result.id });
			case 'update':
				result = await updateSubscription(user, priceId);
				message = 'Subscription updated successfully';
				break;
			case 'cancel':
				result = await cancelSubscription(user);
				message = 'Subscription cancelled successfully';
				break;
			default:
				return json({ success: false, message: 'Invalid action' }, { status: 400 });
		}

		await updateUserInDB(user.id, result, locals.pb);
		return json({ success: true, message, subscription: result });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Subscription action failed:', error);
		return json({ success: false, message: 'Subscription action failed' }, { status: 400 });
	}
};

async function createSubscription(
	user: User,
	priceId: string,
	pb: PocketBase
): Promise<Stripe.Checkout.Session> {
	// Create or retrieve Stripe Customer
	let customer;
	if (user.stripeCustomerId) {
		// If user already has a Stripe Customer ID, retrieve the customer
		customer = await stripe.customers.retrieve(user.stripeCustomerId);
	} else {
		// If user doesn't have a Stripe Customer ID, create a new customer
		customer = await stripe.customers.create({
			email: user.email,
			metadata: { userId: user.id }
		});
		// Save the new Stripe Customer ID in the database
		await pb.collection('users').update(user.id, { stripeCustomerId: customer.id });
	}

	return await stripe.checkout.sessions.create({
		customer: customer.id,
		line_items: [{ price: priceId, quantity: 1 }],
		mode: 'subscription',
		success_url: `${clientConfig.baseUrl}/settings/plans`,
		cancel_url: `${clientConfig.baseUrl}/settings/plans`,
		metadata: { userId: user.id }
	});
}

async function updateSubscription(user: User, priceId: string): Promise<Stripe.Subscription> {
	const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId!);
	return await stripe.subscriptions.update(user.stripeSubscriptionId!, {
		items: [{ id: subscription.items.data[0].id, price: priceId }],
		proration_behavior: 'always_invoice'
	});
}

async function cancelSubscription(user: User): Promise<Stripe.Subscription> {
	return await stripe.subscriptions.update(user.stripeSubscriptionId!, {
		cancel_at_period_end: true
	});
}

async function updateUserInDB(
	userId: string,
	subscriptionData: Stripe.Subscription,
	pb: PocketBase
) {
	const updateData: Record<string, string | Date> = {
		stripeSubscriptionId: subscriptionData.id,
		stripeSubscriptionStatus: subscriptionData.status,
		subscriptionPeriodEnd: new Date(subscriptionData.current_period_end * 1000)
	};

	if (subscriptionData.items.data.length > 0) {
		updateData.stripeSubscriptionItemId = subscriptionData.items.data[0].id;
		updateData.stripePlanId = subscriptionData.items.data[0].price.id;
	}

	await pb.collection('users').update(userId, updateData);
}
