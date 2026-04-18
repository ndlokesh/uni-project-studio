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

// --- NEW FEATURES ---

// 1. Typed.js Hero
document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Into Orbit', 'To The Next Level', 'With Cutting-Edge Tech'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
        });
    }

    // 2. 3D Tech Stack Sphere
    if(document.getElementById('tech-sphere')) {
        const texts = [
            'React', 'Node.js', 'Next.js', 'MongoDB', 
            'Python', 'Tailwind', 'Express', 'Firebase',
            'SQL', 'Git', 'HTML5', 'CSS3', 'JS', 'C++'
        ];
        // Calculate appropriate radius based on screen size
        const radius = window.innerWidth < 768 ? 120 : 160;
        TagCloud('#tech-sphere', texts, {
            radius: radius,
            maxSpeed: 'normal',
            initSpeed: 'normal',
            direction: 135,
            keep: true
        });
        document.querySelector('#tech-sphere').style.color = 'var(--neon-blue)';
    }
});

// 3. Custom Cursor
const cursor = document.getElementById('customCursor');
if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderWidth = '1px';
            cursor.style.backgroundColor = 'rgba(255,42,109,0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderWidth = '2px';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// 4. Project Estimator Logic
const projectType = document.getElementById('projectType');
const timeline = document.getElementById('timeline');
const timelineVal = document.getElementById('timelineVal');
const aiFeature = document.getElementById('aiFeature');
const aiCheckIcon = document.getElementById('aiCheckIcon');
const estPrice = document.getElementById('estPrice');
const finalPriceInput = document.getElementById('finalPriceInput');

const timelineLabels = {
    1: 'ASAP (Rush +50%)',
    2: 'Fast (1-2 Weeks +20%)',
    3: 'Normal (2-4 Weeks)',
    4: 'Relaxed (4+ Weeks)'
};
const timelineMultipliers = {
    1: 1.5,
    2: 1.2,
    3: 1.0,
    4: 1.0
};

function calculateEstimate() {
    if(!projectType) return;
    
    let base = parseInt(projectType.value);
    let timeMult = timelineMultipliers[timeline.value];
    let aiCost = aiFeature.checked ? 15000 : 0;
    
    // Custom Checkbox UI
    if(aiFeature.checked) {
        aiCheckIcon.style.opacity = '1';
    } else {
        aiCheckIcon.style.opacity = '0';
    }
    
    timelineVal.textContent = timelineLabels[timeline.value];
    
    // Base values in HTML: 150, 300, 400, 800, 1500
    // We multiply by 10 to get a somewhat realistic INR base price
    let total = Math.round((base * 10) * timeMult) + aiCost;
    
    estPrice.textContent = total.toLocaleString('en-IN');
    finalPriceInput.value = total;
}

if(projectType) {
    projectType.addEventListener('change', calculateEstimate);
    timeline.addEventListener('input', calculateEstimate);
    aiFeature.addEventListener('change', calculateEstimate);
    calculateEstimate(); // initial call
}

// 5. Chatbot Logic
const chatToggle = document.getElementById('chatbotToggle');
const chatWindow = document.getElementById('chatbotWindow');
const chatClose = document.getElementById('chatbotClose');
const chatForm = document.getElementById('chatbotForm');
const chatInput = document.getElementById('chatbotInput');
const chatMessages = document.getElementById('chatbotMessages');

if(chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if(!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });
    
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if(!msg) return;
        
        // Add user msg
        addChatMsg(msg, 'user');
        chatInput.value = '';
        
        // Bot respond
        setTimeout(() => {
            let botMsg = "That sounds interesting! Our payload team can handle it. Please use the estimator form to give us more details!";
            const lowerMsg = msg.toLowerCase();
            
            if(lowerMsg.includes('python') || lowerMsg.includes('ai') || lowerMsg.includes('ml')) {
                botMsg = "Yes! We specialize in Python and AI integrations. We can build intelligent systems for your project.";
            } else if (lowerMsg.includes('cost') || lowerMsg.includes('price')) {
                botMsg = "Prices start as low as ₹1,500 for mini student projects! Check our estimator below.";
            } else if (lowerMsg.includes('portfolio') || lowerMsg.includes('resume')) {
                botMsg = "We make the slickest portfolios on the web. They are guaranteed to impress recruiters.";
            } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                botMsg = "Hello again! Ready for launch?";
            }
            
            addChatMsg(botMsg, 'bot');
        }, 800);
    });
    
    function addChatMsg(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = sender === 'user' ? 'flex gap-2 ml-6 items-end justify-end' : 'flex gap-2 mr-6 items-end';
        
        if (sender === 'user') {
            msgDiv.innerHTML = `
                <div class="bg-brand-purple/20 border border-brand-purple/30 rounded-2xl rounded-br-sm p-3 text-white font-light leading-relaxed">
                    ${text}
                </div>
                <div class="w-6 h-6 rounded-full bg-brand-purple/20 flex-shrink-0 flex items-center justify-center text-brand-purple text-[10px]"><i class="fa-solid fa-user"></i></div>
            `;
        } else {
            msgDiv.innerHTML = `
                <div class="w-6 h-6 rounded-full bg-brand-blue/20 flex-shrink-0 flex items-center justify-center text-brand-blue text-[10px]"><i class="fa-solid fa-robot"></i></div>
                <div class="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm p-3 text-gray-300 font-light leading-relaxed">
                    ${text}
                </div>
            `;
        }
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
