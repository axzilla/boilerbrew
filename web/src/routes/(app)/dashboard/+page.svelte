<script lang="ts">
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import ShieldAlert from 'lucide-svelte/icons/shield-alert';
	import StickyNote from 'lucide-svelte/icons/sticky-note';
	import ScrollText from 'lucide-svelte/icons/scroll-text';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import DashboardCard from '$lib/components/containers/dashboard-card.svelte';
	import { tasks } from '$lib/stores';
	import DataTablePriorityCell from '../tasks/(components)/data-table-priority-cell.svelte';
	import DataTableStatusCell from '../tasks/(components)/data-table-status-cell.svelte';

	const taskCount = $tasks.length.toString();
	const backlogTaskCount = $tasks.filter((task) => task.status === 'backlog').length.toString();
	const highPriorityTaskCount = $tasks.filter((task) => task.priority === 'high').length.toString();

	const recentTasks = $tasks
		.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
		.slice(0, 10);
</script>

<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
<div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
	<Card.Root class="xl:col-span-3">
		<Card.Header class="flex flex-row items-center">
			<div class="grid gap-2">
				<Card.Title>Recent Tasks</Card.Title>
			</div>
			<Button href="/tasks" size="sm" class="ml-auto gap-1">
				View All
				<ArrowUpRight class="h-4 w-4" />
			</Button>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Details</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Priority</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each recentTasks as task (task.id)}
						<Table.Row>
							<Table.Cell>
								<div class="font-medium">{task.details}</div>
							</Table.Cell>
							<Table.Cell>
								<DataTableStatusCell value={task.status} />
							</Table.Cell>
							<Table.Cell>
								<DataTablePriorityCell value={task.priority} />
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>
