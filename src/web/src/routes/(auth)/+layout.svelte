<script lang="ts">
	import { ThemeSwitcher } from '$lib/components/modules';
	import { config } from '$lib/config-client';
</script>

<div class="flex flex-col gap-8 items-center justify-center h-screen">
	<a href="/" class="flex items-center gap-2">
		<img src="/logo.svg" alt="Logo" class="w-8 h-8" />
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
