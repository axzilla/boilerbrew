<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { CirclePlus } from 'lucide-svelte';
	import { BoardSchema, ListSchema, type List } from '$lib/schemas';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import FormField from '$lib/components/ui/form/form-field.svelte';
	import { FormControl } from '$lib/components/ui/form';
	import type { PageData } from '../$types';
	import { lists } from '$lib/stores';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: PageData | null;
	export let list: List | null;
	export let isFormOpen = false;

	const form = superForm(list || { ...defaultValues(zod(ListSchema)), board_id: data?.board.id }, {
		dataType: 'json',
		validators: zod(ListSchema),
		onResult({ result }) {
			const { data } = result;

			lists.update((currentLists) => {
				if (data.form.data.id) {
					isFormOpen = false;
					const index = currentLists.findIndex((l) => l.id === data.form.data.id);
					currentLists[index] = data.list;
					return currentLists;
				}
				return [...currentLists, data.list];
			});
		}
	});

	const { form: formData, enhance } = form;
</script>

<form action="?/createOrUpdateList" method="POST" use:enhance class="flex gap-2">
	<FormField {form} name="name" class="flex-1">
		<FormControl let:attrs>
			<Textarea
				autofocus
				class="border-0 hover:border-0 p-2 font-bold"
				on:keydown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						if ($formData.name) {
							form.submit();
						}
					}
				}}
				rows={1}
				placeholder="Enter List Title..."
				{...attrs}
				bind:value={$formData.name}
			/>
		</FormControl>
	</FormField>
	{#if !$formData.id}
		<div class="flex-row align-middle gap-2">
			<Button size="icon" variant="ghost" disabled={!$formData.name} type="submit">
				<CirclePlus class="h-5 w-5" />
			</Button>
		</div>
	{/if}
</form>
