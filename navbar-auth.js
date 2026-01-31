// Dynamic navbar authentication - checks if user is logged in and updates navbar accordingly

function updateNavbarAuth() {
    const navAuth = document.getElementById('navAuth');
    if (!navAuth) return;

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('authToken');

    if (user && token) {
        // User is logged in - show profile and logout
        navAuth.innerHTML = `
            <button class="nav-btn profile-btn" onclick="goToProfile()">
                <span class="profile-icon">👤</span>
                ${user.firstName}
            </button>
            <button class="nav-btn logout-btn" onclick="handleLogoutFromNav()">Sign Out</button>
        `;
    } else {
        // User is not logged in - show login button
        navAuth.innerHTML = `
            <button class="nav-btn login-btn" onclick="goToLogin()">Login</button>
        `;
    }
}

function goToProfile() {
    window.location.href = 'profile.html';
}

function goToLogin() {
    window.location.href = 'login.html';
}

function handleLogoutFromNav() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberEmail');
        window.location.href = 'index.html';
    }
}

// Update navbar when page loads
document.addEventListener('DOMContentLoaded', updateNavbarAuth);

// Update navbar when user returns to page (from other pages)
window.addEventListener('focus', updateNavbarAuth);
