// Update frontend signup to send data to backend
const API_URL = 'http://localhost:5000/api/auth';

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }

    // Real-time password validation
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
});

function validatePassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (password.length < 8) {
        document.getElementById('password').style.borderColor = '#ff6b6b';
    } else {
        document.getElementById('password').style.borderColor = '#f0f0f0';
    }

    // Match check if confirm password has value
    if (confirmPassword.value && password !== confirmPassword.value) {
        confirmPassword.style.borderColor = '#ff6b6b';
    } else if (confirmPassword.value) {
        confirmPassword.style.borderColor = '#f0f0f0';
    }
}

async function handleSignUp(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (firstName.length < 2) {
        alert('First name must be at least 2 characters');
        return;
    }

    if (lastName.length < 2) {
        alert('Last name must be at least 2 characters');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number (at least 10 digits)');
        return;
    }

    // Password validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (!terms) {
        alert('Please agree to the Terms & Conditions');
        return;
    }

    // Send signup request to backend
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Signup failed: ' + (data.error || 'Unknown error'));
            return;
        }

        alert(`Welcome to Gift Groove, ${firstName}! \n\nYour account has been created successfully. \n\nYou will now be redirected to login.`);

        // Redirect to login after short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);

    } catch (error) {
        console.error('Signup error:', error);
        alert('Error creating account. Make sure the backend server is running on port 5000');
    }
}

function goHome() {
    window.location.href = 'index.html';
}

function handleGoogleSignUp() {
    alert('Google Sign-Up coming soon!');
}

// Optional: Add ripple effect to buttons
document.querySelectorAll('.signup-btn, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.classList.contains('signup-btn') && this.closest('form')) {
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
