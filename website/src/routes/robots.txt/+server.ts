import { config } from '$lib/config-client';

export function GET() {
	const baseUrl = config.baseUrl || 'https://boilerbrew.xyz'; // Fallback URL https://example.com

	return new Response(
		`User-agent: *
Allow: /
Disallow: /settings
Disallow: /api/
Sitemap: ${baseUrl}/sitemap.xml`,
		{
			headers: {
				'Content-Type': 'text/plain'
			}
		}
	);
}
