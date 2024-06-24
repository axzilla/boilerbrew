<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="pb-8">
	{data.goal.name}
	<div class="flex justify-center">
		<div class="grid-cols-5 md:grid-cols-10 gap-2 inline-grid">
			{#each Array.from({ length: 100 }, (_, i) => i + 1) as i}
				<Button variant="outline" class="h-14 w-14">
					{i}
				</Button>
			{/each}
		</div>
	</div>
</div>
