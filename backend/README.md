# Gift Groove Backend Setup

## Overview
This backend handles user authentication (signup/login) with SQLite database and JWT tokens.

## Architecture
- **Server**: Node.js + Express
- **Database**: SQLite (file-based, no setup needed)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs (hashed passwords)

## Installation & Setup

### 1. Install Node.js
Download and install from https://nodejs.org/ (LTS version recommended)

### 2. Navigate to backend directory
```bash
cd c:\giftgroove\backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Sign Up
**POST** `/api/auth/signup`

Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword123"
}
```

Response:
```json
{
  "message": "Account created successfully",
  "userId": 1
}
```

### Login
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "securePassword123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

### Get User Profile
**GET** `/api/auth/profile`

Headers:
```
Authorization: Bearer <token>
```

## Frontend Integration

### Updated Script Files
- `signup-script-updated.js` - Connects signup form to backend
- `login-script-updated.js` - Connects login form to backend

### How to Use Updated Scripts

1. Replace the script references in your HTML files:

**signup.html:**
```html
<script src="signup-script-updated.js"></script>
```

**login.html:**
```html
<script src="login-script-updated.js"></script>
```

2. The updated scripts will:
   - Send signup data to backend
   - Store received JWT token in localStorage
   - Verify login credentials against database
   - Handle errors gracefully

## Database Structure

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  password TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Security Features
- ✅ Passwords hashed with bcryptjs
- ✅ JWT token-based authentication
- ✅ Email uniqueness validation
- ✅ CORS enabled for frontend communication
- ✅ Form validation on both frontend & backend

## Troubleshooting

### "Port 5000 already in use"
Change the PORT in `server.js` to a different number (e.g., 5001)

### "Cannot find module 'express'"
Run `npm install` again to ensure all dependencies are installed

### "Frontend shows error about backend"
Make sure backend server is running on port 5000 with `npm start`

### Database file not found
Database (giftgroove.db) is created automatically on first run in the backend folder

## Environment Variables (Optional)
For production, create a `.env` file:
```
PORT=5000
JWT_SECRET=your_secure_secret_key_here
```

## Next Steps
1. Start backend: `npm start`
2. Replace script files in HTML
3. Test signup at signup.html
4. Test login at login.html
5. User data will be stored in SQLite database
