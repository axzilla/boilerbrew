import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './settings/$types';

export const load: PageServerLoad = () => {
	redirect(303, '/dashboard');
};
