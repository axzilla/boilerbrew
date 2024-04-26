<script lang="ts">
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Check from 'lucide-svelte/icons/check';
	import type { statuses } from '../(data)/data.js';
	import { Command } from '$lib/components/ui/command';
	import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import CommandList from '$lib/components/ui/command/command-list.svelte';
	import CommandItem from '$lib/components/ui/command/command-item.svelte';
	import CommandSeparator from '$lib/components/ui/command/command-separator.svelte';
	import CommandGroup from '$lib/components/ui/command/command-group.svelte';
	import CommandEmpty from '$lib/components/ui/command/command-empty.svelte';
	import CommandInput from '$lib/components/ui/command/command-input.svelte';

	export let filterValues: string[] = [];
	export let title: string;
	export let options = [] as typeof statuses;
	export let counts: { [index: string]: number } = {};

	let open = false;

	function handleSelect(currentValue: string) {
		if (Array.isArray(filterValues) && filterValues.includes(currentValue)) {
			filterValues = filterValues.filter((v) => v !== currentValue);
		} else {
			filterValues = [...(Array.isArray(filterValues) ? filterValues : []), currentValue];
		}
	}
</script>

<Popover bind:open>
	<PopoverTrigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="sm" class="h-8 border-dashed">
			<CirclePlus class="mr-2 h-4 w-4" />
			{title}

			{#if filterValues.length > 0}
				<Separator orientation="vertical" class="mx-2 h-4" />
				<Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
					{filterValues.length}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if filterValues.length > 2}
						<Badge variant="secondary" class="rounded-sm px-1 font-normal">
							{filterValues.length} Selected
						</Badge>
					{:else}
						{#each filterValues as option}
							<Badge variant="secondary" class="rounded-sm px-1 font-normal">
								{option}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</Button>
	</PopoverTrigger>
	<PopoverContent class="w-[200px] p-0" align="start" side="bottom">
		<Command>
			<CommandInput placeholder={title} />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{#each options as option}
						{@const Icon = option.icon}
						<CommandItem
							value={option.value}
							onSelect={(currentValue) => {
								handleSelect(currentValue);
							}}
						>
							<div
								class={cn(
									'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
									filterValues.includes(option.value)
										? 'bg-primary text-primary-foreground'
										: 'opacity-50 [&_svg]:invisible'
								)}
							>
								<Check className={cn('h-4 w-4')} />
							</div>
							<Icon class="mr-2 h-4 w-4 text-muted-foreground" />
							<span>
								{option.label}
							</span>
							{#if counts[option.value]}
								<span class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
									{counts[option.value]}
								</span>
							{/if}
						</CommandItem>
					{/each}
				</CommandGroup>
				{#if filterValues.length > 0}
					<CommandSeparator />
					<CommandItem
						class="justify-center text-center"
						onSelect={() => {
							filterValues = [];
						}}
					>
						Clear filters
					</CommandItem>
				{/if}
			</CommandList>
		</Command>
	</PopoverContent>
</Popover>
