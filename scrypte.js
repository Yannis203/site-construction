// Avertit le CSS que le JavaScript a bien été chargé
// Cela permet de cacher les éléments au départ SEULEMENT si le JS fonctionne.
document.body.classList.add('js-loaded');

// --- MENU MOBILE ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const links = document.querySelectorAll('#nav-links li a');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    if(navLinks.classList.contains('show')){
        mobileMenu.classList.remove('fa-grip-lines');
        mobileMenu.classList.add('fa-times');
    } else {
        mobileMenu.classList.remove('fa-times');
        mobileMenu.classList.add('fa-grip-lines');
    }
});

// Fermeture au clic sur un lien (Mobile)
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        mobileMenu.classList.remove('fa-times');
        mobileMenu.classList.add('fa-grip-lines');
    });
});

// --- SCROLL REVEAL ANIMATION ---
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Exécuté une seule fois
        }
    });
}, {
    threshold: 0.1, // Se déclenche quand 10% de l'élément est visible
    rootMargin: "0px 0px -50px 0px"
});

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// --- ANIMATION DES COMPTEURS (STATISTIQUES) ---
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // Calcul pour 60fps

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + "+"; // Ajoute un "+" à la fin pour le style
            }
        };
        updateCounter();
    });
};

// Lancer les compteurs uniquement quand la section devient visible
const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
        startCounters();
        countersStarted = true;
    }
}, { threshold: 0.5 });

if(statsSection) {
    statsObserver.observe(statsSection);
}