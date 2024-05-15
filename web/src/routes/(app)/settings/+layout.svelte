<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import Mail from 'lucide-svelte/icons/mail';
	import User from 'lucide-svelte/icons/user';
	import Lock from 'lucide-svelte/icons/lock';

	const navigation = [
		{
			title: 'Email',
			href: '/settings/email',
			icon: Mail
		},
		{
			title: 'Username',
			href: '/settings/username',
			icon: User
		},
		{
			title: 'Password',
			href: '/settings/password',
			icon: Lock
		}
	];
</script>

<div
	class="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
>
	<nav class="grid items-start text-sm font-medium">
		{#each navigation as { title, href, icon }}
			{@const isActive = $page.url.pathname === href}

			<a
				{href}
				class={cn(
					isActive && 'bg-muted',
					'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
				)}
			>
				{#if icon}
					{@const Icon = icon}
					<Icon class="h-4 w-4" />
				{/if}
				{title}
			</a>
		{/each}
	</nav>
	<div class="grid gap-6">
		<slot />
	</div>
</div>
