<script lang="ts" context="module">
	import { generateId } from '$lib/utils/id';
	import { reactiveContext } from '$lib/utils/reactiveSvelteContext';

	export type DrawerRootProps = {
		open?: boolean;
		modal?: boolean;
		// mycode
		shouldScaleBackground?: boolean;
		dismissible?: boolean;
        drawerRef: HTMLDivElement | null;
        overlayRef: HTMLDivElement | null;
	};

	type DrawerRootContext = {
		open: boolean;
		modal: boolean;
		triggeredId: string | null;
		readonly titleId: string;
		readonly descriptionId: string;
		readonly contentId: string;
		// my code
		drawerRef: HTMLDivElement | null;
		overlayRef: HTMLDivElement | null;
		shouldScaleBackground: boolean;
		dismissible: boolean;
	};

	const { getContext, setContext, defaults } = reactiveContext<DrawerRootContext>({
		open: false,
		modal: true,
		titleId: generateId(),
		descriptionId: generateId(),
		contentId: generateId(),
		triggeredId: null,
		//mycode
		drawerRef: null,
		overlayRef: null,
		shouldScaleBackground: false,
		dismissible: true
	});

	export const getDrawerRootContext = getContext;
</script>

<script lang="ts">
	type $$Props = DrawerRootProps;
	export let dismissible: $$Props['dismissible'] = defaults?.dismissible;

	export let open: $$Props['open'] = defaults?.open;
	export let modal: $$Props['modal'] = defaults?.modal;
	export let shouldScaleBackground: $$Props['shouldScaleBackground'] = defaults?.shouldScaleBackground;

const rootCtx = setContext({
		open: (v) => (open = v),
		modal: (v) => (modal = v),
        dismissible: (v) => (dismissible = v),
        shouldScaleBackground: (v) => (shouldScaleBackground = v),
	});
	// We need this as a dependency for some reason, otherwise it won't open.
	// TODO: figure out why
</script>

<slot />
