<script lang="ts">
    export let method: 'POST';  
   // export let loading: boolean; 
</script>


<div id="newsletter-cta">
	<p>Subscribe to our Newsletter!</p>
	<form id="contact-form" {method}>
		<input
			type="email"
			name="email-input"
			id="newsletter-input"
			placeholder="user@mailprovider.com"
            required
		/>
        <input 
        type='text'
        name='message-body'
        required
        />
        <!-- disabled={loading}--> 
		<button type="submit">Join</button>
	</form>
</div>

<style>
	#newsletter-cta {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: #1a1a1a;
		padding: 1rem;
		border-radius: 12px;
		max-width: 320px;
	}

	#newsletter-cta > p {
		margin-bottom: auto;
	}

	#contact-form {
		position: relative;
		height: 3rem;
	}

	#newsletter-input {
		border: none;
		border-radius: 6px;
		background-color: #2d2d2d;
		width: 100%;
		height: 100%;
		padding-inline: 12px 85px;
		font-size: inherit;
		padding-block: 4px;
	}

	button[type='submit'] {
		position: absolute;
		background-color: #f5f5f5;
		color: black;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 4px 12px;
		font-size: 12;
		font-weight: bold;
		height: 40px;
	}

	@media (max-width: 40rem) {
		#newsletter-cta {
			grid-area: a;
			max-width: unset;
		}
	}
</style>
