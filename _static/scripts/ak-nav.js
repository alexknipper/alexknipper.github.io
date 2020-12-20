// ak-nav.js
// This file is designed to accompany the ak-nav.css stylesheet and provide several critical functions
// Alex Knipper

function addAKNavbarEvents() {
    // Add the 'click' event to the hamburger button
    document.getElementById("ak-nav-hamburger").addEventListener('click', function(){
        let navbar = document.getElementById('ak-nav');
        let navLinks = document.getElementById('ak-nav-links');
        if (!navbar.classList.contains('opened')) {
            navbar.classList.add('opened');
        } else {
            navbar.classList.remove('opened');
        }
    });

    // Add the 'scroll' event to the content element
    window.addEventListener('scroll', function(){
        let navbar = document.getElementById('ak-nav');
        if (!(window.scrollY == 0) && !(navbar.classList.contains('scrolled'))) {
            navbar.classList.add('scrolled');
        } else if ((window.scrollY == 0) && (navbar.classList.contains('scrolled'))){
            navbar.classList.remove('scrolled');
        }
    });

    // Add the 'resize' event to the root element
    //window.addEventListener('resize', resizeNavbar);
    window.addEventListener('resize', function() {
        resizeNavbarSection('ak-nav-links');
        resizeNavbarSection('ak-nav-social');
    });

    // Attempt to resize the navbar, if needed
    //window.addEventListener('load', resizeNavbar);
    window.addEventListener('load', function() {
        resizeNavbarSection('ak-nav-links');
        resizeNavbarSection('ak-nav-social');
    });
}

function resizeNavbarSection(sectionID) {
    let navbar = document.getElementById('ak-nav');
    let navSection = document.getElementById(sectionID);
    let display = getComputedStyle(navbar).getPropertyValue('--nav-display');
    let margin = (parseInt(getComputedStyle(navSection.children[0]).marginLeft) || 0);
    let navspace = navSection.offsetWidth * (sectionID == 'ak-nav-links' ? .9 : .7);
    let linkList = [];

    // Total up the width of all the links
    var linksWidth = 0;
    for (let i=0; i<navSection.children.length; i++) {
        let childWidth = navSection.children[i].offsetWidth + (margin * 2);
        linksWidth += childWidth;
        linkList.push(childWidth);
    }
    if (sectionID == 'ak-nav-social') {
        sectionBefore = window.getComputedStyle(navSection, ':before');
        linksWidth += (parseInt(sectionBefore.width) || 0) + (parseInt(sectionBefore.marginRight) || 0);
    }

    // See if the div elements have been created yet, and if not, maybe create them
    let div = navSection.querySelector('div:last-of-type > p + div');
    if (!div && (linksWidth > navspace)) {
        let node = document.createElement('div');
        node.appendChild(document.createElement('p'));
        node.appendChild(document.createElement('div'));
        node.children[0].innerHTML = (sectionID == 'ak-nav-links' ? 'More' : '<i class="fa fa-angle-down"></i>');
        navSection.appendChild(node);
        div = navSection.querySelector('div:last-of-type > p + div');
        linksWidth += div.offsetWidth;
    } else {
        var divWidth = linkList.pop();
    }

    // If the links are too wide, send links away until they fit
    if (display == 'desktop' && linksWidth > navspace) {
        while (linksWidth > navspace) {
            let link = navSection.querySelector('a:last-of-type');
            linksWidth -= linkList.pop();
            navSection.removeChild(link);
            div.insertBefore(link, div.children[0]);
        }
    }

    // If there's room for more links, try to add them back
    let sectionDiv = navSection.querySelector('div:last-of-type');
    if (display == 'desktop' && div && div.children.length != 0) {
        let proposedWidth = linksWidth + (div.children[0].clientWidth || 0) + (margin * 2);
        while (div && div.children.length > 0 && proposedWidth < navspace) {
            let link = div.children[0];
            div.removeChild(link);
            navSection.insertBefore(link, sectionDiv);
            if (div.children.length != 0) {
                proposedWidth = linksWidth + (div.children[0].clientWidth || 0) + (margin * 2);
            } if (div.children.length == 1 && div.children[0].clientWidth + (margin * 2) <= divWidth) {
                let link = div.children[0];
                div.removeChild(link);
                navSection.insertBefore(link, sectionDiv);
                navSection.removeChild(sectionDiv);
                div = null;
                setTimeout(resizeNavbarSection(sectionID), 0);
            }
        }
    } else if (display == 'mobile') {
        while (!div.children.length == 0) {
            let link = div.children[0];
            div.removeChild(link);
            navSection.insertBefore(link, sectionDiv);
        }
        if (div) {
            navSection.removeChild(sectionDiv);
            div = null;
        }
    }

    // See if the div elements are empty, and if so, delete them
    if (div && div.children.length == 0) {
        navSection.removeChild(sectionDiv);
        setTimeout(resizeNavbarSection(sectionID), 0);
    }
}