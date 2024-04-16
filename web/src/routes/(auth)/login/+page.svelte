<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginUserSchema } from '$lib/schemas.js';

	export let data;

	const form = superForm(data.form, {
		validators: zod(loginUserSchema),
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
		<Card.Title class="text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form action="?/login" method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Form.Field {form} name="login">
						<Form.Control let:attrs>
							<Form.Label>Username or Email</Form.Label>
							<Input {...attrs} bind:value={$formData.login} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input {...attrs} bind:value={$formData.password} type="password" />
							<a href="/forgot-password" class="ml-auto inline-block text-sm underline">
								Forgot your password?
							</a>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<Button type="submit" class="w-full">Login</Button>
			</div>
			<div class="mt-4 text-sm">Don&apos;t have an account?</div>
			<div>
				<a href="/register" class="underline">Sign up</a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
