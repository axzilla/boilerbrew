import { config } from '$lib/config-client';

export async function GET() {
	const baseUrl = config.baseUrl || 'https://boilerbrew.xyz'; // Fallback URL https://example.com
	const pages = ['', '/privacy-policy', '/licences', '/terms-of-service'];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
				.map(
					(page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `
				)
				.join('')}
    </urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
