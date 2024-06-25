import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { GoalSchema, type Goal, type Milestone } from '$lib/schemas.js';
import { type Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { id } = params;
	const form = await superValidate(zod(GoalSchema));

	const goal: Goal = await locals.pb.collection('goals').getOne(id);
	const milestones: Milestone[] = await locals.pb
		.collection('milestones')
		.getFullList({ filter: `goal_id = "${id}"` });

	return { form, goal, milestones };
};

export const actions: Actions = {
	createOrUpdateGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(GoalSchema));

		if (!form.valid) {
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
	},
	deleteGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(GoalSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const goal = await locals.pb.collection('goals').delete(form.data.id);
			return { form, goal };
		} catch (err) {
			console.log('Error: ', err);
		}
	}
};
