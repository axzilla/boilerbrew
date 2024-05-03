<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardTitle } from '$lib/components/ui/card';
	import { type List } from '$lib/schemas';
	import { CirclePlus, Trash } from 'lucide-svelte/icons';
	import { ListForm } from '.';
	import { clickOutside } from '$lib/utils';

	export let list: List;
	export let openDelete = false;
	export let setCurrentList: (list: List) => void;

	let isFormOpen = false;

	const tasks = [
		'ransoms',
		'kidnappings',
		'assassinations',
		'theft',
		'espionage',
		'ransoms',
		'kidnappings',
		'assassinations',
		'theft',
		'espionage',
		'ransoms',
		'kidnappings',
		'assassinations',
		'theft',
		'espionage'
	];
</script>

<Card class="min-w-64 max-h-full min-h-16 flex flex-col gap-2 p-2">
	{#if isFormOpen}
		<div class="w-full" use:clickOutside={() => (isFormOpen = false)}>
			<ListForm bind:isFormOpen {list} data={null} />
		</div>
	{:else}
		<div class="flex w-full justify-between items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="w-full cursor-pointer" on:click={() => (isFormOpen = true)}>
				<CardTitle class="text-sm font-bold p-2">{list.name}</CardTitle>
			</div>
			<Button
				size="icon"
				on:click={() => {
					setCurrentList(list);
					openDelete = true;
				}}
				variant="ghost"
			>
				<Trash class="h-5 w-5" />
			</Button>
		</div>
	{/if}

	<div class="overflow-auto h-full flex flex-col gap-2 items-start">
		{#each tasks as task}
			<div class="w-full bg-muted gap-2 p-2 cursor-pointer rounded-lg">
				{task}
			</div>
		{/each}
	</div>

	<div class="flex items-center hover:bg-muted gap-2 p-2 cursor-pointer rounded-lg">
		<CirclePlus class="h-5 w-5" />Add Task
	</div>
</Card>
