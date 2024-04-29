<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { ListSchema, type List } from '$lib/schemas';
	import { lists } from '$lib/stores';
	import  { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let list: List;
	export let open = false;

	const form = superForm(list, {
		dataType: 'json',
		validators: zod(ListSchema),
		onResult({ result }) {
			open = false;
			if (result.data.list === true) {
				lists.update((currentLists) => {
					return currentLists.filter((l) => l.id !== result.data.form.data.id);
				});
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

{#if open}
	<Dialog bind:open>
		<DialogContent class="sm:max-w-[425px]">
			{list.id}
			<DialogHeader>
				<DialogTitle>Delete List?</DialogTitle>
			</DialogHeader>
			<form action="?/deleteList" method="POST" use:enhance>
				<DialogFooter>
					<Button type="submit" variant="outline" name="delete" class="danger">Delete</Button>
					<Button type="submit" on:click={() => (open = false)}>Cancel</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
{/if}
