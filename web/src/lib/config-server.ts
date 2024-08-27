import { env } from '$env/dynamic/private';

export const config = {
	stripeSecretKey: env.STRIPE_SECRET_KEY,
	stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
	pocketbaseUrl: env.POCKETBASE_URL,
	pocketbaseAdminEmail: env.POCKETBASE_ADMIN_EMAIL,
	pocketbaseAdminPassword: env.POCKETBASE_ADMIN_PASSWORD
};
