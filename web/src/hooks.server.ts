import type { Handle } from '@sveltejs/kit';
import PocketBase, { type AuthModel } from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb.authStore.model;
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
		event.locals.user = {} as AuthModel;
	}
	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
