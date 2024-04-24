<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Bolt, Trash } from 'lucide-svelte';
	import type { Task } from '$lib/schemas';

	export let row: Task;
	export let openDialog: (task: Task | null) => void;
</script>

<Button on:click={() => openDialog(row)} variant="ghost" size="sm" class="h-8"
	><Bolt class="h-4 w-4" /></Button
>
<Button variant="ghost" size="sm" class="h-8"><Trash class="h-4 w-4" /></Button>
