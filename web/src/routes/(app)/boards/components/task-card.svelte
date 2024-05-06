<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Task } from '$lib/schemas';

	export let task: Task;
	export let isTaskFormOpen = false;
	export let setCurrentTask: (task: Task) => void;
</script>

<Button
	on:click={() => {
		isTaskFormOpen = true;
		setCurrentTask(task);
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter') {
			isTaskFormOpen = true;
		}
	}}
	variant="secondary"
	class="w-full flex items-center justify-start"
>
	{task.title}
</Button>
