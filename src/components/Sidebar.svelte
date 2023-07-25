<script lang="ts">
import {flip} from 'svelte/animate'
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { clickOutside } from '$lib/click_outside';
	import type { Session } from '@auth/core/types';
	import { onDestroy, onMount } from 'svelte';
	import ChatBox from 'ui/ChatBox.svelte';
	import { previousChats } from '../stores/menuStore';
    
	export let session: Session | null;
	let exception;
	let sidebarOpen = true;
	let isMobile = false;
	interface IChat {
		id: string;
		user_id: string;
	}

	function handleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	// when you use a button instead of an a with href
	//function handleChatClick(chatID: string) {
	//    goto(`/chats/${chatID}`);
	//}

	function checkMobile(media) {
		isMobile = media.matches;
	}

	async function getChats() {
		const response = await fetch('/chats');
		const data = await response.json();
		return data.chats;
	}

	onMount(async () => {
		const mediaQuery = window.matchMedia('(max-width: 767px)');
		// Initial check to set the isMobile variable correctly
		checkMobile(mediaQuery);

		// Add an event listener to update the isMobile variable if the screen changes size
		mediaQuery.addEventListener('change', (e) => checkMobile(e.media));
		const data = await getChats();
		previousChats.set(data);

        
	});
</script>

{#if !sidebarOpen}
	<div id="sidebar-toggle" class="absolute top-2 left-2 z-10" bind:this={exception}>
		<button
			on:click={handleSidebar}
			class="border border-white/20 flex-shrink-0 p-3 rounded-md transition-colors text-sm hover:bg-[hsl(240,9%,59%,.1)]"
		>
			<svg
				stroke="currentColor"
				fill="none"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="h-4 w-4"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line
					x1="9"
					y1="3"
					x2="9"
					y2="21"
				/></svg
			>
		</button>
	</div>
{:else}
	<div
		class="flex-shrink-0 overflow-x-hidden bg-[rgb(32,33,35)] h-full p-2 flex flex-col z-10 absolute md:static"
		style={`width: ${sidebarOpen ? '260px' : '0px'}; visibility: ${sidebarOpen ? null : 'hidden'}`}
		use:clickOutside={exception}
		on:click_outside={isMobile ? () => handleSidebar() : () => void 0}
	>
		<div class="flex flex-row gap-2">
			<div class="border w-full rounded-md border-white/20 text-sm h-11">
				<a
					class="flex items-center gap-3 p-3 hover:bg-[hsl(240,9%,59%,.1)] transition-colors flex-shrink-0 flex-grow"
					href={'/'}
				>
					<svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
						><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
					>
					New chat
				</a>
			</div>
			<button
				on:click={handleSidebar}
				class="border border-white/20 flex-shrink-0 p-3 rounded-md transition-colors text-sm hover:bg-[hsl(240,9%,59%,.1)]"
			>
				<svg
					stroke="currentColor"
					fill="none"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
					height="1em"
					width="1em"
					xmlns="http://www.w3.org/2000/svg"
					><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line
						x1="9"
						y1="3"
						x2="9"
						y2="21"
					/></svg
				>
			</button>
		</div>

		<!-- previous chats -->
		<div class="box-border flex-col overflow-y-auto gap-2 flex-1 -mr-2 mt-4">
			<div class="flex flex-col gap-1 text-sm text-gray-100 pb-2 mr-2">
				<p class="px-2 text-sm font-bold">Previous Chats</p>

				<!-- chat history -->
				{#if $previousChats}
					{#each $previousChats as chat (chat.id)}
                    <li class="list-none"    animate:flip={{duration: 350}}>
						<ChatBox id={chat.id} title={chat.title} />
                    </li>
					{/each}
				{:else}
					<p>No Chats</p>
				{/if}
			</div>
		</div>

		<div class="mt-auto">
			{#if session}
				<button
					class="flex w-full gap-2 items-center justify-center transition-colors text-sm rounded-md hover:dark:bg-[rgb(52,53,65)] p-3"
					on:click={() => signOut()}
				>
					<img src={session.user?.image} alt="user profile" class="rounded-sm w-7 h-7" />
					{session?.user?.email}
					<svg
						stroke="currentColor"
						fill="none"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-4 w-4 flex-shrink-0 text-gray-500"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="12" cy="12" r="1" />
						<circle cx="19" cy="12" r="1" />
						<circle cx="5" cy="12" r="1" />
					</svg>
				</button>
			{:else}
				<button
					class="flex w-full gap-2.5 items-center justify-center bg-green-400/70 transition-colors text-sm rounded-md hover:dark:bg-[rgb(52,53,65)] p-3"
					on:click={() => signIn()}>Sign In</button
				>
			{/if}
		</div>
	</div>
{/if}
