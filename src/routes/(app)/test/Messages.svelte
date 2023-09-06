<script>
	import ProfilePicture from 'ui/ProfilePicture.svelte';

	export let hashmap;
    export let node; 
    export let setMessages
    

</script>

	{#if alternatives.length > 1}
    <div
					class="flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full visible"
				>
					<button
						class=" text-xs disabled:text-gray-300/60"
						disabled={}
						on:click={() => {
						}}
					>
						<svg
							stroke="currentColor"
							fill="none"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-3 w-3"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg
						>
					</button>
					<span class="text-xs flex-grow flex-shrink-0"
						>{currentAlternativeIndex + 1} / {alternatives.length}</span
					>
					<button
						class=" text-xs disabled:text-gray-300/60"
						disabled={}
						on:click={() => {
						}}
					>
						<svg
							stroke="currentColor"
							fill="none"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-3 w-3"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg
						>
					</button>
				</div>

	{/if}




{#if node.children}
    <svelte:self node={currentNode.children[0]} {hashmap} {setMessages}/>
{/if}
