<script>
	import { onMount } from 'svelte';
	import ProfilePicture from 'ui/ProfilePicture.svelte';

	export let hashmap;
	export let node;

	let alternatives = [];
	let parent = node.parent;

	onMount(() => {
		if (hashmap[parent].children.length > 1) {
			alternatives = [...hashmap[parent].children];
			console.log('these are the alternatives: ', alternatives);
		}
	});
</script>

<div class="flex gap-8">
	<div class="flex flex-col">
		<ProfilePicture user={node.message.author.role} />
	</div>
	<div
		class={`${
			node.message.author.role === 'assistant' ? 'bg-stone-200' : 'bg-stone-100'
		} prose whitespace-pre-wrap `}
	>
		{node.message.content.parts[0]}
	</div>
</div>
