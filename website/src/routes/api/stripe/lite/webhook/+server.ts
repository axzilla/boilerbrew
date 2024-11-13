import { config } from '$lib/config-server';
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { Octokit } from '@octokit/rest';

const stripe = new Stripe(config.stripeSecretKey);
const octokit = new Octokit({ auth: config.githubPersonalAccessToken });

async function inviteCollaborator(username: string): Promise<void> {
	try {
		const { status } = await octokit.repos.addCollaborator({
			owner: config.githubConfigOwner,
			repo: config.githubConfigRepoLite,
			username,
			permission: 'pull'
		});

		console.log(`Collaborator status for ${username}: ${status}`);
	} catch (error) {
		console.error('Error inviting collaborator:', error);
		throw error;
	}
}

export async function POST({ request }) {
	try {
		const body = await request.text();
		const sig = request.headers.get('stripe-signature');

		if (!sig) {
			return json({ error: 'No Stripe signature found' }, { status: 400 });
		}

		const event = stripe.webhooks.constructEvent(body, sig, config.stripeWebhookSecret);

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;
			const githubUsername = session.custom_fields?.find((field) => field.key === 'github_username')
				?.text?.value;

			if (!githubUsername) {
				console.error('No GitHub username found in session');
				return json({ error: 'No GitHub username found in session' }, { status: 400 });
			}

			await inviteCollaborator(githubUsername);
			return json({ success: true, message: 'Collaborator invitation sent successfully' });
		}

		return json({ received: true });
	} catch (error) {
		if (error instanceof Error) {
			console.error('Webhook error:', error);
			return json({ error: error.message }, { status: 400 });
		}

		console.error('Unknown webhook error:', error);
	}
}
