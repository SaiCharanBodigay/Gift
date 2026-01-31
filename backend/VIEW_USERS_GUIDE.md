# How to View Stored User Accounts

## Method 1: Using API Endpoint (Easiest)

After restarting the server, visit this URL in your browser:

```
http://localhost:5000/api/admin/users
```

This will show all registered users in JSON format with:
- User ID
- First Name
- Last Name
- Email
- Phone
- Account Creation Date

**Example Response:**
```json
{
  "total": 2,
  "users": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "createdAt": "2026-01-31 10:30:45"
    },
    {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "phone": "9876543210",
      "createdAt": "2026-01-31 11:15:32"
    }
  ]
}
```

## Method 2: Using SQLite Browser

Download and install **DB Browser for SQLite**:
- Windows: https://sqlitebrowser.org/
- Mac/Linux: https://sqlitebrowser.org/

Then:
1. Open the application
2. Click "Open Database"
3. Navigate to: `C:\giftgroove\backend\giftgroove.db`
4. Select the "users" table in the left panel
5. View all registered users with their details

## Method 3: Command Line Query

Open PowerShell in the backend folder and run:

```powershell
sqlite3 giftgroove.db "SELECT * FROM users;"
```

This will display all users in a table format.

## Method 4: View Passwords (Hashed)

To see the hashed passwords (for debugging):

```powershell
sqlite3 giftgroove.db "SELECT firstName, lastName, email, password FROM users;"
```

**Note:** Passwords are encrypted with bcryptjs and cannot be reversed - even admins can't see the original passwords. To help users who forgot passwords, implement a password reset feature.

## Database Location

The SQLite database file is stored at:
```
C:\giftgroove\backend\giftgroove.db
```

This file is created automatically when the server first runs.

## Important

⚠️ The `/api/admin/users` endpoint is currently **unprotected** and accessible to anyone. 

For production:
1. Add authentication to this endpoint
2. Create a proper admin panel
3. Implement proper access control
4. Never expose sensitive endpoints publicly
