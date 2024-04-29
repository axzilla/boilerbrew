import { writable } from 'svelte/store';
import type { List, Task } from '$lib/schemas';

export const tasks = writable<Task[]>([]);
export const lists = writable<List[]>([]);
