<script>
	import { ThemeSwitcher } from '$lib/components/modules';
</script>

<div class="flex items-center justify-center h-screen">
	<div class="fixed bottom-4 right-4">
		<ThemeSwitcher />
	</div>
	<slot />
</div>
