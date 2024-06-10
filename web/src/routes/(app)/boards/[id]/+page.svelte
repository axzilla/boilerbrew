<script lang="ts">
	import type { List } from '$lib/schemas';
	import { lists, tasks } from '$lib/stores';
	import { Bolt, Trash } from 'lucide-svelte';
	import { ListCard, ListFormDelete, BoardFormDelete } from './components';
	import ListCardAdd from './components/list-card-add.svelte';
	import { Button } from '$lib/components/ui/button';

	export let data;

	lists.set(data.lists);
	tasks.set(data.tasks);

	let currentList: List;
	let openDeleteList = false;
	let openDeleteBoard = false;

	function setCurrentList(list: List) {
		currentList = list;
	}
</script>

<div class="flex justify-between items-center w-full mb-4">
	<p class="font-extrabold">
		{data.board.title}
	</p>
	<div class="flex items-center">
		<Button variant="ghost">
			<Bolt class="cursor-pointer" />
		</Button>
		<Button variant="ghost" on:click={() => (openDeleteBoard = true)}>
			<Trash class="cursor-pointer" />
		</Button>
	</div>
</div>
<div class="overflow-auto h-full flex gap-4 items-start">
	{#each $lists as list}
		<ListCard bind:openDelete={openDeleteList} {list} board={data.board} {setCurrentList} />
	{/each}
	<ListCardAdd {data} />
</div>

{#if openDeleteList}
	<ListFormDelete bind:openDeleteList list={currentList} />
{/if}

{#if openDeleteBoard}
	<BoardFormDelete bind:openDeleteBoard board={data.board} />
{/if}
