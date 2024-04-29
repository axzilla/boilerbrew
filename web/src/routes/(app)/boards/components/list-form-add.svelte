<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { CardTitle } from '$lib/components/ui/card';
	import { clickOutside } from '$lib/utils';
	import { CirclePlus, XIcon } from 'lucide-svelte';
	import { ListSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import FormField from '$lib/components/ui/form/form-field.svelte';
	import { FormControl } from '$lib/components/ui/form';
	import type { PageData } from '../$types';
	import { lists } from '$lib/stores';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: PageData;

	let open = false;

	function toggleOpen() {
		open = !open;
	}

	const form = superForm(data.form, {
		validators: zod(ListSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toggleOpen();
			}
		},
		onResult({ result }) {
			const { data } = result;

			lists.update((currentLists) => {
				return [...currentLists, data.list];
			});
		}
	});

	const { form: formData, enhance } = form;
</script>

{#if open}
	<span use:clickOutside={toggleOpen}>
		<form action="?/createList" method="POST" use:enhance>
			<Card class="flex-col items-start min-w-60 flex gap-4 p-4">
				<FormField {form} name="name">
					<FormControl let:attrs>
						<Textarea
							rows={1}
							autofocus
							placeholder="Enter list title..."
							{...attrs}
							bind:value={$formData.name}
						/>
					</FormControl>
				</FormField>
				<div class="flex align-middle gap-2">
					<Button disabled={!$formData.name} type="submit">Add List</Button>
					<Button on:click={toggleOpen} variant="ghost" size="icon">
						<XIcon />
					</Button>
				</div>
			</Card>
		</form>
	</span>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span on:click={toggleOpen}>
		<Button variant="secondary" class="min-w-60 gap-2 p-4 items-center justify-start">
			<CirclePlus />
			<CardTitle class="text-sm font-medium">Add new list</CardTitle>
		</Button>
	</span>
{/if}
