<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import type { List } from '$lib/schemas';
	import { lists } from '$lib/stores';
	import { ListCard, ListFormDelete, ListForm } from './components';
	import { Card } from '$lib/components/ui/card';

	export let data;

	lists.set(data.lists);

	let currentList: List;
	let openDelete = false;

	function setCurrentList(list: List) {
		currentList = list;
	}
</script>

<div class="overflow-scroll h-full">
	<ScrollArea class="h-full" orientation="horizontal">
		<!-- FIX: Why w-1? -->
		<div class="flex gap-2 w-1 items-start">
			{#each $lists as list}
				<ListCard bind:openDelete {list} {setCurrentList} />
			{/each}
			<Card>
				<ListForm list={null} {data} />
			</Card>
		</div>
	</ScrollArea>
</div>

{#if openDelete}
	<ListFormDelete bind:openDelete list={currentList} />
{/if}
