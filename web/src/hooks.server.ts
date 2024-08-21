import type { Handle } from '@sveltejs/kit';
import PocketBase, { type AuthModel } from 'pocketbase';
import { config } from '$lib/config-client';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(config.pbUrl);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	try {
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb.authStore.model;
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		event.locals.pb.authStore.clear();
		event.locals.user = {} as AuthModel;
	}
	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	return response;
};
