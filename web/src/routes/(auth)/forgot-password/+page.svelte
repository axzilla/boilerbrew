<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { updateEmailSchema } from '$lib/schemas.js';

	export let data;

	const form = superForm(data.form, {
		validators: zod(updateEmailSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors) {
				toast.error('Failed to authenticate!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm w-full">
	<Card.Header>
		<Card.Title class="text-2xl">Forgot Password</Card.Title>
	</Card.Header>
	<Card.Content>
		<form action="?/forgotPassword" method="POST" use:enhance>
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
				<Button type="submit" class="w-full">Send Email</Button>
			</div>
			<div class="mt-4 text-sm">Go back to:</div>
			<div>
				<a href="/login" class="underline">Login</a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
