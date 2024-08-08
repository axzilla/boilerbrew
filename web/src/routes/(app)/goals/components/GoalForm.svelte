<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { GoalSchema, type Goal } from '$lib/schemas';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Trash } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let open = false;
	export let goal: Goal | null = null;

	const form = superForm(goal || defaultValues(zod(GoalSchema)), {
		dataType: 'json',
		validators: zod(GoalSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors.name) {
				toast.error('Failed to create Goal');
			}
		},
		async onResult({ result }) {
			if (result.type === 'success') {
				const { data } = result;

				if (!goal) {
					await goto(`/goals/${data.goal.id}`);
					toast.success('Goal created');
					return;
				}

				// INFO: PocketBase returns a boolean if db entry was deleted
				if (data.goal === true) {
					await goto('/goals');
					toast.success('Goal deleted');
					return;
				}

				toast.success('Goal updated');
				open = false;
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

{#if open}
	<Dialog bind:open>
		<DialogContent class="sm:max-w-[426px]">
			<DialogHeader>
				<DialogTitle>{goal ? 'Update' : 'Create'} Goal</DialogTitle>
			</DialogHeader>
			<form enctype="multipart/form-data" action="/goals?/handleGoal" method="POST" use:enhance>
				<FormField {form} name="title">
					<FormControl let:attrs>
						<FormLabel>Title</FormLabel>
						<Input {...attrs} bind:value={$formData.title} />
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
				<div class="flex justify-between items-center">
					{#if goal}
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
						<Button variant="outline" on:click={() => (open = false)}>Cancel</Button>
						<Button type="submit">{goal ? 'Update' : 'Create'}</Button>
					</div>
				</div>
			</form>
		</DialogContent>
	</Dialog>
{/if}
