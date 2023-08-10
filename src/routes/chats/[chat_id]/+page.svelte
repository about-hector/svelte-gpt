<script lang='ts'>
	import { page } from '$app/stores';
	import { useChat } from 'ai/svelte';
	import ProfilePicture from 'ui/ProfilePicture.svelte';
	import AutosizingSearchBar from 'components/AutosizingSearchBar.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
    import { toasts } from '../../../stores/menuStore';
	import ChatHistory from 'ui/ChatHistory.svelte';
	export let data;
    import { activeChat } from '../../../stores/menuStore'
    $: activeChat.set(data.chatID);
    $: chatID = $page.params.chat_id
	const { input, setMessages, handleSubmit, messages, isLoading, reload, stop } = useChat({
		api: '/api/ai-chat',
		initialMessages: data.chat,
		onFinish: async () => {
            const updatedChat = await fetch('/chats', {
                method: 'PATCH',
                body: JSON.stringify({
                    chat: $messages.slice(-2), 
                    id: chatID
                }),
                headers: {
                'Content-type': 'application/json'
                },
            })
            const chat = await updatedChat.json()
        }
	});


	onMount(() => {
		if (data.authorized === false && data.redirectTo) {
			goto(data.redirectTo);
			toasts.addToast({
				id: crypto.randomUUID(),
				title: 'Unauthorized user',
				message: `Unable to load chat '${data.chatID}'`,
				type: 'error'
			});
            return; 
		}

	});
    afterNavigate(() => {
        setMessages(data.chat)
    })
</script>

<svelte:head>
	<title>Chat Title</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full overflow-y-scroll">
	<ul class="text-white">
		{#if !data.auth}
			<p>Sign In to access conversations</p>
		{:else if data.auth && !data.authorized}
			<p>Unauthorized to read this chat</p>
		{:else}
    <ChatHistory messages={$messages} /> 
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
                            console.log($input)
                            handleSubmit(e)
                        }}
			class="relative stretch mx-2 flex flex-col gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
		>
			<div class="relative flex h-full flex-1 items-center flex-row-reverse sm:flex-col">
				<div class="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
					<!-- if the bot is typing, make a stop button appear. If the bot is not typing and at least one answer was given, generate another response-->
					{#if $isLoading}
						<button class="flex items-center gap-2 py-2 px-3 text-white text-xs rounded border-0 md:border" on:click={stop}>
                            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
							<span class="hidden md:inline">Stop generating</span>
						</button>
					{:else if !$isLoading && $messages.length % 2 === 0 && $messages.length > 1}
						<button class="flex items-center gap-2 py-2 px-3 text-xs text-white rounded border-0 md:border" on:click={reload}>
                            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
							<span class="hidden md:inline">Regenerate</span>
						</button>
					{/if}
				</div>
				{#if !$page.data.session}
					<button class="w-full p-3 bg-green-300/70" on:click={() => signIn()}
						>Logga, coglione</button
					>
				{:else}
					<AutosizingSearchBar
                        isLoading={$isLoading}
                        bind:value={$input}
                        on:submit={(e) => {
                            console.log('inside AutosizingSearchBar: ', $input)
                            handleSubmit(e)
                        }}
                    />
				{/if}
			</div>
			<p class="self-center text-slate-200 text-xs text-center sm:text-start">
				ChatGPT clone experiment. No copyright infringement is intended. May produce inaccurate
				answers
			</p>
		</form>
	</div>
</div>
<style>
</style>
