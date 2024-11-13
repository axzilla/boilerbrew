// src/lib/analytics/plausible.ts
export function initPlausible(domain: string, src: string): void {
	const script = document.createElement('script');
	script.src = src;
	script.setAttribute('data-domain', domain);
	script.defer = true;
	document.head.appendChild(script);
}
