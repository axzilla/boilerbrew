<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	export let title: string;
	export let value: string;
	export let subValue: string;
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">{title}</Card.Title>
		<slot name="icon" />
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{value}</div>
		<p class="text-xs text-muted-foreground">{subValue}</p>
	</Card.Content>
</Card.Root>
