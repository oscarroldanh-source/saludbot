document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded. Initializing scripts.");

    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile nav if open after clicking a link
            if (window.innerWidth <= 992 && document.querySelector('.nav-list').classList.contains('active')) {
                document.querySelector('.nav-list').classList.remove('active');
                // Also reset aria-expanded for accessibility
                const navToggle = document.querySelector('.nav-toggle');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Mobile Navigation Toggle (Hamburger Menu) ---
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        console.log("Mobile navigation toggle and list found. Initializing hamburger menu.");
        navToggle.addEventListener('click', function() {
            console.log("Hamburger menu clicked! Toggling 'active' class on navList.");
            navList.classList.toggle('active');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    } else {
        console.error("ERROR: Mobile navigation elements (nav-toggle or nav-list) not found. Check HTML structure.");
    }

    // --- Scroll-triggered animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Highlight active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-list a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Set initial active link for "Inicio" when page loads
    const setInitialActiveLink = () => {
        const hash = window.location.hash;
        if (hash) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });
        } else {
            const inicioLink = document.querySelector('.main-nav .nav-list a[href="#inicio"]');
            if (inicioLink) {
                inicioLink.classList.add('active');
            }
        }
    };
    setTimeout(setInitialActiveLink, 100);


    // --- Modal Logic ---
    const chatDemoModal = document.getElementById('chatDemoModal');
    const openChatDemoModalBtn = document.getElementById('openChatDemoModalBtn');
    const closeChatDemoModalBtn = document.getElementById('closeChatDemoModalBtn');

    const requestDemoModal = document.getElementById('requestDemoModal');
    const openRequestDemoModalBtn = document.getElementById('openRequestDemoModalBtn');
    const closeRequestDemoModalBtn = document.getElementById('closeRequestDemoModalBtn');
    const closeRequestDemoModalBtn2 = document.getElementById('closeRequestDemoModalBtn2');

    function openModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'flex';
            document.body.classList.add('modal-open');
            console.log(`${modalElement.id} opened.`);
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
            console.log(`${modalElement.id} closed.`);
        }
    }

    if (openChatDemoModalBtn) {
        openChatDemoModalBtn.addEventListener('click', function() {
            openModal(chatDemoModal);
        });
    } else {
        console.error("ERROR: openChatDemoModalBtn not found!");
    }

    if (openRequestDemoModalBtn) {
        openRequestDemoModalBtn.addEventListener('click', function() {
            openModal(requestDemoModal);
        });
    } else {
        console.error("ERROR: openRequestDemoModalBtn not found!");
    }

    if (closeChatDemoModalBtn) {
        closeChatDemoModalBtn.addEventListener('click', function() {
            closeModal(chatDemoModal);
        });
    }
    if (closeRequestDemoModalBtn) {
        closeRequestDemoModalBtn.addEventListener('click', function() {
            closeModal(requestDemoModal);
        });
    }
    if (closeRequestDemoModalBtn2) {
        closeRequestDemoModalBtn2.addEventListener('click', function() {
            closeModal(requestDemoModal);
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === chatDemoModal) {
            closeModal(chatDemoModal);
        }
        if (event.target === requestDemoModal) {
            closeModal(requestDemoModal);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (chatDemoModal.style.display === 'flex') {
                closeModal(chatDemoModal);
            }
            if (requestDemoModal.style.display === 'flex') {
                closeModal(requestDemoModal);
            }
        }
    });
});