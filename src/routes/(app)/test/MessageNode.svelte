<script lang="ts">
	import { onMount } from 'svelte';
	import ProfilePicture from 'ui/ProfilePicture.svelte';
	import { switchBranch } from '$lib/chat_tree';

	export let hashmap;
	export let node;
	export let setMessages;

	let alternatives: string[] = [];
	let currentAlternativeIndex: number;
	let parent = node.parent;

	onMount(() => {
		if (hashmap[parent].children.length > 1) {
			alternatives = [...hashmap[parent].children];
			alternatives.map((alt, index) => {
				if (node.id === alt) {
					currentAlternativeIndex = index;
				}
			});
		}
	});

	async function handleAlternative(map, nodeId) {
		let newTree = await switchBranch(map, nodeId);
		setMessages(newTree);
	}
</script>

<li
	class={`${node.message.author.role === 'assistant' ? 'bg-[rgb(52,53,65)]' : 'bg-[#444654]'}
    `}
>
	<div class="flex gap-4 justify-center p-4 md:py-6 md:gap-6 mx-auto flex-1 max-w-2xl">
		<div class="flex relative items-end flex-col flex-shrink-0">
			<ProfilePicture user={node.message.author.role} />
			{#if alternatives.length > 1}
				<div
					class="flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full visible"
				>
					<button
						class=" text-xs disabled:text-gray-300/60"
						disabled={currentAlternativeIndex === 0}
						on:click={() => {
							handleAlternative(hashmap, alternatives[currentAlternativeIndex - 1]);
							currentAlternativeIndex = currentAlternativeIndex - 1;
						}}
					>
						<svg
							stroke="currentColor"
							fill="none"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-3 w-3"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"><polyline points="15 18 9 12 15 6"></polyline></svg
						>
					</button>
					<span class="text-xs flex-grow flex-shrink-0"
						>{currentAlternativeIndex + 1} / {alternatives.length}</span
					>
					<button
						class=" text-xs disabled:text-gray-300/60"
						disabled={(currentAlternativeIndex % alternatives.length) + 1 === alternatives.length}
						on:click={() => {
							handleAlternative(hashmap, alternatives[currentAlternativeIndex + 1]);
							currentAlternativeIndex = currentAlternativeIndex + 1;
						}}
					>
						<svg
							stroke="currentColor"
							fill="none"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-3 w-3"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg
						>
					</button>
				</div>
			{/if}
		</div>
		<div class={`prose whitespace-pre-wrap text-gray-50 w-full`}>
			{node.message.content.parts[0]}
		</div>
	</div>
</li>
