<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import type { Task } from '$lib/schemas';
	import { priorities } from '../data';

	export let task: Task;
	export let isTaskFormOpen = false;
	export let setCurrentTask: (task: Task) => void;

	$: taskPriorityLabel = task && priorities.find((p) => p.value === task.priority)?.label;
</script>

<Button
	on:click={() => {
		isTaskFormOpen = true;
		setCurrentTask(task);
	}}
	variant="secondary"
	class="w-full h-full flex flex-col items-start justify-start"
>
	{#if taskPriorityLabel}
		<Badge class="mb-2">{taskPriorityLabel}</Badge>
	{/if}
	<p class="text-wrap text-left text-lg font-bold">{task.title}</p>
	<p class="text-muted-foreground text-wrap text-left line-clamp-2">
		{task.description}
	</p>
</Button>
