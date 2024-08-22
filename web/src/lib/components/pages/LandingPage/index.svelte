<script lang="ts">
	import {
		HeroSection,
		PricingSection,
		FeatureSection,
		FaqSection,
		ToolsSection,
		DemoSection,
		CountdownSection,
		StickyCountdownSection
	} from './components';
	import { LandingLayout } from '$lib/components/layouts';
</script>

<LandingLayout>
	<HeroSection />
	<ToolsSection />
	<PricingSection />
	<FeatureSection />
	<DemoSection />
	<FaqSection />
	<CountdownSection />
	<StickyCountdownSection />
</LandingLayout>
