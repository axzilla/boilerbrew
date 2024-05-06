<script lang="ts">
	import type { List } from '$lib/schemas';
	import { lists } from '$lib/stores';
	import { ListCard, ListFormDelete } from './components';
	import ListCardAdd from './components/list-card-add.svelte';

	export let data;

	lists.set(data.lists);

	let currentList: List;
	let openDeleteList = false;

	function setCurrentList(list: List) {
		currentList = list;
	}
</script>

<div class="overflow-auto h-full flex gap-4 items-start">
	{#each $lists as list}
		<ListCard bind:openDelete={openDeleteList} {list} {setCurrentList} />
	{/each}
	<ListCardAdd {data} />
</div>

{#if openDeleteList}
	<ListFormDelete bind:openDeleteList list={currentList} />
{/if}
