import { fail, redirect, type Actions } from '@sveltejs/kit';
import { UpdatePasswordSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';
import { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	return {
		form: await superValidate(zod(UpdatePasswordSchema))
	};
};

export const actions: Actions = {
	updatePassword: async ({ request, locals }) => {
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
				console.error('PB error: ', err);
				if (err.response.data.password) {
					setError(form, 'password', err.response.data.password.message);
				}
			} else {
				console.error('Unexpected error:', err);
			}

			return fail(400, { form });
		}

		// FIXME: Do we need a logout here?
	}
};
