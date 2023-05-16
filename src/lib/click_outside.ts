/** Dispatch event on click outside of node */
import type { ActionReturn } from 'svelte/action';

// this action creates a custom event, we need to add a new attribute
// on:click_outside to the element it was called on.
interface Attributes {
	'on:click_outside': (e: CustomEvent) => void;
}

export function clickOutside(
	node: Node,
	exception?: HTMLElement
): ActionReturn<HTMLElement, Attributes> {
	const handleClick = (event: MouseEvent) => {
		if (
			node &&
			!node.contains(event.target as Node) &&
			!event.defaultPrevented &&
			event.target !== exception
		) {
			node.dispatchEvent(new CustomEvent('click_outside', { detail: node }));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
