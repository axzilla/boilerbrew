import { BoardSchema, type Board } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals }) => {
	const boards: Board[] = await locals.pb.collection('boards').getFullList({});
	return { boards };
};

export const actions: Actions = {
	createOrUpdateBoard: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(BoardSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			let board: Board;

			console.log(formData);
			if (form.data.id) {
				board = await locals.pb.collection('boards').update(form.data.id, form.data);
			} else {
				board = await locals.pb
					.collection('boards')
					.create({ ...form.data, user_id: locals.user?.id });
			}

			return { form, board };
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
