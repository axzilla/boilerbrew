<script lang="ts">
	import '../../app.postcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import { LandingLayout } from '$lib/components/layouts';
</script>

<Toaster richColors />
<LandingLayout>
	<slot />
</LandingLayout>
