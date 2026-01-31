// Login Page Functions

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!email || !phone || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Simulate login (replace with actual API call)
    console.log('Login attempt:', { email, phone, remember });
    alert('Login functionality coming soon! \n\nEmail: ' + email + '\nPhone: ' + phone);
    
    // In a real application, you would:
    // 1. Send credentials to backend
    // 2. Validate response
    // 3. Store auth token
    // 4. Redirect to dashboard
}

function goHome() {
    window.location.href = 'index.html';
}

function handleSignUp() {
    window.location.href = 'signup.html';
}

function handleForgotPassword() {
    alert('Password reset functionality coming soon!');
    // window.location.href = 'forgot-password.html';
}

function handleGoogleLogin() {
    alert('Google Sign-In coming soon!');
    // Integrate Google OAuth here
}

// Optional: Add ripple effect to buttons
document.querySelectorAll('.login-btn, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('login-btn') && this.closest('form')) {
            return; // Skip ripple for form submission button
        }
        
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

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';
