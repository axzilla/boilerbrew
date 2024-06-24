import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

import type { Action } from 'svelte/action';

export function formatDate(dateString: string | Date): string {
	const date = new Date(dateString);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
}

export function daysSince(dateString: string | Date): number {
	const date = new Date(dateString);
	const currentDate = new Date();

	const diffInMs = currentDate.getTime() - date.getTime();

	const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

	return diffInDays;
}

export const clickOutside: Action<HTMLElement, () => void> = (node, callback) => {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			callback(); // Rufe die übergebene Funktion auf
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const generateUsername = (email: string): string => {
	const localPart = email.split('@')[0];
	const cleanLocalPart = localPart.replace(/[^a-zA-Z0-9]/g, '');
	const randomNum = Math.floor(Math.random() * 65536); // 65536 = 2^16
	const id = randomNum.toString(16);
	return `${cleanLocalPart.slice(0, 5)}${id}`;
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
