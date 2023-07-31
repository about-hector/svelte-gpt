import { getContext, setContext } from 'svelte';

export function svelteContext<T>() {
    // use Symbol to make sure the context is unique
    const key = Symbol();

    return {
        getContext: () => getContext<T>(key),
        setContext: (value: T) => setContext<T>(key, value),
    }
}
