import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { TaskSchema } from '$lib/schemas.js';
import { type Actions } from '@sveltejs/kit';
import { fail, setError, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(TaskSchema));
	return { form };
};

export const actions: Actions = {
	createTask: async ({ request, locals }) => {
		const form = await superValidate(request, zod(TaskSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		const formData = form.data;
		try {
			if (formData.id) {
				const task = await locals.pb.collection('tasks').update(formData.id, formData);
				return { form, task };
			} else {
				const task = await locals.pb
					.collection('tasks')
					.create({ ...formData, user_id: locals.user?.id });
				return { form, task };
			}
		} catch (err) {
			console.log('Error: ', err);
			console.log(err.response.data);
			return setError(form, '');
		}
	}
};
