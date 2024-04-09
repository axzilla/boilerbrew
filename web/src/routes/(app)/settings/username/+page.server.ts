import { fail, redirect, type Actions } from '@sveltejs/kit';
import { updateUsernameSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { message, setError, superValidate } from 'sveltekit-superforms';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	return {
		form: await superValidate(locals.user, zod(updateUsernameSchema))
	};
};

export const actions: Actions = {
	updateUsername: async ({ request, locals }) => {
		const form = await superValidate(request, zod(updateUsernameSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const formData = form.data;
		try {
			await locals.pb.collection('users').update(locals.user?.id, { username: formData.username });
			return message(form, 'Username updated.');
		} catch (err) {
			console.log('Error: ', err);
			if (err.response?.data?.username) {
				return setError(form, 'username', err.response?.data?.username.message);
			}
		}
		return { form };
	}
};
