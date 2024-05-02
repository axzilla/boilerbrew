import { writable } from 'svelte/store';
import type { List } from '$lib/schemas';

export const lists = writable<List[]>([]);
