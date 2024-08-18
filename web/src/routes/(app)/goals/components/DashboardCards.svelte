<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Goal } from '$lib/schemas';
	import { Target, Award, TrendingUp, CheckCircle } from 'lucide-svelte';

	export let goals: Goal[];

	$: totalGoals = goals?.length ?? 0;
	$: totalMilestones = goals?.reduce((sum, goal) => sum + (goal.milestones?.length ?? 0), 0) ?? 0;
	$: averageProgress = totalGoals > 0 ? (totalMilestones / (totalGoals * 100)) * 100 : 0;

	const getStreak = (goals: Goal[]): number => {
		if (!goals || goals.length === 0) return 0;

		const sortedDates = goals
			.flatMap((goal) => goal.milestones ?? [])
			.map((milestone) => new Date(milestone.created))
			.sort((a, b) => b.getTime() - a.getTime());

		if (sortedDates.length === 0) return 0;

		let streak = 0;
		let currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		for (const date of sortedDates) {
			date.setHours(0, 0, 0, 0);
			if (date.getTime() === currentDate.getTime()) {
				streak++;
				currentDate.setDate(currentDate.getDate() - 1);
			} else if (date.getTime() < currentDate.getTime()) {
				break;
			}
		}

		return streak;
	};
	$: console.log(goals);
	$: currentStreak = getStreak(goals);

	$: completedGoals = goals?.filter((goal) => (goal.milestones?.length ?? 0) === 100).length ?? 0;

	// Calculate the change in completed milestones from last month
	const getMonthlyChange = () => {
		if (!goals || goals.length === 0) return '0.0';

		const now = new Date();
		const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

		const thisMonthMilestones = goals.reduce(
			(sum, goal) =>
				sum + (goal.milestones?.filter((m) => new Date(m.created) >= lastMonth).length ?? 0),
			0
		);

		const lastMonthMilestones = goals.reduce(
			(sum, goal) =>
				sum + (goal.milestones?.filter((m) => new Date(m.created) < lastMonth).length ?? 0),
			0
		);

		const change = thisMonthMilestones - lastMonthMilestones;
		const percentChange = lastMonthMilestones ? (change / lastMonthMilestones) * 100 : 100;

		return percentChange.toFixed(1);
	};

	$: monthlyChange = getMonthlyChange();
</script>

<div class="grid gap-4 grid-cols-2 lg:grid-cols-4">
	<Card.Root class="border border-secondary">
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Total Goals</Card.Title>
			<Target class="text-muted-foreground h-4 w-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{totalGoals}</div>
			<p class="text-muted-foreground text-xs">{completedGoals} completed</p>
		</Card.Content>
	</Card.Root>

	<Card.Root class="border border-secondary">
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Current Streak</Card.Title>
			<Award class="text-muted-foreground h-4 w-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{currentStreak} days</div>
			<p class="text-muted-foreground text-xs">Keep it up!</p>
		</Card.Content>
	</Card.Root>

	<Card.Root class="border border-secondary">
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Overall Progress</Card.Title>
			<TrendingUp class="text-muted-foreground h-4 w-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{averageProgress.toFixed(1)}%</div>
			<p class="text-muted-foreground text-xs">{monthlyChange}% from last month</p>
		</Card.Content>
	</Card.Root>

	<Card.Root class="border border-secondary">
		<Card.Header class="flex flex-row items-start justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Milestones Completed</Card.Title>
			<CheckCircle class="text-muted-foreground h-4 w-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{totalMilestones}</div>
			<p class="text-muted-foreground text-xs">out of {totalGoals * 100} total</p>
		</Card.Content>
	</Card.Root>
</div>
