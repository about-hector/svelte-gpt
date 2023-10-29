<script lang='ts'>
    // create a type for all the available models
    export let model: string;
</script>


	<div class="w-full py-4 flex justify-center border-b border-b-stone-500/20">
		{model === 'gpt-4' ? `✨ GPT-4` : 'Default (GPT-3.5)'}
	</div>

