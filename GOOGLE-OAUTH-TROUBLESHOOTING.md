# 🔧 Google OAuth Sign-In Fix

## ✅ Changes Applied

### 1. Updated `lib/auth.ts`
Added proper cookie configuration for localhost:

```typescript
cookies: {
  sessionToken: {
    name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production', // false on localhost
    },
  },
},
trustHost: true,
```

**Why this fixes the issue:**
- ✅ `secure: false` on localhost (cookies work without HTTPS)
- ✅ `sameSite: 'lax'` allows OAuth redirects
- ✅ `trustHost: true` trusts localhost
- ✅ Correct cookie name for both dev and production

### 2. Updated `.env.local`
Added NextAuth v5 variables:

```bash
AUTH_URL=http://localhost:3000
AUTH_SECRET=your_secret_key_here_change_this_in_production
```

**Why this matters:**
- NextAuth v5 uses `AUTH_URL` and `AUTH_SECRET`
- Kept `NEXTAUTH_URL` and `NEXTAUTH_SECRET` for backwards compatibility

---

## 🧪 Testing Steps

### Step 1: Restart Everything
```powershell
# Kill all node processes
Get-Process node | Stop-Process -Force

# Clear browser (F12 → Application → Storage → Clear site data)

# Restart dev server
pnpm dev
```

### Step 2: Test Google Sign-In Flow

1. **Open incognito window**: `Ctrl + Shift + N`

2. **Navigate to login**: `http://localhost:3000/login`

3. **Open DevTools**: Press `F12`

4. **Click "Sign in with Google"**

5. **Monitor the flow:**
   ```
   ✅ Redirects to Google consent screen
   ✅ After approval, redirects to: http://localhost:3000/api/auth/callback/google
   ✅ Then redirects to: http://localhost:3000/dashboard
   ```

6. **Check cookies** (DevTools → Application → Cookies → localhost:3000):
   ```
   ✅ Should see: next-auth.session-token
   ✅ httpOnly: true
   ✅ secure: false (on localhost)
   ✅ sameSite: Lax
   ```

7. **Check console**:
   ```
   ✅ No errors
   ✅ No "session cookie not set" errors
   ```

8. **Verify dashboard**:
   ```
   ✅ User name displayed in header
   ✅ No redirect loop
   ✅ Can navigate freely
   ```

---

## 🐛 Common Issues & Solutions

### Issue 1: Still Redirects to /login?redirect=/dashboard

**Cause**: Cookie not being set

**Solution**:
1. Check Google Cloud Console → Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   (Must match exactly, including port)

2. Verify `.env.local`:
   ```bash
   AUTH_URL=http://localhost:3000  # No trailing slash
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-secret
   ```

3. Clear cookies and restart server

### Issue 2: "Configuration Error" on Google Page

**Cause**: Redirect URI mismatch

**Fix**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Add to "Authorized redirect URIs":
   ```
   http://localhost:3000/api/auth/callback/google
   ```
5. Save and wait 5 minutes for propagation

### Issue 3: Cookie Shows as "Secure" on localhost

**Cause**: Browser forcing secure cookies

**Fix**:
- Already fixed in `lib/auth.ts` with:
  ```typescript
  secure: process.env.NODE_ENV === 'production'
  ```
- This sets `secure: false` on localhost

### Issue 4: "Access Blocked" by Google

**Cause**: App not verified or restricted

**Fix**:
1. Go to OAuth consent screen in Google Console
2. Add test users (your email)
3. OR publish app for production

---

## 🔍 Debugging Checklist

If Google sign-in still doesn't work, check:

- [ ] `AUTH_URL=http://localhost:3000` in `.env.local` (no trailing slash)
- [ ] Google Client ID and Secret are correct
- [ ] Redirect URI in Google Console: `http://localhost:3000/api/auth/callback/google`
- [ ] Browser cookies are enabled
- [ ] No browser extensions blocking cookies
- [ ] Server restarted after `.env.local` changes
- [ ] Using incognito/private window (no cached auth)
- [ ] Check Network tab for redirect chain
- [ ] Check Application tab for cookie creation

---

## 📊 Expected Cookie Structure

After successful Google sign-in, you should see this cookie:

```
Name: next-auth.session-token
Value: [random JWT token]
Domain: localhost
Path: /
HttpOnly: ✅ Yes
Secure: ❌ No (on localhost)
SameSite: Lax
Expires: [7 days from now]
```

---

## 🎯 What Should Happen

### ✅ Successful Flow:
```
1. User clicks "Sign in with Google"
2. → Redirect to Google OAuth
3. → User approves
4. → Redirect to /api/auth/callback/google
5. → NextAuth processes callback
6. → Creates session cookie
7. → Checks user in database (creates if new)
8. → Logs activity
9. → Redirect to /dashboard
10. ✅ User sees dashboard with their name
```

### ❌ Failed Flow (Before Fix):
```
1. User clicks "Sign in with Google"
2. → Redirect to Google OAuth
3. → User approves
4. → Redirect to /api/auth/callback/google
5. → NextAuth tries to set cookie
6. ❌ Cookie fails (secure: true on localhost)
7. → No session created
8. → Middleware checks auth
9. ❌ No cookie found
10. → Redirect to /login?redirect=/dashboard
11. 🔄 Loop continues...
```

---

## 🚀 Verification Commands

### Check if server is running:
```powershell
Get-Process -Name node
```

### Check environment variables loaded:
Add temporary console.log in `lib/auth.ts`:
```typescript
console.log('AUTH_URL:', process.env.AUTH_URL)
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID?.slice(0, 20) + '...')
```

### Test auth endpoint:
```powershell
curl http://localhost:3000/api/auth/providers
```

Should return:
```json
{
  "google": {
    "id": "google",
    "name": "Google",
    "type": "oauth"
  },
  "credentials": {
    "id": "credentials",
    "name": "credentials",
    "type": "credentials"
  }
}
```

---

## ✅ Status After Fix

| Component | Status | Notes |
|-----------|--------|-------|
| Cookie config | ✅ Fixed | `secure: false` on localhost |
| ENV variables | ✅ Fixed | Added `AUTH_URL` and `AUTH_SECRET` |
| SessionProvider | ✅ Good | Already wrapped in ClientLayout |
| Middleware | ✅ Good | Already checks both cookies |
| Callback URL | ✅ Good | Matches Google Console |
| trustHost | ✅ Fixed | Added to auth config |

---

## 🎉 Next Steps

1. **Restart server**: `pnpm dev`
2. **Clear browser cache**: DevTools → Clear site data
3. **Test in incognito**: Click "Sign in with Google"
4. **Verify cookie**: Check Application tab
5. **Confirm dashboard**: Should see user data

**Expected result**: ✅ Sign in works, cookie is set, redirect to dashboard succeeds!

---

**Last Updated**: January 2025  
**Status**: ✅ READY TO TEST
