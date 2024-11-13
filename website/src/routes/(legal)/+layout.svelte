<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { LandingLayout } from '$lib/components/layouts';
</script>

<LandingLayout>
	<div class="w-full">
		<main class="max-w-3xl mx-auto">
			<div class=" mx-auto px-4 py-8">
				<div class="mb-6">
					<Button variant="ghost" href="/" class="flex items-center">
						<ArrowLeft class="mr-2 h-4 w-4" />
						Back to Home
					</Button>
				</div>
				<slot />
			</div>
		</main>
	</div>
</LandingLayout>
