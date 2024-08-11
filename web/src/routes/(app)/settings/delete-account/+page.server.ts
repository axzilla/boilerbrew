import { UpdateAvatarSchema } from '$lib/schemas';
import { redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
};

export const actions: Actions = {
	deleteAccount: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(UpdateAvatarSchema));

		if (!form.valid) {
			return fail(400, form);
		}

		try {
			await locals.pb.collection('users').delete(locals.user?.id);
			locals.pb.authStore.clear();
			locals.user = null;
			redirect(303, '/login');
		} catch (err) {
			if (err instanceof ClientResponseError) {
				console.log('PB error: ', err);
			} else {
				console.error('Unexpected error:', err);
			}
		}
	}
};
