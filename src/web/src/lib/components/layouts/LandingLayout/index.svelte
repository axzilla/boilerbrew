<script lang="ts">
	import { Footer, Header } from './components';

	const menuItems = [
		// { name: 'Tools', href: '/#tools' },
		{ name: 'Pricing', href: '/#pricing' },
		{ name: 'Features', href: '/#features' },
		// { name: 'Demo', href: '/#demo' },
		{ name: 'FAQ', href: '/#faq' }
	];
</script>

<div class="flex min-h-screen w-full flex-col">
	<Header {menuItems} />
	<main class="flex-1 flex flex-col">
		<slot />
	</main>
	<Footer {menuItems} />
</div>
