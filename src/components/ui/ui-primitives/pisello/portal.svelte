<script lang="ts" context="module">
	import { Portal } from '../portal';
	import type { ComponentProps } from 'svelte';

	type PortalProps = ComponentProps<InstanceType<typeof Portal>>;
	export type DrawerPortalProps = {
		container?: PortalProps['target'];
	};
</script>

<script lang="ts">
	import { getDrawerRootContext } from './root.svelte';

	type $$Props = DrawerPortalProps;

	export let container: $$Props['container'] = 'body';
	const rootCtx = getDrawerRootContext();
</script>

{#if $rootCtx.open}
	<Portal target={container} {...$$restProps}>
		<slot />
	</Portal>
{/if}
