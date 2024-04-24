import { redirect } from '@sveltejs/kit';
import type { Task } from '$lib/schemas';
import type { PageServerLoad } from './settings/$types';

export const load: PageServerLoad = async ({ locals }: { locals: App.Locals }) => {
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
