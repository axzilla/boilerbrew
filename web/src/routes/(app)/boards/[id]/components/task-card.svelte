<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import type { Task } from '$lib/schemas';
	import { Paperclip } from 'lucide-svelte';
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
	<div class="flex items-center gap-2 mb-2">
		{#if taskPriorityLabel}
			<Badge>{taskPriorityLabel}</Badge>
		{/if}
		{#if task.attachments.length > 0}
			<Paperclip class="h-5 w-5" />{task.attachments.length}
		{/if}
	</div>
	<p class="text-wrap text-left text-lg font-bold">{task.title}</p>
	<p class="text-muted-foreground text-wrap text-left line-clamp-2">
		{task.description}
	</p>
</Button>
