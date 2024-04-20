import type { PageServerLoad } from './$types';
import type { Task } from './(data)/schemas.js';

export const load: PageServerLoad = async ({ locals }) => {
	const tasks: Task[] = await locals.pb.collection('tasks').getFullList({});
	return { tasks };
};
