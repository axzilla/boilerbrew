<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type Milestone } from '$lib/schemas';
	import * as Table from '$lib/components/ui/table';

	export let milestones: Milestone[];
	export let choosenMilestone: Milestone | null = null;
	export let milestoneFormOpen = false;
</script>

<p class="text-lg font-semibold">Milestone Notes</p>
<Table.Root>
	<Table.Body>
		{#each milestones as milestone, index}
			{#if milestone.notes}
				<Table.Row class="items-start">
					<Table.Cell class="w-[100px] font-medium">
						<Button
							on:click={() => {
								choosenMilestone = milestone;
								milestoneFormOpen = true;
							}}
						>
							{index + 1}</Button
						>
					</Table.Cell>
					<Table.Cell>{milestone.notes}</Table.Cell>
				</Table.Row>
			{/if}
		{/each}
	</Table.Body>
</Table.Root>
