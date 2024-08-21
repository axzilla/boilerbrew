import { env } from '$env/dynamic/public';

export const config = {
	baseUrl: env.PUBLIC_BASE_URL,
	pbUrl: env.PUBLIC_PB_URL,
	googleAnalyticsId: env.PUBLIC_GOOGLE_ANALYTICS_ID,
	microsoftClarityId: env.PUBLIC_MICROSOFT_CLARITY_ID,
	plausibleSrc: env.PUBLIC_PLAUSIBLE_SRC,
	plausibleDomain: env.PUBLIC_PLAUSIBLE_DOMAIN,
	stripePublicKey: env.PUBLIC_STRIPE_PUBLIC_KEY,
	appName: env.PUBLIC_APP_NAME
};
