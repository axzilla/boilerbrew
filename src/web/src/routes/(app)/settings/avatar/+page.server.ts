import { zod } from 'sveltekit-superforms/adapters';
import { UpdateAvatarSchema } from '$lib/schemas.js';
import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import { setError, superValidate, withFiles } from 'sveltekit-superforms/server';
import { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	return {
		form: await superValidate(locals.user, zod(UpdateAvatarSchema))
	};
};

export const actions: Actions = {
	updateAvatar: async ({ request, locals }) => {
		if (!locals.pb.authStore.isValid || !locals.user) {
			throw error(401, 'Unauthorized');
		}

		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateAvatarSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		try {
			await locals.pb.collection('users').update(locals.user.id, form.data);
			return withFiles({ form });
		} catch (err) {
			if (err instanceof ClientResponseError) {
				// eslint-disable-next-line no-console
				console.error('PocketBase error:', err);
				setError(form, 'avatar', 'Error updating avatar. Please try again.');
			} else {
				// eslint-disable-next-line no-console
				console.error('Unexpected error:', err);
				setError(form, '', 'An unexpected error occurred. Please try again later.');
			}
			return fail(400, withFiles({ form }));
		}
	}
};
