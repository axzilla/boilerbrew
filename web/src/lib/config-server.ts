import { env } from '$env/dynamic/private';

export const config = {
	brevoApiKey: env.BREVO_API_KEY,
	stripeSecretKey: env.STRIPE_SECRET_KEY,
	stripePriceIdLite: env.STRIPE_PRICE_ID_LITE,
	stripePriceIdPro: env.STRIPE_PRICE_ID_PRO,
	stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
	githubPersonalAccessToken: env.GITHUB_PERSONAL_ACCESS_TOKEN,
	githubConfigOwner: env.GITHUB_CONFIG_OWNER,
	githubConfigRepoLite: env.GITHUB_CONFIG_REPO_LITE
};
