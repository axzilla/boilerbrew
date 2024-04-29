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

<div class="h-full flex-1 flex-col flex">
	<DataTable {openTaskFormDialog} />
</div>
