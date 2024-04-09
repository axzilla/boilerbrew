import { redirect } from '@sveltejs/kit';

export const load = ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
};
