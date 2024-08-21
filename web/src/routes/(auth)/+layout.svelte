<script lang="ts">
	import { ThemeSwitcher } from '$lib/components/modules';
	import { config } from '$lib/config-client';
	import { Goal } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-8 items-center justify-center h-screen">
	<a href="/" class="flex items-center gap-2">
		<Goal class="text-primary h-8 w-8" />
		<span class="text-lg font-semibold">{config.appName}</span>
	</a>
	<div class="fixed bottom-4 right-4">
		<ThemeSwitcher />
	</div>
	<slot />
	<p class="text-base text-gray-400 text-center">
		&copy; {new Date().getFullYear()}
		{config.appName}. All rights reserved.
	</p>
</div>
