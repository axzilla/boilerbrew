import { fail, redirect, type Actions } from '@sveltejs/kit';
import { UpdateEmailSchema } from '$lib/schemas';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	return {
		form: await superValidate(locals.user, zod(UpdateEmailSchema))
	};
};

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateEmailSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').requestEmailChange(form.data.email);
			return message(form, 'Please confirm via your email.');
		} catch (err) {
			if (err instanceof ClientResponseError) {
				console.error('PB error: ', err);
				if (err.response?.data?.newEmail) {
					return setError(form, 'email', err.response?.data?.newEmail.message);
				}
			} else {
				console.error('Unexpected error:', err);
			}

			return fail(400, { form });
		}
	}
};
