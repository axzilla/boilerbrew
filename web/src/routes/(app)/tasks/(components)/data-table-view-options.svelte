<script lang="ts">
	import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal';
	import type { TableViewModel } from 'svelte-headless-table';
	import type { Task } from '$lib/schemas';
	import { Button } from '$lib/components/ui/button';
	import { DropdownMenu, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
	import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';
	import DropdownMenuLabel from '$lib/components/ui/dropdown-menu/dropdown-menu-label.svelte';
	import DropdownMenuCheckboxItem from '$lib/components/ui/dropdown-menu/dropdown-menu-checkbox-item.svelte';

	export let tableModel: TableViewModel<Task>;
	const { pluginStates, flatColumns } = tableModel;
	const { hiddenColumnIds } = pluginStates.hide;

	function handleHide(id: string) {
		hiddenColumnIds.update((ids: string[]) => {
			if (ids.includes(id)) {
				return ids.filter((i) => i !== id);
			}
			return [...ids, id];
		});
	}

	const hidableCols = ['details', 'status', 'priority'];
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button variant="outline" size="sm" class="ml-auto hidden h-8 lg:flex" builders={[builder]}>
			<SlidersHorizontal class="mr-2 h-4 w-4" />
			View
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
		<DropdownMenuSeparator />
		{#each flatColumns as col}
			{#if hidableCols.includes(col.id)}
				<DropdownMenuCheckboxItem
					checked={!$hiddenColumnIds.includes(col.id)}
					on:click={() => handleHide(col.id)}
				>
					{col.header}
				</DropdownMenuCheckboxItem>
			{/if}
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
