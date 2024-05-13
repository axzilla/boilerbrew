<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent } from '$lib/components/ui/dialog';
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
	import { Paperclip, Trash } from 'lucide-svelte';
	import { defaultValues, filesProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { priorities } from '../data';
	import PocketBase from 'pocketbase';
	import Card from '$lib/components/ui/card/card.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let task: Task | null;
	export let list: List | null;
	export let isTaskFormOpen = false;

	let selectedPriority = priorities.find((p) => p.value === (task ? task.priority : ''));

	const pb = new PocketBase('http://127.0.0.1:8090');

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
						return currentTasks.filter((task) => task.id !== data.form.data.id);
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

	const files = filesProxy(form, 'attachments');
	const { form: formData, enhance } = form;
</script>

<Dialog bind:open={isTaskFormOpen}>
	<DialogContent class="max-w-2xl max-h-full overflow-auto">
		<form action="?/createOrUpdateTask" method="POST" use:enhance enctype="multipart/form-data">
			<div class="pb-1">
				<FormField {form} name="title">
					<FormControl let:attrs>
						<FormLabel>Title</FormLabel>
						<Input
							class="text-muted-foreground"
							on:keydown={(event) => {
								if (event.key === 'Enter' && $formData.title) {
									event.preventDefault();
									form.submit();
								}
							}}
							autofocus
							{...attrs}
							bind:value={$formData.title}
						/>
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<FormField {form} name="description">
					<FormControl let:attrs>
						<FormLabel>Description</FormLabel>
						<Textarea
							class="text-muted-foreground"
							{...attrs}
							on:keydown={(event) => {
								if (event.key === 'Enter' && $formData.title) {
									event.preventDefault();
									form.submit();
								}
							}}
							rows={4}
							bind:value={$formData.description}
						/>
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
									<SelectItem class="text-muted-foreground" {value} {label} />
								{/each}
								<SelectItem class="text-muted-foreground" label="None" value="" />
							</SelectContent>
						</Select>
					</FormControl>
					<FormFieldErrors />
				</FormField>

				<FormField {form} name="attachments">
					<FormControl let:attrs>
						<FormLabel>Attachments</FormLabel>
						<!-- <Input type="file" multiple bind:files={$files} {...attrs} /> -->
						<input type="file" multiple name="attachments" bind:files={$files} />
					</FormControl>
					<FormFieldErrors />
				</FormField>

				<div class="flex flex-col gap-4">
					{#each $files as file}
						{@const fileType = file.type.split('/')[file.type.split('/').length - 1]}
						<div class="flex justify-between items-center gap-2">
							<Card class="w-24 h-24 flex justify-center items-center">
								{#if fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif'}
									<img
										src={URL.createObjectURL(file)}
										alt="attachment preview"
										class="rounded-lg w-24 h-24 object-cover"
									/>
								{:else}
									<Paperclip />
								{/if}
							</Card>
							<Badge>NEW</Badge>
							<p class="flex-1 break-all">{file.name}</p>
							<Button variant="ghost" size="icon"><Trash class="h-5 w-5" /></Button>
						</div>
					{/each}

					{#if task && task.attachments.length > 0}
						{#each task.attachments as attachment}
							{@const fileType = attachment.split('.')[attachment.split('.').length - 1]}
							<div class="flex justify-between items-center gap-2">
								<Card class="w-24 h-24 flex justify-center items-center">
									{#if fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif'}
										<img
											src={pb.files.getUrl(task, attachment, { thumb: '100x250' })}
											alt="attachment preview"
											class="w-24 h-24 object-cover rounded-lg"
										/>
									{:else}
										<Paperclip />
									{/if}
								</Card>
								<p class="flex-1 break-all">{attachment}</p>
								<Button variant="ghost" size="icon"><Trash class="h-5 w-5" /></Button>
							</div>
						{/each}
					{/if}
				</div>
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
