<script>
	import { onMount } from "svelte";

    export let message; 

    onMount(() => {
        console.log(message);
    })
</script>


<div class={`${message.message.author.role === 'assistant' ? 'bg-stone-200' : 'bg-stone-100'} prose whitespace-pre-wrap `}>   
{message.message.content.parts[0]}
</div>
