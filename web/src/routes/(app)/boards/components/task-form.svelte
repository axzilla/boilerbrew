<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { TaskSchema, type List, type Task } from '$lib/schemas';
	import { tasks } from '$lib/stores';
	import { Trash } from 'lucide-svelte';
	import SuperDebug, { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let task: Task | null;
	export let list: List | null;
	export let isTaskFormOpen = false;

	const form = superForm(
		task || { ...defaultValues(zod(TaskSchema)), list_id: list ? list.id : '' },
		{
			dataType: 'json',
			validators: zod(TaskSchema),
			onResult: ({ result }) => {
				const { data } = result;

				tasks.update((currentTasks) => {
					if (data.form.data.id) {
						const index = currentTasks.findIndex((task) => task.id === data.form.data.id);
						currentTasks[index] = data.task;
						return currentTasks;
					}
					return [...currentTasks, data.task];
				});

				isTaskFormOpen = false;
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<Dialog bind:open={isTaskFormOpen}>
	<DialogContent class="sm:max-w-[425px]">
		<SuperDebug data={formData} />
		<DialogHeader>
			<DialogTitle>{!task ? 'Create' : 'Edit'} Task</DialogTitle>
		</DialogHeader>
		<form action="?/createOrUpdateTask" method="POST" use:enhance>
			<FormField {form} name="title">
				<FormControl let:attrs>
					<FormLabel>Title</FormLabel>
					<Input autofocus {...attrs} bind:value={$formData.title} />
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<FormField {form} name="description">
				<FormControl let:attrs>
					<FormLabel>Description</FormLabel>
					<Textarea {...attrs} bind:value={$formData.description} />
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<div class="flex justify-between">
				{#if $formData.id}
					<Button
						type="submit"
						on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
						name="delete"
						variant="destructive"
						size="icon"
					>
						<Trash class="h-5 w-5" />
					</Button>
				{/if}
				<div>
					<Button
						variant="outline"
						on:click={() => {
							isTaskFormOpen = false;
						}}
					>
						Cancel
					</Button>
					<Button disabled={!$formData.title} type="submit" name="delete" class="danger"
						>Save</Button
					>
				</div>
			</div>
		</form>
	</DialogContent>
</Dialog>
