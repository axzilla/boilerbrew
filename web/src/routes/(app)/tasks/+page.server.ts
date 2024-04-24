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
		const formData = await request.formData();
		const form = await superValidate(formData, zod(TaskSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			if (!form.data.id) {
				// CREATE TASK
				const task = await locals.pb
					.collection('tasks')
					.create({ ...form.data, user_id: locals.user?.id });

				return { form, task };
			} else {
				if (formData.has('delete')) {
					// DELETE TASK
					const task = await locals.pb.collection('tasks').delete(form.data.id);
					return { form, task };
				} else {
					// UPDATE TASK
					const task = await locals.pb.collection('tasks').update(form.data.id, form.data);
					return { form, task };
				}
			}
		} catch (err) {
			console.log('Error: ', err);
			return setError(form, '');
		}
	}
};
