// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Particles.js Initialization for the Hero Section
document.addEventListener("DOMContentLoaded", function() {
    if(window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#00D4FF", "#8A2BE2", "#FFFFFF"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00D4FF",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1, // Slow movement for zero-gravity feel
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only reveal once
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Subtly parallax navbar on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(10, 10, 10, 0.95)";
            navbar.style.boxShadow = "0 4px 30px rgba(0, 212, 255, 0.1)";
        } else {
            navbar.style.background = "rgba(10, 10, 10, 0.8)";
            navbar.style.boxShadow = "none";
        }
    });

    // 3D Tilt Effect for Service & Portfolio Cards
    const tiltCards = document.querySelectorAll('.service-card, .portfolio-item');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = this;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
    }

    function resetTilt(e) {
        const card = this;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
});

// Form Submission Handling
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const overlay = document.getElementById('successOverlay');
    const form = document.getElementById('contactForm');
    
    // REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycby817VxGaIkkyDLPl6brbhJD9sGiBu4elbCLY64HVuDprd0aDa5GGPDx2wHk7ai5z2y_w/exec';
    
    // Getting form data
    const formData = new FormData(form);

    // Simulate loading state
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...';
    btn.disabled = true;

    if (scriptURL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
        alert("Please replace 'YOUR_GOOGLE_SCRIPT_URL_HERE' in your script.js file with your actual Google Script Web App URL first!");
        btn.innerHTML = originalText;
        btn.disabled = false;
        return;
    }

    // Send data to Google Sheets silently in background
    // We must wrap FormData in URLSearchParams so Google Script can read it as form parameters
    fetch(scriptURL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: new URLSearchParams(formData)
    })
        .then(response => {
            // Show success overlay rocket animation
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100');
            
            // Reset form
            form.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Hide overlay after delay
            setTimeout(() => {
                overlay.classList.remove('opacity-100');
                overlay.classList.add('opacity-0', 'pointer-events-none');
                
                // Remove/Hack rocket animation element to allow replay
                const rocketCont = overlay.querySelector('.rocket-launch-anim');
                if(rocketCont) {
                    rocketCont.style.animation = 'none';
                    rocketCont.offsetHeight; /* trigger reflow */
                    rocketCont.style.animation = null; 
                }
            }, 3000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Error sending transmission: " + error.message);
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
}
