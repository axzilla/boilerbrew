import { UpdateAvatarSchema } from '$lib/schemas';
import { error, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
};

export const actions: Actions = {
	deleteAccount: async ({ request, locals }) => {
		if (!locals.pb.authStore.isValid || !locals.user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateAvatarSchema));

		if (!form.valid) {
			return fail(400, form);
		}

		try {
			await locals.pb.collection('users').delete(locals.user?.id);
			locals.pb.authStore.clear();
			locals.user = null;
			redirect(303, '/login');
		} catch (err) {
			if (err instanceof ClientResponseError) {
				// eslint-disable-next-line no-console
				console.error('PB error: ', err);
			} else {
				// eslint-disable-next-line no-console
				console.error('Unexpected error:', err);
			}

			return fail(400, form);
		}
	}
};
