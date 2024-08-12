<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { MilestoneSchema, type Milestone } from '$lib/schemas';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { formatDate } from '$lib/utils';

	export let open = false;
	export let milestone: Milestone | null = null;
	export let goalId: string;
	export let isLastMilestone = false;

	let loading = false;

	const form = superForm(
		milestone || {
			...defaultValues(zod(MilestoneSchema)),
			goal_id: goalId
		},
		{
			dataType: 'json',
			validators: zod(MilestoneSchema),
			onSubmit: () => {
				loading = true;
			},
			onResult({ result }) {
				loading = false;
				if (result.type === 'success') {
					const { data } = result;

					// Milestone created
					if (!milestone) {
						toast.success('Milestone created');
						open = false;
						return;
					}

					// Milestone deleted
					// INFO: PocketBase returns a boolean if db entry was deleted
					if (data?.milestone === true) {
						toast.success('Milestone deleted');
						open = false;
						return;
					}

					// Milestone updated
					toast.success('Milestone updated');
					open = false;
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

{#if open}
	<Dialog bind:open>
		<DialogContent class="sm:max-w-[426px]">
			<DialogHeader>
				<DialogTitle class="mb-2">{milestone ? 'Update' : 'Create'} Milestone</DialogTitle>
				<p class="font-bold text-sm">Created:</p>
				<p class="font-light text-sm">{formatDate(milestone?.created)}</p>
			</DialogHeader>
			<form action="?/handleMilestone" method="POST" use:enhance>
				<FormField {form} name="notes">
					<FormControl let:attrs>
						<FormLabel>Notes (Optional)</FormLabel>
						<Textarea rows={5} {...attrs} bind:value={$formData.notes} />
					</FormControl>
					<FormFieldErrors />
				</FormField>
				<div class="flex justify-between items-center">
					{#if milestone && isLastMilestone}
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
						<Button disabled={loading} type="submit">{milestone ? 'Update' : 'Create'}</Button>
					</div>
				</div>
			</form>
		</DialogContent>
	</Dialog>
{/if}
