<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import { priorities, statuses } from '../(data)/data';
	import * as Form from '$lib/components/ui/form/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { taskSchema } from '$lib/schemas';
	import { zod } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import type { PageData } from '../$types';
	import SuperDebug from 'sveltekit-superforms';
	import { tasks } from '$lib/stores';

	export let data: PageData;
	let open = false;

	const form = superForm(data.form, {
		dataType: 'json',
		validators: zod(taskSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors.details || f.errors.status || f.errors.priority) {
				toast.error('Please fill in all required fields!');
			}
			if (f.valid) {
				open = false;
				toast.success('Task created successfully!');
			}
		},
		onResult({ result }) {
			// TODO: "data" does not exists on type "ActionResult"
			if (result.data && result.data.task) {
				tasks.update((t) => [...t, result.data.task]);
			} else {
				console.error('Failed to retrieve task data:', result);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button size="sm" class="h-8 border-dashed">
			<CirclePlus class="mr-2 h-4 w-4" />
			Add Task
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<SuperDebug data={$formData} />

		<Dialog.Header>
			<Dialog.Title>Add Task</Dialog.Title>
		</Dialog.Header>
		<form action="?/createTask" method="POST" use:enhance>
			<div class="grid gap-4 py-4">
				<div class="relative hidden flex-col items-start gap-8 md:flex">
					<div class="grid w-full items-start gap-6">
						<div class="grid gap-3">
							<Form.Field {form} name="details">
								<Form.Control let:attrs>
									<Label for="content">Details</Label>
									<Textarea
										autofocus
										{...attrs}
										bind:value={$formData.details}
										id="details"
										placeholder="Describe the new task you want to add..."
										class="min-h-[9.5rem]"
									/>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="grid gap-3">
							<Form.Field {form} name="status">
								<Form.Control let:attrs>
									<Label for="role">Status</Label>
									<!-- <Select.Root selected={{ value: 'todo', label: 'Todo' }}> -->
									<Select.Root
										onSelectedChange={(v) => {
											v && ($formData.status = v.value);
										}}
										{...attrs}
									>
										<Select.Trigger>
											<Select.Value placeholder="Select a Status" />
										</Select.Trigger>
										<Select.Content>
											{#each statuses as status}
												{@const Icon = status.icon}
												<Select.Item value={status.value}>
													<div class="flex items-start gap-3 text-muted-foreground">
														<Icon class="size-5" />
														<div class="grid gap-0.5">
															{status.label}
														</div>
													</div>
												</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="grid gap-3">
							<Form.Field {form} name="priority">
								<Form.Control let:attrs>
									<Label for="role">Priority</Label>
									<Select.Root
										onSelectedChange={(v) => {
											v && ($formData.priority = v.value);
										}}
										{...attrs}
									>
										<Select.Trigger>
											<Select.Value placeholder="Select a Priority" />
										</Select.Trigger>
										<Select.Content>
											{#each priorities as priority}
												{@const Icon = priority.icon}
												<Select.Item value={priority.value}>
													<div class="flex items-start gap-2 text-muted-foreground">
														<Icon class="size-4" />
														<div class="grid gap1.5">
															{priority.label}
														</div>
													</div>
												</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
