<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import heroImage from '$lib/assets/hero-image.png';
	import { SectionContainer } from '..';
</script>

<SectionContainer
	sectionClass="min-h-screen"
	contentClass="flex-1 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center"
>
	<div
		class="flex flex-col items-center text-center lg:items-start lg:text-left gap-8 md:w-1/2 justify-center"
	>
		<h1 class="text-4xl font-extrabold tracking-tight md:text-6xl">
			Get Your Ass Up:<br />
			<span class="relative inline-block">
				<span class="text-white relative z-10 whitespace-nowrap">100 Reps to Greatness</span>
				<span
					class="absolute inset-y-0 -left-3 -right-3 bg-primary transform -skew-y-1"
					style="z-index: 0;;"
				></span>
			</span>
		</h1>
		<p class="text-lg text-muted-foreground md:text-xl">
			Warning: This app may cause severe cases of
			<span class="text-primary font-bold underline underline-offset-4">
				getting-shit-done syndrome.
			</span>
			Side effects include success and self-respect.
		</p>
		<div class="flex gap-4">
			<Button href="#pricing" size="lg">Get Started</Button>
			<Button href="#tools" variant="outline" size="lg">Learn More</Button>
		</div>
	</div>
	<div class="flex justify-center items-center md:w-1/2">
		<img src={heroImage} alt="A person working on a laptop" class="w-full h-auto rounded-lg" />
	</div>
</SectionContainer>
