<script lang="ts">
	import type { List } from '$lib/schemas';
	import { lists, tasks } from '$lib/stores';
	import { page } from '$app/stores';
	import { Bolt, Trash } from 'lucide-svelte';
	import { ListCard, ListFormDelete, BoardFormDelete } from './components';
	import { BoardForm } from '../components';
	import ListCardAdd from './components/list-card-add.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import type { PageData } from './$types';

	export let data: PageData;

	lists.set(data.lists.sort((a, b) => a.index - b.index));
	tasks.set(data.tasks);

	let currentList: List;
	let openDeleteList = false;
	let openDeleteBoard = false;
	let openBoardForm = false;

	function setCurrentList(list: List) {
		currentList = list;
	}

	function handleDndConsiderLists(e: CustomEvent<DndEvent<List>>) {
		lists.set(e.detail.items);
	}

	async function handleDndFinalizeLists(e: CustomEvent<DndEvent<List>>) {
		const updatedListsResponse = await fetch('/api/updateListIndex', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ lists: e.detail.items, boardId: $page.params.id })
		});

		if (!updatedListsResponse.ok) {
			console.error('Error:', updatedListsResponse.statusText);
		} else {
			const updatedLists: List[] = await updatedListsResponse.json();
			lists.set(updatedLists.sort((a, b) => a.index - b.index));
		}
	}
</script>

<div class="flex justify-between items-center w-full mb-4">
	<p class="font-extrabold">
		{data.board.title}
	</p>
	<div class="flex items-center">
		<Button variant="ghost" on:click={() => (openBoardForm = true)}>
			<Bolt class="cursor-pointer" />
		</Button>
		<Button variant="ghost" on:click={() => (openDeleteBoard = true)}>
			<Trash class="cursor-pointer" />
		</Button>
	</div>
</div>
<div
	use:dndzone={{ items: $lists, flipDurationMs: 200, type: 'columns' }}
	on:consider={handleDndConsiderLists}
	on:finalize={handleDndFinalizeLists}
	class="overflow-auto h-full flex gap-4 items-start"
>
	{#each $lists as list (list.id)}
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

{#if openBoardForm}
	<BoardForm bind:open={openBoardForm} board={data.board} />
{/if}
