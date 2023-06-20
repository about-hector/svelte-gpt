<script>
	//import { signIn, signOut } from '@auth/sveltekit/client';
	//import { page } from '$app/stores';
	import { useChat } from 'ai/svelte';
	import ProfilePicture from '../components/ProfilePicture.svelte';

	const { input, handleSubmit, messages } = useChat({
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
					<div class="flex flex-shrink-0 gap-4  mx-auto lg:max-w-2xl xl:max-w-3xl p-3">
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
					<button class="py-2 px-3 bg-black rounded-md">Regenerate Response</button>
				</div>
				<div
					class="flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4
            relative border border-black/10 dark:border-gray-900/50 dark:text-white bg-[rgb(64,65,79)] rounded-xl shadow-xs dark:shadow-xs"
				>
					<textarea
						rows="1"
						placeholder="Is it possible for a cat to learn how to bark?"
						bind:value={$input}
						class="h-7 max-h-52 w-full resize-none bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 overflow-y-hidden md:pr-12 pl-3 focus:ring-offset-0 focus-visible:ring-offset-0 focus:outline-none"
					/>
					<button type="submit" class="absolute md:bottom-3 md:right-3 p-2">
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
