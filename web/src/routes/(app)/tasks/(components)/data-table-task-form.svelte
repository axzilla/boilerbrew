<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Select, SelectValue } from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Dialog } from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { priorities, statuses } from '../(data)/data';
	import { FormControl } from '$lib/components/ui/form';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { TaskSchema, type Task } from '$lib/schemas';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { PageData } from '../$types';
	import { tasks } from '$lib/stores';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogFooter from '$lib/components/ui/dialog/dialog-footer.svelte';
	import FormField from '$lib/components/ui/form/form-field.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';
	import SelectContent from '$lib/components/ui/select/select-content.svelte';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import SelectTrigger from '$lib/components/ui/select/select-trigger.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import SuperDebug from 'sveltekit-superforms';

	export let data: PageData;
	export let currentTask: Task | null = null;
	export let open: boolean;
	export let closeDialog: () => void;

	const form = superForm(currentTask ? defaults(currentTask, zodClient(TaskSchema)) : data.form, {
		dataType: 'json',
		validators: zod(TaskSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors.details || f.errors.status || f.errors.priority) {
				toast.error('Please fill in all required fields!');
			}
			if (f.valid) {
				closeDialog();
				toast.success('Task created successfully!');
			}
		},
		onResult({ result }) {
			if (!result) {
				console.error('No result provided');
				return;
			}

			const { data } = result;

			if (!data || !data.task || !data.form) {
				console.error('Failed to retrieve task data:', result);
				return;
			}

			tasks.update((currentTasks) => {
				// Find the index of the task if it exists
				const index = currentTasks.findIndex(
					(t) => t.id === (data.task === true ? data.form.data.id : data.task.id)
				);

				if (data.task === true) {
					// DELETE TASK
					if (index === -1) {
						console.error('Task to delete not found:', data.form.data.id);
						return currentTasks;
					}
					return [...currentTasks.slice(0, index), ...currentTasks.slice(index + 1)];
				} else {
					// UPDATE OR CREATE TASK
					if (index !== -1) {
						return [...currentTasks.slice(0, index), data.task, ...currentTasks.slice(index + 1)];
					} else {
						return [...currentTasks, data.task];
					}
				}
			});
		}
	});

	const { form: formData, enhance } = form;

	$: if (currentTask) {
		form.reset(defaults(currentTask, zodClient(TaskSchema)));
	} else {
		form.reset(data.form);
	}
</script>

<Dialog bind:open>
	<DialogContent class="sm:max-w-[425px]">
		<!-- <SuperDebug data={$formData} /> -->

		<DialogHeader>
			<DialogTitle>{currentTask ? 'Edit' : 'Add'} Task</DialogTitle>
		</DialogHeader>
		<form action="?/createTask" method="POST" use:enhance>
			<div class="grid gap-4 py-4">
				<div class="relative hidden flex-col items-start gap-8 md:flex">
					<div class="grid w-full items-start gap-6">
						<div class="grid gap-3">
							<FormField {form} name="details">
								<FormControl let:attrs>
									<Label for="content">Details</Label>
									<Textarea
										autofocus
										{...attrs}
										bind:value={$formData.details}
										id="details"
										placeholder="Describe the new task you want to add..."
										class="min-h-[9.5rem]"
									/>
								</FormControl>
								<FormFieldErrors />
							</FormField>
						</div>
						<div class="grid gap-3">
							<FormField {form} name="status">
								<FormControl let:attrs>
									<Label for="role">Status</Label>
									<Select
										selected={{
											value: $formData.status,
											label: statuses.find((s) => s.value === $formData.status)?.label
										}}
										onSelectedChange={(v) => {
											v && ($formData.status = v.value);
										}}
										{...attrs}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a Status" />
										</SelectTrigger>
										<SelectContent>
											{#each statuses as status}
												{@const Icon = status.icon}
												<SelectItem value={status.value}>
													<div class="flex items-start gap-3 text-muted-foreground">
														<Icon class="size-5" />
														<div class="grid gap-0.5">
															{status.label}
														</div>
													</div>
												</SelectItem>
											{/each}
										</SelectContent>
									</Select>
								</FormControl>
								<FormFieldErrors />
							</FormField>
						</div>
						<div class="grid gap-3">
							<FormField {form} name="priority">
								<FormControl let:attrs>
									<Label for="role">Priority</Label>
									<Select
										selected={{
											value: $formData.priority,
											label: priorities.find((p) => p.value === $formData.priority)?.label
										}}
										onSelectedChange={(v) => {
											v && ($formData.priority = v.value);
										}}
										{...attrs}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a Priority" />
										</SelectTrigger>
										<SelectContent>
											{#each priorities as priority}
												{@const Icon = priority.icon}
												<SelectItem value={priority.value}>
													<div class="flex items-start gap-2 text-muted-foreground">
														<Icon class="size-4" />
														<div class="grid gap1.5">
															{priority.label}
														</div>
													</div>
												</SelectItem>
											{/each}
										</SelectContent>
									</Select>
								</FormControl>
								<FormFieldErrors />
							</FormField>
						</div>
					</div>
				</div>
			</div>
			<DialogFooter>
				{#if $formData.id}
					<Button
						type="submit"
						variant="outline"
						name="delete"
						on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
						class="danger"
					>
						Delete
					</Button>
				{/if}
				<Button type="submit">Save</Button>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>
