import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { UpdateAvatarSchema } from '$lib/schemas.js';
import type { Actions } from '@sveltejs/kit';
import { fail, message, setError, superValidate, withFiles } from 'sveltekit-superforms';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(UpdateAvatarSchema));
	return { form };
};

export const actions: Actions = {
	updateAvatar: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateAvatarSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id, form.data);
			return message(form, 'Avatar updated.');
		} catch (err) {
			console.log('Error: ', err);
			if (err.response?.data?.username) {
				return setError(form, 'username', err.response?.data?.username.message);
			}
		}
		return withFiles({ form });
	}
};
