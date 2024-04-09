<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { LoaderCircle } from 'lucide-svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { updateUsernameSchema } from '$lib/schemas.js';

	export let data;
	let isLoading = false;

	const form = superForm(data.form, {
		validators: zod(updateUsernameSchema),
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form: f }) => {
			if (f.errors.username) {
				toast.error('Failed to update usernam!');
			}
			if (f.valid) {
				toast.success(f.message);
				$formData.username = data.user?.username;
			}
			isLoading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<form action="?/updateUsername" method="POST" use:enhance>
		<Card.Header>
			<Card.Title>Change Username</Card.Title>
		</Card.Header>
		<Card.Content>
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$formData.username} />
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
