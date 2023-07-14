<script>
	import Newsletter from 'components/Newsletter.svelte';
</script>

<footer>
	<div class="footer-wrapper">
		<Newsletter method="POST" />
		<div class="footer-links-section">
			<p>Our Products</p>
			<a href="/link">Limoni</a>
			<a href="/link">Pesche</a>
			<a href="/link">Cavallo</a>
			<a href="/link">Oligarca</a>
		</div>
		<div class="footer-links-section">
			<p>Our Products</p>
			<a href="/link">Fragole</a>
			<a href="/link">Fragole</a>
			<a href="/link">Fragole</a>
			<a href="/link">Fragole</a>
		</div>
	</div>
	<div class="footer-bar">
		<div class="copyright">Ettore Mihaili 2023</div>
	</div>
</footer>

<style>
	footer {
		max-width: 64rem;
		margin-inline: auto;
		padding: 2rem;
		border-top: 2px solid rgb(0, 0, 0, 0.1);
	}
	.footer-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer-links-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
	}

	.footer-bar {
		padding-block: 0.5rem;
	}

	.footer-links-section > p {
		color: teal;
		font-weight: 600;
		margin-block-end: 0.5rem;
	}

	@media (max-width: 40rem) {
		.footer-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 'a a' 'b c' 'd e';
			gap: 1rem;
		}
		.footer-wrapper:nth-child(2) {
			grid-area: b;
		}

		.footer-wrapper:nth-child(3) {
			grid-area: c;
		}

		.footer-wrapper:nth-child(4) {
			grid-area: d;
		}
	}
</style>
