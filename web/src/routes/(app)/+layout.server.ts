import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './settings/$types';

export const load: PageServerLoad = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}

	if (locals.user) {
		return {
			user: locals.user
		};
	}

	return {
		user: undefined
	};
};
