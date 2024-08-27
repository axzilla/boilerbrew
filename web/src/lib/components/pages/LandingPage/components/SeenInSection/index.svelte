<script lang="ts">
	import { SectionContainer } from '..';

	import LogoTechCrunch from './logos/techcrunch.svelte';
	import LogoForbes from './logos/forbes.svelte';
	import LogoWired from './logos/wired.svelte';
	import LogoBloomberg from './logos/bloomberg.svelte';
	import LogoFastCompany from './logos/fastcompany.svelte';

	const logos = [
		{ src: LogoForbes, alt: 'Forbes', url: 'https://www.forbes.com/' },
		{ src: LogoWired, alt: 'Wired', url: 'https://www.wired.com/' },
		{ src: LogoBloomberg, alt: 'Bloomberg', url: 'https://www.bloomberg.com/' },
		{ src: LogoFastCompany, alt: 'Fast Company', url: 'https://www.fastcompany.com/' },
		{ src: LogoTechCrunch, alt: 'TechCrunch', url: 'https://techcrunch.com/' }
	];

	const title = 'Featured In';
	const subtitle = 'Trusted and recognized by leading media outlets';
</script>

<SectionContainer {title} {subtitle} id="seen-in" contentClass="max-w-6xl">
	<div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
		{#each logos as logo}
			<a
				href={logo?.url}
				target="_blank"
				rel="noopener noreferrer"
				class="w-32 h-16 flex items-center justify-center"
			>
				<svelte:component this={logo?.src} customClass="h-8 hover:text-primary" />
			</a>
		{/each}
	</div>
</SectionContainer>
