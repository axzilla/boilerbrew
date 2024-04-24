export const GET = ({ locals }: { locals: App.Locals }) => {
	locals.pb.authStore.clear();
	locals.user = null;
	return new Response(null);
};
