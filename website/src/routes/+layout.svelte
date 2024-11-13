<script lang="ts">
	import '../app.postcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { onMount } from 'svelte';
	import { config } from '$lib/config-client';
	import { initGoogleAnalytics } from '$lib/analytics/googleAnalytics';
	import { initMicrosoftClarity } from '$lib/analytics/microsoftClarity';
	import { initPlausible } from '$lib/analytics/plausible';

	onMount(() => {
		if (config.googleAnalyticsId) {
			initGoogleAnalytics(config.googleAnalyticsId);
		}
		if (config.microsoftClarityId) {
			initMicrosoftClarity(config.microsoftClarityId);
		}
		if (config.plausibleDomain && config.plausibleSrc) {
			initPlausible(config.plausibleDomain, config.plausibleSrc);
		}
	});
</script>

<Toaster richColors />
<slot />
