<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import SuperDebug, { defaultValues, filesProxy, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { GoalSchema, type Goal } from '$lib/schemas';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { goals } from '$lib/stores';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { CloudUpload, Paperclip, Trash } from 'lucide-svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import PocketBase from 'pocketbase';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	export let open = false;
	export let goal: Goal | null = null;

	const pb = new PocketBase('http://127.0.0.1:8090');

	const form = superForm(goal || defaultValues(zod(GoalSchema)), {
		dataType: 'json',
		validators: zod(GoalSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors.name) {
				toast.error('Failed to create Goal');
			}
		},
		onResult({ result }) {
			if (result.type === 'success') {
				const { data } = result;

				goals.update((currentGoals) => {
					if (data?.form.data.id) {
						const index = currentGoals.findIndex((l) => l.id === data.form.data.id);
						currentGoals[index] = data.goal;
						return currentGoals;
					}
					return [...currentGoals, data?.goal];
				});

				toast.success(`Goal ${goal ? 'updated' : 'created'} successfully`);
				open = false;
			}
		}
	});

	const files = filesProxy(form, 'attachments');
	const { form: formData, enhance } = form;
</script>

{#if open}
	<Dialog bind:open>
		<DialogContent class="sm:max-w-[426px]">
			<!-- <SuperDebug data={$formData} /> -->
			<DialogHeader>
				<DialogTitle>{goal ? 'Update' : 'Create'} Goal</DialogTitle>
			</DialogHeader>
			<form
				enctype="multipart/form-data"
				action="/goals?/createOrUpdateGoal"
				method="POST"
				use:enhance
			>
				<FormField {form} name="name">
					<FormControl let:attrs>
						<FormLabel>Name</FormLabel>
						<Input {...attrs} bind:value={$formData.name} />
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<FormField {form} name="description">
					<FormControl let:attrs>
						<FormLabel>Description</FormLabel>
						<Textarea rows={5} {...attrs} bind:value={$formData.description} />
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<FormField {form} name="attachments">
					<FormControl>
						<FormLabel>Attachments</FormLabel>
						<Button class="w-full gap-2" on:click={() => document.getElementById('upload').click()}>
							<CloudUpload /> Upload new file
						</Button>
						<input id="upload" hidden type="file" multiple name="attachments" bind:files={$files} />
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
								}}
								variant="ghost"
								size="icon"
							>
								<Trash class="h-5 w-5" />
							</Button>
						</div>
					{/each}

					{#if goal && goal.attachments.length > 0}
						{#each goal.attachments as attachment}
							{@const fileType = attachment.split('.')[attachment.split('.').length - 1]}
							{@const isDeleted =
								$formData['attachments-'] && $formData['attachments-'].includes(attachment)}

							<div class="flex justify-between items-center gap-2">
								<div>
									<a
										class="flex gap-2 items-center"
										href={pb.files.getUrl(goal, attachment)}
										target="_blank"
									>
										<Card class="w-16 h-16 flex justify-center items-center">
											{#if fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif'}
												<img
													src={pb.files.getUrl(goal, attachment, { thumb: '100x250' })}
													alt="attachment preview"
													class="w-16 h-16 object-cover rounded-lg"
												/>
											{:else}
												<a href={pb.files.getUrl(goal, attachment)} target="_blank">
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
										}}
										variant="ghost"
										size="icon"><Trash class="h-5 w-5" /></Button
									>
								{/if}
							</div>
						{/each}
					{/if}
				</div>
				<DialogFooter>
					<Button variant="outline" on:click={() => (open = false)}>Cancel</Button>
					<Button type="submit">{goal ? 'Update' : 'Create'}</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
{/if}
