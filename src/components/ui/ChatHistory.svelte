
<script>
    import ProfilePicture from "./ProfilePicture.svelte";
    export let messages; 
</script>

{#each messages as message (message.id)}
				{#if message.role === 'user'}
					<li class=" bg-[rgb(52,53,65)] mx-auto">
						<div class="flex flex-shrink-0 gap-4 mx-auto lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 md:gap-6">
							<ProfilePicture user={'user'} />
							<div class="prose whitespace-pre-wrap text-white">
							{message.content}
                            </div>
						</div>
					</li>
				{:else if message.role === 'assistant'}
					<li class="bg-[#444654] mx-auto">
						<div class="flex flex-shrink-0 gap-4 mx-auto lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 md:gap-6">
							<ProfilePicture user={'assistant'} />
							<div class="prose whitespace-pre-wrap text-white">
								{message.content}
							</div>
						</div>
					</li>
				{/if}
{/each}

