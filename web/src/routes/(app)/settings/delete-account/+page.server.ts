import { redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.pb.authStore.isValid) {
		redirect(303, '/login');
	}
};

export const actions: Actions = {
	deleteAccount: async ({ locals }) => {
		try {
			await locals.pb.collection('users').delete(locals.user?.id);
			locals.pb.authStore.clear();
			locals.user = null;
		} catch (err) {
			console.log('Error: ', err);
		}

		redirect(303, '/login');
	}
};
