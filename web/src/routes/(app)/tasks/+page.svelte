<script lang="ts">
	import DataTable from './(components)/data-table.svelte';

	export let data;
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Tasks</h2>
			<p class="text-muted-foreground">Here's a list of your tasks!</p>
		</div>
	</div>
	<DataTable {data} />
</div>
