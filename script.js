
/* ========================================
   ASHVERSE - JAVASCRIPT
======================================== */


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});


// CLOSE MOBILE MENU AFTER CLICKING A LINK

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});


// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ACTIVE NAVIGATION LINK

const sections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    let currentSection = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


// BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// QR CODE CLICK SUPPORT FOR MOBILE

const qrTrigger = document.getElementById("qrTrigger");
const qrHover = document.querySelector(".qr-hover");

qrTrigger.addEventListener("click", (event) => {

    event.stopPropagation();

    const isOpen = qrHover.classList.toggle("show-qr");

    qrTrigger.setAttribute("aria-expanded", isOpen);

});

document.addEventListener("click", (event) => {

    if (!qrHover.contains(event.target)) {
        qrHover.classList.remove("show-qr");
        qrTrigger.setAttribute("aria-expanded", "false");
    }

});


// CURSOR GLOW EFFECT

const cursorGlow = document.querySelector(".cursor-glow");

if (window.matchMedia("(pointer: fine)").matches) {

    document.addEventListener("mousemove", (event) => {

        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;

    });

} else {

    cursorGlow.style.display = "none";

}


// FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// INITIALISE NAVIGATION STATE

updateActiveNavigation();

