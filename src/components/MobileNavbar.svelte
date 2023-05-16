<script lang="ts">
	// import stores and routing logic
	import { page } from '$app/stores';
	import { isMenuOpen } from '../stores/menuStore.js';
	import { beforeNavigate } from '$app/navigation';
	import { signIn, signOut } from '@auth/sveltekit/client';
	//import my helpers
	import { clickOutside } from '$lib/click_outside.js';
	import { KeydownEventListener } from '$lib/keydown_action';
	//import svelte animation
	import { fly } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	//state variables
	let exception;

	//handlers and functions
	function toggleMenu() {
		const body = document.getElementById('page-body');
		isMenuOpen.update((current) => {
			const nextValue = !current;
			if (body && nextValue) {
				body.classList.add('no-scroll');
			} else if (body && !nextValue) {
				body.classList.remove('no-scroll');
			}
			return nextValue;
		});
	}

	const handleKeydownEvent = async (event: KeyboardEvent) => {
		if (event.code === 'Escape') {
			isMenuOpen.update(() => false);
		}
	};

	// component lifecycle
	beforeNavigate((navigation) => {
		if (navigation.from?.route.id === navigation.to?.route.id) {
			return;
		}
		isMenuOpen.update(() => false);

		document.body.classList.remove('no-scroll');
	});
</script>

<!-- MARKUP for the BurgerMenu -->
<button id="mobile-menu-button" on:click={toggleMenu} bind:this={exception}>
	{#if $isMenuOpen}
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
			><path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M18 6L6 18M6 6l12 12"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
			><path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3 6h18M3 12h18M3 18h18"
			/></svg
		>
	{/if}
</button>

<!-- Mobile menu drawer, if isMenuOpen is true a drawer will slide in-->
{#if $isMenuOpen}
	<div
		id="menu-drawer"
		use:clickOutside={exception}
		use:KeydownEventListener={{ key: 'Escape', callback: handleKeydownEvent }}
		on:click_outside={() => toggleMenu()}
		in:fly={{ duration: 400, x: 300, easing: quartOut }}
		out:fly={{ duration: 200, x: 300 }}
	>
		<div id="menu-wrapper">
			<nav>
				<ul>
					<li><a href="/protected">Protected Route</a></li>
				</ul>
				<ul>
					<li><a href="/about">About</a></li>
				</ul>
			</nav>
			{#if $page.data.session}
				<button class="menu-button" on:click={() => signOut()}>Sign Out</button>
			{:else}
				<button class="menu-button" on:click={() => signIn()}>Sign In</button>
			{/if}
		</div>
	</div>
{/if}

<!-- CSS styles -->
<style>
	#mobile-menu-button {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		z-index: 10;
		background-color: inherit;
		border: none;
		color: inherit;
		width: 48px;
		height: 48px;
	}

	#mobile-menu-button > svg {
		pointer-events: none;
	}

	#menu-drawer {
		position: absolute;
		inset: 0;
		left: 6rem;
		background-color: var(--bg-color-2);
		padding-inline: 2rem;
	}

	#menu-wrapper {
		margin-top: 5rem;
	}
	ul {
		list-style: none;
		border-top: 1px solid var(--text-color);
	}

	ul:last-child {
		border-bottom: 1px solid var(--text-color);
	}

	li > a {
		padding-block: 0.5rem;
		display: block;
		font-weight: 500;
	}

	.menu-button {
		width: 100%;
		padding: 0.5rem;
		border: 0.5px solid white;
		border-radius: 0.5rem;
		background-color: teal;
		color: inherit;
		margin-block: 1rem;
	}

	/* the burger menu is not visible on desktop */
	@media (min-width: 640px) {
		#mobile-menu-button {
			display: none;
		}
	}
</style>
