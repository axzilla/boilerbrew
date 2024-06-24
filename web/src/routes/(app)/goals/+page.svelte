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
	import GoalForm from './components/goal-form.svelte';

	export let data: PageData;

	let openCreateGoalForm = false;

	goals.set(data.goals);
</script>

<div class="flex justify-between mb-8">
	<p class="text-2xl font-semibold">Goals</p>
	<Button on:click={() => (openCreateGoalForm = true)}>Create Goal</Button>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
	{#each $goals as goal}
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
						<p class="text-xl">
							{daysSince(goal.created) > 0 ? `${daysSince(goal.created)} days ago` : '-'}
						</p>
						<p class="text-muted-foreground">Last Progress</p>
					</div>
				</CardContent>
				<CardFooter>
					<Progress value={goal.progress} max={100} />
				</CardFooter>
			</Card>
		</a>
	{/each}
</div>

{#if openCreateGoalForm}
	<GoalForm bind:open={openCreateGoalForm} />
{/if}
