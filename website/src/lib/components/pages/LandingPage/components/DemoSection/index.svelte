<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import imageSrc from '$lib/assets/demo.png';
	import { SectionContainer } from '../';

	const title = 'See Our Boilerplate in Action';
	const subtitle = 'Experience the power and flexibility of our SvelteKit MVP SaaS Boilerplate';
	const imageAlt = 'SvelteKit MVP SaaS Boilerplate Demo';
	const ctaLinkLite = 'https://lawof100-web.boilerbrew.xyz';
</script>

<SectionContainer {title} {subtitle} id="demo">
	<div class="max-w-4xl mx-auto">
		<div class="relative">
			<img src={imageSrc} alt={imageAlt} class="w-full h-auto" />
		</div>
		<div class="mt-8 text-center">
			<Button href={ctaLinkLite} target="_blank" size="lg" class="px-8">Live Demo</Button>
			<Button href="https://github.com/axzilla/boilerbrew" target="_blank" size="lg" class="px-8"
				>Github Repo</Button
			>
		</div>
	</div>
</SectionContainer>
