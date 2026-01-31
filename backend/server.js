const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Database Tables (Postgres)
async function initializeDatabase() {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                firstName TEXT NOT NULL,
                lastName TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT NOT NULL,
                password TEXT NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Postgres users table ready');
    } catch (err) {
        console.error('Error creating users table:', err);
    }
}

initializeDatabase();

// Routes

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Gift Groove Backend API',
        status: 'Running',
        endpoints: {
            health: '/api/health',
            signup: 'POST /api/auth/signup',
            login: 'POST /api/auth/login',
            profile: 'GET /api/auth/profile'
        }
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server running', timestamp: new Date() });
});

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

                const hashedPassword = await bcrypt.hash(password, 10);

                try {
                    const result = await db.query(
                        `INSERT INTO users (firstName, lastName, email, phone, password)
                         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
                        [firstName, lastName, email, phone, hashedPassword]
                    );

                    res.status(201).json({
                        message: 'Account created successfully',
                        userId: result.rows[0].id
                    });
                } catch (err) {
                    if (err.code === '23505') { // unique_violation
                        return res.status(400).json({ error: 'Email already registered' });
                    }
                    console.error('Signup error:', err);
                    return res.status(500).json({ error: 'Error creating account' });
                }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, phone, password } = req.body;

        // Validation
        if (!email || !password || !phone) {
            return res.status(400).json({ error: 'Email, phone, and password are required' });
        }

                const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
                const user = result.rows[0];

                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                if (user.phone !== phone) {
                    return res.status(401).json({ error: 'Invalid phone number' });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email, firstName: user.firstname || user.firstName },
                    JWT_SECRET,
                    { expiresIn: '7d' }
                );

                res.json({
                    message: 'Login successful',
                    token: token,
                    user: {
                        id: user.id,
                        firstName: user.firstname || user.firstName,
                        lastName: user.lastname || user.lastName,
                        email: user.email,
                        phone: user.phone
                    }
                });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Get user profile (requires token)
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT id, firstName, lastName, email, phone, createdAt FROM users WHERE id = $1`,
            [req.user.id]
        );

        const user = result.rows[0];
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin: Get all users (for development only - should be protected in production)
app.get('/api/admin/users', async (req, res) => {
    try {
        const result = await db.query(`SELECT id, firstName, lastName, email, phone, createdAt FROM users`);
        res.json({ total: result.rowCount, users: result.rows });
    } catch (err) {
        console.error('Admin users error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Gift Groove backend running on http://localhost:${PORT}`);
});
