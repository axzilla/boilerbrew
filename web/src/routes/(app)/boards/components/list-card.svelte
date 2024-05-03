<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardTitle } from '$lib/components/ui/card';
	import { type List } from '$lib/schemas';
	import { Trash } from 'lucide-svelte/icons';
	import { ListForm } from '.';
	import { clickOutside } from '$lib/utils';

	export let list: List;
	export let openDelete = false;
	export let setCurrentList: (list: List) => void;

	let isFormOpen = false;
</script>

<Card class="min-w-72 h-16 items-center flex justify-between gap-2 p-2">
	{#if isFormOpen}
		<div class="w-full" use:clickOutside={() => (isFormOpen = false)}>
			<ListForm bind:isFormOpen {list} data={null} />
		</div>
	{:else}
		<div class="flex w-full justify-between items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:click={() => (isFormOpen = true)}>
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
</Card>
