import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { ListSchema, TaskSchema, type List, type Task } from '$lib/schemas.js';
import { type Actions } from '@sveltejs/kit';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { id } = params;
	const form = await superValidate(zod(ListSchema));

	const lists: List[] = await locals.pb
		.collection('lists')
		.getFullList({ filter: `board_id = "${id}"` });
	const tasks: Task[] = await locals.pb
		.collection('tasks')
		.getFullList({ filter: `board_id = "${id}"` });
	const board = await locals.pb.collection('boards').getOne(id);

	return { form, lists, tasks, board };
};

export const actions: Actions = {
	createOrUpdateList: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(ListSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			let list: List;

			if (form.data.id) {
				list = await locals.pb.collection('lists').update(form.data.id, form.data);
			} else {
				list = await locals.pb
					.collection('lists')
					.create({ ...form.data, user_id: locals.user?.id });
			}

			return { form, list };
		} catch (err) {
			console.log('Error: ', err);
		}
	},
	deleteList: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(ListSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const list = await locals.pb.collection('lists').delete(form.data.id);
			return { form, list };
		} catch (err) {
			console.log('Error: ', err);
		}
	},
	createOrUpdateTask: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(TaskSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		try {
			let task;

			if (!form.data.id) {
				task = await locals.pb
					.collection('tasks')
					.create({ ...form.data, user_id: locals.user?.id });
			} else {
				if (formData.has('delete')) {
					task = await locals.pb.collection('tasks').delete(form.data.id);
				} else {
					task = await locals.pb.collection('tasks').update(form.data.id, form.data);
				}
			}

			return withFiles({ form, task });
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
