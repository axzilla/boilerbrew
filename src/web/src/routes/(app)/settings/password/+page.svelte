<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { zod } from 'sveltekit-superforms/adapters';
	import { UpdatePasswordSchema } from '$lib/schemas.js';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import FormLabel from '$lib/components/ui/form/form-label.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';

	export let data;

	let loading = false;

	const form = superForm(data.form, {
		validators: zod(UpdatePasswordSchema),
		onSubmit: () => {
			loading = true;
		},
		onResult: ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				toast.success('Password updated');
			} else {
				toast.error('Failed to update password');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card>
	<form action="?/updatePassword" method="POST" use:enhance>
		<CardHeader>
			<CardTitle>Change Password</CardTitle>
		</CardHeader>
		<CardContent>
			<FormField {form} name="oldPassword">
				<FormControl let:attrs>
					<FormLabel>Old Password</FormLabel>
					<Input
						autofocus
						{...attrs}
						bind:value={$formData.oldPassword}
						type="password"
						disabled={loading}
					/>
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<FormField {form} name="password">
				<FormControl let:attrs>
					<FormLabel>Password</FormLabel>
					<Input {...attrs} bind:value={$formData.password} type="password" disabled={loading} />
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<FormField {form} name="passwordConfirm">
				<FormControl let:attrs>
					<FormLabel>Confirm New Password</FormLabel>
					<Input
						{...attrs}
						bind:value={$formData.passwordConfirm}
						type="password"
						disabled={loading}
					/>
				</FormControl>
				<FormFieldErrors />
			</FormField>
		</CardContent>
		<CardFooter class="border-t px-6 py-4">
			<Button type="submit" disabled={loading}>
				{#if loading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Save
			</Button>
		</CardFooter>
	</form>
</Card>
