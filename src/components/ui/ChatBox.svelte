<script lang='ts'>
	import { page } from "$app/stores";

    export let id: string; 
    console.log(id)
    $: isActive = $page.url.pathname === `/chats/${id}`
</script>

<li class="list-none border-white/20 border rounded-md ">
                    <a 
                    href={`/chats/${id}`} 
                    class={`flex items-center py-3 px-3 break-all relative gap-3 
                     ${isActive ? 'bg-[rgb(52,53,65)]' : 'hover:bg-[#2a2b32] '} cursor-pointer 
                    rounded-md group`}
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
                    >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    <span class="text-ellipsis flex-1 max-h-5 overflow-hidden break-all relative">
                    {id}
                    <div class={`absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l ${isActive ? 'from-[#343541]' : 'from-[#202123] group-hover:from-[#2A2B32]'} `}></div>
                    </span>
                    </a>
                </li>
