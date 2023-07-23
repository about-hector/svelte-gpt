<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	export let id: string;
	export let rows: number;
	export let placeholder: string;
	export let value: string;
	let textareaRef: HTMLElement | null;

	const dispatch = createEventDispatcher();

	function scrollToBottom(domNode: HTMLElement | null) {
		if (!domNode) {
			return;
		}
		domNode.scrollTop = domNode.scrollHeight;
	}

	function submitEnterKeydown(e: KeyboardEvent) {
		if (e.code == 'Enter' && e.shiftKey == false) {
			e.preventDefault();
			dispatch('submit');
		}
	}

	onMount(() => {
		textareaRef && textareaRef.addEventListener('input', () => scrollToBottom(textareaRef));
	});

	onDestroy(() => {
		textareaRef && textareaRef.removeEventListener('input', () => scrollToBottom(textareaRef));
	});

	afterUpdate(() => {
		if (!textareaRef) {
			return;
		}
		// We need to reset the height momentarily to get the correct scrollHeight for the textarea
		textareaRef.style.height = '0px';
		const scrollHeight = textareaRef.scrollHeight;

		// We then set the height directly, outside of the render loop
		// Trying to set this with state or a ref will product an incorrect value.
		textareaRef.style.height = scrollHeight + 'px';
		textareaRef.style.overflowY = textareaRef.style.height > textareaRef.style.maxHeight 
            ? 'auto'
            : 'hidden';
	});
</script>

<textarea
	{id}
	{rows}
	{placeholder}
	bind:this={textareaRef}
	bind:value
	class={`peer ${$$props.class}`}
	on:keydown={(e) => submitEnterKeydown(e)}
/>
