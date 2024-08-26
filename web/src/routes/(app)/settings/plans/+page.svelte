<script lang="ts">
	import {
		type SubscriptionPlan,
		ALL_SUBSCRIPTION_PLANS,
		getUserPermissions,
		getNextSubscriptionPlan,
		isPlanEqualOrBetter,
		getPlanName,
		SUBSCRIPTION_PLANS
	} from '$lib/subscriptionPlans';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { CheckCircle, XCircle } from 'lucide-svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { config } from '$lib/config-client';

	export let data: PageData;

	const stripePromise = loadStripe(config.stripePublicKey);

	let currentPlan: SubscriptionPlan = data.user?.subscription;
	$: userPermissions = getUserPermissions(currentPlan);
	$: nextPlan = getNextSubscriptionPlan(currentPlan);

	function upgradePlan() {
		if (nextPlan) {
			currentPlan = nextPlan;
		}
	}

	async function handleCheckout(priceId: string) {
		try {
			const url = '/api/stripe/create-checkout-session';

			const stripe = await stripePromise;
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ priceId })
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

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6">Subscription Management</h1>

	<Card class="mb-8">
		<CardHeader>
			<CardTitle>Your Current Plan: {getPlanName(currentPlan)}</CardTitle>
			<CardDescription>Overview of your current features</CardDescription>
		</CardHeader>
		<CardContent>
			<ul class="space-y-2">
				<li class="flex items-center">
					<span class="mr-2">Max Goals:</span>
					<Badge variant="secondary">{userPermissions.maxGoals}</Badge>
				</li>
				<li class="flex items-center">
					<span class="mr-2">AI Features:</span>
					{#if userPermissions.aiFeatures}
						<CheckCircle class="text-green-500" size={20} />
					{:else}
						<XCircle class="text-red-500" size={20} />
					{/if}
				</li>
				<li class="flex items-center">
					<span class="mr-2">Statistics:</span>
					<Badge>{userPermissions.statistics}</Badge>
				</li>
			</ul>
		</CardContent>
		<CardFooter>
			{#if nextPlan}
				<Button on:click={upgradePlan}>Upgrade to {getPlanName(nextPlan)}</Button>
			{:else}
				<Badge variant="secondary">Highest plan level reached</Badge>
			{/if}
		</CardFooter>
	</Card>

	<h2 class="text-2xl font-semibold mb-4">All Available Plans:</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		{#each ALL_SUBSCRIPTION_PLANS as plan}
			<Card class={plan === currentPlan ? 'border-primary' : ''}>
				<CardHeader>
					<CardTitle>{getPlanName(plan)}</CardTitle>
					<CardDescription>
						{#if plan === currentPlan}
							<Badge variant="outline">Current Plan</Badge>
						{:else if isPlanEqualOrBetter(plan, currentPlan)}
							<Badge variant="secondary">Upgrade Available</Badge>
						{/if}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ul class="space-y-2">
						<li>Max Goals: {getUserPermissions(plan).maxGoals}</li>
						<li class="flex items-center">
							AI Features:
							{#if getUserPermissions(plan).aiFeatures}
								<CheckCircle class="text-green-500 ml-2" size={16} />
							{:else}
								<XCircle class="text-red-500 ml-2" size={16} />
							{/if}
						</li>
						<li>Statistics: {getUserPermissions(plan).statistics}</li>
					</ul>
				</CardContent>
				{#if SUBSCRIPTION_PLANS[plan].priceId}
					<CardFooter>
						<Button on:click={() => handleCheckout(SUBSCRIPTION_PLANS[plan].priceId || '')}
							>BUY</Button
						>
					</CardFooter>
				{/if}
			</Card>
		{/each}
	</div>
</div>
