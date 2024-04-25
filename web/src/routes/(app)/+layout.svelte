<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Beer from 'lucide-svelte/icons/beer';
	import AlarmClockCheck from 'lucide-svelte/icons/alarm-clock-check';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import { goto } from '$app/navigation';
	import { tasks } from '$lib/stores';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils.js';
	import Home from 'lucide-svelte/icons/home';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Bolt } from 'lucide-svelte';
	import config from '$lib/config';
	import { Separator } from '$lib/components/ui/separator';

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
			href: '/dashboard',
			icon: Home
		},
		{
			title: 'Tasks',
			href: '/tasks',
			icon: AlarmClockCheck
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: Bolt
		}
	];
</script>

<!--TODO: Make mobile menu dissapear when click a menu link-->
<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Beer class="h-6 w-6" />
					<span class="">{config.appName}</span>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each navigation as { title, href, icon }}
						{@const isActive = $page.url.pathname.includes(href)}
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
			</div>
			<div class="mt-auto p-4">
				<Card.Root>
					<Card.Header class="p-2 pt-0 md:p-4">
						<Card.Title>Upgrade to Pro</Card.Title>
						<Card.Description>
							Unlock all features and get unlimited access to our support team.
						</Card.Description>
					</Card.Header>
					<Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" class="w-full">Upgrade</Button>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="/dashboard" class="flex items-center gap-2 text-lg font-semibold">
							<Beer class="h-6 w-6" />
							{config.appName}
						</a>
						<Separator />
						{#each navigation as { title, href, icon }}
							{@const isactive = $page.url.pathname.includes(href)}
							<a
								{href}
								class={cn(
									isactive && 'bg-muted',
									'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
								)}
							>
								{#if icon}
									{@const Icon = icon}
									<Icon class="h-5 w-5" />
								{/if}
								{title}
							</a>
						{/each}
					</nav>
					<div class="mt-auto">
						<Card.Root>
							<Card.Header>
								<Card.Title>Upgrade to Pro</Card.Title>
								<Card.Description>
									Unlock all features and get unlimited access to our support team.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Button size="sm" class="w-full">Upgrade</Button>
							</Card.Content>
						</Card.Root>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<div class="w-full flex-1">
				<!-- INFO: Readd to bring in a custom search functionality -->
				<!-- <form> -->
				<!-- 	<div class="relative"> -->
				<!-- 		<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> -->
				<!-- 		<Input -->
				<!-- 			type="search" -->
				<!-- 			placeholder="Search products..." -->
				<!-- 			class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" -->
				<!-- 		/> -->
				<!-- 	</div> -->
				<!-- </form> -->
			</div>
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
		</header>
		<main class="w-full flex justify-center">
			<slot />
		</main>
	</div>
</div>
