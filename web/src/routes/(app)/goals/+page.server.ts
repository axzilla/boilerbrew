import { GoalSchema, MilestoneSchema, type Goal, type Milestone } from '$lib/schemas';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';

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
			console.log('Error: ', err);
		}
	},
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
			console.log('Error: ', err);
		}
	}
};
