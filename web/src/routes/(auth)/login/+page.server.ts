import { fail, type Actions } from '@sveltejs/kit';
import { LoginUserSchema } from '$lib/schemas';
import { superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ClientResponseError } from 'pocketbase';

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
				setError(form, 'login', 'Please verify your email address.');
				return fail(400, { form });
			}

			return { form };
		} catch (err) {
			if (err instanceof ClientResponseError) {
				console.error('PB error: ', err);
				setError(form, 'login', 'Invalid credentials');
				setError(form, 'password', 'Invalid credentials');
			} else {
				console.error('Unexpected error:', err);
			}

			return fail(400, { form });
		}
	}
};
