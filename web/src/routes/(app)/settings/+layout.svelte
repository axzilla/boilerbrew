<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	const navigation = [
		{
			title: 'Email',
			href: '/settings/email'
		},
		{
			title: 'Username',
			href: '/settings/username'
		},
		{
			title: 'Password',
			href: '/settings/password'
		}
	];
</script>

<div class="mx-auto grid w-full max-w-6xl gap-2">
	<h1 class="text-3xl font-semibold">Settings</h1>
</div>
<div
	class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
>
	<nav class="grid gap-4 text-sm text-muted-foreground">
		{#each navigation as item}
			{@const isActive = $page.url.pathname === item.href}

			<Button
				href={item.href}
				variant="ghost"
				class={cn(!isActive && 'hover:underline', 'relative justify-start hover:bg-transparent')}
				data-sveltekit-noscroll
			>
				{#if isActive}
					<div class="absolute inset-0 rounded-md bg-muted" />
				{/if}
				<div class="relative">
					{item.title}
				</div>
			</Button>
		{/each}
	</nav>
	<div class="grid gap-6">
		<slot />
	</div>
</div>
