<script lang="ts" context="module">
	import type { BaseProps } from '$lib/types';
	import { getDrawerRootContext } from './root.svelte';

	export type DrawerDescriptionProps = BaseProps<'p'>;
</script>

<script lang="ts">
	type $$Props = DrawerDescriptionProps;
	const rootCtx = getDrawerRootContext();
</script>

<p id={$rootCtx.descriptionId} {...$$restProps}>
	<slot />
</p>
