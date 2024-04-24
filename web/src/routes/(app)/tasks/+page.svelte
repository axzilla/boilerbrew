<script lang="ts">
	import type { Task } from '$lib/schemas';
	import DataTableTaskForm from './(components)/data-table-task-form.svelte';
	import DataTable from './(components)/data-table.svelte';

	export let data;

	let open = false;
	let currentTask: Task | null = null;

	function openTaskFormDialog(task: Task | null = null): void {
		currentTask = task;
		open = true;
	}

	function closeDialog(): void {
		currentTask = null;
		open = false;
	}
</script>

<DataTableTaskForm {data} bind:currentTask {closeDialog} bind:open />

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Tasks</h2>
			<p class="text-muted-foreground">Here's a list of your tasks!</p>
		</div>
	</div>
	<DataTable {openTaskFormDialog} />
</div>
