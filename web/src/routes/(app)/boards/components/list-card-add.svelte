<script lang="ts">
	import { Card, CardTitle } from '$lib/components/ui/card';
	import { ListForm } from '.';
	import { clickOutside } from '$lib/utils';
	import type { PageData } from '../$types';

	export let data: PageData;

	let isFormOpen = false;
</script>

<Card class="bg-muted min-w-72 h-16 items-center flex justify-between gap-2 p-2">
	{#if isFormOpen}
		<div class="w-full" use:clickOutside={() => (isFormOpen = false)}>
			<ListForm bind:isFormOpen {data} list={null} />
		</div>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="w-full cursor-pointer" on:click={() => (isFormOpen = true)}>
			<CardTitle class="text-sm font-bold p-2">Add new list</CardTitle>
		</div>
	{/if}
</Card>
