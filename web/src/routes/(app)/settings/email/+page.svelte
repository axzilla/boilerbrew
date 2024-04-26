<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { UpdateEmailSchema } from '$lib/schemas.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import FormLabel from '$lib/components/ui/form/form-label.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';

	export let data;

	let isLoading = false;

	const form = superForm(data.form, {
		validators: zod(UpdateEmailSchema),
		onSubmit: () => {
			isLoading = true;
		},
		onUpdated: ({ form: f }) => {
			if (f.errors.email) {
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

<Card>
	<form action="?/updateEmail" method="POST" use:enhance>
		<CardHeader>
			<CardTitle>Change Email</CardTitle>
		</CardHeader>
		<CardContent>
			<FormField {form} name="email">
				<FormControl let:attrs>
					<FormLabel>Email</FormLabel>
					<Input
						{...attrs}
						autofocus
						bind:value={$formData.email}
						type="email"
						disabled={isLoading}
					/>
				</FormControl>
				<FormFieldErrors />
			</FormField>
		</CardContent>
		<CardFooter class="border-t px-6 py-4">
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Save
			</Button>
		</CardFooter>
	</form>
</Card>
