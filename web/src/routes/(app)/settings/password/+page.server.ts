import { fail, redirect } from '@sveltejs/kit';
import { updatePasswordSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	return {
		form: await superValidate(zod(updatePasswordSchema))
	};
};

export const actions = {
	updatePassword: async ({ request, locals }) => {
		const form = await superValidate(request, zod(updatePasswordSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const formData = form.data;
		try {
			await locals.pb.collection('users').update(locals.user?.id, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			console.log('Error: ', err);
			if (err.response?.data?.oldPassword) {
				return setError(form, 'oldPassword', err.response?.data?.oldPassword.message);
			}
		}
		redirect(303, '/login');
	}
};
