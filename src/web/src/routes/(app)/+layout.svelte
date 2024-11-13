<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuGroup,
		DropdownMenuItem
	} from '$lib/components/ui/dropdown-menu';
	import { Sheet, SheetTrigger, SheetContent } from '$lib/components/ui/sheet';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Home, Bolt } from 'lucide-svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { config } from '$lib/config-client.js';

	import { ThemeSwitcher } from '$lib/components/modules';

	export let data;

	async function logout() {
		await fetch('/api/logout');
		goto('/login');
	}

	const navigation = [
		{
			title: 'Goals',
			href: '/goals',
			icon: Home
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: Bolt
		}
	];

	let menuOpen = false;

	$: currentAvatarUrl = data.user?.avatar
		? `${config.pbUrl}/api/files/${data.user.collectionId}/${data.user.id}/${data.user.avatar}`
		: null;
</script>

<div class="flex min-h-screen">
	<div class="hidden flex-none md:block md:w-[280px] bg-muted/40 border-r">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2">
					<img src="/logo.svg" alt="Logo" class="w-8 h-8" />
					<span class="text-lg font-semibold">{config.appName}</span>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each navigation as { title, href, icon }}
						<a
							{href}
							class={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all ${$page.url.pathname.includes(href) ? 'bg-muted' : 'hover:text-primary'}`}
						>
							{#if icon}
								<svelte:component this={icon} class="h-4 w-4" />
							{/if}
							{title}
						</a>
					{/each}
				</nav>
			</div>
			<div class="mt-auto p-4">
				<Card>
					<CardHeader class="p-2 pt-0 md:p-4">
						<CardTitle>Upgrade to Pro</CardTitle>
						<CardDescription>Build faster, launch sooner, and grow bigger!</CardDescription>
					</CardHeader>
					<CardContent class="p-2 pt-0 md:p-4 md:pt-0">
						<Button href="https://boilerbrew.xyz/#pricing" target="_blank" size="sm" class="w-full"
							>Upgrade</Button
						>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
	<div class="flex-1 overflow-x-auto">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet bind:open={menuOpen}>
				<SheetTrigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="/" class="flex items-center gap-2">
							<img src="/logo.svg" alt="Logo" class="w-8 h-8" />
							<span class="text-lg font-semibold">LawOf100</span>
						</a>
						<Separator />
						{#each navigation as { title, href, icon }}
							<a
								on:click={() => (menuOpen = false)}
								{href}
								class={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground ${$page.url.pathname.includes(href) ? 'bg-muted' : 'hover:text-foreground'}`}
							>
								{#if icon}
									<svelte:component this={icon} class="h-5 w-5" />
								{/if}
								{title}
							</a>
						{/each}
					</nav>
					<div class="mt-auto">
						<Card>
							<CardHeader>
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>Build faster, launch sooner, and grow bigger!</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									href="https://boilerbrew.xyz/#pricing"
									target="_blank"
									size="sm"
									class="w-full">Upgrade</Button
								>
							</CardContent>
						</Card>
					</div>
				</SheetContent>
			</Sheet>
			<div class="w-full flex-1" />
			<DropdownMenu>
				<DropdownMenuTrigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
						{#if currentAvatarUrl}
							<img
								src={currentAvatarUrl}
								alt="Avatar"
								class="w-full h-full object-cover rounded-full"
							/>
						{:else}
							<CircleUser class="h-full w-full" />
						{/if}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent class="w-56" align="end">
					<DropdownMenuLabel class="font-normal">
						<div class="flex flex-col space-y-1">
							<p class="text-sm font-medium leading-none">{data.user?.username}</p>
							<p class="text-xs leading-none text-muted-foreground">{data.user?.email}</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<a href="/settings" class="block">
							<DropdownMenuItem>Settings</DropdownMenuItem>
						</a>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem on:click={logout}>Log out</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<ThemeSwitcher />
		</header>
		<main class="p-8" style="height: calc(100vh - 60px)">
			<slot />
		</main>
	</div>
</div>
