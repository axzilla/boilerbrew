import { fail, type Actions } from '@sveltejs/kit';
import { LoginUserSchema } from '$lib/schemas';
import type { PageServerLoad } from './$types.js';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(LoginUserSchema))
	};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(LoginUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').authWithPassword(form.data.login, form.data.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return setError(form, 'login', 'Please verify your email address.');
			}

			return { form };
		} catch (err: unknown) {
			console.error('Login error:', err);

			if (err instanceof ClientResponseError) {
				// PocketBase specific error
				if (err.status === 400) {
					// Set error for both login and password fields
					setError(form, 'login', 'Invalid email or password');
					setError(form, 'password', 'Invalid email or password');
					return fail(400, { form });
				} else {
					return setError(form, '', err.message);
				}
			} else if (err instanceof Error) {
				// Generic Error object
				return setError(
					form,
					'',
					err.message || 'An unexpected error occurred. Please try again later.'
				);
			} else {
				// Unknown error type
				return setError(form, '', 'An unexpected error occurred. Please try again later.');
			}
		}
	}
};
