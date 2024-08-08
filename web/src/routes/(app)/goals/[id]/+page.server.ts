import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { GoalSchema, type Goal, type Milestone } from '$lib/schemas.js';
import { superValidate } from 'sveltekit-superforms';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { id } = params;
  const form = await superValidate(zod(GoalSchema));

  const goal: Goal = await locals.pb.collection('goals').getOne(id);
  const milestones: Milestone[] = await locals.pb
    .collection('milestones')
    .getFullList({ filter: `goal_id = "${id}"` });

  return { form, goal, milestones };
};
