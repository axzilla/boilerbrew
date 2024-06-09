<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { boards } from '$lib/stores';
	import type { PageData } from './$types';
	import BoardForm from './components/board-form.svelte';

	export let data: PageData;

	let openCreateBoardForm = false;

	boards.set(data.boards);
</script>

<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
	<Button on:click={() => (openCreateBoardForm = true)} class="h-32">Create Board</Button>

	{#each $boards as board}
		<Button variant="secondary" href={`/boards/${board.id}`} class="h-32 basis-1/4">
			{board.title}
		</Button>
	{/each}
</div>

{#if openCreateBoardForm}
	<BoardForm bind:openCreateBoardForm />
{/if}
