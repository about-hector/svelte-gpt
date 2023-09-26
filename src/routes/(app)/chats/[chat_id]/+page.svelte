<script lang="ts">
	import { useChat } from 'ai/svelte';
	import AutosizingSearchBar from 'components/AutosizingSearchBar.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import ChatHistory from 'ui/ChatHistory.svelte';
	import { DEFAULT_GPT_MODEL } from '$lib/costants';
	import { gptModel, activeChat, toasts, messageTree, currentNode } from 'stores';
	import SelectedModel from 'components/SelectedModel.svelte';
	import { reconstructTree } from '$lib/chat_tree.js';
	import MessageNode from '../../test/MessageNode.svelte';
	import { writable } from 'svelte/store';
    import {createMapping} from '$lib/chat_tree'

	// +page.server return value
	export let data;

	// conversation setup
	$: chatID = data.chatID;
	$: activeChat.update(() => (chatID ? chatID : ''));
	$: gptModel.update(() => (data.model ? data.model : 'gpt-3.5-turbo'));
	$: messageTree.update(() => data.mapping);
	$: initialMessages = data.lastBranch;

	const regenerating = writable(false);
	const { input, setMessages, handleSubmit, messages, isLoading, reload, stop } = useChat({
		api: '/api/ai-chat',
		body: { model: $gptModel },
		initialMessages: initialMessages,
		async onFinish() {
			if ($regenerating) {
				const updatedChat = await fetch('/chats', {
					method: 'PATCH',
					body: JSON.stringify({
						messages: $messages.slice(-1),
						chatId: chatID,
						parentNode: $currentNode
					}),
					headers: {
						'Content-type': 'application/json'
					}
				})

                const updatedMessagesArray = (await updatedChat.json()).messages
                console.log('updatedChat', updatedMessagesArray) 
                console.log('last item in the messages store after regenerate and save: ', $messages.slice(-1))
                const newTree = createMapping(updatedMessagesArray)

				currentNode.update(() => $messages[$messages.length - 1].id);
                messageTree.update(() => newTree);

				$regenerating = false;
				return;
			}

			const updatedChat = await fetch('/chats', {
				method: 'PATCH',
				body: JSON.stringify({
					messages: $messages.slice(-2),
					chatId: chatID,
					parentNode: $currentNode
				}),
				headers: {
					'Content-type': 'application/json'
				}
			});
			const chat = await updatedChat.json();
			currentNode.update(() => $messages[$messages.length - 1].id);
		}
	});

	afterNavigate(() => {
		if (data.authorized === false && data.redirectTo) {
			//goto(data.redirectTo);
			toasts.addToast({
				id: crypto.randomUUID(),
				title: 'Unauthorized user',
				message: `No permissions to read the conversation:\n '${data.chatID}'`,
				type: 'error'
			});
			return;
		}
		//console.log('before cleaning up active chat store: ', $activeChat)
		//activeChat.update(() => chatID)
		//console.log('after cleaning up active chat store: ', $activeChat)
		currentNode.update(() => data.currentNode);
		console.log('initializing current node with page data: ', $currentNode);
		setMessages(initialMessages);
	});

	onMount(() => {
		setMessages(initialMessages);
	});

	onNavigate((navigation) => {
		if (navigation.to && navigation.to.route.id === '/(app)') {
			setMessages(() => []);
			activeChat.update(() => '');
			gptModel.update(() => DEFAULT_GPT_MODEL);
			currentNode.update(() => '');
			return;
		}

		console.log('before cleaning up active chat store: ', $activeChat);
		activeChat.update(() => '');
		console.log('after cleaning up active chat store: ', $activeChat);
		messageTree.update(() => ({}));
		console.log('messageTree after the reset on navigation to sibling route', $messageTree);
	});
</script>

<svelte:head>
	<title>Chat Title</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full overflow-y-scroll">
	<SelectedModel model={data.model ? data.model : 'Unknown model'} />
	<ul class="text-white">
		{#if data.auth && !data.authorized}
			<p>Unauthorized to read this chat</p>
		{:else}
			{#each $messages as node (`${$messageTree.length}-${node.id}`)}
				<MessageNode {node} hashmap={$messageTree} {setMessages} />
			{/each}
		{/if}
		<div class="h-32 md:h-48 flex-shrink-0" />
	</ul>
	<div
		class="absolute bottom-0 left-0 w-full border-t-0
    dark:border-white/20 border-transparent md:dark:border-transparent
    bg-gradient-to-b from-transparent to-[#353740] to-60% bg-white
    dark:bg-gray-800 !bg-transparent dark:bg-vert-dark-gradient pt-2 md:-left-2"
	>
		<form
			on:submit={(e) => {
				//questo non runna, come mai? sbaglio qualcosa nel ereditare eventi con le component. fixare
				//console.log($input);
				//handleSubmit(e);
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
					{:else if !$isLoading && $messages.length % 2 === 0 && $messages.length > 0}
						<button
							class="flex items-center gap-2 py-2 px-3 text-xs text-white rounded border-0 md:border"
							on:click={() => {
								$regenerating = true;
								currentNode.update(() => $messages[$messages.length - 2].id);
								reload();
							}}
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
						console.log('inside AutosizingSearchBar: ', $input);
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
