import { config as serverConfig } from '$lib/config-server';
import { config as clientConfig } from '$lib/config-client';

import Stripe from 'stripe';
const stripe = new Stripe(serverConfig.stripeSecretKey);

export async function POST() {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price: serverConfig.stripePriceIdLite,
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `${clientConfig.baseUrl}/thank-you`,
		cancel_url: clientConfig.baseUrl,
		custom_fields: [
			{
				key: 'github_username',
				label: {
					type: 'custom',
					custom: 'GitHub Username'
				},
				type: 'text'
			}
		]
	});

	return new Response(JSON.stringify({ id: session.id }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
