import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	} else {
		redirect(303, '/settings/avatar');
	}
};
