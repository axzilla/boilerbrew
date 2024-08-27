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

	async function handleSubscriptionAction(
		action: 'create' | 'update' | 'cancel',
		newPlan?: SubscriptionPlan
	) {
		try {
			const response = await fetch('/api/stripe/manage', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					action,
					priceId: newPlan ? SUBSCRIPTION_PLANS[newPlan].priceId : undefined
				})
			});
			const result = await response.json();

			if (result.success) {
				if (action === 'create') {
					const stripe = await stripePromise;
					const { error } = await stripe!.redirectToCheckout({ sessionId: result.sessionId });
					if (error) {
						console.error('Error in redirectToCheckout:', error);
						alert('Failed to start checkout process. Please try again.');
					}
				} else {
					if (action === 'update') {
						currentPlan = newPlan!;
					} else if (action === 'cancel') {
						currentPlan = 'free'; // Assuming 'free' is your base plan
					}
					alert(result.message || 'Subscription updated successfully');
				}
			} else {
				console.error('Failed to change subscription:', result.message);
				alert(result.message || 'Failed to update subscription');
			}
		} catch (error) {
			console.error('Error changing subscription:', error);
			alert('An error occurred. Please try again.');
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
		{#if currentPlan !== 'free'}
			<CardFooter>
				<Button variant="destructive" on:click={() => handleSubscriptionAction('cancel')}>
					Cancel Subscription
				</Button>
			</CardFooter>
		{/if}
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
				<CardFooter>
					{#if plan !== currentPlan}
						<Button
							on:click={() =>
								handleSubscriptionAction(
									data.user?.stripeSubscriptionId ? 'update' : 'create',
									plan
								)}
						>
							{data.user?.stripeSubscriptionId
								? isPlanEqualOrBetter(plan, currentPlan)
									? 'Upgrade to'
									: 'Change to'
								: 'Subscribe to'}
							{getPlanName(plan)}
						</Button>
					{:else}
						<Badge variant="outline">Current Plan</Badge>
					{/if}
				</CardFooter>
			</Card>
		{/each}
	</div>
</div>
