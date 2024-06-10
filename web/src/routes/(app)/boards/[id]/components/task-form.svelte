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
	import { TaskSchema, type Board, type List, type Task } from '$lib/schemas';
	import { tasks } from '$lib/stores';
	import { CloudUpload, Paperclip, Trash } from 'lucide-svelte';
	import { defaultValues, filesProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { priorities } from '../data';
	import PocketBase from 'pocketbase';
	import Card from '$lib/components/ui/card/card.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { toast } from 'svelte-sonner';

	export let task: Task | null;
	export let list: List | null;
	export let board: Board | null;
	export let isTaskFormOpen = false;

	let selectedPriority = priorities.find((p) => p.value === (task ? task.priority : ''));

	const pb = new PocketBase('http://127.0.0.1:8090');

	const form = superForm(
		task || {
			...defaultValues(zod(TaskSchema)),
			list_id: list ? list.id : '',
			board_id: board ? board.id : ''
		},
		{
			dataType: 'json',
			validators: zod(TaskSchema),
			onResult: ({ result }) => {
				const { data } = result;

				tasks.update((currentTasks) => {
					const index = currentTasks.findIndex((task) => task.id === data.form.data.id);

					if (data.task === true) {
						return currentTasks.filter((task) => task.id !== data.form.data.id);
					}

					if (index !== -1) {
						return [...currentTasks.slice(0, index), data.task, ...currentTasks.slice(index + 1)];
					}

					return [...currentTasks, data.task];
				});

				isTaskFormOpen = false;
				toast.success(data.task === true ? 'Task deleted' : 'Task saved');
			}
		}
	);

	const files = filesProxy(form, 'attachments');
	const { form: formData, enhance } = form;

	// HACK: This is a workaround to focus NOT on the first input element in the form. https://github.com/huntabyte/bits-ui/issues/427
	function setFocusOnElement(selector: string) {
		const element = document.querySelector(selector);
		if (element) {
			const inputElement = element as HTMLInputElement;
			inputElement.focus();
		}
	}
</script>

<Dialog bind:open={isTaskFormOpen}>
	<DialogContent id="content-div" class="max-w-2xl h-[90%] flex flex-col">
		<form
			action="?/createOrUpdateTask"
			method="POST"
			use:enhance
			enctype="multipart/form-data"
			class="flex flex-col flex-1 overflow-hidden"
		>
			<div class="flex-1 overflow-auto p-2">
				<div class="pb-4 space-y-4">
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
						<FormControl>
							<FormLabel>Attachments</FormLabel>
							<Button
								class="w-full gap-2"
								on:click={() => document.getElementById('upload').click()}
							>
								<CloudUpload /> Upload new file
							</Button>
							<input
								id="upload"
								hidden
								type="file"
								multiple
								name="attachments"
								bind:files={$files}
							/>
						</FormControl>
						<FormFieldErrors />
					</FormField>

					<div class="flex flex-col gap-4">
						{#each $files as file}
							{@const fileType = file.type.split('/')[file.type.split('/').length - 1]}
							<div class="flex justify-between items-center gap-2">
								<Card class="w-16 h-16 flex justify-center items-center">
									{#if fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif'}
										<img
											src={URL.createObjectURL(file)}
											alt="attachment preview"
											class="rounded-lg w-16 h-16 object-cover"
										/>
									{:else}
										<Paperclip />
									{/if}
								</Card>
								<Badge>NEW</Badge>
								<p class="flex-1 break-all">{file.name}</p>
								<Button
									on:click={() => {
										files.update((currentFiles) => {
											const index = currentFiles.findIndex((f) => f.name === file.name);
											return [...currentFiles.slice(0, index), ...currentFiles.slice(index + 1)];
										});
										setFocusOnElement('#content-div');
									}}
									variant="ghost"
									size="icon"
								>
									<Trash class="h-5 w-5" />
								</Button>
							</div>
						{/each}

						{#if task && task.attachments.length > 0}
							{#each task.attachments as attachment}
								{@const fileType = attachment.split('.')[attachment.split('.').length - 1]}
								{@const isDeleted =
									$formData['attachments-'] && $formData['attachments-'].includes(attachment)}

								<div class="flex justify-between items-center gap-2">
									<div>
										<a
											class="flex gap-2 items-center"
											href={pb.files.getUrl(task, attachment)}
											target="_blank"
										>
											<Card class="w-16 h-16 flex justify-center items-center">
												{#if fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif'}
													<img
														src={pb.files.getUrl(task, attachment, { thumb: '100x250' })}
														alt="attachment preview"
														class="w-16 h-16 object-cover rounded-lg"
													/>
												{:else}
													<a href={pb.files.getUrl(task, attachment)} target="_blank">
														<Paperclip />
													</a>
												{/if}
											</Card>
											<p class="flex-1 break-all">{attachment}</p>
										</a>
									</div>
									{#if isDeleted}
										<Button
											variant="destructive"
											on:click={() => {
												formData.update(($formData) => {
													const attachments = $formData['attachments-'] || [];
													const index = attachments.findIndex((a) => a === attachment);
													attachments.splice(index, 1);
													$formData['attachments-'] = attachments;
													return $formData;
												});
												setFocusOnElement('#content-div');
											}}>Restore</Button
										>
									{:else}
										<Button
											on:click={() => {
												formData.update(($formData) => {
													const attachments = $formData['attachments-'] || [];
													attachments.push(attachment);
													$formData['attachments-'] = attachments;
													return $formData;
												});
												setFocusOnElement('#content-div');
											}}
											variant="ghost"
											size="icon"><Trash class="h-5 w-5" /></Button
										>
									{/if}
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
			<!-- Buttons Container -->
			<div class="flex justify-between px-2 pt-2">
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
