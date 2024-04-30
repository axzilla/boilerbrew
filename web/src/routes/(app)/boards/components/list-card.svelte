<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardTitle } from '$lib/components/ui/card';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { type List } from '$lib/schemas';
	import { Ellipsis } from 'lucide-svelte/icons';
	import { ListForm } from '.';
	import { clickOutside } from '$lib/utils';

	export let list: List;
	export let openDelete = false;
	export let setCurrentList: (list: List) => void;

	let isFormOpen = false;
</script>

<Card class="min-w-72 flex items-start justify-between gap-2 p-2">
	{#if isFormOpen}
		<div use:clickOutside={() => (isFormOpen = false)}>
			<ListForm bind:isFormOpen {list} data={null} />
		</div>
	{:else}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div on:click={() => (isFormOpen = true)}>
			<CardTitle class="text-sm font-medium p-2 flex-1">{list.name}</CardTitle>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild let:builder>
				<Button builders={[builder]} size="icon" variant="ghost">
					<Ellipsis class="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem
					on:click={() => {
						setCurrentList(list);
						openDelete = true;
					}}>Delete</DropdownMenuItem
				>
			</DropdownMenuContent>
		</DropdownMenu>
	{/if}
</Card>
