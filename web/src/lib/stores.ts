import { writable } from 'svelte/store';
import type { Board, List, Task } from '$lib/schemas';

export const lists = writable<List[]>([]);
export const tasks = writable<Task[]>([]);
export const boards = writable<Board[]>([]);
