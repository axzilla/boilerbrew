<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuItem
	} from '$lib/components/ui/dropdown-menu';
	import { Moon, Sun } from 'lucide-svelte';
	import { resetMode, setMode } from 'mode-watcher';
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class="relative">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute inset-0 m-auto"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end">
		<DropdownMenuItem on:click={() => setMode('light')}>Light</DropdownMenuItem>
		<DropdownMenuItem on:click={() => setMode('dark')}>Dark</DropdownMenuItem>
		<DropdownMenuItem on:click={() => resetMode()}>System</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
