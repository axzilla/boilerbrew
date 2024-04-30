import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { ListSchema, type List } from '$lib/schemas.js';
import { type Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(ListSchema));
	const lists: List[] = await locals.pb.collection('lists').getFullList({});
	return { form, lists };
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
	}
};
