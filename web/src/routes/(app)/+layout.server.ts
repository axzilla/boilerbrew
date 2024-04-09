import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
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
