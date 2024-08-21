/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export function initGoogleAnalytics(id: string): void {
	const script = document.createElement('script');
	script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
	script.async = true;
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer || [];
	function gtag(...args: any[]) {
		(window.dataLayer as any).push(arguments);
	}
	gtag('js', new Date());
	gtag('config', id);
}

// Add this to avoid TypeScript errors
declare global {
	interface Window {
		dataLayer: any[];
	}
}
