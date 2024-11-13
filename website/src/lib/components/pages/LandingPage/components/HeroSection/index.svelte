<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import heroimageLight from '$lib/assets/hero-image-light.png';
	import heroimageDark from '$lib/assets/hero-image-dark.png';
	import { SectionContainer } from '..';
</script>

<SectionContainer
	sectionClass="min-h-screen"
	contentClass="flex-1 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20"
>
	<div
		class="flex flex-col items-center text-center lg:items-start lg:text-left gap-8 md:w-1/2 justify-center"
	>
		<h1 class="text-4xl font-extrabold tracking-tight md:text-6xl">
			Get sh*t done &<br />
			<span class="relative inline-block">
				<span class="text-white relative z-10 whitespace-nowrap">x your SaaS</span>
				<span
					class="absolute inset-y-0 -left-3 -right-3 bg-primary transform -skew-y-1"
					style="z-index: 0;;"
				></span>
			</span>
		</h1>
		<p class="text-lg text-muted-foreground md:text-xl">
			Your
			<span class="text-primary font-bold underline underline-offset-4">SvelteKit boilerplate</span>
			on steroids. Skip the BS, launch at light speed, and watch your competition eat dust.
		</p>
		<div class="flex gap-4">
			<Button href="https://github.com/axzilla/boilerbrew-starter" target="_blank" size="lg"
				>Get Started</Button
			>
			<Button href="#tools" variant="outline" size="lg">Learn More</Button>
		</div>
	</div>
	<div class="flex justify-center items-center md:w-1/2">
		<img
			src={heroimageLight}
			alt="A person working on a laptop"
			class="w-full h-auto rounded-lg dark:hidden"
		/>
		<img
			src={heroimageDark}
			alt="A person working on a laptop"
			class="w-full h-auto rounded-lg hidden dark:block"
		/>
	</div>
</SectionContainer>
