# 🔐 GitHub OAuth Setup Guide

## 📋 Step-by-Step Instructions

### Step 1: Create GitHub OAuth App

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/developers
   - Or: GitHub → Settings → Developer settings → OAuth Apps

2. **Click "New OAuth App"**

3. **Fill in Application Details:**
   ```
   Application name: CloudSync AI (or your app name)
   Homepage URL: http://localhost:3000
   Application description: AI-Powered Data Sync & Automation Platform
   Authorization callback URL: http://localhost:3000/api/auth/callback/github
   ```

   ⚠️ **IMPORTANT**: The callback URL must be exactly:
   ```
   http://localhost:3000/api/auth/callback/github
   ```

4. **Click "Register application"**

### Step 2: Get Your Credentials

After creating the app, you'll see:

1. **Client ID** - Copy this
2. **Generate a new client secret** - Click the button
3. **Client Secret** - Copy this (you can only see it once!)

### Step 3: Add to `.env.local`

Replace the placeholder values in your `.env.local`:

```bash
GITHUB_CLIENT_ID=Iv1.a1b2c3d4e5f6g7h8
GITHUB_CLIENT_SECRET=1234567890abcdef1234567890abcdef12345678
```

### Step 4: Restart Your Server

```powershell
# Kill all node processes
Get-Process node | Stop-Process -Force

# Restart dev server
pnpm dev
```

---

## 🧪 Testing GitHub OAuth

### Test Steps:

1. **Clear browser cache**
   - DevTools (F12) → Application → Storage → Clear site data

2. **Open incognito window**
   - `Ctrl + Shift + N`

3. **Navigate to login**
   - `http://localhost:3000/login`

4. **Click "Sign in with GitHub"**

5. **Expected Flow:**
   ```
   ✅ Redirects to GitHub authorization page
   ✅ Click "Authorize [Your App Name]"
   ✅ Redirects back to your app
   ✅ Lands on /dashboard
   ✅ User data displayed in header
   ```

6. **Verify in DevTools:**
   - Application → Cookies → `next-auth.session-token` exists
   - Console has no errors

---

## 🔧 For Production Deployment

When deploying to production (e.g., Vercel), you'll need to:

### 1. Create Another OAuth App (or update existing)

In GitHub OAuth settings:

```
Homepage URL: https://yourdomain.com
Authorization callback URL: https://yourdomain.com/api/auth/callback/github
```

### 2. Update Environment Variables

In your hosting platform (Vercel, etc.):

```bash
AUTH_URL=https://yourdomain.com
GITHUB_CLIENT_ID=Iv1.production_client_id
GITHUB_CLIENT_SECRET=production_client_secret
```

---

## 🎨 What Was Added

### 1. ✅ Updated `lib/auth.ts`
Added GitHubProvider:
```typescript
GitHubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
})
```

### 2. ✅ Updated User Model
Added `githubId` field:
```typescript
githubId?: string // In interface
githubId: { type: String, unique: true, sparse: true } // In schema
provider: enum: ["credentials", "google", "github"] // Updated enum
```

### 3. ✅ Updated SignIn Callback
Now handles both Google and GitHub:
```typescript
if (account?.provider === "google" || account?.provider === "github") {
  // Handle OAuth sign-in
}
```

### 4. ✅ Created GitHub Sign-In Button
Component: `components/github-signin-button.tsx`
- Black GitHub-styled button
- Uses GitHub icon from lucide-react

### 5. ✅ Updated Login & Signup Pages
Both pages now show:
- Google sign-in button
- GitHub sign-in button

---

## 🎯 Features

Your app now supports **3 authentication methods**:

1. ✅ **Email/Password** (credentials)
2. ✅ **Google OAuth**
3. ✅ **GitHub OAuth**

All three methods:
- Create user in MongoDB
- Set session cookie
- Log activity
- Redirect to dashboard
- Work with the same AuthContext

---

## 🔍 Database Structure

When a user signs up with GitHub, the user document looks like:

```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  provider: "github",
  githubId: "12345678", // GitHub user ID
  image: "https://avatars.githubusercontent.com/u/12345678",
  emailVerified: ISODate("2025-01-15T10:00:00.000Z"),
  createdAt: ISODate("2025-01-15T10:00:00.000Z")
}
```

---

## 🐛 Troubleshooting

### Issue: "The redirect_uri MUST match the registered callback URL"

**Solution:**
- Check GitHub OAuth App settings
- Callback URL must be: `http://localhost:3000/api/auth/callback/github`
- No trailing slash, correct port

### Issue: "Application suspended"

**Solution:**
- Your GitHub app might be suspended
- Check email from GitHub
- Or create a new OAuth app

### Issue: Button doesn't do anything

**Solution:**
1. Check console for errors
2. Verify `GITHUB_CLIENT_ID` is set in `.env.local`
3. Restart server after adding credentials
4. Clear browser cache

### Issue: "User email is null"

**Solution:**
- GitHub might not provide email if user's email is private
- In GitHub OAuth App settings, request `user:email` scope
- Or in `lib/auth.ts`, add:
  ```typescript
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    authorization: {
      params: {
        scope: 'read:user user:email'
      }
    }
  })
  ```

---

## 📊 Comparison: Google vs GitHub OAuth

| Feature | Google | GitHub |
|---------|--------|--------|
| Button Color | White with colors | Black |
| Icon | Google SVG | GitHub logo |
| Email Required | Yes | Sometimes private |
| Setup Complexity | Medium | Easy |
| User Base | Largest | Developer-focused |

---

## ✅ Next Steps

1. **Get GitHub OAuth credentials** from https://github.com/settings/developers
2. **Add to `.env.local`**
3. **Restart server**: `pnpm dev`
4. **Test sign-in**: Click "Sign in with GitHub"
5. **Verify**: Check dashboard loads with GitHub profile

---

## 🎉 You're Done!

Your CloudSyncAI app now supports:
- ✅ Email/Password authentication
- ✅ Google OAuth (working)
- ✅ GitHub OAuth (ready to test)

All authentication methods work seamlessly together! 🚀

---

**Need Help?** 
- Check the callback URL matches exactly
- Ensure credentials are correct in `.env.local`
- Clear browser cache before testing
- Check console for specific error messages
