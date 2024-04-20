<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import { priorities, statuses } from '../(data)/data';
	import { Rabbit } from 'lucide-svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button size="sm" class="h-8 border-dashed">
			<CirclePlus class="mr-2 h-4 w-4" />
			Add Task
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Add Task</Dialog.Title>
			<Dialog.Description>Enter task details and submit to create a new task.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="relative hidden flex-col items-start gap-8 md:flex">
				<form class="grid w-full items-start gap-6">
					<div class="grid gap-3">
						<Label for="content">Details</Label>
						<Textarea
							id="details"
							placeholder="Describe the new task you want to add..."
							class="min-h-[9.5rem]"
						/>
					</div>
					<div class="grid gap-3">
						<Label for="role">Status</Label>
						<!-- <Select.Root selected={{ value: 'system', label: 'system' }}> -->
						<Select.Root>
							<Select.Trigger>
								<Select.Value placeholder="Select a Status" />
							</Select.Trigger>
							<Select.Content>
								{#each statuses as status}
									{@const Icon = status.icon}
									<Select.Item value={status.value}>
										<div class="flex items-start gap-3 text-muted-foreground">
											<Icon class="size-5" />
											<div class="grid gap-0.5">
												{status.label}
											</div>
										</div>
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<div class="grid gap-3">
						<Label for="role">Priority</Label>
						<Select.Root>
							<Select.Trigger>
								<Select.Value placeholder="Select a Priority" />
							</Select.Trigger>
							<Select.Content>
								{#each priorities as priority}
									{@const Icon = priority.icon}
									<Select.Item value={priority.value}>
										<div class="flex items-start gap-3 text-muted-foreground">
											<Icon class="size-5" />
											<div class="grid gap-0.5">
												{priority.label}
											</div>
										</div>
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</form>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit">Save Task</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
