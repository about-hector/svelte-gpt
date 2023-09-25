<script lang="ts">
	import AutosizingSearchBar from 'components/AutosizingSearchBar.svelte';
	import { onMount } from 'svelte';
	import { reconstructTree } from '$lib/chat_tree';
	import MessageNode from './MessageNode.svelte';
	import { useChat } from 'ai/svelte';
    
    // import the chat data from the server upon route request (page.server)
	export let data;
    let hashmap = data.chat;
    let lastMessageId = data.currentNode;


	const {messages, setMessages, reload, handleSubmit, isLoading, input} = useChat({
        api: 'api/chat',
        //todo: initialMessages has to be a filtered down version of the database data
        //initialMessages:
    });

	onMount(() => {
		let initialTree = reconstructTree(hashmap, lastMessageId);
        setMessages(initialTree)
	});
</script>

<svelte:head>
	<title>Chat Tree Test</title>
	<meta name="description" content="Testing the rendering of a chat tree on the UI" />
</svelte:head>

<div class="w-full overflow-y-scroll">
	<ul class="flex flex-col">
		{#each $messages as node (node.id)}
			{#if node.message && node.message.author.role !== 'system'}
				<MessageNode {node} {hashmap} {setMessages}/>
			{/if}
		{/each}

		<div class="h-32 md:h-48 flex-shrink-0" />
	</ul>

	<!-- searchbar -->
	<div
		class="absolute bottom-0 left-0 w-full border-t-0
    dark:border-white/20 border-transparent md:dark:border-transparent
    bg-gradient-to-b from-transparent to-[#353740] to-60% bg-white
    dark:bg-gray-800 !bg-transparent dark:bg-vert-dark-gradient pt-2 md:-left-2"
	>
		<form
			on:submit={(e) => {
				handleSubmit(e);
			}}
			class="relative stretch mx-2 flex flex-col gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
		>
			<div class="relative flex h-full flex-1 items-center flex-row-reverse sm:flex-col">
				<div class="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
					<!-- if the bot is typing, make a stop button appear. If the bot is not typing and at least one answer was given, generate another response-->
					{#if $isLoading}
						<button
							class="flex items-center gap-2 py-2 px-3 text-white text-xs rounded border-0 md:border"
							on:click={stop}
						>
							<svg
								stroke="currentColor"
								fill="none"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-4 w-4"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
								><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg
							>
							<span class="hidden md:inline">Stop generating</span>
						</button>
					{:else if !$isLoading && messages.length % 2 === 0 && messages.length > 1}
						<button
							class="flex items-center gap-2 py-2 px-3 text-xs text-white rounded border-0 md:border"
							on:click={reload}
						>
							<svg
								stroke="currentColor"
								fill="none"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="h-4 w-4 flex-shrink-0"
								height="1em"
								width="1em"
								xmlns="http://www.w3.org/2000/svg"
								><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"
								></polyline><path
									d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
								></path></svg
							>
							<span class="hidden md:inline">Regenerate</span>
						</button>
					{/if}
				</div>
				<AutosizingSearchBar
					isLoading={$isLoading}
					bind:value={$input}
					on:submit={(e) => {
						handleSubmit(e);
					}}
				/>
			</div>
			<p class="px-4 self-center text-slate-200 text-xs text-center">
				{`ChatGPT clone experiment. No copyright infringement intended.
                May produce inaccurate answers`}
			</p>
		</form>
	</div>
</div>

<style>
</style>
