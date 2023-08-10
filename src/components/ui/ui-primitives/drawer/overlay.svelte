<script lang="ts" context="module">
	import type { BaseProps } from '$lib/types';
	import { getDataState } from './trigger.svelte';
	import { getDrawerRootContext } from './root.svelte';
	import { onMount } from 'svelte';

	export type DrawerOverlayProps = BaseProps<'div'> & {
        'vaul-overlay'?: boolean
    } 
</script>

<script lang="ts">
	type $$Props = DrawerOverlayProps;
    let overlayRef: HTMLDivElement | null; 
	const rootCtx = getDrawerRootContext();
    onMount(() => {
            rootCtx.update((v) => ({...v, overlayRef})) 

    })
</script>


{#if $rootCtx.modal}
	<div role='region' data-state={getDataState($rootCtx.open)} on:mouseup={(e) => $rootCtx.onRelease(e)} bind:this={overlayRef} {...$$restProps} vaul-overlay>
		<slot />
	</div>
{/if}


<style>
[vaul-overlay] {
  animation: show-overlay 0.5s cubic-bezier(0.32, 0.72, 0, 1);
}

[vaul-overlay][data-state='closed'] {
  animation: hide-overlay 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards;
}



@keyframes -global-show-overlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes -global-hide-overlay {
  from {
    opacity: var(--opacity-from, 1);
  }
  to {
    opacity: 0;
  }
}
</style>
