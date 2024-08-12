<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Progress } from '$lib/components/ui/progress';
	import Card from '$lib/components/ui/card/card.svelte';
	import { goals } from '$lib/stores';
	import type { PageData } from './$types';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { GoalForm, DashboardCards } from './components';
	import type { Goal } from '$lib/schemas';
	import { formatDate } from '$lib/utils';
	import { GripVertical } from 'lucide-svelte';

	export let data: PageData;

	function handleDndConsiderGoals(e: CustomEvent<DndEvent<Goal>>) {
		goals.set(e.detail.items);
	}

	async function handleDndFinalizeGoals(e: CustomEvent<DndEvent<Goal>>) {
		const updatedGoalsResponse = await fetch('/api/goal/update-index', {
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

<div class="mb-16">
	<div class="flex justify-between items-center mb-8">
		<h2 class="text-2xl font-semibold">Goals</h2>
		<Button on:click={() => (goalFormOpen = true)}>Create Goal</Button>
	</div>

	<div class="mb-8">
		<DashboardCards goals={data.goals} />
	</div>

	<div
		use:dndzone={{ items: $goals, flipDurationMs: 200, type: 'list' }}
		on:consider={handleDndConsiderGoals}
		on:finalize={handleDndFinalizeGoals}
		class="flex flex-col gap-4"
	>
		{#each $goals as goal (goal.id)}
			<Card class="w-full">
				<div class="flex items-center">
					<div class="p-2 cursor-move">
						<GripVertical class="text-muted-foreground" />
					</div>
					<a href="/goals/{goal.id}" class="block flex-grow">
						<CardHeader>
							<div class="flex justify-between items-center">
								<CardTitle class="truncate">{goal.title}</CardTitle>
								<div class="text-sm text-muted-foreground">
									{#if goal.milestones && goal.milestones.length > 0}
										Last Progress: {formatDate(goal.milestones[goal.milestones.length - 1].created)}
									{:else}
										No Progress
									{/if}
								</div>
							</div>
							<CardDescription class="truncate">{goal.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<div class="flex items-center space-x-4">
								<Progress value={goal.milestones?.length} max={100} class="flex-grow" />
								<span class="text-sm font-medium">{goal.milestones?.length ?? 0}%</span>
							</div>
						</CardContent>
					</a>
				</div>
			</Card>
		{/each}
	</div>
</div>

{#if goalFormOpen}
	<GoalForm bind:open={goalFormOpen} />
{/if}
