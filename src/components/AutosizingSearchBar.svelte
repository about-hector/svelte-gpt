<script lang="ts">
    import FluidTextArea from "ui/FluidTextArea.svelte";
    export let value: string;
</script>


<div
	class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4
            relative border border-black/10 dark:border-gray-900/50 dark:text-white bg-[rgb(64,65,79)] rounded-xl shadow-xs dark:shadow-xs"
>
	<FluidTextArea
		id="search-bar"
		rows={1}
		placeholder="Is it possible for a cat to learn how to bark?"
		bind:value={value}
		class="max-h-52 w-full resize-none bg-transparent p-0 pr-10 focus-visible:outline-none md:pr-12 pl-3 "
        on:submit
	/>
	<button type="submit" class={`absolute bottom-1.5 right-3  p-1 sm:p-2 rounded-md transition-colors ${value.length > 0 ? 'bg-green-500 text-white' : 'text-slate-500'}`}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="none"
			class="h-4 w-4 m-1 md:m-0"
			stroke-width="2"
			><path
				d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
				fill="currentColor"
			/></svg
		>
	</button>
</div>
