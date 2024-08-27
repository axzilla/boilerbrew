<script lang="ts">
	import type { Milestone } from '$lib/types';

	export let milestones: Milestone[];
	export let onMilestoneClick: (milestone: Milestone | null) => void;

	function handleClick(index: number) {
		const previousExists = index === 0 || milestones[index - 1];
		const currentExists = milestones[index];

		if (previousExists) {
			onMilestoneClick(currentExists || null);
		}
	}
</script>

<div class="grid grid-cols-10 gap-1 sm:gap-4 justify-evenly w-full">
	{#each Array.from({ length: 100 }, (_, i) => i) as index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click={() => handleClick(index)}
			class={`
					flex justify-center items-center border rounded-md size-8 sm:size-12 
					${milestones[index] ? 'bg-primary text-primary-foreground' : ''}
					${(index === 0 || milestones[index - 1]) && !milestones[index] ? 'bg-secondary cursor-pointer' : ''}
					${index !== 0 && !milestones[index - 1] ? 'opacity-50' : 'cursor-pointer'}
				`}
		>
			{index + 1}
		</div>
	{/each}
</div>
