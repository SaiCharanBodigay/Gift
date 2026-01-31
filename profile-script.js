// Profile page script

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Populate profile information
    document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileInitial').textContent = user.firstName.charAt(0).toUpperCase();
    
    document.getElementById('firstName').textContent = user.firstName;
    document.getElementById('lastName').textContent = user.lastName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone').textContent = user.phone;
    
    if (user.createdAt) {
        const date = new Date(user.createdAt);
        document.getElementById('createdAt').textContent = date.toLocaleDateString();
    }
});

function goHome() {
    window.location.href = 'index.html';
}

function handleOrders() {
    alert('Orders page coming soon!');
}

function handleWishlist() {
    alert('Wishlist feature coming soon!');
}

function handleSettings() {
    alert('Settings page coming soon!');
}

function handleLogout() {
    if (confirm('Are you sure you want to sign out?')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberEmail');
        alert('You have been signed out successfully');
        window.location.href = 'index.html';
    }
}
