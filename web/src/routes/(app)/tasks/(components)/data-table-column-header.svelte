<script lang="ts">
	import EyeOff from 'lucide-svelte/icons/eye-off';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import type { TableViewModel } from 'svelte-headless-table';
	import type { Task } from '$lib/schemas';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { DropdownMenu, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';
	import DropdownMenuSeparator from '$lib/components/ui/dropdown-menu/dropdown-menu-separator.svelte';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let props: {
		select: never;
		sort: {
			order: 'desc' | 'asc' | undefined;
			toggle: (_: Event) => void;
			clear: () => void;
			disabled: boolean;
		};
		filter: never;
	};
	export let tableModel: TableViewModel<Task>;
	export let cellId: string;

	const { hiddenColumnIds } = tableModel.pluginStates.hide;

	function handleAscSort(e: Event) {
		if (props.sort.order === 'asc') {
			return;
		}
		props.sort.toggle(e);
	}

	function handleDescSort(e: Event) {
		if (props.sort.order === 'desc') {
			return;
		}
		if (props.sort.order === undefined) {
			// We can only toggle, so we toggle from undefined to 'asc' first
			props.sort.toggle(e);
		}
		props.sort.toggle(e); // Then we toggle from 'asc' to 'desc'
	}

	function handleHide() {
		hiddenColumnIds.update((ids: string[]) => {
			if (ids.includes(cellId)) {
				return ids;
			}
			return [...ids, cellId];
		});
	}
</script>

{#if !props.sort.disabled}
	<div class={cn('flex items-center', className)}>
		<DropdownMenu>
			<DropdownMenuTrigger asChild let:builder>
				<Button
					variant="ghost"
					builders={[builder]}
					class="-ml-3 h-8 data-[state=open]:bg-accent"
					size="sm"
				>
					<slot />
					{#if props.sort.order === 'desc'}
						<ArrowDown class="ml-2 h-4 w-4" />
					{:else if props.sort.order === 'asc'}
						<ArrowUp class="ml-2 h-4 w-4" />
					{:else}
						<ChevronsUpDown class="ml-2 h-4 w-4" />
					{/if}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem on:click={handleAscSort}>
					<ArrowUp class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Asc
				</DropdownMenuItem>
				<DropdownMenuItem on:click={handleDescSort}>
					<ArrowDown class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Desc
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem on:click={handleHide}>
					<EyeOff class="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Hide
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
{:else}
	<slot />
{/if}
