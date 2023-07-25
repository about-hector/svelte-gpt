<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { useChat } from 'ai/svelte';
	import ProfilePicture from 'ui/ProfilePicture.svelte';
	import AutosizingSearchBar from 'components/AutosizingSearchBar.svelte';
	import { onMount } from 'svelte';
	import { previousChats } from '../stores/menuStore';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
    import { activeChat } from '../stores/menuStore'
	let chatID: string = $activeChat;
	const { input, handleSubmit, messages, setMessages, isLoading, reload, stop } = useChat({
		api: '/api/ai-chat',
		onFinish: async () => {
			if ($messages.length === 2) {
				const saveChat = await fetch('/chats', {
					method: 'POST',
					body: JSON.stringify($messages),
					headers: {
						'Content-type': 'application/json'
					}
				});

				// get the id of the chat back from the db after saving it
				const response = await saveChat.json();
                activeChat.set(response.chatID)
				const completion = await fetch('/api/completion', {
					method: 'POST',
					body: JSON.stringify({ messages: $messages, chatID: $activeChat })
				});
				const title = (await completion.json()).title;
//                goto(`/chats/${chatID}`)
				previousChats.update((array) => {
					return [
						{
							id: $activeChat,
							title: title,
						},
						...array
					];
				});
			} else {
				const updateChat = await fetch('/chats', {
					method: 'PATCH',
					body: JSON.stringify({ chat: $messages.slice(-2), id: $activeChat ? $activeChat : null }),
					headers: {
						'Content-type': 'application/json'
					}
				});
				const chat = await updateChat.json();
			}
		}
	});

    afterNavigate((navigation) => {
        if (navigation.to?.route.id === '/') {
            setMessages([])
            activeChat.set('/')
        }
    })

    
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full overflow-y-scroll">
	<ul class="text-white">
        {#if $messages}
		{#each $messages as message}
			{#if message.role === 'user'}
				<li class=" bg-[rgb(52,53,65)] mx-auto">
					<div class="flex flex-shrink-0 gap-4 mx-auto lg:max-w-2xl xl:max-w-3xl p-3">
						<ProfilePicture user={'user'} />
						{message.content}
					</div>
				</li>
			{:else if message.role === 'assistant'}
				<li class="bg-[#444654] mx-auto">
					<div class="flex flex-shrink-0 gap-4 mx-auto lg:max-w-2xl xl:max-w-3xl p-3">
						<ProfilePicture user={'assistant'} />
						<div class="prose whitespace-pre-wrap text-white">
							{message.content}
						</div>
					</div>
				</li>
			{/if}
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
			on:submit={handleSubmit}
			class="relative stretch mx-2 flex flex-col gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
		>
			<div class="relative flex h-full flex-1 items-stretch flex-row-reverse sm:flex-col">
				<div class="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
					<!-- if the bot is typing, make a stop button appear. If the bot is not typing and at least one answer was given, generate another response-->
					{#if $isLoading}
						<button
							class="py-2 px-3 text-white text-xs bg-black rounded-md"
							on:click={() => stop()}
						>
							Stop generating answer
						</button>
					{:else if !$isLoading && $messages.length % 2 === 0 && $messages.length > 1}
						<button
							class="py-2 px-3 text-xs text-white bg-black rounded-md"
							on:click={() => reload()}
						>
							Regenerate response
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
						on:submit={handleSubmit}
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

<!--
    <div class="page-heading">
    {#if $page.data.session}
        <h1>{$page.data.session.user?.name} Pupu</h1>
    {:else}
	<h1>Hei BELA sgnoccola</h1>
    {/if}
    </div>

    <div class="wrapper">
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
			{/if}
			<p><span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span></p>
			<button on:click={() => signOut()} class="button">Sign out</button>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<button on:click={() => signIn('github')}>Sign In with GitHub</button>
			<button on:click={() => signIn('google')}>Sign In with Google</button>
		{/if}
    </div>	
-->
<style>
</style>
