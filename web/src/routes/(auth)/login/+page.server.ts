import { fail, type Actions } from '@sveltejs/kit';
import { LoginUserSchema } from '$lib/schemas';
import type { PageServerLoad } from './$types.js';
import { superValidate, setError, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(LoginUserSchema))
	};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const form = await superValidate(request, zod(LoginUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const formData = form.data;

		try {
			await locals.pb.collection('users').authWithPassword(formData.login, formData.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				throw message(form, 'Please verify your email address.');
			}

			return { form };
		} catch (err) {
			console.log('Error: ', err);
			return setError(form, '');
		}
	}
};
