// Updated login script to verify with backend
const API_URL = 'http://localhost:5000/api/auth';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Basic validation
    if (!email || !phone || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        // Send login request to backend
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Login failed: ' + (data.error || 'Unknown error'));
            return;
        }

        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (remember) {
            localStorage.setItem('rememberEmail', email);
        }

        alert(`Welcome back, ${data.user.firstName}!`);

        // Redirect to profile page
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        alert('Error logging in. Make sure the backend server is running on port 5000');
    }
}

function goHome() {
    window.location.href = 'index.html';
}

function handleSignUp() {
    window.location.href = 'signup.html';
}

function handleForgotPassword() {
    alert('Password reset functionality coming soon!');
}

function handleGoogleLogin() {
    alert('Google Sign-In coming soon!');
}

// Load remembered email
window.addEventListener('load', () => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});

// Optional: Add ripple effect to buttons
document.querySelectorAll('.login-btn, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('login-btn') && this.closest('form')) {
            return;
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
