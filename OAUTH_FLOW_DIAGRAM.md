# OAuth Authentication Flow Diagrams

## ✅ Expected OAuth Flow (How It Should Work)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  User clicks "Sign in with Google"                                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth redirects to Google OAuth                                     │
│  URL: https://accounts.google.com/o/oauth2/v2/auth?...                 │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  User approves permissions on Google consent page                       │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Google redirects back with authorization code                          │
│  URL: https://cloud-sync-ai.vercel.app/api/auth/callback/google?...    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth validates OAuth state parameter                               │
│  - Checks CSRF token                                                    │
│  - Verifies state matches                                               │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │ ✅ Valid
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth exchanges code for access token                               │
│  - POST to Google token endpoint                                        │
│  - Receives access_token and id_token                                   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth signIn callback executes                                      │
│  - Creates/updates user in MongoDB                                      │
│  - Returns TRUE for successful authentication ✅                        │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth jwt callback executes                                         │
│  - Creates JWT token with user ID                                       │
│  - token.sub = user._id                                                 │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth session callback executes                                     │
│  - Fetches user data from MongoDB                                       │
│  - Creates session object                                               │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth sets session cookie                                           │
│  Cookie: __Secure-next-auth.session-token=[JWT]                         │
│  - HttpOnly, Secure, SameSite=Lax                                       │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Browser redirects to /dashboard with authenticated session             │
│  Headers: Set-Cookie: __Secure-next-auth.session-token=...             │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ User authenticated and sees dashboard                               │
│  All API calls include session cookie                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ❌ Current Broken Flow (What's Actually Happening)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  User clicks "Sign in with Google"                                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth redirects to Google OAuth  ✅                                 │
│  URL: https://accounts.google.com/o/oauth2/v2/auth?...                 │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  User approves permissions on Google consent page  ✅                   │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Google redirects back with authorization code  ✅                      │
│  URL: https://cloud-sync-ai.vercel.app/api/auth/callback/google?...    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth validates OAuth state parameter  ✅                           │
│  - Checks CSRF token → Valid                                            │
│  - Verifies state matches → Valid                                       │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  NextAuth exchanges code for access token  ✅                           │
│  - POST to Google token endpoint → Success                              │
│  - Receives access_token and id_token → Valid                           │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  🚨 CRITICAL BUG HERE 🚨                                                │
│  NextAuth signIn callback executes                                      │
│  - Creates/updates user in MongoDB  ✅                                  │
│  - Returns "/auth/callback" STRING ❌ (SHOULD BE TRUE)                  │
│                                                                          │
│  Code in lib/auth.ts:                                                   │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ async signIn({ user, account, profile }) {                     │    │
│  │   if (account?.provider === "google") {                        │    │
│  │     // ... database operations ...                             │    │
│  │   }                                                             │    │
│  │   return "/auth/callback" // ❌ WRONG! Should be: return true  │    │
│  │ }                                                               │    │
│  └────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ❌ NextAuth interprets non-boolean return as FAILED AUTHENTICATION     │
│  - signIn callback MUST return boolean (true/false)                     │
│  - Any other value = authentication failure                             │
│  - NextAuth aborts session creation                                     │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ❌ NextAuth SKIPS jwt callback (because auth "failed")                 │
│  - No JWT token created                                                 │
│  - No user ID stored                                                    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ❌ NextAuth SKIPS session callback (because auth "failed")             │
│  - No session object created                                            │
│  - No user data loaded                                                  │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ❌ NextAuth DOES NOT SET session cookie (no session exists)            │
│  - Cookie __Secure-next-auth.session-token is NEVER CREATED             │
│  - Browser receives NO Set-Cookie header                                │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Browser redirects to /auth/callback (custom callback page)             │
│  - NO session cookie                                                    │
│  - NO authentication state                                              │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Custom callback page: app/auth/callback/page.tsx                       │
│  - Calls useSession() hook                                              │
│  - Waits for NextAuth session...                                        │
│                                                                          │
│  Code:                                                                   │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ const { data: session, status } = useSession()                 │    │
│  │                                                                 │    │
│  │ if (status === "authenticated" && session?.user) {             │    │
│  │   // This NEVER executes because session doesn't exist         │    │
│  │   await fetch("/api/auth/set-oauth-cookie")                    │    │
│  │ }                                                               │    │
│  └────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ❌ useSession() returns status="unauthenticated"                       │
│  - No session found (because it was never created)                      │
│  - Custom callback page shows error                                     │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Custom callback page redirects to /login after 2 seconds               │
│  - Shows error: "OAuth authentication failed"                           │
│  - User sent back to login page                                         │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ❌ Authentication FAILED - User NOT logged in                          │
│  - No cookies set                                                       │
│  - No session exists                                                    │
│  - User must try again                                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 The Fix (Updated Flow)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  User clicks "Sign in with Google"                                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
           [... OAuth flow same as above ...]
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ FIX APPLIED HERE                                                    │
│  NextAuth signIn callback executes                                      │
│  - Creates/updates user in MongoDB  ✅                                  │
│  - Returns TRUE boolean  ✅ (FIXED!)                                    │
│                                                                          │
│  Updated code in lib/auth.ts:                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ async signIn({ user, account, profile }) {                     │    │
│  │   if (account?.provider === "google") {                        │    │
│  │     try {                                                       │    │
│  │       // ... database operations ...                           │    │
│  │       return true  // ✅ FIXED! Boolean return                 │    │
│  │     } catch (error) {                                          │    │
│  │       console.error(error)                                     │    │
│  │       return false // Fail auth on error                       │    │
│  │     }                                                           │    │
│  │   }                                                             │    │
│  │   return true // For credentials provider                      │    │
│  │ }                                                               │    │
│  └────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ NextAuth recognizes successful authentication                       │
│  - signIn returned true                                                 │
│  - Proceeds with session creation                                       │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ NextAuth jwt callback executes                                      │
│  - Creates JWT token: token.sub = user._id                              │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ NextAuth session callback executes                                  │
│  - Creates session object with user data                                │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ NextAuth attempts to set session cookie                             │
│  Cookie: __Secure-next-auth.session-token=[JWT]                         │
│                                                                          │
│  ⚠️ NOTE: May still have Edge Runtime cookie issue on Vercel           │
│  But now custom callback has a session to work with!                    │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Browser redirects to /dashboard (if cookie works)                      │
│  OR /auth/callback (if using custom callback page config)               │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  IF redirected to /auth/callback:                                       │
│  ✅ useSession() NOW FINDS the session                                  │
│  - status="authenticated"                                               │
│  - session.user contains user data                                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ Custom callback page calls /api/auth/set-oauth-cookie               │
│  - Endpoint can now access session via await auth()                     │
│  - Generates JWT token                                                  │
│  - Sets auth-token cookie manually                                      │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ Redirect to /dashboard with BOTH cookies:                           │
│  - __Secure-next-auth.session-token (NextAuth)                          │
│  - auth-token (Custom JWT)                                              │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  ✅ User authenticated and sees dashboard                               │
│  All API calls work with either cookie                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Cookie State Comparison

### Email/Password Login (Working) ✅
```
Cookies after login:
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: auth-token                                       │
│ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...               │
│ Domain: cloud-sync-ai.vercel.app                              │
│ Path: /                                                        │
│ Expires: 7 days                                                │
│ HttpOnly: true                                                 │
│ Secure: true                                                   │
│ SameSite: Lax                                                  │
│ Status: ✅ SET SUCCESSFULLY                                   │
└───────────────────────────────────────────────────────────────┘
```

### OAuth Login (Current Broken State) ❌
```
Cookies after "login":
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: next-auth.csrf-token                             │
│ Value: some-csrf-token                                         │
│ Status: ✅ Present (but not useful for auth)                  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: next-auth.callback-url                           │
│ Value: https://cloud-sync-ai.vercel.app/dashboard             │
│ Status: ✅ Present (but not useful for auth)                  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: __Secure-next-auth.session-token                 │
│ Value: [MISSING]                                               │
│ Status: ❌ NEVER SET - This is the authentication cookie!     │
│ Reason: signIn callback returned string instead of boolean    │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: auth-token                                        │
│ Value: [MISSING]                                               │
│ Status: ❌ NEVER SET - Custom JWT fallback also fails         │
│ Reason: set-oauth-cookie endpoint can't find session          │
└───────────────────────────────────────────────────────────────┘

Result: NO AUTHENTICATION COOKIES = USER NOT LOGGED IN ❌
```

### OAuth Login (After Fix) ✅
```
Cookies after login:
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: __Secure-next-auth.session-token                 │
│ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...               │
│ Domain: cloud-sync-ai.vercel.app                              │
│ Path: /                                                        │
│ Expires: 7 days                                                │
│ HttpOnly: true                                                 │
│ Secure: true                                                   │
│ SameSite: Lax                                                  │
│ Status: ✅ SET SUCCESSFULLY                                   │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│ Cookie Name: auth-token                                        │
│ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...               │
│ Domain: cloud-sync-ai.vercel.app                              │
│ Path: /                                                        │
│ Expires: 7 days                                                │
│ HttpOnly: true                                                 │
│ Secure: true                                                   │
│ SameSite: Lax                                                  │
│ Status: ✅ SET SUCCESSFULLY (via custom endpoint)             │
└───────────────────────────────────────────────────────────────┘

Result: BOTH AUTHENTICATION COOKIES SET = USER LOGGED IN ✅
```

---

## 🎯 Key Takeaways

1. **Single Line of Code**: One incorrect return value breaks entire OAuth flow
2. **Boolean vs String**: `return "/auth/callback"` vs `return true` - critical difference
3. **Cascading Failure**: Failed signIn → No jwt → No session → No cookie → 401 error
4. **Silent Failure**: No error messages, just missing cookies
5. **The Fix**: Change ONE return statement from string to boolean

**Time to fix**: 2 minutes to change code, 30 minutes to test and deploy
