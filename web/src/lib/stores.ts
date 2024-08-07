import { writable } from 'svelte/store';
import type { Goal } from '$lib/schemas';

export const goals = writable<Goal[]>([]);
