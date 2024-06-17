import type { List } from '$lib/schemas';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }: { locals: App.Locals; request: Request }) => {
	const { lists, boardId }: { lists: List[]; boardId: string } = await request.json();

	const updatePromises = lists.map((item, index) =>
		locals.pb.collection('lists').update(item.id, { index })
	);

	await Promise.all(updatePromises);

	const updatedLists: List[] = await locals.pb
		.collection('lists')
		.getFullList({ filter: `board_id = "${boardId}"` });

	return json(updatedLists);
};
