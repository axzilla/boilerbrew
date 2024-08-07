import type { Goal } from '$lib/schemas';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }: { locals: App.Locals; request: Request }) => {
	const userId = locals.user?.id;
	const { goals }: { goals: Goal[] } = await request.json();

	const updatePromises = goals.map((item, index) =>
		locals.pb.collection('goals').update(item.id, { index })
	);

	await Promise.all(updatePromises);

	const updatedGoals: Goal[] = await locals.pb
		.collection('goals')
		.getFullList({ filter: `user_id = "${userId}"` });

	return json(updatedGoals);
};
