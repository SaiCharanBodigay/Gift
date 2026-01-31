// Butterfly Animation - Creating "Gift Groove" text path
document.addEventListener('DOMContentLoaded', function() {
    const textTrail = document.getElementById('textTrail');
    const text = 'Gift Groove....';
    
    // Create letter elements for the text trail
    const createTextTrail = () => {
        textTrail.innerHTML = '';
        text.split('').forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'text-letter';
            letterSpan.textContent = letter === ' ' ? '\u00A0' : letter;
            letterSpan.style.animationDelay = `${1.8 + index * 0.12}s`;
            textTrail.appendChild(letterSpan);
        });
    };
    
    createTextTrail();
    
    // Navigation interaction
    setupNavigation();
});

// Navigation button interactions
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Shop') {
                handleShop();
            } else if (buttonText === 'About') {
                handleAbout();
            } else if (buttonText === 'Contact') {
                handleContact();
            } else if (buttonText === 'Cart') {
                handleCart();
            } else if (buttonText === 'Login') {
                handleLogin();
            }
        });
    });
    
    // Logo click to home
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', function() {
        handleHome();
    });
    
    // CTA button
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', handleShop);
    }
}

function handleHome() {
    console.log('Navigating to Home');
    // Add home page logic here
}

function handleShop() {
    console.log('Redirecting to Login for Shop');
    window.location.href = 'login.html';
}

function handleAbout() {
    console.log('Navigating to About');
    // Add about page logic here
    alert('Learn more about Gift Groove! Coming soon...');
}

function handleContact() {
    console.log('Navigating to Contact');
    // Add contact page logic here
    alert('Contact us at info@giftgroove.com');
}

function handleCart() {
    console.log('Opening Cart');
    // Add cart logic here
    alert('Your cart is empty!');
}

function handleLogin() {
    console.log('Navigating to Login');
    window.location.href = 'login.html';
}

// Optional: Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Optional: Add ripple effect to buttons on click
document.querySelectorAll('.nav-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
