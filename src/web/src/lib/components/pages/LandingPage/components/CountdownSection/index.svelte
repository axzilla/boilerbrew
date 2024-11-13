<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { SectionContainer } from '..';
	import { defaultValues, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { emailSchema } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';

	let days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0;

	function updateCountdown() {
		const launchDate = new Date('2024-09-01T00:00:00').getTime(); // Setzen Sie hier Ihr Zieldatum
		const now = new Date().getTime();
		const distance = launchDate - now;

		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);
	}

	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});

	const title = '🚀 Pro Version: The Countdown is On!';
	const subtitle =
		"Don't let FOMO hit you later. Grab your Early Bird discount before it flies away!";

	const form = superForm(defaultValues(zod(emailSchema)), {
		validators: zod(emailSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success(
					'You have successfully registered for the early bird discount. We will notify you when the Pro version is available.'
				);
			} else {
				toast.error('Something went wrong. Please try again later.');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<SectionContainer {title} {subtitle} id="cta" contentClass="max-w-3xl">
	<div class="flex justify-center space-x-4 mb-12">
		{#each [{ value: days, label: 'Days' }, { value: hours, label: 'Hours' }, { value: minutes, label: 'Minutes' }, { value: seconds, label: 'Seconds' }] as { value, label }}
			<div class="flex flex-col items-center">
				<div
					class="w-20 h-24 bg-primary text-white rounded-lg shadow-lg flex items-center justify-center mb-2"
				>
					<span class="text-4xl font-bold">{value}</span>
				</div>
				<span class="text-sm">{label}</span>
			</div>
		{/each}
	</div>

	<div class="max-w-md gap-2 flex flex-col mx-auto mb-12 items-center">
		<form
			action="?/sendEmail"
			method="POST"
			use:enhance
			class="w-full flex flex-col justify-center items-center gap-4"
		>
			<FormField {form} name="email" class="w-full">
				<FormControl let:attrs>
					<Input
						{...attrs}
						bind:value={$formData.email}
						placeholder="Enter your email"
						type="email"
						class="w-full"
					/>
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<Button disabled={!$formData.email} type="submit" class="w-full"
				>Secure My Early-Bird Discount</Button
			>
		</form>
		<p class="font-bold text-muted-foreground">- OR -</p>
		<div class="flex flex-col w-full">
			<Button href="#pricing" variant="default">Get Lite Version Now</Button>
		</div>
	</div>
</SectionContainer>
