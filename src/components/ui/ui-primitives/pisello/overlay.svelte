<script lang="ts" context="module">
	import type { BaseProps } from '$lib/types';
	import { getDataState } from './trigger.svelte';
	import { getDrawerRootContext } from './root.svelte';
	import { onMount } from 'svelte';

	export type DrawerOverlayProps = BaseProps<'div'> 
</script>

<script lang="ts">
	type $$Props = DrawerOverlayProps;

    
	const rootCtx = getDrawerRootContext();
</script>

{#if $rootCtx.modal}
	<div data-state={getDataState($rootCtx.open)} {...$$restProps} vaul-overlay=''>
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



@keyframes show-overlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide-overlay {
  from {
    opacity: var(--opacity-from, 1);
  }
  to {
    opacity: 0;
  }
}
</style>
