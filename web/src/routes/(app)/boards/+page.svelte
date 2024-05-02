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

<ScrollArea class="h-full" orientation="horizontal">
	<div class="flex gap-2 items-start">
		{#each $lists as list}
			<ListCard bind:openDelete {list} {setCurrentList} />
		{/each}
		<Card class="min-w-72 p-2">
			<ListForm list={null} {data} />
		</Card>
	</div>
</ScrollArea>

{#if openDelete}
	<ListFormDelete bind:openDelete list={currentList} />
{/if}
