<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion/index';
	import { SectionContainer } from '..';

	const title = 'Frequently Asked Questions';
	const subtitle = 'Everything you need to know about our SvelteKit MVP SaaS Boilerplate';

	const faqs = [
		{
			question: 'What tech stack does BoilerBrew use and why is it a good choice?',
			answer:
				'BoilerBrew uses SvelteKit, PocketBase (SQLite), Tailwind CSS, shadcn-svelte, Superforms, and Formsnap. This stack is carefully chosen for its performance, developer experience, and scalability. SvelteKit offers lightning-fast performance and an intuitive development experience. PocketBase provides a powerful, lightweight backend solution with minimal setup. Tailwind CSS enables rapid UI development. Combined, these technologies allow for quick MVP development without sacrificing the ability to scale as your project grows.'
		},
		{
			question: 'Is this stack suitable for large-scale applications?',
			answer:
				"While our stack is optimized for rapid MVP development, it's also capable of scaling. SvelteKit and PocketBase can handle significant traffic, and SQLite can be replaced with a more robust database like PostgreSQL as your needs grow. This flexibility ensures that BoilerBrew can support your project from initial concept to large-scale deployment."
		},
		{
			question: 'What makes BoilerBrew stand out from other boilerplates?',
			answer:
				'BoilerBrew goes beyond just providing API integrations. We offer a fully functional Law of 100 demo app that you can dissect, modify, and learn from. Our philosophy is "Break it, Make it Yours" – giving you a real-world example to jumpstart your development. Additionally, BoilerBrew combines modern, performant technologies with developer-friendly tools like Superforms and Formsnap, allowing you to build and launch your SaaS product faster than ever.'
		},
		{
			question: 'Do I need to be an expert in all these technologies to use BoilerBrew?',
			answer:
				"While familiarity with Svelte and JavaScript will be helpful, BoilerBrew is designed to be beginner-friendly. We provide comprehensive documentation and examples to help you get started quickly, even if you're new to some of these technologies. The Law of 100 demo app serves as a practical learning tool."
		},
		{
			question: 'Can I customize BoilerBrew to fit my specific needs?',
			answer:
				"Absolutely! BoilerBrew is designed to be a starting point. You can easily add, remove, or modify components and features to suit your project's unique requirements. The modular structure of the boilerplate makes customization straightforward."
		},
		{
			question: 'Is BoilerBrew really free and open source?',
			answer:
				'Yes! BoilerBrew is completely open source under the MIT license. You can use it for personal or commercial projects without any restrictions. Some features like Stripe integration and AI features are still in development and will be added soon, but the core functionality is ready to use today.'
		},
		{
			question: 'Do you provide support?',
			answer:
				'We offer community support through GitHub issues and discussions. The documentation is comprehensive and regularly updated. For more complex needs, you can always reach out for consulting or custom development services.'
		},
		{
			question: 'Can I use BoilerBrew for multiple projects?',
			answer:
				'Absolutely! Since BoilerBrew is open source, you can use it for unlimited personal or client projects. We encourage you to star the repository on GitHub to stay updated with new features and improvements.'
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
