<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
	const { boards } = data;
</script>

{#each boards as board}
	<Button href={`/boards/${board.id}`} class="">
		{board.title}
	</Button>
{/each}
