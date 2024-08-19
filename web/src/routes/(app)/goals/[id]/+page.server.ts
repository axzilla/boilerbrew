import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { GoalSchema, MilestoneSchema, type Goal, type Milestone } from '$lib/schemas.js';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

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
	handleMilestone: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(MilestoneSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			let milestone: Milestone | boolean;

			if (!form.data.id) {
				milestone = await locals.pb
					.collection('milestones')
					.create({ ...form.data, user_id: locals.user?.id });
			} else {
				if (formData.has('delete')) {
					milestone = await locals.pb.collection('milestones').delete(form.data.id);
				} else {
					milestone = await locals.pb.collection('milestones').update(form.data.id, form.data);
				}
			}

			return { form, milestone };
		} catch (err) {
			if (err instanceof ClientResponseError) {
				// eslint-disable-next-line no-console
				console.error('PB error: ', err);
			} else {
				// eslint-disable-next-line no-console
				console.error('Unexpected error:', err);
			}

			return fail(400, { form });
		}
	}
};
