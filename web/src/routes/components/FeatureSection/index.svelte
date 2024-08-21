<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion/index';
	import {
		Check,
		X,
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
		FileText
	} from 'lucide-svelte';
	import { SectionContainer } from '..';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	const title = 'Feature Comparison';
	const subtitle = 'Discover the power of Lite and Pro versions';

	const features = [
		{
			name: 'Deployment',
			icon: Rocket,
			lite: {
				available: true,
				details: `No vendor lock-in. Deploy anywhere with Docker. It's like your app has a passport - the world is its oyster!`
			},
			pro: {
				available: true,
				details: `No vendor lock-in. Deploy anywhere with Docker. It's like your app has a passport - the world is its oyster!`
			}
		},
		{
			name: 'CRUD Demo App',
			icon: FileText,
			lite: {
				available: true,
				details: `Full CRUD demo app with drag & drop UI and single file upload. Your sandbox to play in and build your core functionality!`
			},
			pro: {
				available: true,
				details: `Enhanced CRUD demo with drag & drop UI and multi-file upload capability. Handle complex data with ease!`
			}
		},
		{
			name: 'Authentication',
			icon: Lock,
			lite: {
				available: true,
				details: `The whole shebang: Login, register, forgot password, email activation, account management. We've got your back(end)!`
			},
			pro: {
				available: true,
				details: `Everything in Lite + Social Logins. Update your profile details with ease. It's like your app got a VIP pass to the identity party!`
			}
		},
		{
			name: 'Landing Page',
			icon: Layout,
			lite: {
				available: false,
				details: `Not included. Focus on building your core app functionality.`
			},
			pro: {
				available: true,
				details: `Dynamic landing page builder with multiple sections including feature lists, testimonials, pricing tables, email collector, and more. Your website, your way!`
			}
		},
		{
			name: 'Support',
			icon: Headphones,
			lite: {
				available: true,
				details: `README.md in the repository. It's like having a dev friend, but one that actually responds.`
			},
			pro: {
				available: true,
				details: `Premium support: Same-day email responses, dedicated Discord channel, Slack group, GitHub Discussions, and issue tracking. We're basically your dev team's new BFF.`
			}
		},
		{
			name: 'Billing & Subscriptions',
			icon: CreditCard,
			lite: {
				available: false,
				details: `Not available. Keep it free... for now.`
			},
			pro: {
				available: true,
				details: `Stripe and Lemon Squeezy integration. One-time, monthly, yearly - we've got more options than a Swiss Army knife!`
			}
		},
		{
			name: 'Analytics',
			icon: BarChart,
			lite: {
				available: false,
				details: `Not available. Flying blind, but that's okay for starters!`
			},
			pro: {
				available: true,
				details: `Google Analytics, Plausible, Microsoft Clarity. Know your audience better than they know themselves!`
			}
		},
		{
			name: 'Logging',
			icon: Bug,
			lite: {
				available: false,
				details: `Not available. No news is good news, right?`
			},
			pro: {
				available: true,
				details: `Sentry integration. Catch errors faster than a cat video goes viral!`
			}
		},
		{
			name: 'AI-powered Features',
			icon: Sparkles,
			lite: {
				available: false,
				details: `Not available. Keep it human... for now.`
			},
			pro: {
				available: true,
				details: `ChatGPT feature seamlessly integrated into the demo app. Supercharge your app with AI smarts - it's like giving your code a brain boost!`
			}
		},
		{
			name: 'Blog',
			icon: BookOpen,
			lite: {
				available: false,
				details: `Not available. Focus on your product first!`
			},
			pro: {
				available: true,
				details: `Full-featured, SEO-optimized, markdown-based blog. Spread your words like wildfire!`
			}
		},
		{
			name: 'Theme',
			icon: Palette,
			lite: {
				available: true,
				details: `Dark/light mode included. Manual theme change with predefined color sets. It's like a basic wardrobe for your app - functional and stylish!`
			},
			pro: {
				available: true,
				details: `Dark/light mode plus advanced color customization with auto theme switcher. Your app's style adapts faster than a chameleon on a disco ball!`
			}
		},
		{
			name: 'File Upload',
			icon: Upload,
			lite: {
				available: true,
				details: `Single file upload functionality (e.g., for user avatar). One at a time, nice and easy!`
			},
			pro: {
				available: true,
				details: `Advanced multi-file upload integrated into the demo CRUD app. It's like your app got an octopus upgrade - handle all the files at once!`
			}
		},
		{
			name: 'Email Functionality',
			icon: Mail,
			lite: {
				available: true,
				details: `Basic email functionality for user verification during registration. Just the essentials, no spam!`
			},
			pro: {
				available: true,
				details: `Advanced email sending with cron jobs and extensive customization. Your app becomes a regular pen pal!`
			}
		}
	].sort((a, b) => {
		if (a.lite.available && !b.lite.available) return -1;
		if (!a.lite.available && b.lite.available) return 1;
		return 0;
	});
</script>

<SectionContainer {title} {subtitle} id="features" contentClass="max-w-3xl">
	<Accordion class="w-full space-y-2">
		{#each features as feature, index}
			<AccordionItem value={`item-${index}`} class="border rounded-lg">
				<AccordionTrigger class="px-4">
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center space-x-2">
							<svelte:component this={feature.icon} class="h-5 w-5 text-primary" />
							<span class="text-base">{feature.name}</span>
						</div>
						<div class="flex items-center space-x-2">
							<Badge variant={feature.lite.available ? 'default' : 'secondary'}>Lite</Badge>
							<Badge variant="default">Pro</Badge>
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div class="grid md:grid-cols-2 gap-6 p-4">
						<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
							<div class="flex items-center mb-2">
								<h4 class="font-medium mr-2">Lite</h4>
								{#if feature.lite.available}
									<Check class="h-5 w-5 text-green-500" />
								{:else}
									<X class="h-5 w-5 text-red-500" />
								{/if}
							</div>
							<p class="text-sm">{feature.lite.details}</p>
						</div>
						<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow">
							<div class="flex items-center mb-2">
								<h4 class="font-medium mr-2">Pro</h4>
								<Check class="h-5 w-5 text-green-500" />
							</div>
							<p class="text-sm">{feature.pro.details}</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</SectionContainer>
