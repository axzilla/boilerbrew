<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { BarChart, Bot, Headphones, Infinity, TrendingUp, Target, Flag } from 'lucide-svelte';
	import { SectionContainer } from '..';
	// import { loadStripe } from '@stripe/stripe-js';
	// import { config } from '$lib/config-client';
	import Switch from '$lib/components/ui/switch/switch.svelte';

	// const stripePromise = loadStripe(config.stripePublicKey);

	let isAnnual = false;

	const title = 'Pricing Plans';
	const subtitle =
		'Choose the perfect plan for your needs. Start with Lite and upgrade to Pro as you grow.';

	$: pricingTiers = [
		{
			name: 'Free',
			description: 'Rapid App Development Kit',
			monthlyPrice: 0,
			billingPeriod: 'forever',
			features: [
				{ text: 'Create 1 Goal', icon: Target },
				{ text: '100 Milestones per Goal', icon: Flag },
				{ text: 'Basic Statistics (e.g., Milestone Progress)', icon: BarChart }
			],
			ctaText: 'Get Started',
			ctaLink: '/register'
		},
		{
			name: 'Pro',
			description: 'Complete SaaS Ecosystem Builder',
			monthlyPrice: 79,
			monthlyPriceDiscounted: 39,
			annualPrice: 474,
			annualPriceDiscounted: 234,
			billingPeriod: isAnnual ? 'year' : 'month',
			features: [
				{ text: 'Create up to 5 Goals', icon: Target },
				{ text: '100 Milestones per Goal', icon: Flag },
				{ text: 'Advanced Statistics and Reports', icon: TrendingUp },
				{ text: 'Priority Support', icon: Headphones }
			],
			highlighted: true,
			ctaText: 'Get Started',
			ctaLink: '/register'
		},
		{
			name: 'Premium',
			description: 'Complete SaaS Ecosystem Builder',
			monthlyPrice: 99,
			monthlyPriceDiscounted: 49,
			annualPrice: 594,
			annualPriceDiscounted: 294,
			billingPeriod: isAnnual ? 'year' : 'month',
			features: [
				{ text: 'Unlimited Goals', icon: Infinity },
				{ text: '100 Milestones per Goal', icon: Flag },
				{ text: 'Advanced Statistics and Reports', icon: TrendingUp },
				{ text: 'AI-Powered Goal Suggestions and Insights', icon: Bot },
				{ text: 'Premium Support', icon: Headphones }
			],
			ctaText: 'Get Started',
			ctaLink: '/register'
		}
	];

	// async function handleCheckout(tierName: string) {
	// 	enum Tier {
	// 		Lite = 'Lite',
	// 		Pro = 'Pro'
	// 	}

	// 	try {
	// 		const url =
	// 			tierName === Tier.Lite
	// 				? '/api/stripe/lite/create-checkout-session'
	// 				: '/api/stripe/pro/create-checkout-session';
	// 		const stripe = await stripePromise;
	// 		const response = await fetch(url, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			}
	// 		});
	// 		const session = await response.json();
	// 		const result = await stripe?.redirectToCheckout({
	// 			sessionId: session.id
	// 		});
	// 		if (result?.error) {
	// 			console.error(result.error);
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
</script>

<SectionContainer {title} {subtitle} id="pricing">
	<p class="font-bold w-full flex justify-center gap-2 items-center">
		Monthly
		<Switch includeInput bind:checked={isAnnual} />
		Annually
	</p>
	<div class="mt-12 space-y-4 sm:space-y-0 sm:grid md:grid-cols-3 sm:gap-6 lg:max-w-7xl lg:mx-auto">
		{#each pricingTiers as tier}
			<div
				class="flex flex-col border border-border rounded-lg shadow-sm divide-y divide-border {tier.highlighted
					? 'border-primary border-2'
					: ''}"
			>
				<div class="p-6">
					<div class="flex gap-2">
						<h3 class="text-2xl font-semibold leading-6">{tier.name}</h3>
						{#if tier.highlighted}
							<Badge class="ml-2">Recommended</Badge>
						{/if}
					</div>
					<p class="mt-4 text-muted-foreground">{tier.description}</p>
					<p class="mt-8">
						{#if tier.name === 'Free'}
							<span class="text-4xl font-extrabold">${tier.monthlyPrice}</span>
						{:else}
							<span class="text-4xl font-extrabold"
								>${isAnnual ? tier.annualPriceDiscounted : tier.monthlyPriceDiscounted}</span
							>
							<span class="text-base font-medium line-through ml-2">
								${isAnnual ? tier.annualPrice : tier.monthlyPrice}
							</span>
						{/if}
						<span class="text-base font-medium text-muted-foreground">/{tier.billingPeriod}</span>
					</p>
					<Button href={tier.ctaLink} size="lg" class="mt-8 w-full">
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
			</div>
		{/each}
	</div>
</SectionContainer>
