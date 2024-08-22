<script lang="ts">
	import { cn } from '$lib/utils';

	export let id: string = '';
	export let title: string = '';
	export let subtitle: string = '';
	export let titleClass: string = '';
	export let subtitleClass: string = '';
	export let sectionClass: string = '';
	export let contentClass: string = '';
</script>

<section {id} class={cn('mx-auto w-full px-4 py-12', sectionClass)}>
	<div class={cn('mx-auto', contentClass)}>
		{#if title}
			<h2 class={cn('text-center text-4xl font-bold mb-2', titleClass)}>
				{title}
			</h2>
		{/if}
		{#if subtitle}
			<p class={cn('text-center text-xl text-muted-foreground mb-8', subtitleClass)}>
				{subtitle}
			</p>
		{/if}
		<slot />
	</div>
</section>
