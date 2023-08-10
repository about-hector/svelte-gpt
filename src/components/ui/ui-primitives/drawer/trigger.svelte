<script lang="ts" context="module">
	import { generateId } from '$lib/utils';
	import type { BaseProps } from '$lib/types';
	import { getDrawerRootContext } from './root.svelte';
	export type DialogTriggerProps = BaseProps<'button'>;


    export function getDataState(open?: boolean) {
	return open ? 'open' : 'closed';
}
</script>

<script lang="ts">
	type $$Props = DialogTriggerProps;

	const rootCtx = getDrawerRootContext();
	const id = generateId();
</script>

<!-- TODO: include aria-controls -->
<button
	aria-haspopup="dialog"
	aria-expanded={$rootCtx.open}
    aria-controls={$rootCtx.contentId}
	data-state={getDataState($rootCtx.open)}
	{id}
	on:click|stopPropagation={() => {
		$rootCtx.open = true;
		$rootCtx.triggeredId = $rootCtx.open ? id : null;
        rootCtx.set($rootCtx)
	}}
	{...$$restProps}
>
	<slot />
</button>
