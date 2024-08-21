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
				'BoilerBrew goes beyond just providing API integrations. We offer a fully functional CRUD demo app that you can dissect, modify, and learn from. Our philosophy is "Break it, Make it Yours" – giving you a real-world example to jumpstart your development. Additionally, BoilerBrew combines modern, performant technologies with developer-friendly tools like Superforms and Formsnap, allowing you to build and launch your SaaS product faster than ever. Plus, with lifetime updates and the ability to use it for unlimited projects, BoilerBrew offers unparalleled value.'
		},
		{
			question: 'Do I need to be an expert in all these technologies to use BoilerBrew?',
			answer:
				"While familiarity with Svelte and JavaScript will be helpful, BoilerBrew is designed to be beginner-friendly. We provide comprehensive documentation and examples to help you get started quickly, even if you're new to some of these technologies. The boilerplate's structure and included demo app serve as practical learning tools."
		},
		{
			question: 'Can I customize BoilerBrew to fit my specific needs?',
			answer:
				"Absolutely! BoilerBrew is designed to be a starting point. You can easily add, remove, or modify components and features to suit your project's unique requirements. The modular structure of the boilerplate makes customization straightforward."
		},
		{
			question: 'Why should I choose BoilerBrew over free boilerplates?',
			answer:
				"While free boilerplates can be a good starting point, BoilerBrew offers a professionally curated, fully integrated solution. You're not just getting code snippets, but a thoughtfully designed system with best practices baked in. Our boilerplate saves you weeks of setup and integration time, allowing you to focus on what makes your SaaS unique. Plus, with our support and regular updates, you're investing in a tool that grows with you."
		},
		{
			question: 'What are the benefits of the Pro version over the Lite version?',
			answer:
				"The Pro version of BoilerBrew includes advanced features like multi-file uploads, AI integration, and a dynamic landing page builder. These tools can significantly accelerate your development and provide a competitive edge. If you're building a complex SaaS or want to leverage cutting-edge features, the Pro version will save you substantial time and effort in the long run."
		},
		{
			question: 'Do you offer a money-back guarantee?',
			answer:
				"Due to the digital nature of our product, we don't offer refunds once the code has been accessed. However, we're confident in the value BoilerBrew provides. We encourage potential buyers to thoroughly review our documentation and feature list to ensure it meets their needs before purchasing."
		},
		{
			question: 'Can I use BoilerBrew for multiple projects and do you provide updates?',
			answer:
				"Absolutely! Your purchase of BoilerBrew, whether Lite or Pro, comes with a lifetime license. This means you can use it for unlimited personal or client projects. It's a one-time purchase for endless possibilities. We also offer lifetime updates for both versions, regularly improving BoilerBrew, adding new features, optimizing performance, and ensuring compatibility with the latest versions of our tech stack."
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
