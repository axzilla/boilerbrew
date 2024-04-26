<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import CardContent from '../ui/card/card-content.svelte';
	import CardHeader from '../ui/card/card-header.svelte';
	import CardTitle from '../ui/card/card-title.svelte';

	export let title: string;
	export let value: string;
</script>

<Card>
	<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
		<CardTitle class="text-sm font-medium">{title}</CardTitle>
		<slot name="icon" />
	</CardHeader>
	<CardContent>
		<div class="text-2xl font-bold">{value}</div>
	</CardContent>
</Card>
