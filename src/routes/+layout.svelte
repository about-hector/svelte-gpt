<script>
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import '../global.css';
	import { page, updated } from '$app/stores';
	import Page from './+page.svelte';
	import MarqueeStripe from '../components/MarqueeStripe.svelte';
</script>

<MarqueeStripe />
<Navbar session={$page.data.session}/>
<!--this checks if a new deployment was made after the user opened the Page
    allowing for him to update the contents as intended by the developer-->
{#if $updated}
<div class="updated-version-toast">
	<div class="update-toast-body">
		<span class="update-toast-title">New app version available!</span>
		<p>Refresh the page to update</p>
	</div>
	<button class="refresh-button" on:click={() => location.reload()}> o </button>
</div>
{/if}
<main id="body-wrapper">
	<slot />
</main>
<Footer />

<style>
	#body-wrapper {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-block: 2rem;
	}

	.updated-version-toast {
		position: absolute;
		right: 2rem;
		top: 2rem;
		background-color: #dd3322;
		padding-block: 0.75rem;
		padding-inline: 1rem;
		border-radius: 1rem;
		display: flex;
		gap: 1rem;
		justify-content: space-between;
		align-items: center;
	}

	.update-toast-title {
		font-weight: 700;
	}

	.update-toast-body {
	    display: flex;
        flex-direction: column;
        gap: 0.33rem; 
	}

	.refresh-button {
		width: 3rem;
		height: 3rem;
		background-color: unset;
		border: none;
	}

	@media (max-width: 40rem) {
		.updated-version-toast {
			position: absolute;
			bottom: 1.5rem;
			left: 1.5rem;
			right: 1.5rem;
			top: initial;
		}
	}
</style>
