import { UpdateEmailSchema } from '$lib/schemas';
import { type Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError } from 'pocketbase';

export const actions: Actions = {
	verifyEmail: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateEmailSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').requestVerification(form.data.email);
			return { form };
		} catch (err) {
			if (err instanceof ClientResponseError) {
				console.error('PB error: ', err);
			} else {
				console.error('Unexpected error:', err);
			}

			return fail(400, { form });
		}
	}
};
