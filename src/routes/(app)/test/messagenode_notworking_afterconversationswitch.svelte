<script lang="ts">
	import ProfilePicture from 'ui/ProfilePicture.svelte';
	import { switchBranch } from '$lib/chat_tree';
	import { currentNode, messageTree } from 'stores';
	import ConversationSwitch from './ConversationSwitch.svelte';

	export let node;
	export let setMessages;

	$: parent = node.parent;

	$: alternatives =
		$messageTree[parent] && $messageTree[parent].children ? [...$messageTree[parent].children] : [];
	$: currentAlternativeIndex = alternatives.length > 1 ? alternatives.indexOf(node.id) : 0;
</script>

<li
	class={`${node.role === 'assistant' ? 'bg-[#444654]' : 'bg-[rgb(52,53,65)]'}
    `}
>
	<div class="flex gap-4 justify-center p-4 md:py-6 md:gap-6 mx-auto flex-1 max-w-2xl">
		<div class="flex relative items-end flex-col flex-shrink-0">
			<ProfilePicture user={node.role} />
			<ConversationSwitch
            bind:branches={alternatives}
				bind:currentBranch={currentAlternativeIndex}
				{setMessages}
			/>
		</div>
		<div class={`prose whitespace-pre-wrap text-gray-50 w-full`}>
			{node.content}
		</div>
	</div>
</li>
