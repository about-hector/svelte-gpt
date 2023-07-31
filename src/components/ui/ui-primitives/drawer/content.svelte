<script lang="ts" context="module">
	import { focusTrap } from '$lib/focus_trap';
	import { dismissable, type ForwardedEvent } from '$lib/dismissable';
	import { removeScroll } from '$lib/remove_scroll';
	import { focus, useActions } from '$lib/utils';
	import type { BaseProps, UnwrapCustomEvents } from '$lib/types';
	import { createEventDispatcher, onMount, tick, onDestroy } from 'svelte';
	import { getDataState } from './trigger.svelte';
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
    export let drawerRef: HTMLDivElement | null; 
	const rootCtx = getDrawerRootContext();

	$: if (!$rootCtx.open && $rootCtx.triggeredId && closeAutoFocus) {
		tick().then(() => {
			focus(`#${$rootCtx.triggeredId}`);
			$rootCtx.triggeredId = null;
		});
	}
    onMount(() => {
            rootCtx.update((v) => ({...v, drawerRef}))
    }) 





	let isDragging: boolean = false;
	let dragStartTime: Date | null = null;
	let dragEndTime: Date | null = null;
	let lastTimeDragPrevented: Date | null = null;
	let initialViewportHeight;

	let pointerStartY = 0;

	const TRANSITIONS = {
		DURATION: 0.5,
		EASE: [0.32, 0.72, 0, 1]
	};

	const BORDER_RADIUS = 8;


		function shouldDrag(el: EventTarget, isDraggingDown: boolean) {
		let element = el as HTMLElement;
		const date = new Date();
		const highlightedText = window.getSelection().toString();

		// Don't drag if there's highlighted text
		if (highlightedText.length > 0) {
			return false;
		}

		// Disallow dragging if drawer was scrolled within last second
		if (lastTimeDragPrevented && date.getTime() - lastTimeDragPrevented.getTime() < 1000) {
			lastTimeDragPrevented = new Date();
			return false;
		}

		// Keep climbing up the DOM tree as long as there's a parent
		while (element) {
			// Check if the element is scrollable
			if (element.scrollHeight > element.clientHeight) {
				if (element.role === 'dialog') return true;

				if (element.scrollTop > 0) {
					lastTimeDragPrevented = new Date();

					// The element is scrollable and not scrolled to the top, so don't drag
					return false;
				}

				if (isDraggingDown && element !== document.body) {
					lastTimeDragPrevented = new Date();
					// Element is scrolled to the top, but we are dragging down so we should allow scrolling
					return false;
				}
			}

			// Move up to the parent element
			element = element.parentNode as HTMLElement;
		}

		// No scrollable parents not scrolled to the top found, so drag
		return true;
	}

	const cache = new Map();

	interface Style {
		[key: string]: string;
	}

	function set(el?: Element | HTMLElement | null, styles?: Style, ignoreCache = false) {
		if (!el || !(el instanceof HTMLElement) || !styles) return;
		let originalStyles: Style = {};

		Object.entries(styles).forEach(([key, value]: [string, string]) => {
			if (key.startsWith('--')) {
				el.style.setProperty(key, value);
				return;
			}

			originalStyles[key] = (el.style as any)[key];
			(el.style as any)[key] = value;
		});

		if (ignoreCache) return;
		cache.set(el, originalStyles);
	}

	function reset(el: Element | HTMLElement | null, prop?: string) {
		if (!el || !(el instanceof HTMLElement)) return;
		let originalStyles = cache.get(el);

		if (!originalStyles) {
			(el.style as any) = {};
			return;
		}

		if (prop) {
			(el.style as any)[prop] = originalStyles[prop];
		} else {
			Object.entries(originalStyles).forEach(([key, value]) => {
				(el.style as any)[key] = value;
			});
		}
	}

	if (!$rootCtx.open && $rootCtx.shouldScaleBackground) {
		// Can't use `onAnimationEnd` as the component will be unmounted by then
		const id = setTimeout(() => {
			reset(document.body);
		}, 200);

		clearTimeout(id);
	}

	function onMove(event: PointerEvent) {
		// We need to know how much of the drawer has been dragged in percentages so that we can transform background accordingly
		if (isDragging) {
			const draggedDistance = pointerStartY - (event as unknown as PointerEvent).clientY;
			const isDraggingDown = draggedDistance > 0;

			if (!shouldDrag(event.target, isDraggingDown)) return;

			const drawerHeight = $rootCtx.drawerRef?.getBoundingClientRect().height || 0;

			set($rootCtx.drawerRef, {
				transition: 'none'
			});

			// Allow dragging upwards up to 40px
			if (draggedDistance > 0) {
				set($rootCtx.drawerRef, {
					'--swipe-amount': `${Math.max(draggedDistance * -1, -40)}px`
				});
				return;
			}

			// We need to capture last time when drag with scroll was triggered and have a timeout between
			const absDraggedDistance = Math.abs(draggedDistance);
			const wrapper = document.querySelector('[vaul-drawer-wrapper]');

			const percentageDragged = absDraggedDistance / drawerHeight;
			const opacityValue = 1 - percentageDragged;

			set(
				$rootCtx.overlayRef,
				{
					opacity: `${opacityValue}`
				},
				true
			);

			if (wrapper && $rootCtx.overlayRef && $rootCtx.shouldScaleBackground) {
				// Calculate percentageDragged as a fraction (0 to 1)

				const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
				const borderRadiusValue = 8 - percentageDragged * 8;

				const translateYValue = Math.max(0, 14 - percentageDragged * 14);

				set(
					wrapper,
					{
						borderRadius: `${borderRadiusValue}px`,
						transform: `scale(${scaleValue}) translateY(${translateYValue}px)`,
						transition: 'none'
					},
					true
				);
			}

			set($rootCtx.drawerRef, {
				'--swipe-amount': `${absDraggedDistance}px`
			});
		}
	}


	function closeDrawer() {
		if (!$rootCtx.dismissible) return;
		$rootCtx.open = false;
		const drawerHeight = $rootCtx.drawerRef?.getBoundingClientRect().height || 0;

		if ($rootCtx.drawerRef) {
			const swipeAmount = getComputedStyle($rootCtx.drawerRef)
				.getPropertyValue('--swipe-amount')
				.slice(0, -2);

			set($rootCtx.drawerRef, {
				'--hide-from': `${Number(swipeAmount).toFixed()}px`,
				'--hide-to': `${drawerHeight.toFixed()}px`
			});

			const opacityValue = $rootCtx.overlayRef?.style.opacity || 1;

			set($rootCtx.overlayRef, {
				'--opacity-from': `${opacityValue}`
			});
		}
	}

	function resetDrawer() {
		const wrapper = document.querySelector('[vaul-drawer-wrapper]');
		const currentSwipeAmount = Number(
			getComputedStyle($rootCtx.drawerRef).getPropertyValue('--swipe-amount').slice(0, -2)
		);

		set($rootCtx.drawerRef, {
			'--swipe-amount': `${0}px`,
			transition: `transform 500ms cubic-bezier(0.32, 0.72, 0, 1)`
		});

		// Don't reset background if swiped upwards
		if ($rootCtx.shouldScaleBackground && currentSwipeAmount > 0 && $rootCtx.open) {
			set(
				wrapper,
				{
					borderRadius: `${BORDER_RADIUS}px`,
					overflow: 'hidden',
					transform: `scale(${getScale()}) translateY(calc(env(safe-area-inset-top) + 14px))`,
					transformOrigin: 'top',
					transitionProperty: 'transform, border-radius',
					transitionDuration: `${TRANSITIONS.DURATION}s`,
					transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
				},
				true
			);
		}
	}

	function onRelease(event: PointerEvent) {
		isDragging = false;
		dragEndTime = new Date();
		const swipeAmount = $rootCtx.drawerRef
			? getComputedStyle($rootCtx.drawerRef).getPropertyValue('--swipe-amount').slice(0, -2)
			: null;

		if (!shouldDrag(event.target, false) || !swipeAmount) return;

		if (dragStartTime === null) return;

		const y = event.clientY;

		const timeTaken = dragEndTime.getTime() - dragStartTime.getTime();
		const distMoved = pointerStartY - y;
		const velocity = Math.abs(distMoved) / timeTaken;

		// Moved upwards, don't do anything
		if (distMoved > 0) {
			resetDrawer();
			return;
		}

		if (velocity > 0.4) {
			closeDrawer();
			return;
		}

		if (y > window.innerHeight * 0.75) {
			closeDrawer();
			return;
		}

		resetDrawer();
	}

	function getScale() {
		return (window.innerWidth - 26) / window.innerWidth;
	}

	function onPress(event: PointerEvent) {
		if (!$rootCtx.dismissible) return;
		isDragging = true;
		dragStartTime = new Date();

		// Ensure we maintain correct pointer capture even when going outside of the drawer
		(event.target as HTMLElement).setPointerCapture(event.pointerId);

		pointerStartY = event.clientY;
	}

	function onAnimationStart(e: AnimationEvent) {
		const wrapper = document.querySelector('[vaul-drawer-wrapper]');

		if (!wrapper || !$rootCtx.shouldScaleBackground) return;

		if (e.animationName === 'show-dialog') {
			set(
				document.body,
				{
					background: 'black'
				},
				true
			);

			set(wrapper, {
				borderRadius: `${BORDER_RADIUS}px`,
				overflow: 'hidden',
				transform: `scale(${getScale()}) translateY(calc(env(safe-area-inset-top) + 14px))`,
				transformOrigin: 'top',
				transitionProperty: 'transform, border-radius',
				transitionDuration: `${TRANSITIONS.DURATION}s`,
				transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
			});
		} else if (e.animationName === 'hide-dialog') {
			// Exit
			reset(wrapper, 'transform');
			reset(wrapper, 'borderRadius');
			set(wrapper, {
				transitionProperty: 'transform, border-radius',
				transitionDuration: `${TRANSITIONS.DURATION}s`,
				transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
			});
		}
	}

	onMount(() => {
        $rootCtx.drawerRef = drawerRef
        console.log($rootCtx.drawerRef)
        initialViewportHeight = window.visualViewport?.height;


        function onVisualViewportChange() {
        if (!$rootCtx.drawerRef) return;

        const visualViewportHeight = window.visualViewport?.height;

        const diffFromInitial = initialViewportHeight - visualViewportHeight;
        const drawerHeight = $rootCtx.drawerRef?.getBoundingClientRect().height || 0;

        if (drawerHeight > visualViewportHeight) {
        $rootCtx.drawerRef.style.height = `${visualViewportHeight - 72}px`;
        } else {
        $rootCtx.drawerRef.style.height = 'initial';
        }

        $rootCtx.drawerRef.style.bottom = `${diffFromInitial}px`;
        }
		window.visualViewport?.addEventListener('resize', onVisualViewportChange);
	});

	onDestroy(() => {
            return () => window.visualViewport?.removeEventListener('resize', onVisualViewportChange);
	});






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
    bind:this={drawerRef}
    on:animationstart={(e) => onAnimationStart(e)}
    on:pointerdown={onPress}
    on:pointermove={onMove}
    on:pointerup={onRelease}
	use:useActions={use ?? []}
	vaul-drawer=""
>
	<slot />
</div>

<style>
	[vaul-drawer] {
		transform: translateY(var(--swipe-amount));
		touch-action: none;
		animation: show-dialog 0.5s cubic-bezier(0.32, 0.72, 0, 1);
	}

	[vaul-drawer]::after {
		content: '';
		position: absolute;
		top: 100%;
		background: inherit;
		background-color: inherit;
		left: 0;
		right: 0;
		height: 200%;
	}

	[vaul-drawer][data-state='closed'] {
		animation: hide-dialog 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards;
	}

	@keyframes show-dialog {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes hide-dialog {
		from {
			transform: translateY(var(--hide-from, 0));
		}
		to {
			transform: translateY(100%);
		}
	}

	@media (hover: hover) and (pointer: fine) {
		[vaul-drawer] {
			user-select: none;
		}
	}
</style>
