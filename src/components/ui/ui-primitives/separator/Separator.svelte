<script lang="ts">
    
    type TOrientation = 'horizontal' | 'vertical'

    export let decorative: boolean;
    export let orientation: TOrientation = 'horizontal'
    
    const ariaOrientation = orientation === 'vertical' ? orientation : undefined;
    const semanticProps = decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation, role: 'separator' };

    const { class: _, ...restProps} = $$restProps;

</script>

<div
    class={`shrink-0 bg-border ${orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full'} ${$$props.class}`}
    data-orientation={orientation}
    {...semanticProps}
    {...restProps}
>
</div>
