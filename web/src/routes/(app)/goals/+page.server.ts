import { GoalSchema, type Goal } from '$lib/schemas';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals }) => {
	const goals: Goal[] = await locals.pb.collection('goals').getFullList();
	return { goals };
};

export const actions: Actions = {
	handleGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(GoalSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			let goal: Goal | boolean;

			if (!form.data.id) {
				goal = await locals.pb
					.collection('goals')
					.create({ ...form.data, user_id: locals.user?.id });
			} else {
				if (formData.has('delete')) {
					goal = await locals.pb.collection('goals').delete(form.data.id);
				} else {
					goal = await locals.pb.collection('goals').update(form.data.id, form.data);
				}
			}

			return { form, goal };
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
