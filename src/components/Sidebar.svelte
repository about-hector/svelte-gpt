<script lang="ts">
import {goto} from '$app/navigation'
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	import type { Session } from '@auth/core/types';
	import { onMount } from 'svelte';
    
	export let session: Session | null;
    let previousChats: IChat[] | null = null; 
	let sidebarOpen = true;

    interface IChat {
        id: string, 
        user_id: string, 
    }
    
    function handleNewChat() {
        goto('/');
    }

	function handleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

    function handleChatClick(chatID: string) {
        goto(`/chats/${chatID}`);
    }
    
    async function getChats() {
        const response = await fetch('/chats');
        const data = await response.json(); 
        return data.chats
    }

    onMount(async () => {
        const data = await getChats();
        previousChats = data;
    }) 
</script>

{#if !sidebarOpen}
	<div id="sidebar-toggle" class="absolute top-2 left-2 z-10">
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
		class="flex-shrink-0 overflow-x-hidden bg-[rgb(32,33,35)] h-full p-2 flex flex-col"
		style={`width: ${sidebarOpen ? '260px' : '0px'}; visibility: ${sidebarOpen ? null : 'hidden'}`}
	>
		<div class="flex flex-row gap-2">
			<div class="border w-full rounded-md border-white/20 p-3 text-sm h-11">
				<button class="flex items-center gap-3" on:click={() => handleNewChat()}>
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
				</button>
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
        <div class='flex flex-col gap-2 text-sm text-gray-100 pb-2 mr-2'>
        <p class='px-2 text-sm font-bold'>Previous Chats</p>
        {#if previousChats}
            {#each previousChats as chat}
                <li class="list-none border-white/20 border rounded-md ">
               
                    <a href={`/chats/${chat.id}`} class='flex items-center py-3 px-3 break-all relative gap-3 hover:bg-[#2a2b32] active:bg-[rgb(52,53,65)] cursor-pointer rounded-md group'>
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
                    >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    <span class="text-ellipsis flex-1 max-h-5 overflow-hidden break-all relative">
                    {chat.id}
                    <div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-[#202123] group-hover:from-[#2A2B32]"></div>
                    </span>
                    </a>
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
					class="flex w-full gap-2.5 items-center transition-colors text-sm rounded-md hover:dark:bg-[rgb(52,53,65)] p-3" on:click={() => signOut()}
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
				<button class="flex w-full gap-2.5 items-center justify-center bg-green-400/70 transition-colors text-sm rounded-md hover:dark:bg-[rgb(52,53,65)] p-3" on:click={() => signIn()}>Sign In</button>
			{/if}
		</div>
	</div>
{/if}
