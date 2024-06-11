<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { DeleteUserSchema } from '$lib/schemas.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import FormLabel from '$lib/components/ui/form/form-label.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';

	let isLoading = false;

	const form = superForm(defaultValues(zod(DeleteUserSchema)), {
		validators: zod(DeleteUserSchema),
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form: f }) => {
			if (f.errors.word) {
				toast.error('Failed to delete Account!');
			}
			isLoading = false;
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card>
	<form action="?/deleteAccount" method="POST" use:enhance>
		<CardHeader>
			<CardTitle>Delete Account</CardTitle>
		</CardHeader>
		<CardContent>
			<FormField {form} name="word">
				<FormControl let:attrs>
					<FormLabel>Type DELETE</FormLabel>
					<Input {...attrs} autofocus bind:value={$formData.word} disabled={isLoading} />
				</FormControl>
				<FormFieldErrors />
			</FormField>
		</CardContent>
		<CardFooter class="border-t px-6 py-4">
			<Button
				type="submit"
				on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
				disabled={isLoading || $formData.word !== 'DELETE'}
			>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Delete Account
			</Button>
		</CardFooter>
	</form>
</Card>
