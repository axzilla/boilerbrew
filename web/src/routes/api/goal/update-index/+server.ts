import type { Goal } from '$lib/types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const userId = locals.user?.id;
		const { goals }: { goals: Goal[] } = await request.json();

		const updatePromises = goals.map((item, index) =>
			locals.pb.collection('goals').update(item.id, { index })
		);

		await Promise.all(updatePromises);

		const goalsWithExpandedMilestones = await locals.pb.collection('goals').getFullList({
			filter: `user_id = "${userId}"`,
			expand: 'milestones_via_goal_id',
			sort: '-created'
		});

		const updatedGoals: Goal[] = goalsWithExpandedMilestones
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

		return json(updatedGoals);
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('Unexpected error:', err);
		return json({ error: 'Unexpected error' }, { status: 500 });
	}
};
