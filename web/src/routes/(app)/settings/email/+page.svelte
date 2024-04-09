<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { updateEmailSchema } from '$lib/schemas.js';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data;
	let isLoading = false;

	const form = superForm(data.form, {
		validators: zod(updateEmailSchema),
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form: f }) => {
			if (f.errors.email) {
				toast.error('Failed to update email!');
			}
			if (f.valid) {
				toast.success(f.message);
			}
			isLoading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<form action="?/updateEmail" method="POST" use:enhance>
		<Card.Header>
			<Card.Title>Change Email</Card.Title>
		</Card.Header>
		<Card.Content>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} type="email" disabled={isLoading} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Save
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
