<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import { clickOutside } from '$lib/utils';
	export let task: string;

	let isTaskFormOpen = false;
</script>

{#if !isTaskFormOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		on:click={() => (isTaskFormOpen = true)}
		class="hover:bg-muted-foreground text-sm w-full bg-muted gap-2 p-2 cursor-pointer rounded-lg"
	>
		{task}
	</div>
{:else}
	<div use:clickOutside={() => (isTaskFormOpen = false)}>
		<Textarea
			autofocus
			rows={1}
			class="focus-visible:ring-0 focus-visible:ring-offset-0"
			value={task}
		/>
	</div>
{/if}
