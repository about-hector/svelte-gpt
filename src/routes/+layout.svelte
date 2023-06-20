<script>
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import '../app.css';
	import { page, updated } from '$app/stores';
	import MarqueeStripe from '../components/MarqueeStripe.svelte';
	import Sidebar from '../components/Sidebar.svelte';
    
    let sidebarOpen = true; 
    function handleSidebar() {
        sidebarOpen = !sidebarOpen; 
    }
</script>

<!-- <MarqueeStripe />
<Navbar session={$page.data.session} /> -->
<!--this checks if a new deployment was made after the user opened the Page
    allowing for him to update the contents as intended by the developer-->
{#if $updated}
	<div class="updated-version-toast">
		<div class="update-toast-body">
			<span class="update-toast-title">New app version available!</span>
			<p>Refresh the page to update</p>
		</div>
		<button class="refresh-button" on:click={() => location.reload()}>
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
				><g
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6" /><path
						d="M21 12a9 9 0 0 1-15 6.7L3 16"
					/></g
				></svg
			>
		</button>
	</div>
{/if}
<div class="flex w-full h-full relative z-0 overflow-hidden">
    <Sidebar />	
	<main class="relative h-full max-w-full flex-1 overflow-hidden flex">
		<slot />
	</main>
</div>

<!-- <Footer /> -->

<style>
	/*this was on the main */
	#body-wrapper {
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-block: 2rem;
	}

	.updated-version-toast {
		position: absolute;
		z-index: 100;
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
			position: fixed;
			bottom: 1.5rem;
			left: 1.5rem;
			right: 1.5rem;
			top: initial;
		}
	}

	.refresh-button {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
