import { config as serverConfig } from '$lib/config-server';
import { config as clientConfig } from '$lib/config-client';

import Stripe from 'stripe';
const stripe = new Stripe(serverConfig.stripeSecretKey || '');

export async function POST({ request }) {
	const { priceId } = await request.json();

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		mode: 'subscription',
		success_url: `${clientConfig.baseUrl}/settings/plans`,
		cancel_url: clientConfig.baseUrl
	});

	return new Response(JSON.stringify({ id: session.id }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
