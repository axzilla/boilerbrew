<script lang="ts">
	import {
		HeroSection,
		FeatureSection,
		FaqSection,
		ToolsSection,
		DemoSection,
		CountdownSection,
		StickyCountdownSection,
		WhySection
	} from './components';
	import { LandingLayout } from '$lib/components/layouts';
</script>

<LandingLayout>
	<HeroSection />
	<ToolsSection />
	<FeatureSection />
	<WhySection />
	<DemoSection />
	<FaqSection />
	<!-- <CountdownSection /> -->
	<!-- <StickyCountdownSection /> -->
</LandingLayout>
