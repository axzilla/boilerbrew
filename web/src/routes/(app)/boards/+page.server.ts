import type { Board } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const boards: Board[] = await locals.pb.collection('boards').getFullList({});
	return { boards };
};

export const actions: Actions = {};
