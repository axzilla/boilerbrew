<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { RegisterUserSchema } from '$lib/schemas.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import FormLabel from '$lib/components/ui/form/form-label.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';

	export let data;

	const form = superForm(data.form, {
		validators: zod(RegisterUserSchema),
		onUpdated: ({ form: f }) => {
			if (f.errors) {
				toast.error('Failed to register!');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card class="mx-auto max-w-sm w-full">
	<CardHeader>
		<CardTitle class="text-2xl">Sign Up</CardTitle>
	</CardHeader>
	<CardContent>
		<form action="?/register" method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<FormField {form} name="email">
						<FormControl let:attrs>
							<FormLabel>Email</FormLabel>
							<Input {...attrs} bind:value={$formData.email} type="email" />
						</FormControl>
						<FormFieldErrors />
					</FormField>
				</div>
				<div class="grid gap-2">
					<FormField {form} name="password">
						<FormControl let:attrs>
							<FormLabel>Password</FormLabel>
							<Input {...attrs} bind:value={$formData.password} type="password" />
						</FormControl>
						<FormFieldErrors />
					</FormField>
				</div>
				<div class="grid gap-2">
					<FormField {form} name="passwordConfirm">
						<FormControl let:attrs>
							<FormLabel>Confirm Password</FormLabel>
							<Input {...attrs} bind:value={$formData.passwordConfirm} type="password" />
						</FormControl>
						<FormFieldErrors />
					</FormField>
				</div>
				<Button type="submit" class="w-full">Create an account</Button>
			</div>
			<div class="mt-4 text-sm">Already have an account?</div>
			<div>
				<a href="/login" class="underline"> Sign in </a>
			</div>
		</form>
	</CardContent>
</Card>
