import { GoalSchema, type Goal } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals }) => {
	const goals: Goal[] = await locals.pb.collection('goals').getFullList({});
	return { goals };
};

export const actions: Actions = {
	createOrUpdateGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(GoalSchema));

		if (!form.valid) {
			console.log('Form is not valid: ', form);
			return fail(400, { form });
		}

		try {
			let goal: Goal;

			if (form.data.id) {
				goal = await locals.pb.collection('goals').update(form.data.id, form.data);
			} else {
				goal = await locals.pb
					.collection('goals')
					.create({ ...form.data, user_id: locals.user?.id });
			}

			return { form, goal };
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
