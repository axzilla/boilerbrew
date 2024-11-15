<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { toast } from 'svelte-sonner';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { RequestVerificationSchema } from '$lib/schemas.js';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import FormLabel from '$lib/components/ui/form/form-label.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';

	let loading = false;

	const form = superForm(defaultValues(zod(RequestVerificationSchema)), {
		validators: zod(RequestVerificationSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				toast.success(
					'If an account exists for the provided email and is not yet verified, a verification email has been sent. Please check your inbox and spam folder.'
				);
			} else {
				toast.error('Failed to send verification email.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card class="mx-auto max-w-sm w-full">
	<CardHeader>
		<CardTitle class="text-2xl">Request Verification</CardTitle>
	</CardHeader>
	<CardContent>
		<form action="?/verifyEmail" method="POST" use:enhance>
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
				<Button disabled={loading} type="submit" class="w-full">Send Email</Button>
			</div>
			<div class="mt-4 text-sm text-muted-foreground">Go back to:</div>
			<div>
				<a href="/login" class="hover:underline">Login</a>
			</div>
		</form>
	</CardContent>
</Card>
