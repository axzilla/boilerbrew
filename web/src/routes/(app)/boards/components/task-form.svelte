<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { TaskSchema, type Task } from '$lib/schemas';
	import SuperDebug, { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let task: Task | null;
	export let isTaskFormOpen = false;

	const form = superForm(task || defaultValues(zod(TaskSchema)), {
		dataType: 'json',
		validators: zod(TaskSchema)
	});

	const { form: formData, enhance } = form;
</script>

<Dialog bind:open={isTaskFormOpen}>
	<DialogContent class="sm:max-w-[425px]">
		<SuperDebug data={formData} />
		<DialogHeader>
			<DialogTitle>{!task ? 'Create' : 'Edit'} Task</DialogTitle>
		</DialogHeader>
		<form action="?/example" method="POST" use:enhance>
			<DialogFooter>
				<Button type="submit" variant="outline" name="delete" class="danger">Save</Button>
				<Button
					on:click={() => {
						isTaskFormOpen = false;
					}}>Cancel</Button
				>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
