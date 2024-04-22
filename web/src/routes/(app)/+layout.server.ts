import { redirect } from '@sveltejs/kit';
import type { Task } from '$lib/schemas';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	if (locals.user) {
		const tasks: Task[] = await locals.pb.collection('tasks').getFullList({});

		return {
			user: locals.user,
			tasks
		};
	}

	return {
		user: undefined
	};
};
