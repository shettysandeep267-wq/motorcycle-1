# Clerk Authentication Setup Guide

This guide explains how to set up Clerk authentication and configure admin roles for the Motorcycle Shop application.

## 1. Environment Variables

Create a `.env` file in the `frontend` directory with the following:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_API_URL=http://localhost:5000/api
```

## 2. Clerk Dashboard Setup

### Step 1: Create Clerk Account
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your **Publishable Key** and add it to your `.env` file

### Step 2: Configure Authentication Methods
1. In Clerk Dashboard, go to **User & Authentication** → **Email, Phone, Username**
2. Enable the authentication methods you want (Email, Phone, etc.)
3. Configure email templates if needed

### Step 3: Set Up Admin Roles

There are two ways to assign admin roles:

#### Method 1: Using Public Metadata (Recommended)

1. Go to Clerk Dashboard → **Users**
2. Select the user you want to make an admin
3. Click on **Metadata** tab
4. Add to **Public Metadata**:
   ```json
   {
     "role": "admin"
   }
   ```
   OR
   ```json
   {
     "isAdmin": true
   }
   ```

#### Method 2: Using Organizations

1. Go to Clerk Dashboard → **Organizations**
2. Create an organization with slug: `admin`
3. Add users to this organization
4. The app will check for organization membership

### Step 4: Configure Redirect URLs

1. Go to **Paths** in Clerk Dashboard
2. Set up your paths:
   - Sign-in path: `/login`
   - Sign-up path: `/signup`
   - After sign-in: `/dashboard`
   - After sign-up: `/dashboard`

## 3. How Admin Role Checking Works

The application checks for admin role in the following order:

1. **Public Metadata**: Checks if `user.publicMetadata.role === 'admin'`
2. **Admin Flag**: Checks if `user.publicMetadata.isAdmin === true`
3. **Organization**: Checks if user is a member of an organization with slug `admin`

## 4. Testing Admin Access

1. Create a test user account
2. Sign in with the test account
3. Try to access `/admin/dashboard`
4. You should see "Access Denied" if the user is not an admin
5. Add admin role to the user in Clerk Dashboard
6. Refresh the page - you should now have access

## 5. Programmatically Assign Admin Role (Backend)

If you want to assign admin roles programmatically, you can use Clerk's Backend API:

```javascript
import { clerkClient } from '@clerk/clerk-sdk-node'

// Update user's public metadata
await clerkClient.users.updateUserMetadata('user_id', {
  publicMetadata: {
    role: 'admin'
  }
})
```

## 6. Components Overview

### ProtectedRoute
- Protects routes that require authentication
- Redirects to sign-in if user is not authenticated

### AdminProtectedRoute
- Protects admin routes
- Requires both authentication AND admin role
- Shows "Access Denied" message for non-admin users

### AdminRoleGuard
- Middleware component for additional protection
- Automatically redirects non-admin users

## 7. Troubleshooting

### Issue: "Access Denied" even after adding admin role
- **Solution**: Clear browser cache and refresh
- Check that the metadata was saved correctly in Clerk Dashboard
- Verify the metadata key is exactly `role` or `isAdmin`

### Issue: ClerkProvider not working
- **Solution**: Check that `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Restart the development server after adding environment variables

### Issue: Redirect loops
- **Solution**: Check that redirect URLs in Clerk Dashboard match your routes
- Verify `afterSignInUrl` and `afterSignUpUrl` in `main.tsx`

## 8. Security Notes

- Never expose your Clerk Secret Key in the frontend
- Always use environment variables for sensitive keys
- Admin role checking happens on the frontend - for production, also verify on the backend
- Consider implementing backend API middleware to verify admin roles



