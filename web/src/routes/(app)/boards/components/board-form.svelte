<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { BoardSchema } from '$lib/schemas';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { boards } from '$lib/stores';

	export let openCreateBoardForm = false;

	const form = superForm(defaultValues(zod(BoardSchema)), {
		validators: zod(BoardSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors.title) {
				toast.error('Failed to create Board');
			}
		},
		onResult({ result }) {
			const { data } = result;

			boards.update((currentBoards) => {
				openCreateBoardForm = false;
				// if (data.form.data.id) {
				// 	const index = currentBoards.findIndex((l) => l.id === data.form.data.id);
				// 	currentBoards[index] = data.board;
				// 	return currentBoards;
				// }
				return [...currentBoards, data.board];
			});
		}
	});

	const { form: formData, enhance } = form;
</script>

{#if openCreateBoardForm}
	<Dialog bind:open={openCreateBoardForm}>
		<DialogContent class="sm:max-w-[426px]">
			<DialogHeader>
				<DialogTitle>Create Board</DialogTitle>
			</DialogHeader>
			<form action="?/createOrUpdateBoard" method="POST" use:enhance>
				<FormField {form} name="title">
					<FormControl let:attrs>
						<FormLabel>Title</FormLabel>
						<Input placeholder="Enter Board Title..." {...attrs} bind:value={$formData.title} />
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<DialogFooter>
					<!-- <Button type="submit" variant="outline" name="delete" class="danger">Delete</Button> -->
					<Button type="submit">Save</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
{/if}
