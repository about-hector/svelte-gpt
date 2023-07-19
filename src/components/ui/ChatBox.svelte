<script lang="ts">
	import { page } from '$app/stores';

	export let id: string;
	$: isActive = $page.url.pathname === `/chats/${id}`;
</script>

<li class="list-none rounded-md text-inherit">
	<a
		href={`/chats/${id}`}
		class={`flex items-center py-3 px-3 break-all relative gap-3 
                     ${isActive ? 'bg-[rgb(52,53,65)] pr-[3rem]' : 'hover:bg-[#2a2b32] '} cursor-pointer 
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
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
		<span class="text-ellipsis flex-1 max-h-5 overflow-hidden break-all relative">
			{id}
			<div
				class={`absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l ${
					isActive ? 'from-[#343541]' : 'from-[#202123] group-hover:from-[#2A2B32]'
				} `}
			/>
		</span>
        {#if isActive}
		<div class="absolute flex right-1 z-10 text-gray-300 visible">
			<button class="p-1 hover:text-white">
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
					<path d="M12 20h9" />
					<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
				</svg>
			</button>
			<!--component
			// when adding this back, change the pr-[3] to 4.5 in the <a> is active condition

			<button
				type="button"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-controls="radix-:rj3:"
				data-state="closed"
				class="p-1 hover:text-white"
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
					<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
					<polyline points="16 6 12 2 8 6" />
					<line x1="12" y1="2" x2="12" y2="15" />
				</svg>
			</button> -->
			<button class="p-1 hover:text-white">
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
					<polyline points="3 6 5 6 21 6" />
					<path
						d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
					/>
					<line x1="10" y1="11" x2="10" y2="17" />
					<line x1="14" y1="11" x2="14" y2="17" />
				</svg>
			</button>
		</div>
        {/if}
	</a>
</li>
