import { fail, redirect, type Actions } from '@sveltejs/kit';
import { RegisterUserSchema } from '$lib/schemas';
import { generateUsername } from '$lib/utils';
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(RegisterUserSchema))
	};
};

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(RegisterUserSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const username = generateUsername(form.data.email.split('@').join('')).toLowerCase();
		try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(form.data.email);
		} catch (err) {
			console.log('Error: ', err);
			if (err.response?.data?.email) {
				return setError(form, 'email', err.response?.data?.email.message);
			}
		}
		redirect(303, '/login');
	}
};
