import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { UpdatePasswordSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

import Stripe from 'stripe';
import { config } from '$lib/config-server';

// Initialisiere Stripe mit deinem geheimen Schlüssel
const stripe = new Stripe(config.stripeSecretKey);

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	const sessionId = url.searchParams.get('session_id');
	let stripeSession = null;
	let subscription = null;

	if (sessionId) {
		console.log('Session ID:', sessionId);

		try {
			// Abrufen der Checkout Session von Stripe direkt mit dem SDK ex
			// expand with subscription data
			stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
				expand: ['subscription']
			});
			subscription = stripeSession.subscription;
		} catch (err) {
			console.error('Error retrieving Stripe session:', err);
		}
	} else {
		console.log('No session ID found');
	}
	// http://localhost:5173/settings/plans?session_id=cs_test_a1GjyOFOAWvivStjUgvss5ZkVjBy3f8btvR2Vtqr8T8d62Pzv9No6VHKpx
	return {
		form: await superValidate(zod(UpdatePasswordSchema))
	};
};

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
		if (!locals.pb.authStore.isValid || !locals.user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdatePasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			if (err instanceof ClientResponseError) {
				// eslint-disable-next-line no-console
				console.error('PB error: ', err);
				if (err.response.data.password) {
					setError(form, 'password', err.response.data.password.message);
				}
			} else {
				// eslint-disable-next-line no-console
				console.error('Unexpected error:', err);
			}

			return fail(400, { form });
		}
	}
};
