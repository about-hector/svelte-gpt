<script lang="ts" context="module">
	import { generateId } from '$lib/utils/id';
	import { reactiveContext } from '$lib/utils/reactiveSvelteContext';

	export type DrawerRootProps = {
		open?: boolean;
		modal?: boolean;
	};

	type DrawerRootContext = {
		open: boolean;
		modal: boolean;
		triggeredId: string | null;
		readonly titleId: string;
		readonly descriptionId: string;
		readonly contentId: string;
	};

	const { getContext, setContext, defaults } = reactiveContext<DrawerRootContext>({
		open: false,
		modal: true,
		titleId: generateId(),
		descriptionId: generateId(),
		contentId: generateId(),
		triggeredId: null
	});

	export const getDrawerRootContext = getContext;
</script>

<script lang="ts">
	type $$Props = DrawerRootProps;
	export let open: $$Props['open'] = defaults?.open;
	export let modal: $$Props['modal'] = defaults?.modal;

	const rootCtx = setContext({
		open: (v) => (open = v),
		modal: (v) => (modal = v)
	});
	// We need this as a dependency for some reason, otherwise it won't open.
	// TODO: figure out why
	$: rootCtx.update((v) => ({ ...v, open, modal }));
</script>

<slot />
