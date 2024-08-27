import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = null;
	return new Response(null);
};
