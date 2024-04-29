<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { CardTitle } from '$lib/components/ui/card';
	import { CirclePlus } from 'lucide-svelte';
</script>

<Card class="min-w-60 cursor-pointer flex items-center gap-2 p-4 hover:bg-muted">
	<CirclePlus />
	<CardTitle class="text-sm font-medium">Add new list</CardTitle>
</Card>
