<script lang="ts">
	import DataTable from './(components)/data-table.svelte';
	import data from './(data)/tasks.json';
</script>

<div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
	<div class="flex items-center justify-between space-y-2">
		<div>
			<h2 class="text-2xl font-bold tracking-tight">Todos</h2>
			<p class="text-muted-foreground">Here's a list of your todos!</p>
		</div>
	</div>
	<DataTable {data} />
</div>
