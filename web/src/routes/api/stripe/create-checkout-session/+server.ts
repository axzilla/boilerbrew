import { config as serverConfig } from '$lib/config-server';
import { config as clientConfig } from '$lib/config-client';

import Stripe from 'stripe';
const stripe = new Stripe(serverConfig.stripeSecretKey || '');

export async function POST({ request, locals }: { request: Request; locals: App.Locals }) {
	const { priceId } = await request.json();
	const userId = locals.user?.id;

	// Retrieve user from the database
	const user = await locals.pb.collection('users').getOne(userId);

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
		await locals.pb.collection('users').update(userId, { stripeCustomerId: customer.id });
	}

	// Check if the customer already has an active subscription
	if (user.stripeSubscriptionId) {
		// Case: Existing subscription - Update the subscription
		const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
		const updatedSubscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
			items: [
				{
					id: subscription.items.data[0].id,
					price: priceId
				}
			],
			proration_behavior: 'always_invoice' // or 'create_prorations' depending on your needs
		});

		// Return updated subscription info - no new payment required
		return new Response(
			JSON.stringify({
				type: 'subscription_updated',
				subscriptionId: updatedSubscription.id
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} else {
		// Case: New subscription - Create a new Checkout Session
		const session = await stripe.checkout.sessions.create({
			customer: customer.id,
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			mode: 'subscription',
			// success_url: `${clientConfig.baseUrl}/settings/plans?session_id={CHECKOUT_SESSION_ID}`,
			success_url: `${clientConfig.baseUrl}/settings/plans`,
			cancel_url: clientConfig.baseUrl,
			metadata: { userId: userId }
		});

		// Return new session ID for redirect to Stripe Checkout
		return new Response(
			JSON.stringify({
				// type: 'checkout_session_created',
				// sessionId: session.id
				id: session.id
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}
}
