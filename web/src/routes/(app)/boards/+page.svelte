<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import type { List } from '$lib/schemas';
	import { lists } from '$lib/stores';
	import ListFormAdd from './components/list-form-add.svelte';
	import ListCard from './components/list-card.svelte';
	import ListFormDelete from './components/list-form-delete.svelte';

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
			<ListFormAdd {data} />
		</div>
	</ScrollArea>
</div>

{#if openDelete}
	<ListFormDelete bind:openDelete list={currentList} />
{/if}
