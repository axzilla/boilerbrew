<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Bolt } from 'lucide-svelte';
	import type { Task } from '$lib/schemas';

	export let row: Task;
	export let openTaskFormDialog: (task: Task | null) => void;
</script>

<Button on:click={() => openTaskFormDialog(row)} size="sm" class="h-8">
	<Bolt class="h-4 w-4 mr-2" />
	Edit
</Button>
