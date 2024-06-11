<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { LoginUserSchema } from '$lib/schemas.js';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import FormLabel from '$lib/components/ui/form/form-label.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';

	export let data;

	const form = superForm(data.form, {
		validators: zod(LoginUserSchema),
		onUpdated: ({ form: f }) => {
			if (f.message) {
				toast.error(f.message);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card class="mx-auto max-w-sm w-full">
	<CardHeader>
		<CardTitle class="text-2xl">Login</CardTitle>
	</CardHeader>
	<CardContent>
		<form action="?/login" method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<FormField {form} name="login">
						<FormControl let:attrs>
							<FormLabel>Username or Email</FormLabel>
							<Input {...attrs} bind:value={$formData.login} />
						</FormControl>
						<FormFieldErrors />
					</FormField>
				</div>
				<div class="grid gap-2">
					<FormField {form} name="password">
						<FormControl let:attrs>
							<FormLabel>Password</FormLabel>
							<Input {...attrs} bind:value={$formData.password} type="password" />
							<a href="/forgot-password" class="ml-auto inline-block text-sm underline">
								Forgot your password?
							</a>
						</FormControl>
						<FormFieldErrors />
					</FormField>
				</div>
				<Button type="submit" class="w-full">Login</Button>
			</div>
			<div class="mt-4 text-sm">Don&apos;t have an account?</div>
			<div>
				<a href="/register" class="underline">Sign up</a>
			</div>
		</form>
	</CardContent>
</Card>
