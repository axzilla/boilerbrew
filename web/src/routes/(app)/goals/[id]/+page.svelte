<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import { type Milestone } from '$lib/schemas';
	import { Bolt, CircleArrowLeft } from 'lucide-svelte';
	import { GoalForm } from '../components';
	import { MilestoneForm, MilestoneGrid } from './components';
	import { formatDate } from '$lib/utils';
	import MilestoneNotes from './components/MilestoneNotes.svelte';

	export let data: PageData;

	let choosenMilestone: Milestone | null = null;
	let goalFormOpen = false;
	let milestoneFormOpen = false;

	$: !milestoneFormOpen && (choosenMilestone = null);

	function handleMilestoneClick(milestone: Milestone | null) {
		choosenMilestone = milestone;
		milestoneFormOpen = true;
	}
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
				<div class="flex justify-between mb-8">
					<div>
						<p class="text-lg font-semibold">Progress</p>
						<p class="text-sm text-muted-foreground">{data.milestones.length}%</p>
					</div>
					<div>
						<p class="text-lg font-semibold">Last Progress</p>
						{#if data.milestones.length > 0}
							{@const lastProgress = data.milestones[data.milestones.length - 1]?.updated}
							<p class="text-sm text-muted-foreground">
								{formatDate(lastProgress || '')}
							</p>
						{:else}
							<p class="text-sm text-muted-foreground">No progress yet</p>
						{/if}
					</div>
				</div>
				<div class="mb-8">
					<MilestoneGrid milestones={data.milestones} onMilestoneClick={handleMilestoneClick} />
				</div>
				<div class="mb-8">
					<MilestoneNotes
						milestones={data.milestones}
						bind:choosenMilestone
						bind:milestoneFormOpen
					/>
				</div>
			</div>
		</div>
	</div>
</div>

{#if goalFormOpen}
	<GoalForm goal={data.goal} bind:open={goalFormOpen} />
{/if}

{#if milestoneFormOpen}
	<MilestoneForm
		isLastMilestone={data.milestones[data.milestones.length - 1]?.id === choosenMilestone?.id}
		goalId={data.goal.id}
		milestone={choosenMilestone}
		bind:open={milestoneFormOpen}
	/>
{/if}
