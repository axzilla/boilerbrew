import { fail, redirect, type Actions } from '@sveltejs/kit';
import { UpdatePasswordSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms';

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
		const form = await superValidate(request, zod(UpdatePasswordSchema));
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
