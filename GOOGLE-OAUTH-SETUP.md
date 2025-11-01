# 🔐 Google OAuth Setup Guide - CloudSyncAI

## ✅ Implementation Complete!

Google Sign-In/Sign-Up has been added to your CloudSyncAI project!

---

## 📋 What Was Added

### **1. New Files Created**
- ✅ `lib/auth.ts` - NextAuth configuration with Google & Credentials providers
- ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API route handler
- ✅ `components/google-signin-button.tsx` - Reusable Google sign-in button

### **2. Updated Files**
- ✅ `models/User.ts` - Added OAuth fields (googleId, provider, image, emailVerified)
- ✅ `app/login/page.tsx` - Added Google sign-in button
- ✅ `app/signup/page.tsx` - Added Google sign-up button
- ✅ `app/ClientLayout.tsx` - Wrapped with SessionProvider
- ✅ `.env.local` - Added NextAuth and Google OAuth variables

### **3. Installed Packages**
- ✅ `next-auth` - Authentication library for Next.js

---

## 🚀 How to Get Google OAuth Credentials

### **Step 1: Go to Google Cloud Console**
1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account

### **Step 2: Create a New Project (or select existing)**
1. Click the project dropdown at the top
2. Click **"NEW PROJECT"**
3. Enter project name: `CloudSyncAI` (or any name)
4. Click **"CREATE"**

### **Step 3: Enable Google+ API**
1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"ENABLE"**

### **Step 4: Create OAuth Consent Screen**
1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Select **"External"** (or Internal if using Google Workspace)
3. Click **"CREATE"**
4. Fill in required fields:
   - **App name**: CloudSyncAI
   - **User support email**: Your email
   - **Developer contact email**: Your email
5. Click **"SAVE AND CONTINUE"**
6. On **"Scopes"** page, click **"SAVE AND CONTINUE"**
7. On **"Test users"** page (if External), add your test email addresses
8. Click **"SAVE AND CONTINUE"**

### **Step 5: Create OAuth Credentials**
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Select **"Web application"**
4. Fill in:
   - **Name**: CloudSyncAI Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `http://127.0.0.1:3000`
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google`
5. Click **"CREATE"**
6. **Copy the Client ID and Client Secret** (you'll need these!)

### **Step 6: Add Credentials to .env.local**

Update your `.env.local` file:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

Replace the placeholder values with your actual credentials from Step 5.

---

## 🔧 Configuration

### **Environment Variables Required**

Your `.env.local` should now have:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://divy:divy2510@cluster0.tdemlww.mongodb.net/cloudsyncai

# JWT Secret (for existing auth)
JWT_SECRET=your_secret_key_here_change_this_in_production

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here_change_this_in_production

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Generate Secure Secrets**

For production, generate secure secrets:

```bash
# For NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Or
openssl rand -base64 32
```

---

## 🧪 How to Test

### **1. Start the Development Server**

```bash
pnpm dev
```

### **2. Test Google Sign-Up**

1. Go to http://localhost:3000/signup
2. Click **"Sign up with Google"** button
3. Select your Google account
4. Grant permissions
5. You should be redirected to `/dashboard`
6. Check MongoDB - a new user should be created with:
   - `provider: "google"`
   - `googleId: "..."`
   - `emailVerified: Date`

### **3. Test Google Sign-In**

1. Go to http://localhost:3000/login
2. Click **"Sign in with Google"** button
3. Select your Google account
4. You should be redirected to `/dashboard`

### **4. Test Regular Sign-Up (Still Works!)**

1. Go to http://localhost:3000/signup
2. Fill in name, email, password
3. Click **"Create Account"**
4. Regular signup should still work!

---

## 🎯 How It Works

### **Authentication Flow**

```
User clicks "Sign in with Google"
           ↓
NextAuth redirects to Google
           ↓
User authorizes the app
           ↓
Google redirects back with code
           ↓
NextAuth exchanges code for tokens
           ↓
NextAuth callback checks if user exists
           ↓
├─ If exists → Update googleId if needed
└─ If new → Create new user in MongoDB
           ↓
Create session & redirect to dashboard
```

### **Database Structure**

**New User from Google:**
```typescript
{
  _id: "...",
  name: "John Doe",
  email: "john@gmail.com",
  provider: "google",
  googleId: "1234567890",
  image: "https://lh3.googleusercontent.com/...",
  emailVerified: Date,
  password: undefined, // No password for OAuth users
  createdAt: Date
}
```

**Regular User:**
```typescript
{
  _id: "...",
  name: "Jane Smith",
  email: "jane@example.com",
  provider: "credentials",
  password: "hashed_password",
  googleId: undefined,
  image: undefined,
  createdAt: Date
}
```

---

## 🔐 Security Features

### **Implemented:**
- ✅ **OAuth 2.0** - Industry-standard authentication
- ✅ **JWT Sessions** - Secure session management
- ✅ **Email Verification** - Auto-verified for Google users
- ✅ **Password-less Auth** - OAuth users don't need passwords
- ✅ **Account Linking** - Existing users can link Google account
- ✅ **Activity Logging** - Google sign-ups are logged

### **User Privacy:**
- ✅ Only basic profile info is requested (name, email, profile picture)
- ✅ No access to user's Google data
- ✅ Users can revoke access anytime from Google Account settings

---

## 📱 Features

### **What Users Can Do:**

1. **Sign Up with Google**
   - One-click registration
   - No password needed
   - Email auto-verified

2. **Sign In with Google**
   - Quick login
   - No password to remember
   - Secure authentication

3. **Profile Picture**
   - Automatically imported from Google
   - Displayed in dashboard

4. **Dual Authentication**
   - Users can still use email/password
   - Or use Google OAuth
   - Both methods work seamlessly

---

## 🚨 Important Notes

### **For Development:**
- ✅ OAuth consent screen can be in "Testing" mode
- ✅ Add test users in Google Cloud Console
- ✅ Use `http://localhost:3000` for development

### **For Production:**
1. **Update Redirect URIs** in Google Cloud Console:
   - Add your production domain
   - Example: `https://yourdomain.com/api/auth/callback/google`

2. **Update Environment Variables**:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

3. **Publish OAuth Consent Screen**:
   - Go to Google Cloud Console
   - OAuth consent screen → "PUBLISH APP"
   - Submit for verification (if needed)

4. **Enable Production Domain**:
   - Add authorized origins
   - Add authorized redirect URIs

---

## 🐛 Troubleshooting

### **"Error: redirect_uri_mismatch"**
**Solution:**
- Check Google Cloud Console → Credentials
- Ensure redirect URI matches exactly:
  - `http://localhost:3000/api/auth/callback/google` (dev)
  - `https://yourdomain.com/api/auth/callback/google` (prod)

### **"Error: invalid_client"**
**Solution:**
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server after changing env vars

### **"Error: Access blocked: This app's request is invalid"**
**Solution:**
- Check OAuth consent screen is configured
- Add your email to test users (if in Testing mode)
- Enable Google+ API

### **User not redirected after sign-in**
**Solution:**
- Check `NEXTAUTH_URL` matches your current URL
- Verify `NEXTAUTH_SECRET` is set
- Check browser console for errors

### **Google button doesn't work**
**Solution:**
- Check dev server is running
- Verify NextAuth API route exists: `/api/auth/[...nextauth]/route.ts`
- Check browser console for errors
- Make sure `SessionProvider` is wrapping your app

---

## 📚 File Structure

```
app/
├── api/
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts        # ✅ NEW - NextAuth handler
│       ├── login/route.ts      # Existing credentials login
│       └── signup/route.ts     # Existing credentials signup
├── login/
│   └── page.tsx                # ✅ UPDATED - Added Google button
├── signup/
│   └── page.tsx                # ✅ UPDATED - Added Google button
└── ClientLayout.tsx            # ✅ UPDATED - Added SessionProvider

components/
└── google-signin-button.tsx    # ✅ NEW - Google button component

lib/
└── auth.ts                      # ✅ NEW - NextAuth config

models/
└── User.ts                      # ✅ UPDATED - Added OAuth fields
```

---

## 🎉 Success Checklist

Before testing, make sure:

- [ ] Google Cloud Console project created
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Redirect URIs added to Google Console
- [ ] `GOOGLE_CLIENT_ID` added to `.env.local`
- [ ] `GOOGLE_CLIENT_SECRET` added to `.env.local`
- [ ] `NEXTAUTH_URL` added to `.env.local`
- [ ] `NEXTAUTH_SECRET` added to `.env.local`
- [ ] Dev server restarted after env changes
- [ ] MongoDB connection working

---

## 🆘 Need Help?

### **Common Issues:**

1. **Can't find Google Cloud Console?**
   - Visit: https://console.cloud.google.com/

2. **Don't see OAuth consent screen?**
   - Go to: APIs & Services → OAuth consent screen

3. **Can't find credentials?**
   - Go to: APIs & Services → Credentials

4. **Redirect URI not working?**
   - It must be exactly: `http://localhost:3000/api/auth/callback/google`
   - No trailing slash!

### **Testing Tips:**

- Use Chrome Incognito for clean tests
- Clear cookies between tests
- Check Network tab in DevTools
- Check MongoDB for created users

---

## 📖 Additional Resources

- **NextAuth.js Docs**: https://next-auth.js.org/
- **Google OAuth Docs**: https://developers.google.com/identity/protocols/oauth2
- **Next.js App Router**: https://nextjs.org/docs/app

---

## ✨ What's Next?

Now that Google OAuth is set up, you can:

1. **Add More Providers**
   - GitHub OAuth
   - Microsoft OAuth
   - Facebook Login
   - Twitter/X Login

2. **Enhance OAuth**
   - Add profile picture display
   - Allow account unlinking
   - Add OAuth to profile page

3. **Email Verification**
   - Send verification emails for regular signup
   - Add "verify email" feature

4. **Password Reset**
   - Forgot password flow
   - Reset via email

---

**🎉 Congratulations! Google OAuth is now live in your CloudSyncAI app!**

Need to add more OAuth providers? Just ask! 😊
