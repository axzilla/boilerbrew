<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { TaskSchema, type List, type Task } from '$lib/schemas';
	import { tasks } from '$lib/stores';
	import { Trash } from 'lucide-svelte';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let task: Task | null;
	export let list: List | null;
	export let isTaskFormOpen = false;

	const priorities = [
		{ value: 'low', label: 'Low' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'high', label: 'High' }
	];
	let selectedPriority =
		priorities.find((p) => p.value === (task ? task.priority : 'low')) || priorities[0];

	const form = superForm(
		task || { ...defaultValues(zod(TaskSchema)), list_id: list ? list.id : '' },
		{
			dataType: 'json',
			validators: zod(TaskSchema),
			onResult: ({ result }) => {
				const { data } = result;

				tasks.update((currentTasks) => {
					const index = currentTasks.findIndex((task) => task.id === data.form.data.id);

					if (data.delete === true) {
						if (index !== -1) {
							return currentTasks.filter((task) => task.id !== data.form.data.id);
						}
						return currentTasks;
					}

					if (index !== -1) {
						return [...currentTasks.slice(0, index), data.task, ...currentTasks.slice(index + 1)];
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
		<DialogHeader>
			<DialogTitle>{!task ? 'Create' : 'Edit'} Task</DialogTitle>
		</DialogHeader>
		<form action="?/createOrUpdateTask" method="POST" use:enhance>
			<div class="pb-4">
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
						<Textarea {...attrs} rows={4} bind:value={$formData.description} />
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<FormField {form} name="priority">
					<FormControl let:attrs>
						<FormLabel>Priority</FormLabel>
						<Select
							selected={selectedPriority}
							onSelectedChange={(v) => {
								v && ($formData.priority = v.value);
							}}
						>
							<SelectTrigger {...attrs}>
								<SelectValue placeholder="Select a priority for this task" />
							</SelectTrigger>
							<SelectContent>
								{#each priorities as { value, label }}
									<SelectItem {value} {label} />
								{/each}
							</SelectContent>
						</Select>
					</FormControl>
					<FormFieldErrors />
				</FormField>
			</div>
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
				{:else}
					<div />
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
					<Button disabled={!$formData.title} type="submit" class="danger">Save</Button>
				</div>
			</div>
		</form>
	</DialogContent>
</Dialog>
