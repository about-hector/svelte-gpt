<footer>
    <div class="footer-wrapper">
    <div id='newsletter-cta'>
        <p>Subscribe to our Newsletter</p>
        <form>
        <input type="text" name="email-input" id="newsletter-input" placeholder="user@mailprovider.com">
        <button type="submit">Join!</button>
        </form>
    </div>
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
     <div class="footer-links-section">
        <p>Our Products</p>
        <a href="/link">Fragole</a>
        <a href="/link">Fragole</a>
        <a href="/link">Patroclo</a>
        <a href="/link">Fragole</a>
    </div>

    </div>
    <div class="footer-bar">
        <div class="copyright">Ettore Mihaili 2023</div>
    </div>
</footer>

<style>
   .footer-wrapper {
        display: flex;
        justify-content: space-between; 
        align-items: center;
        padding-block: 3rem;         
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

    footer {
        max-width: 64rem;
        margin-inline: auto;
        padding-inline: 1rem; 
    }

    .footer-links-section > p {
        color: teal;
        font-weight: 600;
        margin-block-end: 0.5rem; 
    }

#newsletter-cta {
    display: flex; 
    flex-direction: column;
    gap: 1rem;
}

#newsletter-cta > p {
    margin-bottom: auto; 
}


@media (max-width: 40rem) {
    .footer-wrapper {
        display: grid; 
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'a a''b c''d d';
        gap: 1rem; 
    }

#newsletter-cta {
    grid-area: a;
}

.footer-wrapper:nth-child(2) {
    grid-area: b; 
}

.footer-wrapper:nth-child(3) {
    grid-area: c;
}

.footer-wrapper:nth-child(4) {
    grid-area: d;
    display: flex; 
    justify-content: center;
}

}

</style>
