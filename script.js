// Script principal du portfolio
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animation d'entrée du header
    const header = document.querySelector('header');
    if (header) {
        header.style.opacity = "0";
        header.style.transform = "translateY(20px)";
        header.style.transition = "opacity 1.5s ease, transform 1.5s ease";

        setTimeout(() => {
            header.style.opacity = "1";
            header.style.transform = "translateY(0)";
        }, 100);
    }

    // 2. Gestion du menu hamburger
    const hamburger = document.getElementById('hamburger');
    const navOverlay = document.getElementById('nav-overlay');
    
    if (hamburger && navOverlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });

        // Fermer le menu après avoir cliqué sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
    }

    // 3. Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            fetch('http://127.0.0.1:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    btn.innerText = "Message envoyé ✅";
                    btn.style.backgroundColor = "#4CAF50";
                    contactForm.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = "";
                        btn.disabled = false;
                    }, 3000);
                } else {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                btn.innerText = originalText;
                btn.disabled = false;
            });
        });
    }

    // 4. Gestion du bouton Retour en haut
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mise à jour de l'année dans le footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Barre de progression
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.getElementById("myBar");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    }

    window.addEventListener('scroll', updateProgressBar);
});