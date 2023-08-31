<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
	import Messages from "./Messages.svelte";

	export const isLoading = writable(false);
	export const input = writable('');
	export const messages = writable([]);

    // PROPS
    export let lastMessageId;
    export let mapping; 
    /////////


	function reconstructTree(map, messageId) {
		const treeArray = [];
		let currentId = messageId;

		while (currentId) {
			const currentNode = map[currentId];
			if (currentNode) {
				treeArray.unshift(currentNode);
				currentId = currentNode.parent;
			} else {
				break; // Stop if the ID is not found in the mapping
			}
		}

		return treeArray;
	}

	onMount(() => {
        $messages = reconstructTree(mapping, lastMessageId);
    })
</script>


<ul class='flex flex-col'>
        <Messages currentNode={$messages[0]} hashmap={mapping}/>
        <div class="h-32 md:h-48 flex-shrink-0" />
</ul>


<!--
<ul class='flex flex-col'>
    {#each $messages as node}
        {#if !node.message || node.message.author.role === "system"}
            <div></div>
        {:else}
        <li class={`${node.message.author.role === 'user' ? 'bg-red-100' : 'bg-green-100'} flex gap-8 p-6 `}>
           <ProfilePicture user={node.message.author.role} />  
            <div class={`${node.message.author.role === 'user' ? 'bg-red-100' : 'bg-green-100'} prose whitespace-pre-wrap`}>
            {`${node.message.content.parts[0]}`}
            </div>
        </li>
        {/if}
    {/each}
        <div class="h-32 md:h-48 flex-shrink-0" />

</ul>
-->
    
