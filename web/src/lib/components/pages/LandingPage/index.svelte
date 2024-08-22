<script lang="ts">
	import {
		HeroSection,
		PricingSection,
		FeatureSection,
		FaqSection,
		// ToolsSection,
		// DemoSection,
		// CountdownSection,
		// StickyCountdownSection,
		SeenInSection,
		AvatarSection
	} from './components';
	import { LandingLayout } from '$lib/components/layouts';
</script>

<LandingLayout>
	<HeroSection />
	<SeenInSection />
	<!-- <ToolsSection /> -->
	<PricingSection />
	<FeatureSection />
	<!-- <DemoSection /> -->
	<FaqSection />
	<!-- <CountdownSection /> -->
	<!-- <StickyCountdownSection /> -->
	<AvatarSection />
</LandingLayout>
