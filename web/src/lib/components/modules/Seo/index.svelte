<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { config } from '$lib/config-client';

	// export let title = 'Default Title';
	// export let description = 'Default description of your app';
	// export let keywords = 'svelte, sveltekit, app';
	// export let image = '/default-image.jpg';
	// export let isProtected = false;

	export let title = 'boilerbrew.xyz - Get sh*t done & kickstart your SaaS';
	export let description =
		'Your SvelteKit boilerplate on steroids. Skip the BS, launch at light speed, and watch your competition eat dust.';
	export let keywords =
		'svelte, sveltekit, app, boilerplate, saas, startup, template, boilerbrew, indiehackers, maker';
	export let image = '/seo-image.png';
	export let isProtected = false;

	$: baseUrl = config.baseUrl || (browser ? window.location.origin : 'https://example.com');
	$: path = $page.url.pathname;
	$: fullUrl = `${baseUrl}${path}`;
	$: fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	{#if isProtected}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<!-- Open Graph / Facebook -->
		<meta property="og:type" content="website" />
		<meta property="og:url" content={fullUrl} />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={fullImageUrl} />

		<!-- Twitter -->
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:url" content={fullUrl} />
		<meta property="twitter:title" content={title} />
		<meta property="twitter:description" content={description} />
		<meta property="twitter:image" content={fullImageUrl} />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={fullUrl} />
</svelte:head>
