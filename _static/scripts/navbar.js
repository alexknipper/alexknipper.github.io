// navbar.js
// The file designed to accompany the navbar.css stylesheet
// Alex Knipper

function addAKNavbarEvents() {
    // Add the 'click' event to the hamburger button
    document.getElementById("ak-navbar-hamburger").addEventListener('click', function(){
        let navbar = document.getElementById('ak-navbar');
        let navLinks = document.getElementById('ak-navbar-links');
        if (!navbar.classList.contains('opened')) {
            navbar.classList.add('opened');
        } else {
            navbar.classList.remove('opened');
        }
    })

    // Add the 'scroll' event to the body
    document.addEventListener('scroll', function(){
        let navbar = document.getElementById('ak-navbar');
        if ((window.scrollY == 0) && !(navbar.classList.contains('scrolled'))) {
            navbar.classList.add('scrolled');
        } else if (!(window.scrollY == 0) && (navbar.classList.contains('scrolled'))){
            navbar.classList.remove('scrolled');
        }
        console.log(window.scrollY);
    })

    // Add the 'resize' event to the root element
    document.addEventListener('resize', function(){
        let navbar = document.getElementById('ak-navbar');
        let navLinks = document.getElementById('ak-navbar-links');
        let navspace = navLinks.clientWidth;

        var linksWidth = 0;
        for (let i=0; i<navLinks.children.length(); i++) {
            linksWidth += navLinks.children[i].clientWidth;
        }

        console.log(navspace, linksWidth);
    })
}