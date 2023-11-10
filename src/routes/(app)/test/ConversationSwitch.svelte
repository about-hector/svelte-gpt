<script>
	import { switchBranch } from '$lib/chat_tree';
	import { currentNode, messageTree } from 'stores';

	export let currentBranch;
	export let branches;
	export let setMessages;

	async function handleAlternative(map, nodeId) {
		let newTree = await switchBranch(map, nodeId);
		setMessages(() => newTree);
		currentNode.update(() => newTree[newTree.length - 1].id);
	}
</script>

{#if branches.length > 1}
	<div
		class="flex items-center gap-0.5 p-1.5"
	>
		<button
			class=" text-xs disabled:text-gray-300/60"
			disabled={currentBranch === 0}
			on:click={() => {
				handleAlternative($messageTree, branches[currentBranch - 1]);
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
		<span class="text-xs">{currentBranch + 1} / {branches.length}</span>
		<button
			class=" text-xs disabled:text-gray-300/60"
			disabled={(currentBranch % branches.length) + 1 === branches.length}
			on:click={() => {
				handleAlternative($messageTree, branches[currentBranch + 1]);
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
