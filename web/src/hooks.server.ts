import type { Handle } from '@sveltejs/kit';
import PocketBase, { type AuthModel } from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(PUBLIC_POCKETBASE_URL);
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
