<script lang="ts">
	import { Coffee, Clock, Scissors } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { SectionContainer } from '..';

	const savingsItems = [
		{ feature: 'Docker for easy deployment', coffee: 3, time: 6, hair: 1 },
		{ feature: 'Scalable architecture design', coffee: 6, time: 12, hair: 3 },
		{ feature: 'Tailwind CSS & shadcn-svelte setup', coffee: 2, time: 4, hair: 1 },
		{ feature: 'CRUD app with drag & drop', coffee: 4, time: 8, hair: 1 },
		{ feature: 'Basic authentication setup', coffee: 5, time: 10, hair: 2 },
		{ feature: 'Single file upload functionality', coffee: 2, time: 4, hair: 1 },
		{ feature: 'Multi-file upload functionality', coffee: 3, time: 5, hair: 1 },
		{ feature: 'Basic email functionality', coffee: 3, time: 6, hair: 1 },
		{ feature: 'Superforms & Formsnap integration', coffee: 2, time: 4, hair: 0 },
		{ feature: 'Dark/Light mode implementation', coffee: 1, time: 2, hair: 0 },
		{ feature: 'Mobile & desktop optimization', coffee: 2, time: 4, hair: 0 },
		{ feature: 'Advanced Authentication with Social Logins', coffee: 4, time: 8, hair: 2 },
		{ feature: 'Logging with Sentry integration', coffee: 3, time: 5, hair: 1 },
		{ feature: 'AI-powered features implementation', coffee: 5, time: 10, hair: 2 },
		{ feature: 'Analytics integration', coffee: 3, time: 6, hair: 1 },
		{ feature: 'Billing & Subscriptions setup', coffee: 6, time: 12, hair: 3 },
		{ feature: 'Full-featured Blog implementation', coffee: 5, time: 10, hair: 2 },
		{ feature: 'Dynamic Landing Page Sections', coffee: 4, time: 8, hair: 2 },
		{ feature: 'Quick MVP launch optimization', coffee: 3, time: 6, hair: 1 }
	];

	const totalCoffee = savingsItems.reduce((sum, item) => sum + item.coffee, 0);
	const totalTime = savingsItems.reduce((sum, item) => sum + item.time, 0);
	const totalHair = savingsItems.reduce((sum, item) => sum + item.hair, 0);
</script>

<SectionContainer
	title="What BoilerBrew Saves You"
	subtitle="Time, Sanity, and Hair!"
	id="why"
	contentClass="max-w-3xl"
>
	<div class="mt-8 space-y-4">
		{#each savingsItems as item}
			<div class="bg-secondary p-4 rounded-lg shadow-md">
				<h3 class="text-lg font-semibold mb-2">{item.feature}</h3>
				<div class="flex items-center space-x-4">
					<span class="flex items-center">
						<Coffee class="w-5 h-5 mr-1" />
						{item.coffee}
						{item.coffee === 1 ? 'cup' : 'cups'}
					</span>
					<span class="flex items-center">
						<Clock class="w-5 h-5 mr-1" />
						{item.time}
						{item.time === 1 ? 'hour' : 'hours'}
					</span>
					{#if item.hair > 0}
						<span class="flex items-center">
							<Scissors class="w-5 h-5 mr-1" />
							{item.hair}
							{item.hair === 1 ? 'hair' : 'hairs'}
						</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-8 bg-secondary border border-primary p-6 rounded-lg shadow-lg">
		<h3 class="text-2xl font-bold mb-4">Total Savings with BoilerBrew</h3>
		<p class="text-lg mb-2">☕ {totalCoffee} cups of caffeinated despair</p>
		<p class="text-lg mb-2">🕒 {totalTime}+ hours of "Why did I choose web development?"</p>
		<p class="text-lg mb-4">💇‍♂️ {totalHair} steps closer to a new aerodynamic hairstyle</p>
		<p class="text-xl font-semibold">Keep your time, sanity, and luscious locks!</p>
		<Button href="https://github.com/axzilla/boilerbrew" target="_blank" size="lg" class="mt-4"
			>Start Saving Now!</Button
		>
	</div>
</SectionContainer>
