<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { zod } from 'sveltekit-superforms/adapters';
	import { UpdatePasswordSchema } from '$lib/schemas.js';

	export let data;

	let isLoading = false;

	const form = superForm(data.form, {
		validators: zod(UpdatePasswordSchema),
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form: f }) => {
			if (f.errors.password || f.errors.passwordConfirm || f.errors.oldPassword) {
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
	<form action="?/updatePassword" method="POST" use:enhance>
		<Card.Header>
			<Card.Title>Change Password</Card.Title>
		</Card.Header>
		<Card.Content>
			<Form.Field {form} name="oldPassword">
				<Form.Control let:attrs>
					<Form.Label>Old Password</Form.Label>
					<Input
						autofocus
						{...attrs}
						bind:value={$formData.oldPassword}
						type="password"
						disabled={isLoading}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} type="password" disabled={isLoading} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="passwordConfirm">
				<Form.Control let:attrs>
					<Form.Label>Confirm New Password</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.passwordConfirm}
						type="password"
						disabled={isLoading}
					/>
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
