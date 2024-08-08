<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
		CardFooter
	} from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import Card from '$lib/components/ui/card/card.svelte';
	import { goals } from '$lib/stores';
	import { daysSince } from '$lib/utils';
	import type { PageData } from './$types';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { GoalForm } from './components';
	import type { Goal } from '$lib/schemas';

	export let data: PageData;

	function handleDndConsiderGoals(e: CustomEvent<DndEvent<Goal>>) {
		goals.set(e.detail.items);
	}

	async function handleDndFinalizeGoals(e: CustomEvent<DndEvent<Goal>>) {
		const updatedGoalsResponse = await fetch('/api/updateGoalIndex', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ goals: e.detail.items })
		});

		if (!updatedGoalsResponse.ok) {
			console.error('Error:', updatedGoalsResponse.statusText);
		} else {
			const updatedGoals: Goal[] = await updatedGoalsResponse.json();
			goals.set(updatedGoals.sort((a, b) => a.index - b.index));
		}
	}

	let goalFormOpen = false;

	goals.set(data.goals.sort((a, b) => a.index - b.index));
</script>

<div class="flex justify-between mb-8">
	<p class="text-2xl font-semibold">Goals</p>
	<Button on:click={() => (goalFormOpen = true)}>Create Goal</Button>
</div>
<div
	use:dndzone={{ items: $goals, flipDurationMs: 200, type: 'columns' }}
	on:consider={handleDndConsiderGoals}
	on:finalize={handleDndFinalizeGoals}
	class="grid grid-cols-1 md:grid-cols-4 gap-4"
>
	{#each $goals as goal (goal.id)}
		<a href="/goals/{goal.id}">
			<Card class="h-52 flex flex-col justify-evenly">
				<CardHeader>
					<CardTitle class="truncate">
						{goal.name}
					</CardTitle>
					<CardDescription class="truncate">
						{goal.description}
					</CardDescription>
				</CardHeader>
				<CardContent class="flex justify-between">
					<div class="flex flex-col">
						<p class="text-lg font-semibold">
							{daysSince(goal.created) > 0 ? `${daysSince(goal.created)} days ago` : '-'}
						</p>
						<p class="text-sm text-muted-foreground">Last Progress</p>
					</div>
				</CardContent>
				<CardFooter>
					<Progress value={goal.progress} max={100} />
				</CardFooter>
			</Card>
		</a>
	{/each}
</div>

{#if goalFormOpen}
	<GoalForm bind:open={goalFormOpen} />
{/if}
