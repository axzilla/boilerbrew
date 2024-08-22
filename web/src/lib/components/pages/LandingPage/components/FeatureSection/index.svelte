<script lang="ts">
	import { Headphones, BarChart, Sparkles, Target, Flag } from 'lucide-svelte';
	import { SectionContainer } from '..';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Table from '$lib/components/ui/table';

	const title = 'Feature Comparison';
	const subtitle = 'Discover the power of Lite, Pro, and Premium versions';

	const features = [
		{
			name: 'Goals Creation',
			description: 'Set and track your objectives',
			icon: Target,
			lite: {
				available: true,
				details: '1 Goal'
			},
			pro: {
				available: true,
				details: '5 Goals'
			},
			premium: {
				available: true,
				details: 'Unlimited Goals'
			}
		},
		{
			name: 'Milestones',
			description: 'Break down goals into achievable steps',
			icon: Flag,
			lite: {
				available: true,
				details: '100 Milestones'
			},
			pro: {
				available: true,
				details: '100 Milestones with templates'
			},
			premium: {
				available: true,
				details: '100 Milestones with AI recommendations'
			}
		},
		{
			name: 'Statistics & Reports',
			description: 'Analyze your progress and performance',
			icon: BarChart,
			lite: {
				available: true,
				details: 'Basic Statistics'
			},
			pro: {
				available: true,
				details: 'Advanced Statistics and Reports'
			},
			premium: {
				available: true,
				details: 'Comprehensive Reports with AI insights'
			}
		},
		{
			name: 'AI-Powered Features',
			description: 'Leverage AI for smarter goal-setting',
			icon: Sparkles,
			lite: {
				available: false,
				details: ''
			},
			pro: {
				available: true,
				details: 'AI-powered Goal Suggestions'
			},
			premium: {
				available: true,
				details: 'AI-Powered Goal Suggestions and Insights'
			}
		},
		{
			name: 'Support',
			description: 'Get help when you need it',
			icon: Headphones,
			lite: {
				available: true,
				details: 'Basic support'
			},
			pro: {
				available: true,
				details: 'Priority support'
			},
			premium: {
				available: true,
				details: '24/7 Premium support'
			}
		}
	].sort((a, b) => {
		if (a.lite.available && !b.lite.available) return -1;
		if (!a.lite.available && b.lite.available) return 1;
		return 0;
	});
</script>

<SectionContainer {title} {subtitle} id="features" contentClass="max-w-7xl">
	<div class="overflow-x-auto border rounded-md">
		<Table.Root class="w-full min-w-[640px]">
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[40%] px-4 py-2 text-left">Feature</Table.Head>
					<Table.Head class="w-[20%] px-4 py-2 text-left">
						<Badge variant="default">Lite</Badge>
					</Table.Head>
					<Table.Head class="w-[20%] px-4 py-2 text-left">
						<Badge variant="default">Pro</Badge>
					</Table.Head>
					<Table.Head class="w-[20%] px-4 py-2 text-left">
						<Badge variant="default">Premium</Badge>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each features as feature}
					<Table.Row class="border-t">
						<Table.Cell class="w-[40%] px-4 py-2">
							<div class="flex items-start space-x-2">
								<svelte:component
									this={feature.icon}
									class="h-5 w-5 text-primary mt-1 flex-shrink-0"
								/>
								<div class="flex flex-col">
									<span class="text-base font-medium">{feature.name}</span>
									<span class="text-sm text-muted-foreground">{feature.description}</span>
								</div>
							</div>
						</Table.Cell>
						<Table.Cell class="w-[20%] px-4 py-2">
							<span class="text-sm">
								{#if feature.lite.available}
									{feature.lite.details}
								{:else}
									-
								{/if}
							</span>
						</Table.Cell>
						<Table.Cell class="w-[20%] px-4 py-2">
							<span class="text-sm">
								{#if feature.pro.available}
									{feature.pro.details}
								{:else}
									-
								{/if}
							</span>
						</Table.Cell>
						<Table.Cell class="w-[20%] px-4 py-2">
							<span class="text-sm">
								{#if feature.premium.available}
									{feature.premium.details}
								{:else}
									-
								{/if}
							</span>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</SectionContainer>
