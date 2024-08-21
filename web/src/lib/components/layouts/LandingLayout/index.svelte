<script lang="ts">
	import { Menu, Goal } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { ThemeSwitcher } from '$lib/components/modules/index';
	import { Footer } from './components';

	const menuItems = [
		{ name: 'Tools', href: '/#tools' },
		{ name: 'Pricing', href: '/#pricing' },
		{ name: 'Features', href: '/#features' },
		{ name: 'Why BoilerBrew', href: '/#why' },
		{ name: 'Demo', href: '/#demo' },
		{ name: 'FAQ', href: '/#faq' }
		// { name: 'Demo', href: '#' },
		// { name: 'Blog', href: '#' },
		// { name: 'Docs', href: '#' }
	];
</script>

<div class="flex min-h-screen w-full flex-col">
	<header
		class="bg-background sticky top-0 z-50 flex h-16 justify-between items-center gap-4 border-b px-4 md:px-6 w-full"
	>
		<div class="flex gap-2 items-center">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left">
					<nav class="grid gap-6 text-lg font-medium">
						{#each menuItems as { name, href }}
							<a {href} class="text-muted-foreground hover:text-foreground">
								{name}
							</a>
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<a href="/" class="flex items-center gap-2">
				<Goal class="text-primary h-8 w-8" />
				<span class="text-lg font-semibold">LawOf100</span>
			</a>
		</div>
		<nav class="hidden flex-col text-lg font-medium md:flex md:flex-row">
			{#each menuItems as { name, href }}
				<Button
					variant="ghost"
					{href}
					class="font-bold text-muted-foreground hover:text-foreground transition-colors"
				>
					{name}
				</Button>
			{/each}
		</nav>
		<div class="flex items-center gap-4 md:gap-2 lg:gap-4">
			<ThemeSwitcher />
		</div>
	</header>
	<main class="flex-1 flex flex-col">
		<slot />
	</main>
	<Footer {menuItems} />
</div>
