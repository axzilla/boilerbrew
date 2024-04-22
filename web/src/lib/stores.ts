import { writable } from 'svelte/store';
import type { Task } from '$lib/schemas';

export const tasks = writable<Task[]>([]);
