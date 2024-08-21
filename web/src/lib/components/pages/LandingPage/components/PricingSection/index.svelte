<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import {
		Lock,
		Database,
		Layout,
		Mail,
		Users,
		FileUpIcon,
		PenTool,
		BarChart,
		CreditCard,
		Bot,
		Headphones,
		Moon,
		Rocket,
		AlertTriangle,
		RefreshCw,
		Infinity,
		TrendingUp,
		Layers
	} from 'lucide-svelte';
	import { SectionContainer } from '..';
	import GithubIcon from '$lib/components/icons/brands/github.svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { config } from '$lib/config-client';

	const stripePromise = loadStripe(config.stripePublicKey);

	const title = 'Pricing Plans';
	const subtitle =
		'Choose the perfect plan for your needs. Start with Lite and upgrade to Pro as you grow.';

	interface PricingFeature {
		text: string;
		icon: typeof Lock; // This is a type that represents any Lucide icon component
	}

	interface PricingTier {
		name: string;
		description: string;
		price: number;
		discountedPrice?: number;
		billingPeriod: string;
		features: PricingFeature[];
		highlighted?: boolean;
		ctaText: string;
		ctaLink: string;
		lastUpdated: string;
	}

	const pricingTiers: PricingTier[] = [
		{
			name: 'Lite',
			description: 'Rapid App Development Kit',
			price: 19,
			discountedPrice: 1,
			billingPeriod: 'lifetime',
			features: [
				{ text: 'CRUD Demo App with Drag & Drop', icon: Database },
				{ text: 'Easy Deployment with Docker', icon: Rocket },
				{ text: 'Tailwind CSS & shadcn-svelte', icon: Layout },
				{ text: 'Superforms & Formsnap', icon: PenTool },
				{ text: 'Dark/Light Mode', icon: Moon },
				{ text: 'Basic Authentication', icon: Lock },
				{ text: 'Single File Upload', icon: FileUpIcon },
				{ text: 'Basic Email Functionality', icon: Mail },
				{ text: 'README.md Support', icon: Users },
				{ text: 'Optimized for quick MVP launches', icon: Rocket },
				{ text: 'Scalable architecture', icon: Layers },
				{ text: 'Mobile & Desktop optimized', icon: Layout },
				{ text: 'Lifetime Updates', icon: RefreshCw },
				{ text: 'Unlimited Project Usage', icon: Infinity }
			],
			ctaText: 'Start Building',
			ctaLink: '/#',
			lastUpdated: '2024-08-18'
		},
		{
			name: 'Pro',
			description: 'Complete SaaS Ecosystem Builder',
			price: 79,
			discountedPrice: 39,
			billingPeriod: 'lifetime',
			features: [
				{ text: 'All Lite features', icon: Rocket },
				{ text: 'Dynamic landing page builder', icon: Layout },
				{ text: 'Multi-file Upload', icon: FileUpIcon },
				{ text: 'Advanced Authentication (Social Logins)', icon: Lock },
				{ text: 'Payment Integration (Stripe, Lemon Squeezy)', icon: CreditCard },
				{ text: 'Analytics Integration', icon: BarChart },
				{ text: 'AI-powered Features', icon: Bot },
				{ text: 'Logging with Sentry', icon: AlertTriangle },
				{ text: 'Full-featured Blog', icon: PenTool },
				{ text: 'Advanced marketing tools', icon: TrendingUp },
				{ text: 'Priority Support', icon: Headphones }
			],
			highlighted: true,
			ctaText: 'Coming Soon',
			ctaLink: '/#cta',
			lastUpdated: 'Coming Soon'
		}
	];

	async function handleCheckout(tierName: string) {
		enum Tier {
			Lite = 'Lite',
			Pro = 'Pro'
		}

		try {
			const url =
				tierName === Tier.Lite
					? '/api/stripe/lite/create-checkout-session'
					: '/api/stripe/pro/create-checkout-session';
			const stripe = await stripePromise;
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const session = await response.json();
			const result = await stripe?.redirectToCheckout({
				sessionId: session.id
			});
			if (result?.error) {
				console.error(result.error);
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<SectionContainer {title} {subtitle} id="pricing">
	<div class="mt-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
		{#each pricingTiers as tier}
			<div
				class="flex flex-col border border-border rounded-lg shadow-sm divide-y divide-border {tier.highlighted
					? 'border-primary'
					: ''}"
			>
				<div class="p-6">
					<div class="flex gap-2">
						<h3 class="text-2xl font-semibold leading-6">{tier.name}</h3>
						{#if tier.highlighted}
							<Badge variant="secondary" class="ml-2">Recommended</Badge>
						{/if}
					</div>
					<p class="mt-4 text-muted-foreground">{tier.description}</p>
					<p class="mt-8">
						{#if tier.discountedPrice !== undefined}
							<span class="text-4xl font-extrabold">${tier.discountedPrice}</span>
							<span class="text-base font-medium line-through ml-2">${tier.price}</span>
						{:else}
							<span class="text-4xl font-extrabold">${tier.price}</span>
						{/if}
						<span class="text-base font-medium text-muted-foreground">/{tier.billingPeriod}</span>
					</p>
					<Button on:click={() => handleCheckout(tier.name)} size="lg" class="mt-8 w-full">
						{tier.ctaText}
					</Button>
				</div>
				<div class="flex-1 pt-6 pb-8 px-6">
					<h4 class="text-sm font-medium">What's included:</h4>
					<ul class="mt-6 space-y-4">
						{#each tier.features as feature}
							<li class="flex items-start space-x-3">
								<svelte:component
									this={feature.icon}
									class="flex-shrink-0 h-5 w-5 text-primary mt-0.5"
								/>
								<span class="text-base">{feature.text}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex gap-2 items-center justify-center p-6 text-sm text-muted-foreground">
					<GithubIcon customClass="h-6 w-6" /><span>Last commit: {tier.lastUpdated}</span>
				</div>
			</div>
		{/each}
	</div>
</SectionContainer>
