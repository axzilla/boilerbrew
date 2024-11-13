<script lang="ts">
	import SvelteKitIcon from '$lib/components/icons/tools/Svelte.svelte';
	import PocketBaseIcon from '$lib/components/icons/tools/PocketBase.svelte';
	import TailwindIcon from '$lib/components/icons/tools/Tailwind.svelte';
	import ShadcnIcon from '$lib/components/icons/tools/Shadcn.svelte';
	import SuperformsIcon from '$lib/components/icons/tools/Superforms.svelte';
	import FormsnapIcon from '$lib/components/icons/tools/Formsnap.svelte';
	import TypeScriptIcon from '$lib/components/icons/tools/TypeScript.svelte';
	import PrettierIcon from '$lib/components/icons/tools/Prettier.svelte';
	import ESLintIcon from '$lib/components/icons/tools/ESLint.svelte';
	import ViteIcon from '$lib/components/icons/tools/Vite.svelte';

	import { SectionContainer } from '..';

	const title = 'Powered by Modern Technologies';
	const subtitle =
		'Our boilerplate leverages the best tools in the industry for rapid and robust development';

	const techStack = [
		{
			name: 'SvelteKit',
			description: 'Fast and flexible framework for building web applications',
			icon: SvelteKitIcon
		},
		{
			name: 'PocketBase',
			description: 'Open Source backend in 1 file with realtime database',
			icon: PocketBaseIcon
		},
		{
			name: 'Tailwind CSS',
			description: 'Utility-first CSS framework for rapid UI development',
			icon: TailwindIcon
		},
		{
			name: 'shadcn-svelte',
			description: 'Beautifully designed TailwindCSScomponents.',
			icon: ShadcnIcon
		},
		{
			name: 'Superforms',
			description: 'Form validation library for Svelte',
			icon: SuperformsIcon
		},
		{
			name: 'Formsnap',
			description: 'Form builder for Svelte with a focus on DX',
			icon: FormsnapIcon
		},
		{
			name: 'TypeScript',
			description: 'Typed superset of JavaScript for improved DX',
			icon: TypeScriptIcon
		},
		{
			name: 'Prettier',
			description: 'Opinionated code formatter for consistent code style',
			icon: PrettierIcon
		},
		{
			name: 'ESLint',
			description: 'Linting utility for identifying and fixing code errors',
			icon: ESLintIcon
		},
		{
			name: 'Vite',
			description: 'Next generation frontend tooling for fast development',
			icon: ViteIcon
		}
	];
</script>

<SectionContainer {title} {subtitle} id="tools" contentClass="max-w-6xl">
	<div class="grid grid-cols-2 lg:grid-cols-5 gap-8">
		{#each techStack as tech}
			<div class="flex flex-col items-center text-center">
				<div class="w-16 h-16 mb-4 flex items-center justify-center">
					<svelte:component this={tech.icon} customClass="w-12 h-12 text-primary" />
				</div>
				<h3 class="font-semibold mb-2">{tech.name}</h3>
				<p class="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
			</div>
		{/each}
	</div>
</SectionContainer>
