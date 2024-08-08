<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { type Milestone } from '$lib/schemas';
	import { Bolt, CircleArrowLeft, DeleteIcon, Trash } from 'lucide-svelte';
	import { GoalForm } from '../components';
	import { MilestoneForm } from './components';

	export let data: PageData;
	export let open = false;
	export let milestone: Milestone | null = null;

	let choosenMilestone: Milestone | null = null;
	let goalFormOpen = false;
	let milestoneFormOpen = false;

	$: !milestoneFormOpen && (choosenMilestone = null);
</script>

<div class="flex justify-center">
	<div class="pb-8 w-full">
		<div class="mb-8">
			<div class="flex justify-between mb-8">
				<Button size="icon" variant="ghost" on:click={() => window.history.back()}>
					<CircleArrowLeft class="h-5 w-5" />
				</Button>
				<div class="flex space-x-2">
					<Button size="icon" variant="ghost" on:click={() => (goalFormOpen = true)}>
						<Bolt class="h-5 w-5" />
					</Button>
				</div>
			</div>
			<div class="min-w-xl max-w-xl mx-auto">
				<div class="mb-4">
					<p class="text-lg font-semibold">Goal</p>
					<p class="text-sm text-muted-foreground">{data.goal.title}</p>
				</div>
				<div class="mb-4">
					<p class="text-lg font-semibold">Description</p>
					<p class="text-sm text-muted-foreground">{data.goal.description || '-'}</p>
				</div>
				<div class="flex justify-between">
					<div>
						<p class="text-lg font-semibold">Progress</p>
						<p class="text-sm text-muted-foreground">4%</p>
					</div>
					<div>
						<p class="text-lg font-semibold">Last Progress</p>
						<p class="text-sm text-muted-foreground">2024/05/22</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mb-8">
			<div class="mx-auto flex flex-col items-center w-full max-w-xl">
				<div class="grid grid-cols-10 gap-1 sm:gap-4 justify-evenly w-full">
					{#each Array.from({ length: 100 }, (_, i) => i + 1) as i}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							on:click={() => {
								const previousExists = i === 1 || data.milestones[i - 2];
								const currentExists = data.milestones[i - 1];

								if (!previousExists) return;

								if (currentExists) {
									choosenMilestone = data.milestones[i - 1];
								}

								milestoneFormOpen = true;
							}}
							class={`cursor-pointer flex justify-center items-center border rounded-md size-8 sm:size-12  ${data.milestones[i - 1] ? 'bg-primary text-primary-foreground' : ''}`}
						>
							{i}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

{#if goalFormOpen}
	<GoalForm goal={data.goal} bind:open={goalFormOpen} />
{/if}

{#if milestoneFormOpen}
	<MilestoneForm milestone={choosenMilestone} bind:open={milestoneFormOpen} />
{/if}
