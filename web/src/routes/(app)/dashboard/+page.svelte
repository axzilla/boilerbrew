<script lang="ts">
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import ShieldAlert from 'lucide-svelte/icons/shield-alert';
	import StickyNote from 'lucide-svelte/icons/sticky-note';
	import ScrollText from 'lucide-svelte/icons/scroll-text';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import { Table } from '$lib/components/ui/table';
	import DashboardCard from '$lib/components/containers/dashboard-card.svelte';
	import { tasks } from '$lib/stores';
	import DataTablePriorityCell from '../tasks/(components)/data-table-priority-cell.svelte';
	import DataTableStatusCell from '../tasks/(components)/data-table-status-cell.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import TableHeader from '$lib/components/ui/table/table-header.svelte';
	import TableRow from '$lib/components/ui/table/table-row.svelte';
	import TableHead from '$lib/components/ui/table/table-head.svelte';
	import TableBody from '$lib/components/ui/table/table-body.svelte';
	import TableCell from '$lib/components/ui/table/table-cell.svelte';

	const taskCount = $tasks.length.toString();
	const backlogTaskCount = $tasks.filter((task) => task.status === 'backlog').length.toString();
	const highPriorityTaskCount = $tasks.filter((task) => task.priority === 'high').length.toString();

	const recentTasks = $tasks
		.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
		.slice(0, 10);
</script>

<div class="h-full gap-4 flex-1 flex-col flex">
	<div class="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
		<DashboardCard title="Total Tasks" value={taskCount}>
			<StickyNote slot="icon" class="h-4 w-4 text-muted-foreground" />
		</DashboardCard>
		<DashboardCard title="Backlog Tasks" value={backlogTaskCount}>
			<ScrollText slot="icon" class="h-4 w-4 text-muted-foreground" />
		</DashboardCard>
		<DashboardCard title="High Priority Tasks" value={highPriorityTaskCount}>
			<ShieldAlert slot="icon" class="h-4 w-4 text-muted-foreground" />
		</DashboardCard>
	</div>
	<div class="grid gap-4 grid-cols-3">
		<Card class="col-span-3">
			<CardHeader class="flex flex-row items-center">
				<div class="grid gap-2">
					<CardTitle>Recent Tasks</CardTitle>
				</div>
				<Button href="/tasks" size="sm" class="ml-auto gap-1">
					View All
					<ArrowUpRight class="h-4 w-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Details</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Priority</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each recentTasks as task (task.id)}
							<TableRow>
								<TableCell>
									<div class="font-medium">{task.details}</div>
								</TableCell>
								<TableCell>
									<DataTableStatusCell value={task.status} />
								</TableCell>
								<TableCell>
									<DataTablePriorityCell value={task.priority} />
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	</div>
</div>
