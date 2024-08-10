import { fail, redirect, type Actions } from '@sveltejs/kit';
import { UpdateUsernameSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { message, setError, superValidate } from 'sveltekit-superforms';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	return {
		form: await superValidate(locals.user, zod(UpdateUsernameSchema))
	};
};

export const actions: Actions = {
	updateUsername: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateUsernameSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id, { username: form.data.username });
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
