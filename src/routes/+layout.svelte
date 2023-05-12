<script>
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
    import '../global.css';
</script>

<Navbar />
<main id='body-wrapper'>
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
</style>
