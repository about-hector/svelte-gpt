<script lang='ts'>
   import { gptModel } from 'stores' 

    $: isGPT4Active = $gptModel === 'gpt-3.5-turbo' ? false : true;

</script>

<div class="w-fit p-1 rounded-xl bg-[rgb(32,33,35)] flex gap-2 justify-center mx-auto mt-4">
<ul class="flex list-none gap-1 ">
<li>
<button class={`p-3 font-semibold rounded-lg ${isGPT4Active ? 'bg-transparent' : 'bg-[rgb(64,65,79)]'}`} on:click={() => {
    gptModel.update(() => 'gpt-3.5-turbo');
    console.log($gptModel)
    }}>GPT-3.5</button>

    </li>
    <li>
<button class={`p-3 font-semibold rounded-lg ${isGPT4Active ? 'bg-[rgb(64,65,79)]' : 'bg-transparent'}`} on:click={() => {
        gptModel.update(() => 'gpt-4')
        console.log($gptModel)
    }}>GPT-4</button>
    </li>
</ul>
</div>
