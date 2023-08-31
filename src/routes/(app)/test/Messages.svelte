<script>
	import ProfilePicture from 'ui/ProfilePicture.svelte';

	export let hashmap;
    export let currentNode; 

	async function switchBranch() {
		console.log('newBranch');
	}
    
    let doNotDisplay = !currentNode.message || currentNode.message === undefined ? true : false; 
    let role = doNotDisplay ? null : currentNode?.message.author.role;
</script>

{#if doNotDisplay}
    <div> Something went wrong... </div>
{:else}
	<li
		class={`${
			role === 'user' ? 'bg-red-100' : 'bg-green-100'
		} flex gap-8 p-6 `}
	>
		<ProfilePicture user={role} />
		<div
			class={`prose whitespace-pre-wrap`}
		>
			{`${doNotDisplay ? null : currentNode?.message.content.parts[0]}`}
		</div>
	</li>
	{#if alternatives.length > 1}
		<button on:click={switchBranch}>NextBranch</button>
	{/if}
{/if}

{#if currentNode.children}
    <svelte:self currentNode={currentNode.children[0]} {hashmap} />
{/if}
