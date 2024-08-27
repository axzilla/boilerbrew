import { writable } from 'svelte/store';
import type { Goal } from './types';

export const goals = writable<Goal[]>([]);
