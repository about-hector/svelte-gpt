<script>
	//export const ssr = false;
	import { isMenuOpen } from '../stores/menuStore.js';
	import { clickOutside } from '../utils/click_outside';
	import { fly } from 'svelte/transition';
	import { KeydownEventListener } from '../utils/keydown_action';
	import { quartOut } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	//import type { BeforeNavigate } from '@sveltejs/kit';
	//state variables
	let exception;

	//helpers and functions
	const toggleMenu = () => {
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
	};

	const handleKeydownEvent = async (event) => {
		if (event.code === 'Escape') {
			isMenuOpen.update(() => false);
		}
	};

	const options = {
		key: 'Escape',
		callback: handleKeydownEvent
	};

	beforeNavigate((navigation) => {
		if (navigation.from?.route.id === navigation.to?.route.id) {
			return;
		}
		isMenuOpen.update(() => false);

		document.body.classList.remove('no-scroll');
	});
</script>

<button id="mobile-menu-button" on:click={toggleMenu} bind:this={exception}>
	{#if $isMenuOpen}
		X
	{:else}
		=
	{/if}
</button>
{#if $isMenuOpen}
	<div
		id="menu-drawer"
		use:clickOutside={exception}
		use:KeydownEventListener={options}
		on:click_outside={toggleMenu}
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
			<button class="menu-button">Log In</button>
		</div>
	</div>
{/if}

<style>
	#mobile-menu-button {
		display: inline-block;
		padding: 1rem;
		z-index: 10;
		background-color: inherit;
		border: none;
		color: inherit;
		width: 48px;
		height: 48px;
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
