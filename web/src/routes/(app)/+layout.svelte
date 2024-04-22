<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import { goto } from '$app/navigation';
	import { tasks } from '$lib/stores';

	export let data;

	$: if (data && data.tasks) {
		tasks.set(data.tasks);
	}

	async function logout() {
		await fetch('/api/logout');
		goto('/login');
	}

	const navigation = [
		{
			title: 'Dashboard',
			href: '/'
		},
		{
			title: 'Tasks',
			href: '/tasks'
		},
		{
			title: 'Settings',
			href: '/settings'
		}
	];
</script>

<!--TODO: Make mobile menu dissapear when click a menu link-->
<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Package2 class="h-6 w-6" />
			</a>

			{#each navigation as { title, href }}
				<a {href} class="text-foreground transition-colors hover:text-foreground">{title} </a>
			{/each}
		</nav>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="/" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="h-6 w-6" />
					</a>
					{#each navigation as { title, href }}
						<a {href} class="text-foreground transition-colors hover:text-foreground">{title} </a>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<span class="ml-auto flex-1 sm:flex-initial">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
							<CircleUser class="h-5 w-5" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="end">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm font-medium leading-none">{data.user?.username}</p>
								<p class="text-xs leading-none text-muted-foreground">{data.user?.email}</p>
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<a href="/settings" class="block">
								<DropdownMenu.Item>Settings</DropdownMenu.Item>
							</a>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={logout}>Log out</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</span>
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<slot />
	</main>
</div>
