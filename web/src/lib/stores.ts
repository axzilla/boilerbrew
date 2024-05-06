import { writable } from 'svelte/store';
import type { List, Task } from '$lib/schemas';

export const lists = writable<List[]>([]);
export const tasks = writable<Task[]>([]);
