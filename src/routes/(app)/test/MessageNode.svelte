<script lang="ts">
	import ProfilePicture from 'ui/ProfilePicture.svelte';
	import { switchBranch } from '$lib/chat_tree';
	import { currentNode, messageTree } from 'stores';
	import ConversationSwitch from './ConversationSwitch.svelte';

	export let node;
	export let setMessages;

	$: parent = node.parent;


	$: alternatives =
			$messageTree[parent] && $messageTree[parent].children
				? [...$messageTree[parent].children]
				: [];
	
	$: currentAlternativeIndex = alternatives.length > 1 ? alternatives.indexOf(node.id) : 1;

	async function handleAlternative(map, nodeId) {
		let newTree = await switchBranch(map, nodeId);
		setMessages(newTree);
		currentNode.update(() => newTree[newTree.length - 1].id);
	}
</script>

<li
	class={`${node.role === 'assistant' ? 'bg-[#444654]' : 'bg-[rgb(52,53,65)]'}`}
>
	<div class="flex gap-4 justify-center p-4 md:py-6 md:gap-6 mx-auto flex-1 max-w-2xl">
		<div class="flex relative items-end flex-col flex-shrink-0">
			<ProfilePicture user={node.role} />
			{#if alternatives.length > 1}
				<div
					class="md:flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full hidden md:visible "
				>
					<button
						class=" text-xs disabled:text-gray-300/60"
						disabled={currentAlternativeIndex === 0}
						on:click={() => {
							handleAlternative($messageTree, alternatives[currentAlternativeIndex - 1]);
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
					<span class="text-xs flex-grow flex-shrink-0">
						{currentAlternativeIndex + 1} / {alternatives.length}
					</span>
					<button
						class=" text-xs disabled:text-gray-300/60"
						disabled={(currentAlternativeIndex % alternatives.length) + 1 === alternatives.length}
						on:click={() => {
							handleAlternative($messageTree, alternatives[currentAlternativeIndex + 1]);
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
			{node.content}
		</div>
	</div>
    <!--
    <div class="">
        <ConversationSwitch currentBranch={currentAlternativeIndex} branches={alternatives} {setMessages} />
    </div>
    -->
</li>
