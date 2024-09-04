import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import type PocketBase from 'pocketbase';
import { config as serverConfig } from '$lib/config-server';
import { config as clientConfig } from '$lib/config-client';
import type { StripeAction, User } from '$lib/types';

const stripe = new Stripe(serverConfig.stripeSecretKey);

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.pb.authStore.isValid || !locals.user) {
		throw error(401, 'Unauthorized');
	}

	const { action, priceId }: { action: StripeAction; priceId: string } = await request.json();

	try {
		let result;
		let message = '';
		switch (action) {
			case 'create':
				result = await createSubscription(locals.user, priceId, locals.pb);
				return json({ success: true, sessionId: result.id });
			case 'update':
				result = await updateSubscription(locals.user, priceId);
				message = 'Subscription updated successfully';
				break;
			case 'cancel':
				result = await cancelSubscription(locals.user);
				message = 'Subscription cancelled successfully';
				break;
			default:
				return json({ success: false, message: 'Invalid action' }, { status: 400 });
		}

		await updateUserInDB(locals.user.id, result, locals.pb);
		return json({ success: true, message, subscription: result });
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Subscription action failed:', error);
		return json({ success: false, message: 'Subscription action failed' }, { status: 400 });
	}
};

async function createSubscription(user: User, priceId: string, pb: PocketBase) {
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
		success_url: `${clientConfig.baseUrl}/settings/plans?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${clientConfig.baseUrl}/settings/plans`,
		metadata: { userId: user.id }
	});
}

async function updateSubscription(user: User, priceId: string) {
	const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId!);
	return await stripe.subscriptions.update(user.stripeSubscriptionId!, {
		items: [{ id: subscription.items.data[0].id, price: priceId }],
		proration_behavior: 'always_invoice'
	});
}

async function cancelSubscription(user: User) {
	if (!user.stripeSubscriptionId) {
		throw new Error('User does not have a subscription');
	}

	return await stripe.subscriptions.update(user.stripeSubscriptionId, {
		cancel_at_period_end: true
	});
}

async function updateUserInDB(userId: string, subscription: Stripe.Subscription, pb: PocketBase) {
	try {
		await pb.collection('users').update(userId, {
			// Subscription
			stripeSubscriptionId: subscription.id,
			stripeSubscriptionStatus: subscription.status,
			stripeSubscriptionCurrentPeriodStart: new Date(subscription.current_period_start * 1000),
			stripeSubscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
			stripeSubscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
			stripeSubscriptionCanceledAt: subscription.canceled_at
				? new Date(subscription.canceled_at * 1000)
				: null,
			// SubscriptionItem
			stripeSubscriptionItemId: subscription.items.data[0]?.id,
			stripeSubscriptionItemPriceId: subscription.items.data[0].price.id
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error updating user subscription:', error);
		throw error;
	}
}
