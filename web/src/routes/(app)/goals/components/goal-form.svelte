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
				<DialogFooter>
					<Button variant="outline" on:click={() => (open = false)}>Cancel</Button>
					<Button type="submit">{goal ? 'Update' : 'Create'}</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>
{/if}
