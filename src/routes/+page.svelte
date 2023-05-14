<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<div class="wrapper">
    <div class="page-heading">
    {#if $page.data.session}
        <h1>{$page.data.session.user?.name} Pupu</h1>
    {:else}
	<h1>Hei BELA sgnoccola</h1>
    {/if}
    </div>

    <div class="wrapper">
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
			{/if}
			<p><span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span></p>
			<button on:click={() => signOut()} class="button">Sign out</button>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<button on:click={() => signIn('github')}>Sign In with GitHub</button>
			<button on:click={() => signIn('google')}>Sign In with Google</button>
		{/if}
    </div>	
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-block: 2rem;
        gap: 1rem; 
	}
    .page-heading {
        margin-bottom: 2rem; 
    }
</style>
