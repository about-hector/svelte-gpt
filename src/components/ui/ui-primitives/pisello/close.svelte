<script lang="ts" context="module">
	import { useActions } from '$lib/utils/useActions';
	import type { BaseProps } from '$lib/types';
	import { getDrawerRootContext } from './root.svelte';

	export type DrawerCloseProps = BaseProps<'button'>;
</script>

<script lang="ts">
	type $$Props = DrawerCloseProps;
	export let use: $$Props['use'] = [];

	const rootCtx = getDrawerRootContext();
</script>

<button
	on:click={() => {
		$rootCtx.open = false;
	}}
	{...$$restProps}
	use:useActions={use ?? []}
>
	<slot />
</button>
