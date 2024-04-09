import { fail, redirect, type Actions } from '@sveltejs/kit';
import { registerUserSchema } from '$lib/schemas';
import { generateUsername } from '$lib/utils';
import type { PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerUserSchema))
	};
};

export const actions = {
	register: async ({ locals, request }) => {
		const form = await superValidate(request, zod(registerUserSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const formData = form.data;
		const username = generateUsername(formData.email.split('@').join('')).toLowerCase();
		try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			if (err.response?.data?.email) {
				return setError(form, 'email', err.response?.data?.email.message);
			}
		}
		redirect(303, '/login');
	}
} satisfies Actions;
