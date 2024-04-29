<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { NewBoardCard } from './components';
</script>

<div class="overflow-scroll h-full">
	<ScrollArea class="h-full" orientation="horizontal">
		<!-- FIX: Why w-1? -->
		<div class="flex gap-2 w-1 h-full">
			{#each Array.from({ length: 8 }, (_, i) => i + 1) as item}
				<NewBoardCard />
			{/each}
		</div>
	</ScrollArea>
</div>
