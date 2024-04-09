export const GET = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = null;
	return new Response(null);
};
