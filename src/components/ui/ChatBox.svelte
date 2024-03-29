<script lang="ts">
	import { clickOutside } from '$lib/click_outside';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	export let id: string;
	export let title: string;
	import { activeChat, previousChats } from 'stores';
	import { onMount } from 'svelte';
	import { dataShuffle } from '$lib/shuffle_characters';
	$: isActive = $page.url.pathname === `/chats/${id}` || $activeChat === id;

	let titleRef: HTMLSpanElement;
	let inputRef;
	let isEditing = false;
	let originalTitle;
	let confirmEdit;

	async function toggleIsEditing(e?: CustomEvent) {
		isEditing = !isEditing;
		if (isEditing) {
			setTimeout(() => focusField(inputRef), 1);
			originalTitle = title;
		}
	}

	async function undoEdit() {
		title = originalTitle;
		toggleIsEditing();
	}

	export function focusField(ref) {
		ref.focus();
	}

	async function updateTitle() {
		const queryParam = new URLSearchParams();
		queryParam.append('title', 'true');
		console.log(title);
		const response = await fetch('/chats/edit', {
			method: 'POST',
			body: JSON.stringify({ title: title, chatID: id, edit: 'title' })
		});

		isEditing = !isEditing;
		return;
	}

	async function handleDelete(e: MouseEvent, chatID: string) {
		e.preventDefault();
		goto('/');
		previousChats.update((array) => {
			const newarray = array.filter((chat) => {
				return chat.id !== chatID;
			});

			return newarray;
		});
		const response = await fetch('/chats', {
			method: 'DELETE',
			body: JSON.stringify(chatID)
		});
		const data = await response.json();
		return data;
	}

	onMount(() => {
		if (isActive) {
			dataShuffle(titleRef);
		}
	});
</script>

<div {id} class="list-none rounded-md text-inherit">
	{#if isEditing}
		<div
			class="flex py-3 px-3 items-center gap-3 relative rounded-md hover:pr-14 break-all pr-14 bg-[rgb(52,53,65)]"
			use:clickOutside={confirmEdit}
			on:click_outside={undoEdit}
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
				<path d="M12 20h9" />
				<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
			</svg>

			<input
				bind:this={inputRef}
				type="text"
				class="text-sm outline-none border-none bg-transparent p-0 m-0 w-full mr-0"
				bind:value={title}
			/>
			<div class="absolute flex right-1 z-10 text-gray-300 visible" bind:this={confirmEdit}>
				<button class="p-1 hover:text-white" on:click={updateTitle}>
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
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</button>

				<button class="p-1 hover:text-white" on:click={undoEdit}
					><svg
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
						><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
					></button
				>
			</div>
		</div>
	{:else}
		<a
			href={`/chats/${id}`}
			class={`flex items-center py-3 px-3 break-all relative gap-3 
                     ${
												isActive ? 'bg-[rgb(52,53,65)] pr-[3rem]' : 'hover:bg-[#2a2b32] '
											} cursor-pointer 
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
			<div class="text-ellipsis flex-1 max-h-5 overflow-hidden break-all relative">
				<span bind:this={titleRef}
					>{title}<span>
						<div
							class={`absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l ${
								isActive ? 'from-[#343541]' : 'from-[#202123] group-hover:from-[#2A2B32]'
							} `}
						/>
					</span></span
				>
			</div>
			{#if isActive}
				<div class="absolute flex right-1 z-10 text-gray-300 visible">
					<button class="p-1 hover:text-white" on:click={toggleIsEditing}>
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
					<button class="p-1 hover:text-white" on:click={(e) => handleDelete(e, id)}>
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
	{/if}
</div>
