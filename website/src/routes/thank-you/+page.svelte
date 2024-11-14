<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Github, Mail, TwitterIcon } from 'lucide-svelte';
	import GithubIcon from '$lib/components/icons/brands/github.svelte';
	import XIcon from '$lib/components/icons/brands/x.svelte';
</script>

<div class="mx-auto px-4 py-8">
	<Card class="max-w-sm">
		<CardHeader>
			<CardTitle class="font-bold text-center text-primary">Thank You for Your Purchase!</CardTitle>
			<CardDescription class="text-center mt-2">
				We're excited to have you on board.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-4">
				<p class="text-center">
					You will receive a GitHub invitation email shortly. Once accepted, you'll have access to
					the repository.
				</p>

				<p class="text-center">
					If you encounter any issues or have questions, please don't hesitate to reach out.
				</p>
				<CardFooter class="flex items-center justify-center gap-4">
					<a href="https://github.com/axzilla" target="_blank">
						<GithubIcon customClass="w-6 h-6" />
					</a>
					<a href="https://twitter.com/_axzilla" target="_blank">
						<XIcon customClass="w-6 h-6" />
					</a>
				</CardFooter>
			</div>
		</CardContent>
	</Card>
</div>
