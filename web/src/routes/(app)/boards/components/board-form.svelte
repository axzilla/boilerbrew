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
	import { BoardSchema, type Board } from '$lib/schemas';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { boards } from '$lib/stores';

	export let open = false;
	export let board: Board | null = null;

	const form = superForm(board || defaultValues(zod(BoardSchema)), {
		dataType: 'json',
		validators: zod(BoardSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors.title) {
				toast.error('Failed to create Board');
			}
		},
		onResult({ result }) {
			const { data } = result;

			boards.update((currentBoards) => {
				if (data.form.data.id) {
					const index = currentBoards.findIndex((l) => l.id === data.form.data.id);
					currentBoards[index] = data.board;
					return currentBoards;
				}
				return [...currentBoards, data.board];
			});

			open = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

{#if open}
	<Dialog bind:open>
		<DialogContent class="sm:max-w-[426px]">
			<DialogHeader>
				<DialogTitle>{board ? 'Edit' : 'Create'} Board</DialogTitle>
			</DialogHeader>
			<form action="/boards?/createOrUpdateBoard" method="POST" use:enhance>
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
