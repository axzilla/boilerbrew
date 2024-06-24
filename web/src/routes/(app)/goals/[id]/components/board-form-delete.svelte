<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { BoardSchema, type Board } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let board: Board;
	export let openDeleteBoard = false;

	const form = superForm(board, {
		dataType: 'json',
		validators: zod(BoardSchema)
	});

	const { enhance } = form;
</script>

{#if openDeleteBoard}
	<Dialog bind:open={openDeleteBoard}>
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>Delete Board?</DialogTitle>
			</DialogHeader>
			<form action="?/deleteBoard" method="POST" use:enhance>
				<DialogFooter>
					<Button type="submit" variant="outline" name="delete" class="danger">Delete</Button>
					<Button type="submit" on:click={() => (openDeleteBoard = false)}>Cancel</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
{/if}
