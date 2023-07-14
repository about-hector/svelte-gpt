<script>
	//import { signIn, signOut } from '@auth/sveltekit/client';
	//import { page } from '$app/stores';
	import { useChat } from 'ai/svelte';
	import ProfilePicture from 'ui/ProfilePicture.svelte';
	import AutosizingSearchBar from 'components/AutosizingSearchBar.svelte';

	const { input, handleSubmit, messages, isLoading, reload, stop } = useChat({
		api: '/api/ai-chat'
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="w-full overflow-y-scroll">
	<ul class="">
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
		<div class="h-32 md:h-48 flex-shrink-0" />
	</ul>
	<div
		class="absolute bottom-0 left-0 w-full border-t md:border-t-0
    dark:border-white/20 md:border-transparent md:dark:border-transparent
    md:bg-gradient-to-b md:from-transparent md:to-[#353740] md:to-60% bg-white
    dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:-left-2"
	>
		<form
			on:submit={handleSubmit}
			class="relative stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
		>
			<div class="relative flex h-full flex-1 items-stretch md:flex-col">
				<div class="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
					<!-- if the bot is typing, make a stop button appear. If the bot is not typing and at least one answer was given, generate another response-->
					{#if $isLoading}
						<button class="py-2 px-3 bg-black rounded-md" on:click={stop}>
							Stop generating answer
						</button>
					{:else if !$isLoading && $messages.length % 2 === 0 && $messages.length > 1}
						<button class="py-2 px-3 bg-black rounded-md" on:click={reload}> Regenerate response </button>
					{/if}
				</div>
				<AutosizingSearchBar bind:value={$input} on:submit={handleSubmit} />
               <p class="self-center mt-3 text-slate-200 text-xs">ChatGPT clone experiment. No copyright infringement is intended. May produce inaccurate answers</p>
			</div>
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
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-block: 2rem;
		gap: 1rem;
		font-smooth: auto;
		max-width: 60rem;
		overflow: auto;
	}
	/* border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2 md:-left-2 */
	.input-wrapper {
		position: absolute;
		bottom: 0;
		width: 100%;
		left: 0;
	}
</style>
