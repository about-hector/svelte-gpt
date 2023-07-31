<script lang="ts" context="module">
	import type { BaseProps } from '$lib/types';
	import { getDrawerRootContext } from './root.svelte';

	export type DrawerTitleProps = BaseProps<'h2'>;
</script>

<script lang="ts">
	type $$Props = DrawerTitleProps;

	const rootCtx = getDrawerRootContext();
</script>

<h2 id={$rootCtx.titleId} {...$$restProps}>
	<slot />
</h2>
