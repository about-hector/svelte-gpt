<script>
	import MobileNavbar from "./MobileNavbar.svelte";
</script>


<header class="website-navbar">
    <div id="website-logo">
        <a href="/" class="logo-link">
        <h1>
           Svelte<span style="color: teal;">APP<span>
        </h1>
        </a>
    </div>
    <MobileNavbar/> 
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>


<style>
.website-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 64rem;
    margin-inline: auto;
    padding-block: 1.25rem;
    padding-inline: 1rem; 
}
.website-navbar > nav > ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem; 
}

.website-navbar > nav > ul > li {
    list-style-type: none;
}

.website-navbar > nav > ul > li > a {
    text-decoration: none;
    text-transform: capitalize;
}

@media (max-width: 640px) {
    /* make the navbar dissappear on mobile*/
    .website-navbar > nav {
        display: none; 
    }
}


</style>
