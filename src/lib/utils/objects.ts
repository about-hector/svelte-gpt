//Function that returns an array of keys given multiple objects.
//The array of keys has no duplicates.

export function joinKeys<T extends string | number | symbol>(...objects: object[]) {
	return [...new Set(objects.flatMap(Object.keys))] as T[];
}

import type { ValueOf } from '$lib/types';

export function omit<T extends Record<string, PropertyKey>, K extends keyof T>(
	obj: T,
	...keys: K[]
): Omit<T, K> {
	const result = {} as Omit<T, K>;
	for (const key of Object.keys(obj)) {
		if (!keys.includes(key as unknown as K)) {
			result[key as keyof Omit<T, K>] = obj[key] as ValueOf<Omit<T, K>>;
		}
	}
	return result;
}

type Stringifiable = string | number | boolean | null | undefined;

// Provides a method with typed keys for Object.keys
export function objectKeys<O extends object>(object: O) {
	return Object.keys(object) as Array<`${keyof O & Stringifiable}`>;
}

/**
 * Strict typed `Object.entries`
 * Extracted from https://github.com/antfu/utils
 *
 * @category Object
 */
export function objectEntries<T extends object>(obj: T) {
	return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}
