<script>
	import { page } from '$app/stores';

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
		{#each navigation as navItem}
			<a
				href={navItem.href}
				class="font-medium {$page.url.pathname === navItem.href ? 'active' : 'active'}"
				>{navItem.title}</a
			>
		{/each}
	</nav>
	<div class="grid gap-6">
		<slot />
	</div>
</div>
