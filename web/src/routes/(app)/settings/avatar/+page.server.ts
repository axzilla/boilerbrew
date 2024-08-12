import { zod } from 'sveltekit-superforms/adapters';
import { UpdateAvatarSchema } from '$lib/schemas.js';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail, setError, superValidate, withFiles } from 'sveltekit-superforms';
import { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	return {
		form: await superValidate(locals.user, zod(UpdateAvatarSchema))
	};
};

export const actions: Actions = {
	updateAvatar: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateAvatarSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		try {
			console.log(form.data);
			await locals.pb.collection('users').update(locals.user?.id, form.data);
			return withFiles({ form });
		} catch (err) {
			if (err instanceof ClientResponseError) {
				console.log('PB error: ', err);
				setError(form, 'avatar', 'Error updating avatar.');
			} else {
				console.error('Unexpected error:', err);
			}

			// return fail(400, withFiles({ form }));
		}
	}
};
