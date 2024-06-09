<script lang="ts">
	import { Card, CardTitle } from '$lib/components/ui/card';
	import { ListForm } from '.';
	import { clickOutside } from '$lib/utils';
	import type { PageData } from '../$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CirclePlus } from 'lucide-svelte';

	export let data: PageData;
	let isFormOpen = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => (isFormOpen = true)}>
	<Card class="cursor-pointer bg-muted min-w-64 h-16 items-center flex justify-between gap-2 p-2">
		{#if isFormOpen}
			<div class="w-full" use:clickOutside={() => (isFormOpen = false)}>
				<ListForm bind:isFormOpen {data} list={null} />
			</div>
		{:else}
			<div class="flex items-center" on:click={() => (isFormOpen = true)}>
				<Button size="icon" variant="ghost" disabled type="submit">
					<CirclePlus class="h-5 w-5" />
				</Button>
				<CardTitle class="text-sm font-bold p-2">Add List</CardTitle>
			</div>
		{/if}
	</Card>
</div>
