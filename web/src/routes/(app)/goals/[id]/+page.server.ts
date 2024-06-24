import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { BoardSchema, ListSchema, TaskSchema, type Goal, type List } from '$lib/schemas.js';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { id } = params;
	const form = await superValidate(zod(ListSchema));

	const goal: Goal = await locals.pb.collection('goals').getOne(id);

	return { form, goal };
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
	},
	deleteBoard: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(BoardSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('boards').delete(form.data.id);
		} catch (err) {
			console.log('Error: ', err);
		}

		redirect(303, '/boards');
	}
};
