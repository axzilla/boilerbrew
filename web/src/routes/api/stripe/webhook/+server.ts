import { config } from '$lib/config-server';
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripeSecretKey);

export async function POST({ request }: { request: Request }) {
	try {
		const body = await request.text();
		const sig = request.headers.get('stripe-signature');
		const webhookSecret = config.stripeWebhookSecret;

		if (!sig || !webhookSecret) {
			return json({ error: 'Missing Stripe signature or webhook secret' }, { status: 400 });
		}

		const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;
			// eslint-disable-next-line no-console
			console.log('checkout.session.completed', session);
			return json({ success: true, message: 'Collaborator invitation sent successfully' });
		}

		return json({ received: true });
	} catch (error) {
		if (error instanceof Error) {
			// eslint-disable-next-line no-console
			console.error('Webhook error:', error);
			return json({ error: error.message }, { status: 400 });
		}
		// eslint-disable-next-line no-console
		console.error('Unknown webhook error:', error);
	}
}
