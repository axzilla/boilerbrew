<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion/index';
	import {
		Check,
		Rocket,
		Palette,
		Lock,
		Upload,
		Mail,
		Layout,
		Headphones,
		CreditCard,
		BookOpen,
		Bug,
		BarChart,
		Sparkles,
		FileText,
		Users
	} from 'lucide-svelte';
	import { SectionContainer } from '..';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import type { ComponentType, SvelteComponent } from 'svelte';

	enum FeatureStatus {
		Stable = 'stable',
		WIP = 'wip',
		ComingSoon = 'coming-soon'
	}

	type Feature = {
		name: string;
		icon: ComponentType<SvelteComponent>;
		status: FeatureStatus;
		details: string;
	};

	const title = 'Feature Overview';
	const subtitle = 'Everything included in this open source starter kit';

	const features: Feature[] = [
		{
			name: 'Deployment',
			icon: Rocket,
			status: FeatureStatus.Stable,
			details: `No vendor lock-in. Deploy anywhere with Docker. It's like your app has a passport - the world is its oyster!`
		},
		{
			name: 'CRUD Demo App',
			icon: FileText,
			status: FeatureStatus.Stable,
			details: `Full CRUD demo app with drag & drop UI and multi-file upload capability. Handle complex data with ease!`
		},
		{
			name: 'Authentication',
			icon: Lock,
			status: FeatureStatus.Stable,
			details: `Login, register, forgot password, email activation, and account management. Social logins coming soon!`
		},
		{
			name: 'Social Authentication',
			icon: Users,
			status: FeatureStatus.ComingSoon,
			details: `GitHub, Google, and other social login providers. Make signing up a breeze!`
		},
		{
			name: 'Landing Page',
			icon: Layout,
			status: FeatureStatus.Stable,
			details: `Dynamic landing page builder with multiple sections including feature lists, testimonials, pricing tables, email collector, and more. Your website, your way!`
		},
		{
			name: 'Support',
			icon: Headphones,
			status: FeatureStatus.Stable,
			details: `Comprehensive documentation, GitHub Discussions, and issue tracking. We're here to help!`
		},
		{
			name: 'Billing & Subscriptions',
			icon: CreditCard,
			status: FeatureStatus.WIP,
			details: `Stripe integration for payments and subscriptions. One-time, monthly, yearly - we've got more options than a Swiss Army knife!`
		},
		{
			name: 'Analytics',
			icon: BarChart,
			status: FeatureStatus.Stable,
			details: `Google Analytics, Plausible, Microsoft Clarity. Know your audience better than they know themselves!`
		},
		{
			name: 'Logging',
			icon: Bug,
			status: FeatureStatus.ComingSoon,
			details: `Sentry integration. Catch errors faster than a cat video goes viral!`
		},
		{
			name: 'AI-powered Features',
			icon: Sparkles,
			status: FeatureStatus.ComingSoon,
			details: `ChatGPT feature seamlessly integrated into the demo app. Supercharge your app with AI smarts!`
		},
		{
			name: 'Blog',
			icon: BookOpen,
			status: FeatureStatus.ComingSoon,
			details: `Full-featured, SEO-optimized, markdown-based blog. Spread your words like wildfire!`
		},
		{
			name: 'Theme',
			icon: Palette,
			status: FeatureStatus.Stable,
			details: `Dark/light mode plus advanced color customization with auto theme switcher. Your app's style adapts faster than a chameleon on a disco ball!`
		},
		{
			name: 'File Upload',
			icon: Upload,
			status: FeatureStatus.Stable,
			details: `Advanced multi-file upload integrated into the demo CRUD app. It's like your app got an octopus upgrade - handle all the files at once!`
		},
		{
			name: 'Email Functionality',
			icon: Mail,
			status: FeatureStatus.ComingSoon,
			details: `Advanced email sending with cron jobs and extensive customization. Your app becomes a regular pen pal!`
		}
	].sort((a, b) => {
		if (a.status === FeatureStatus.Stable && b.status !== FeatureStatus.Stable) return -1;
		if (a.status !== FeatureStatus.Stable && b.status === FeatureStatus.Stable) return 1;
		return 0;
	});

	const getBadgeVariant = (status: FeatureStatus) => {
		switch (status) {
			case FeatureStatus.Stable:
				return 'default';
			case FeatureStatus.WIP:
				return 'secondary';
			case FeatureStatus.ComingSoon:
				return 'outline';
		}
	};

	const getStatusText = (status: FeatureStatus) => {
		switch (status) {
			case FeatureStatus.Stable:
				return 'Stable';
			case FeatureStatus.WIP:
				return 'WIP';
			case FeatureStatus.ComingSoon:
				return 'Coming Soon';
		}
	};
</script>

<SectionContainer {title} {subtitle} id="features" contentClass="max-w-3xl">
	<Accordion class="w-full space-y-2">
		{#each features as feature, index}
			<AccordionItem value={`item-${index}`} class="border rounded-lg">
				<AccordionTrigger class="px-8">
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center space-x-2">
							<svelte:component this={feature.icon} class="h-5 w-5 text-primary" />
							<span class="text-base">{feature.name}</span>
						</div>
						<Badge variant={getBadgeVariant(feature.status)}>{getStatusText(feature.status)}</Badge>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div class="p-4">
						<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
							<div class="flex items-center mb-2">
								<h4 class="font-medium mr-2">Details</h4>
								{#if feature.status === FeatureStatus.Stable}
									<Check class="h-5 w-5 text-green-500" />
								{:else}
									<span class="text-sm text-muted-foreground"
										>({getStatusText(feature.status)})</span
									>
								{/if}
							</div>
							<p class="text-sm">{feature.details}</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</SectionContainer>
