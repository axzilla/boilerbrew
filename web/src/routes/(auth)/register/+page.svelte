<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { registerUserSchema } from '$lib/schemas.js';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data;

	const form = superForm(data.form, {
		validators: zod(registerUserSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors) {
				toast.error('Failed to register!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm w-full">
	<Card.Header>
		<Card.Title class="text-2xl">Sign Up</Card.Title>
	</Card.Header>
	<Card.Content>
		<form action="?/register" method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} type="email" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input {...attrs} bind:value={$formData.password} type="password" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="passwordConfirm">
						<Form.Control let:attrs>
							<Form.Label>Confirm Password</Form.Label>
							<Input {...attrs} bind:value={$formData.passwordConfirm} type="password" />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Button type="submit" class="w-full">Create an account</Button>
			</div>
			<div class="mt-4 text-sm">Already have an account?</div>
			<div>
				<a href="/login" class="underline"> Sign in </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
