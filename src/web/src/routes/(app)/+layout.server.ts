import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
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
