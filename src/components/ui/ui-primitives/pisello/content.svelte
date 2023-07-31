<script lang="ts" context="module">
	import { focusTrap } from '$lib/focus_trap';
	import { dismissable, type ForwardedEvent } from '$lib/dismissable';
	import { removeScroll } from '$lib/remove_scroll';
	import { focus, useActions } from '$lib/utils';
	import type { BaseProps, UnwrapCustomEvents } from '$lib/types';
	import { createEventDispatcher, tick } from 'svelte';
	import { getDataState } from './helpers';
	import { getDrawerRootContext } from './root.svelte';


	export type DrawerContentProps = BaseProps<'div'> & {
		openAutoFocus?: boolean | HTMLElement;
		closeAutoFocus?: boolean;
	};
</script>

<script lang="ts">
	type $$Props = DrawerContentProps;
	type $$Events = {
		pointerDownOutside: ForwardedEvent<MouseEvent>;
		escapeKeyDown: ForwardedEvent<KeyboardEvent>;
	};
	const dispatch = createEventDispatcher<UnwrapCustomEvents<$$Events>>();

	export let openAutoFocus: $$Props['openAutoFocus'] = true;
	export let closeAutoFocus: $$Props['closeAutoFocus'] = true;
	export let use: $$Props['use'] = [];

const rootCtx = getDrawerRootContext();

	$: if (!$rootCtx.open && $rootCtx.triggeredId && closeAutoFocus) {
		tick().then(() => {
			focus(`#${$rootCtx.triggeredId}`);
			$rootCtx.triggeredId = null;
		});
	}
</script>


<div
	role="dialog"
	{...$$restProps}
	use:focusTrap={{ disable: !$rootCtx.modal, autofocus: openAutoFocus }}
	use:dismissable={{
		onPointerDownOutside: (event) => {
			dispatch('pointerDownOutside', event.detail);
		},
		onEscapeKeyDown: (event) => {
			dispatch('escapeKeyDown', event.detail);
		},
		onDismiss: () => {
			$rootCtx.open = false;
		},
	}}
	use:removeScroll={{ disable: !$rootCtx.modal }}
	id={$rootCtx.contentId}
	aria-labelledby={$rootCtx.titleId}
	aria-describedby={$rootCtx.descriptionId}
	data-state={getDataState($rootCtx.open)}
	use:useActions={use ?? []}
>
	<slot />
</div>
