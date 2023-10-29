import type { ActionArray } from './utils/useActions';
import type { SvelteHTMLElements } from 'svelte/elements';

// Check if type are equal or just extends
export type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends <
	G
>() => G extends U ? 1 : 2
	? Y
	: N;

export type ValueOf<T> = T[keyof T];

export type BaseProps<El extends keyof SvelteHTMLElements = 'div'> = SvelteHTMLElements[El] & {
	use?: ActionArray;
	['data-testid']?: string;
	['data-state']?: string;
	[key: `data-${string}`]: string | boolean | undefined;
};

/**
 * UnwrapCustomEvents is a utility type that maps through each property of the given type `T`,
 * and checks if the property type extends CustomEvent. If it does, it extracts the generic type
 * parameter of CustomEvent (i.e., `U`). Otherwise, it keeps the original property type.
 *
 * This type is useful for extracting the details object from CustomEvent types.
 *
 * @template T - The input object type with properties to be mapped and checked.
 */
export type UnwrapCustomEvents<T> = {
	[K in keyof T]: T[K] extends CustomEvent<infer U> ? U : T[K];
};
