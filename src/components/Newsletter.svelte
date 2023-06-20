<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	export let method: 'POST';

    // loading: the moment between form submission and confirmation of success
	let isLoading = false;

    // handler used from the event listener, runs on form submission 
	function loadingHandler() {
        // as soon as the user submits, we activate the loading state
        isLoading = true;

        // when we receive confirmation from the server, the loading state ends 
		if ($page.form?.success) {
			isLoading = false;
		}
	}

    // add the submit listener on component mount
	onMount(() => {
		const form = document.querySelector('#contact-form');
		form?.addEventListener('submit', loadingHandler);
	});

    // remove the listener on component destroy (avoids stacking listeners) 
	onDestroy(() => {
		return () => {
			const form = document.querySelector('#contact-form');
			form?.removeEventListener('submit', loadingHandler);
		};
	});
</script>

<!-- HTML -->
<div class="newsletter-cta">
	<form id="contact-form" {method} use:enhance>
		{#if $page.form?.success}
			<div class="success-message"><p>Thanks for subscribing!</p></div>
			<div
				class="colorful-overlay {$page.form?.success ? 'animate' : ''}"
				in:fade={{ duration: 500 }}
			/>
		{/if}
		<p>Subscribe to our Newsletter!</p>
		<div class={$page.form?.success ? 'fade-out' : ''}>
            <input
				disabled={$page.form?.success}
				type="email"
				name="email-input"
				id="newsletter-input"
				placeholder="user@mailprovider.com"
				required
			/>
			<textarea
				disabled={$page.form?.success}
				id="newsletter-text-form"
				name="message-body"
				required
			/>
			<!-- disabled={loading}-->
            {#if isLoading}
			<button disabled type="submit">Loading...</button>
		    {:else if !isLoading }

			<button disabled={$page.form?.success} type="submit">Submit</button>
          {/if} 
            
        </div>

	</form>
</div>

<!-- CSS -->
<style>
	
    @property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes rotate-gradient {
		0% {
			--gradient-angle: 0deg;
		}
		100% {
			--gradient-angle: 360deg;
		}
	}

	.newsletter-cta {
		isolation: isolate;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: #1a1a1a;
		padding: 1rem;
		border-radius: 12px;
		max-width: 320px;
		position: relative;
	}

	.colorful-overlay {
		content: '';
		position: absolute;
		inset: 0;
		background: conic-gradient(
			from var(--gradient-angle),
			#ffd700,
			#ff69b4,
			#00bfff,
			#32cd32,
			#ffd700
		);
		opacity: 0;
		transition: opacity 0.5s ease;
		z-index: 1;
		border-radius: 12px;
	}

    #contact-form > p {
        margin-bottom: 1rem;
    }

	.success-message {
		position: absolute;
		z-index: 2;
		inset: 0;
		display: grid;
		place-content: center;
	}

	#newsletter-input {
		border: none;
		border-radius: 6px;
		background-color: #2d2d2d;
		width: 100%;
		padding-inline: 12px;
		font-size: inherit;
		padding-block: 4px;
		margin-block-end: 0.5rem;
	}
	#newsletter-text-form {
		border: none;
		border-radius: 6px;
		background-color: #2d2d2d;
		width: 100%;
		font-size: inherit;
		padding-block: 4px;
	}

	button[type='submit'] {
		background-color: #f5f5f5;
		color: black;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 4px 12px;
		font-size: 12;
		font-weight: bold;
	}

	@media (max-width: 40rem) {
		.newsletter-cta {
			grid-area: a;
			max-width: unset;
		}
	}

	.colorful-overlay.animate {
		opacity: 1;
		animation: rotate-gradient 20s linear infinite;
	}
	.fade-out {
		opacity: 1;
		transition: opacity 500ms ease;
	}
</style>
