import { config } from '$lib/config-server';
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import PocketBase, { type AdminAuthResponse } from 'pocketbase';

const stripe = new Stripe(config.stripeSecretKey);
const pb = new PocketBase(config.pocketbaseUrl);

// Create a single instance of PocketBase
let authPromise: Promise<AdminAuthResponse> | null = null;

async function ensureAuthenticated() {
	if (!pb.authStore.isValid) {
		if (!authPromise) {
			authPromise = (async () => {
				try {
					const authData = await pb.admins.authWithPassword(
						config.pocketbaseAdminEmail,
						config.pocketbaseAdminPassword
					);
					return authData;
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Authentication error:', error);
					authPromise = null;
					throw error;
				}
			})();
		}
		await authPromise;
	}
}

export async function POST({ request }: { request: Request }) {
	try {
		await ensureAuthenticated();

		const body = await request.text();
		const sig = request.headers.get('stripe-signature');
		const webhookSecret = config.stripeWebhookSecret;

		if (!sig || !webhookSecret) {
			return json({ error: 'Missing Stripe signature or webhook secret' }, { status: 400 });
		}

		const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

		switch (event.type) {
			case 'checkout.session.completed':
				await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
				break;
			case 'customer.subscription.created':
			case 'customer.subscription.updated':
				await handleSubscriptionChange(event.data.object as Stripe.Subscription);
				break;
			case 'customer.subscription.deleted':
				await handleSubscriptionChange(event.data.object as Stripe.Subscription);
				break;
		}

		return json({ received: true });
	} catch (error) {
		// esoint-disable-next-line no-console
		console.error('Webhook error:', error);
		return json({ error: (error as Error).message }, { status: 400 });
	}
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
	const userId = session.metadata?.userId;
	const subscriptionId = session.subscription as string;

	if (userId && subscriptionId) {
		const subscription = await stripe.subscriptions.retrieve(subscriptionId);
		await updateUserSubscription(userId, subscription);
	}
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
	const userId = subscription.metadata?.userId;
	if (userId) {
		await updateUserSubscription(userId, subscription);
	}
}

async function updateUserSubscription(userId: string, subscription: Stripe.Subscription) {
	try {
		await pb.collection('users').update(userId, {
			stripeSubscriptionId: subscription.id,
			stripeSubscriptionItemId: subscription.items.data[0]?.id,
			stripePlanId: subscription.items.data[0]?.price?.id,
			stripeSubscriptionStatus: subscription.status,
			stripeSubscriptionPeriodEnd: new Date(subscription.current_period_end * 1000)
		});
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error updating user subscription:', error);
		throw error;
	}
}
