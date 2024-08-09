<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Camera, CircleUser, LoaderCircle, Trash } from 'lucide-svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import FormFieldErrors from '$lib/components/ui/form/form-field-errors.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { UpdateAvatarSchema } from '$lib/schemas.js';

	export let data;

	let isLoading = false;
	let avatarPreview: string | null = null;

	const form = superForm(data.form, {
		dataType: 'json',
		validators: zod(UpdateAvatarSchema),
		onSubmit: () => {
			isLoading = true;
		},
		async onResult({ result }) {
			if (result.type === 'success') {
				toast.success('Avatar updated');
				isLoading = false;
			}
		}
	});

	const file = fileProxy(form, 'avatar');
	const { enhance } = form;

	$: currentAvatarUrl = data.user?.avatar
		? `http://127.0.0.1:8090/api/files/${data.user.collectionId}/${data.user.id}/${data.user.avatar}`
		: null;

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;

		if (!target.files || target.files.length === 0) {
			console.error('No file selected');
			return;
		}

		const file = target.files[0];
		if (!file) {
			console.error('File is undefined');
			return;
		}

		avatarPreview = URL.createObjectURL(file);
	}

	function deleteAvatar() {
		avatarPreview = null;
		currentAvatarUrl = null;
	}
</script>

<Card>
	<form method="POST" action="?/updateAvatar" use:enhance enctype="multipart/form-data">
		<CardHeader>
			<CardTitle>Change Avatar</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="w-32 h-32 mx-auto mb-8">
				{#if avatarPreview || currentAvatarUrl}
					<img
						src={avatarPreview || currentAvatarUrl}
						alt="Avatar"
						class="w-full h-full object-cover rounded-full"
					/>
				{:else}
					<CircleUser class="h-full w-full text-current" />
				{/if}
			</div>
			<div class="flex gap-2">
				<FormField {form} name="avatar" class="w-full">
					<FormControl>
						<Button
							variant="outline"
							class="w-full gap-2"
							on:click={() => document.getElementById('upload')?.click()}
						>
							<Camera /> Change
						</Button>
						<input
							on:change={handleFileChange}
							id="upload"
							hidden
							type="file"
							name="avatar"
							bind:files={$file}
						/>
					</FormControl>
					<FormFieldErrors />
				</FormField>
				{#if avatarPreview || currentAvatarUrl}
					<FormField {form} name="avatar" class="w-full">
						<FormControl>
							<Button variant="outline" class="w-full gap-2" on:click={deleteAvatar}>
								<Trash /> Delete
							</Button>
						</FormControl>
						<FormFieldErrors />
					</FormField>
				{/if}
			</div>
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
