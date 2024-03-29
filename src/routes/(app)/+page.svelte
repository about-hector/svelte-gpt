<script lang="ts">
	import ChatHistory from 'ui/ChatHistory.svelte';
	import { useChat } from 'ai/svelte';
	import AutosizingSearchBar from 'components/AutosizingSearchBar.svelte';
	import { goto } from '$app/navigation';
	import { activeChat, gptModel, previousChats, messageTree, chatId } from 'stores';
	import ModelToggle from 'components/ModelToggle.svelte';
	import SelectedModel from 'components/SelectedModel.svelte';
	import { chatTitlePrompt } from '$lib/prompt_generators';
	import MessageNode from './test/MessageNode.svelte';

	const { append, input, handleSubmit, messages, setMessages, isLoading, reload, stop } = useChat({
		api: '/api/ai-chat',
		//body: {model: $gptModel},
		//it usually sends only role and content - if true sends also createdAt, id
		//sendExtraMessageFields: true,
		async onResponse() {
			// create a chatbox as soon as the question is made
		},
		async onFinish(message) {
			// save chat to the database -> returns chat table
			if ($chatId === null && $messages.length === 2) {
				const chat = await fetch('chats', {
					method: 'POST',
					body: JSON.stringify({ messages: $messages, model: $gptModel }),
					headers: {
						'Content-type': 'application/json'
					}
				}).then((response) => response.json());

				//update chatID so the future requests know which convo they are from
				let chatTitle = await fetch('/api/completion', {
					method: 'POST',
					body: JSON.stringify({ messages: $messages, chatID: chat.chatID })
				}).then((response) => response.json());

				//await Promise.all([chat, chatTitle]);

				activeChat.update(() => chat.chatID);
				previousChats.update((current) => {
					return [{ title: chatTitle.title, id: $activeChat }, ...current];
				});
				//console.log('Assigning activeChat: ', $activeChat);

				// THIS IS AN EXPERIMENT, MIGHT NEED TO CHANGE HOW I DO IT
				//window.history.replaceState(history.state, '', `/chats/${$activeChat}`)
				goto(`chats/${$activeChat}`);
				return;
			}

			//const updatedChat

			// 2. update hashmap and messages
		},
		onError(error) {
			console.log('OnError triggered inside useChat in index.js', error);
		}
	});

	// when using goto() this is not needed, the logic on chats/[chat_id] takes care of resetting stuff
	/*******************************************************************************
    onNavigate((navigation) => {
        if (navigation.to && navigation.to.route.id === '/(app)') {
            setMessages([])
            activeChat.update(() => '')
            gptModel.update(() => DEFAULT_GPT_MODEL)
        }
    })
    *********************************************************************************/

	// NICE CUSTOM HANDLER, MIGHT START USING THESE FROM NOW ON
	//async function handleFirstMessage(e) {
	//e.preventDefault();
	//append({id: nanoid(), role: 'user', createdAt: new Date, content: $input}, {options: {body: { model: $gptModel}}})
	//input.set('')

	//}
</script>

<svelte:head>
	<title>Svelte ChatGPT Clone</title>
	<meta
		name="description"
		content="A high fidelity chatGPT clone realized in SvelteKit by Ettore Mihaili - Fullstack Developer"
	/>
</svelte:head>

<div class="w-full overflow-y-scroll">
	{#if $messages.length < 1}
		<ModelToggle />
	{:else}
		<SelectedModel model={$gptModel} />
	{/if}

	<ul class="text-white">
		{#each $messages as node (node.id)}
			<MessageNode {node} {setMessages} />
		{/each}

		<div class="h-32 md:h-48 flex-shrink-0" />
	</ul>
	<div
		class="absolute bottom-0 left-0 w-full border-t-0
    dark:border-white/20 border-transparent md:dark:border-transparent
    bg-gradient-to-b from-transparent to-[#353740] to-60% bg-white
    dark:bg-gray-800 !bg-transparent dark:bg-vert-dark-gradient pt-2 md:-left-2"
	>
		<form
			on:submit={(e) => handleSubmit(e, { options: { body: { model: $gptModel } } })}
			class="relative stretch mx-2 flex flex-col gap-3 last:mb-1.5 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
		>
			<div class="relative flex h-full flex-1 items-center flex-row-reverse md:flex-col">
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
					{:else if !$isLoading && $messages.length % 2 === 0 && $messages.length > 1}
						<button
							class="flex items-center gap-2 py-2 px-3 text-xs text-white rounded border-0 md:border"
							on:click={() => reload()}
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
					on:submit={(e) => handleSubmit(e, { options: { body: { model: $gptModel } } })}
				/>
			</div>
			<p class=" px-4 self-center text-slate-200 text-xs text-center sm:text-start">
				ChatGPT clone experiment. No copyright infringement intended. May produce inaccurate answers
			</p>
		</form>
	</div>
</div>
