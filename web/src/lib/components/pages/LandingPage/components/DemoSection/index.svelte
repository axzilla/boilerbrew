<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import imageSrc from '$lib/assets/demo.png';
	import { SectionContainer } from '../';

	const title = 'See Our Boilerplate in Action';
	const subtitle = 'Experience the power and flexibility of our SvelteKit MVP SaaS Boilerplate';
	const imageAlt = 'SvelteKit MVP SaaS Boilerplate Demo';
	const ctaLinkLite = 'https://lite.boilerbrew.xyz';
</script>

<SectionContainer {title} {subtitle} id="demo">
	<div class="max-w-4xl mx-auto">
		<div class="relative">
			<img src={imageSrc} alt={imageAlt} class="w-full h-auto" />
		</div>
		<div class="mt-8 text-center">
			<Button href={ctaLinkLite} target="_blank" size="lg" class="px-8">Live Demo - Lite</Button>
			<Button disabled size="lg" class="px-8">Live Demo - Pro</Button>
		</div>
	</div>
</SectionContainer>
