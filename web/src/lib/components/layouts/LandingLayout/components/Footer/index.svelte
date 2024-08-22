<script lang="ts">
	import GithubIcon from '$lib/components/icons/brands/github.svelte';
	import XIcon from '$lib/components/icons/brands/x.svelte';
	import Envelope from '$lib/components/icons/common/envelope.svelte';
	import { config } from '$lib/config-client';

	export let menuItems: {
		name: string;
		href: string;
	}[];

	let socialLinks = [
		{ name: 'GitHub', href: 'https://github.com/example', icon: GithubIcon },
		{ name: 'Twitter', href: 'https://twitter.com/_example', icon: XIcon },
		{ name: 'Email', href: 'mailto:hello@example.com', icon: Envelope }
	];

	const legal = [
		{ name: 'Privacy Policy', href: '/privacy-policy' },
		{ name: 'Terms of Service', href: '/terms-of-service' }
	];
</script>

<footer class="bg-gray-100 dark:bg-gray-800">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 pb-24">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="space-y-8">
				<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
					<img src="/logo.svg" alt="Logo" class="w-8 h-8" />
					<span class="font-bold text-foreground hover:text-foreground transition-colors"
						>{config.appName}</span
					>
				</a>
				<p class="text-gray-500 dark:text-gray-400 text-base">
					Building the future of web development, one boilerplate at a time.
				</p>
				<p class="text-muted-foreground">Made with ❤️🚀🔥</p>

				<div class="flex space-x-6">
					{#each socialLinks as { name, href, icon }}
						<a {href} class="text-gray-400 hover:text-gray-500" target="_blank">
							<span class="sr-only">{name}</span>
							<svelte:component this={icon} customClass="w-6 h-6" />
						</a>
					{/each}
				</div>
			</div>
			<div>
				<h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
				<ul class="mt-4 space-y-4">
					{#each menuItems as { name, href }}
						<li>
							<a
								{href}
								class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
							>
								{name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
				<ul class="mt-4 space-y-4">
					{#each legal as { name, href }}
						<li>
							<a
								{href}
								class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
							>
								{name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<div class="mb-24 border-t border-gray-200 pt-8">
		<p class="text-base text-gray-400 text-center">
			&copy; {new Date().getFullYear()}
			{config.appName}. All rights reserved.
		</p>
	</div>
</footer>
