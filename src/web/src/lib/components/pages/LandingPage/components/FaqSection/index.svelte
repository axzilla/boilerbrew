<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion/index';
	import { SectionContainer } from '..';

	const title = 'Frequently Asked Questions';
	const subtitle = 'Learn more about Law of 100 and our different versions';

	const faqs = [
		{
			question: 'What is the Law of 100 app?',
			answer:
				'Law of 100 is a goal-setting and tracking app based on the principle that consistent action over 100 days can lead to significant progress. It helps you break down your goals into manageable daily tasks and track your progress over time.'
		},
		{
			question: 'How does the Law of 100 principle work?',
			answer:
				'The Law of 100 principle suggests that by committing to a specific action for 100 consecutive days, you can create lasting habits and achieve substantial results. Our app helps you apply this principle by setting goals, tracking daily progress, and providing motivation to stay consistent.'
		},
		{
			question: 'What are the main features of the Law of 100 app?',
			answer:
				'Key features include goal creation, milestone setting, progress tracking, statistics and reports, and (in higher tiers) AI-powered suggestions. The app helps you stay accountable and motivated throughout your 100-day journey.'
		},
		{
			question: 'What are the differences between Lite, Pro, and Premium versions?',
			answer:
				'The Lite version allows for 1 goal and 100 milestones with basic statistics. Pro expands to 5 goals, adds milestone templates, and includes AI goal suggestions. Premium offers unlimited goals, AI-powered insights, and 24/7 support. All versions support the core Law of 100 principle.'
		},
		{
			question: 'Can I upgrade my version later?',
			answer: `Yes, you can upgrade from Lite to Pro or Premium at any time. Your existing data and progress will be preserved, and you'll gain access to more advanced features and a higher number of goals.`
		},
		{
			question: 'How does the app help me stay motivated?',
			answer:
				'The app provides daily reminders, progress visualizations, and milestone celebrations to keep you motivated. In Pro and Premium versions, AI-powered insights offer personalized encouragement and suggestions to help you stay on track.'
		}
	];
</script>

<SectionContainer {title} {subtitle} id="faq" contentClass="max-w-3xl">
	<Accordion class="w-full space-y-2">
		{#each faqs as faq, index}
			<AccordionItem value={`item-${index}`} class="border rounded-lg">
				<AccordionTrigger
					class="text-left items-start px-4 hover:no-underline hover:bg-muted/50 transition-colors"
				>
					<span>{faq.question}</span>
				</AccordionTrigger>
				<AccordionContent>
					<div class="p-4 text-muted-foreground">
						{faq.answer}
					</div>
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</SectionContainer>
