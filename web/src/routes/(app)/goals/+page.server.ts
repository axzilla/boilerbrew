import { GoalSchema, type Goal } from '$lib/schemas';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';
import { ClientResponseError } from 'pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
	const goalsWithExpandedMilestones = await locals.pb.collection('goals').getFullList({
		expand: 'milestones_via_goal_id',
		sort: '-created'
	});

	const goals: Goal[] = goalsWithExpandedMilestones
		.map((goal) => {
			const { expand, ...restGoal } = goal;
			return {
				...restGoal,
				title: restGoal.title || '',
				description: restGoal.description || '',
				progress: restGoal.progress || 0,
				index: restGoal.index || 0,
				created: restGoal.created || '',
				updated: restGoal.updated || '',
				milestones: expand?.milestones_via_goal_id || []
			};
		})
		.sort((a, b) => (a.created > b.created ? -1 : 1));

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
