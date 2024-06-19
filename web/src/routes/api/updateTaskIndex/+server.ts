import type { Task } from '$lib/schemas';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }: { locals: App.Locals; request: Request }) => {
	const { tasks, boardId }: { tasks: Task[]; boardId: string } = await request.json();
	// console.log(await request.json());
	console.log(tasks);
	const updatePromises = tasks.map((item, index) =>
		locals.pb.collection('tasks').update(item.id, { index, list_id: item.list_id })
	);

	await Promise.all(updatePromises);

	const updatedTasks: Task[] = await locals.pb
		.collection('tasks')
		.getFullList({ filter: `board_id = "${boardId}"` });

	return json(updatedTasks);
	return new Response(null);
};
