<script lang="ts">
	import type { TableViewModel } from 'svelte-headless-table';
	import X from 'lucide-svelte/icons/x';
	import type { Writable } from 'svelte/store';
	import { priorities, statuses } from '../(data)/data.js';
	import type { Task } from '$lib/schemas';
	import { DataTableFacetedFilter, DataTableViewOptions } from './index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { tasks } from '$lib/stores.js';
	import { CirclePlus } from 'lucide-svelte';

	export let tableModel: TableViewModel<Task>;
	export let openDialog: (task: Task | null) => void;

	const counts = $tasks.reduce<{
		status: { [index: string]: number };
		priority: { [index: string]: number };
	}>(
		(acc, { status, priority }) => {
			acc.status[status] = (acc.status[status] || 0) + 1;
			acc.priority[priority] = (acc.priority[priority] || 0) + 1;
			return acc;
		},
		{
			status: {},
			priority: {}
		}
	);

	const { pluginStates } = tableModel;
	const {
		filterValue
	}: {
		filterValue: Writable<string>;
	} = pluginStates.filter;

	const {
		filterValues
	}: {
		filterValues: Writable<{
			status: string[];
			priority: string[];
		}>;
	} = pluginStates.colFilter;

	$: showReset = Object.values({ ...$filterValues, $filterValue }).some((v) => v.length > 0);
</script>

<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		<Input
			placeholder="Filter tasks..."
			class="h-8 w-[150px] lg:w-[250px]"
			type="search"
			bind:value={$filterValue}
		/>
		<Button on:click={() => openDialog(null)} size="sm" class="h-8 border-dashed">
			<CirclePlus class="mr-2 h-4 w-4" />
			Add Task
		</Button>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.status}
			title="Status"
			options={statuses}
			counts={counts.status}
		/>
		<DataTableFacetedFilter
			bind:filterValues={$filterValues.priority}
			title="Priority"
			options={priorities}
			counts={counts.priority}
		/>
		{#if showReset}
			<Button
				on:click={() => {
					$filterValue = '';
					$filterValues.status = [];
					$filterValues.priority = [];
				}}
				variant="ghost"
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<X class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>

	<DataTableViewOptions {tableModel} />
</div>
