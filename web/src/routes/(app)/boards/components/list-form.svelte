<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { XIcon } from 'lucide-svelte';
	import { ListSchema, type List } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import FormField from '$lib/components/ui/form/form-field.svelte';
	import { FormControl } from '$lib/components/ui/form';
	import type { PageData } from '../$types';
	import { lists } from '$lib/stores';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: PageData | null;
	export let list: List | null;
	export let isFormOpen = false;

	const form = superForm(list || data.form, {
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

<form class="" action="?/createOrUpdateList" method="POST" use:enhance>
	<FormField {form} name="name">
		<FormControl let:attrs>
			<Textarea
				on:keydown={(event) => {
					if (event.key === 'Enter') {
						event.preventDefault();
						if ($formData.name) {
							form.submit(); // Absenden des Formulars
						}
					}
				}}
				rows={1}
				autofocus
				placeholder="Enter list title..."
				{...attrs}
				bind:value={$formData.name}
			/>
		</FormControl>
	</FormField>
	{#if !$formData.id}
		<div class="flex align-middle gap-2">
			<Button disabled={!$formData.name} type="submit">Add List</Button>
			<Button on:click={() => console.log('closed')} variant="ghost" size="icon">
				<XIcon />
			</Button>
		</div>
	{/if}
</form>
