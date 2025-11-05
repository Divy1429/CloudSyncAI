# Deep Research: NextAuth OAuth Authentication Failure

## 🔍 Executive Summary

**Problem**: NextAuth OAuth login (Google/GitHub) returns 401 unauthorized errors on Vercel production, while email/password authentication works perfectly.

**Root Cause**: Multiple critical issues in NextAuth v5 Beta configuration, OAuth callback flow, and Vercel deployment environment.

**Impact**: Complete OAuth authentication failure - users cannot sign in with Google or GitHub.

---

## 📊 Environment Analysis

### Current Configuration
- **Next.js**: 14.2.25 (App Router)
- **NextAuth**: 5.0.0-beta.30 (BETA VERSION - Critical)
- **Node.js Runtime**: Vercel Edge Runtime (default)
- **Deployment**: Vercel Production
- **OAuth Providers**: Google, GitHub
- **Alternative Auth**: Custom JWT for email/password (✅ Working)

### Environment Variables (Local vs Production)
```bash
# LOCAL (.env.local) - ❌ INCORRECT URLS
AUTH_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

# PRODUCTION (Vercel) - ✅ SHOULD BE
AUTH_URL=https://cloud-sync-ai.vercel.app
NEXTAUTH_URL=https://cloud-sync-ai.vercel.app
```

---

## 🚨 Critical Issues Identified

### Issue #1: NextAuth v5 Beta Instability ⚠️
**Severity**: CRITICAL

**Evidence**:
```json
"next-auth": "5.0.0-beta.30"
```

**Problems**:
1. **Beta Software in Production**: NextAuth v5 is still in beta with known breaking changes
2. **Cookie API Changes**: Vercel Edge Runtime has compatibility issues with v5 cookie handling
3. **Session Token Not Set**: `__Secure-next-auth.session-token` cookie never appears
4. **Documentation Gaps**: v5 has incomplete documentation and community support

**Impact**:
- Session cookies fail to set on Vercel Edge Runtime
- OAuth callback fails to establish authenticated session
- No error messages in client logs (silent failure)

**Recommendation**: 
- Consider downgrading to NextAuth v4 (stable) OR
- Use NextAuth v5 RC (release candidate) instead of beta OR
- Implement workaround with manual JWT token management (current approach)

---

### Issue #2: Incorrect OAuth Callback Flow
**Severity**: HIGH

**Current Flow** (lib/auth.ts):
```typescript
callbacks: {
  async signIn({ user, account, profile }) {
    // ... database operations ...
    return "/auth/callback" // ❌ WRONG - This is a string, not a boolean
  }
}
```

**Problem**: The `signIn` callback should return `true/false`, NOT a redirect path. NextAuth v5 interprets any non-boolean as `false`, causing authentication to fail.

**Evidence from Code**:
```typescript
// lib/auth.ts line 88-92
async signIn({ user, account, profile }) {
  // ... OAuth user creation logic ...
  return true // Should be here for OAuth
}

return "/auth/callback" // This is OUTSIDE the OAuth condition! ❌
```

**What's Happening**:
1. Google/GitHub OAuth completes successfully
2. `signIn` callback runs, creates/updates user in database
3. Callback returns `"/auth/callback"` string instead of `true`
4. NextAuth interprets this as failed authentication
5. Session cookie never gets set
6. User redirected but with no session
7. `/auth/callback` page calls `set-oauth-cookie` endpoint
8. Endpoint tries to get session via `await auth()`
9. No session exists because signIn returned invalid value
10. 401 Unauthorized error

**Fix Required**:
```typescript
async signIn({ user, account, profile }) {
  if (account?.provider === "google" || account?.provider === "github") {
    // ... database operations ...
    return true // ✅ CORRECT - OAuth succeeded
  }
  return true // ✅ For credentials provider
}
```

---

### Issue #3: Cookie Configuration Conflicts
**Severity**: HIGH

**Current Configuration** (lib/auth.ts):
```typescript
cookies: {
  sessionToken: {
    name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'none', // ⚠️ Requires 'secure: true'
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? 'cloud-sync-ai.vercel.app' : undefined,
    },
  },
}
```

**Problems**:

1. **SameSite='none' Requirement**:
   - `sameSite: 'none'` REQUIRES `secure: true` in ALL environments
   - Current config only sets `secure: true` in production
   - This can cause cookie rejection during OAuth callback

2. **Domain Configuration**:
   - Hardcoded domain: `'cloud-sync-ai.vercel.app'`
   - May conflict with OAuth redirect URLs from Google/GitHub
   - Could prevent cookie from being set on subdomains or alternate URLs

3. **Cookie Prefix**:
   - `__Secure-` prefix requires HTTPS and `secure: true`
   - Vercel Edge Runtime may not recognize this correctly

**Better Configuration**:
```typescript
cookies: {
  sessionToken: {
    name: `next-auth.session-token`, // Remove __Secure prefix
    options: {
      httpOnly: true,
      sameSite: 'lax', // Changed from 'none' for better compatibility
      path: '/',
      secure: true, // Always true for production
      // Remove explicit domain to use default (better for OAuth)
    },
  },
}
```

---

### Issue #4: Dual Authentication System Complexity
**Severity**: MEDIUM

**Current Implementation**:
- Custom JWT tokens for email/password (`auth-token` cookie)
- NextAuth session tokens for OAuth (`__Secure-next-auth.session-token`)
- Two separate authentication checking mechanisms
- AuthContext tries to bridge both systems

**Problems**:
1. **Race Conditions**: AuthContext checks JWT first, then NextAuth session
2. **Cookie Management**: Two different cookie-setting mechanisms
3. **Middleware Confusion**: Checks both token types, unclear precedence
4. **Debugging Difficulty**: Hard to determine which auth system is failing

**Evidence**:
```typescript
// middleware.ts
const jwtToken = request.cookies.get("auth-token")?.value
const nextAuthToken = request.cookies.get("next-auth.session-token")?.value || 
                     request.cookies.get("__Secure-next-auth.session-token")?.value
const isAuthenticated = !!(jwtToken || nextAuthToken)
```

**Risk**:
- OAuth users may get stuck in limbo if NextAuth session exists but JWT cookie doesn't set
- Custom callback page `/auth/callback` depends on BOTH systems working

---

### Issue #5: Environment Variable Mismatch
**Severity**: HIGH

**Local Environment** (.env.local):
```bash
AUTH_URL=http://localhost:3000          # ❌ Wrong for production
NEXTAUTH_URL=http://localhost:3000      # ❌ Wrong for production
```

**Production Requirements** (Vercel):
```bash
AUTH_URL=https://cloud-sync-ai.vercel.app
NEXTAUTH_URL=https://cloud-sync-ai.vercel.app
```

**What's Happening**:
1. OAuth providers (Google/GitHub) redirect to production URL
2. NextAuth uses `NEXTAUTH_URL` to validate callbacks
3. If `NEXTAUTH_URL=localhost` in Vercel, validation fails
4. NextAuth rejects the OAuth callback as invalid
5. Session never gets created

**Evidence from Conversation**:
> User confirmed: "NEXTAUTH_URL and AUTH_URL are already set to production URL in Vercel"

**Critical**: This means the URLs ARE correct in production, so this is NOT the root cause, but highlights configuration complexity.

---

### Issue #6: Custom Callback Page Race Condition
**Severity**: MEDIUM

**Current Implementation** (app/auth/callback/page.tsx):
```typescript
useEffect(() => {
  async function handleCallback() {
    if (status === "loading") return
    
    if (status === "authenticated" && session?.user) {
      const response = await fetch("/api/auth/set-oauth-cookie", {
        method: "POST",
        credentials: "include",
      })
      // ...
    }
  }
  handleCallback()
}, [session, status, router])
```

**Problems**:

1. **Dependency on NextAuth Session**:
   - Page waits for `useSession()` to return authenticated status
   - If NextAuth session doesn't exist (Issue #2), page never proceeds
   - Results in stuck loading state

2. **No Timeout**:
   - If NextAuth session never loads, user stuck forever on callback page
   - No error handling for prolonged loading

3. **Client-Side Only**:
   - All OAuth completion happens on client
   - Server-side could validate OAuth state more reliably

---

### Issue #7: Missing Error Logging
**Severity**: LOW (but critical for debugging)

**Current State**:
- OAuth callback page shows generic loading message
- No detailed error logs when session fails
- AuthContext logs to console but may not show in production
- Vercel function logs not being checked

**Evidence**:
```typescript
// app/auth/callback/page.tsx
console.error("OAuth callback error:", error) // Only generic error
```

**Missing**:
- Detailed NextAuth debug logs
- OAuth state validation logs
- Cookie setting verification logs
- Redirect URL validation logs

---

## 🔬 Technical Deep Dive

### NextAuth v5 Beta Cookie Handling on Vercel

**How NextAuth Sets Cookies** (Normal Flow):
1. OAuth provider redirects to `/api/auth/callback/[provider]`
2. NextAuth validates OAuth state and code
3. `signIn` callback runs, creates/updates user
4. `jwt` callback runs, creates JWT token
5. `session` callback runs, creates session object
6. NextAuth sets `session-token` cookie via `response.cookies.set()`
7. User redirected to `callbackUrl` with authenticated session

**What's Failing on Vercel**:
- Step 6: `response.cookies.set()` doesn't work in Edge Runtime
- Cookie API incompatibility between NextAuth v5 beta and Vercel Edge
- Cookie gets created in NextAuth's internal state but not sent to browser
- Browser never receives `Set-Cookie` header

**Why Email/Password Works**:
- Custom JWT implementation uses manual `Set-Cookie` header
- Bypasses NextAuth cookie API entirely
- Direct HTTP header manipulation works in Edge Runtime

**Workaround Attempted**:
```typescript
// app/api/auth/set-oauth-cookie/route.ts
const cookieString = [
  `auth-token=${token}`,
  'HttpOnly',
  'Path=/',
  `Max-Age=${maxAge}`,
  'SameSite=Lax',
  isProduction ? 'Secure' : ''
].filter(Boolean).join('; ')

response.headers.set('Set-Cookie', cookieString) // ✅ Manual header works
```

---

### OAuth Callback Flow Analysis

**Expected Flow**:
```
1. User clicks "Sign in with Google"
2. Redirect to Google OAuth consent page
3. User approves permissions
4. Google redirects to: https://cloud-sync-ai.vercel.app/api/auth/callback/google?code=...&state=...
5. NextAuth validates state and exchanges code for tokens
6. NextAuth signIn callback runs
7. NextAuth creates session and sets cookie
8. Redirect to callbackUrl (/dashboard)
9. User authenticated ✅
```

**Actual Flow (Current Broken State)**:
```
1. User clicks "Sign in with Google" ✅
2. Redirect to Google OAuth consent page ✅
3. User approves permissions ✅
4. Google redirects to: https://cloud-sync-ai.vercel.app/api/auth/callback/google?code=...&state=... ✅
5. NextAuth validates state and exchanges code for tokens ✅
6. NextAuth signIn callback runs ✅
7. signIn callback returns "/auth/callback" string instead of true ❌
8. NextAuth interprets as failed authentication ❌
9. Session NOT created ❌
10. Cookie NOT set ❌
11. Redirect to /auth/callback with NO session ❌
12. Custom page calls /api/auth/set-oauth-cookie ❌
13. Endpoint tries to get session via await auth() ❌
14. No session exists → 401 Unauthorized ❌
15. User sees error message ❌
```

---

## 💡 Root Cause Summary

**Primary Root Causes** (in order of severity):

1. **Invalid signIn Callback Return Value** (CRITICAL)
   - Returning string `"/auth/callback"` instead of boolean `true`
   - Causes NextAuth to treat OAuth login as failed
   - Session never gets created

2. **NextAuth v5 Beta Cookie API Bug** (HIGH)
   - Vercel Edge Runtime incompatibility
   - Cookie setting mechanism doesn't work properly
   - Even if session exists, cookie doesn't reach browser

3. **Cookie Configuration Issues** (HIGH)
   - `sameSite: 'none'` requires `secure: true` always
   - Explicit domain may conflict with OAuth redirects
   - Cookie prefix `__Secure-` may cause Edge Runtime issues

4. **Custom Callback Page Dependency** (MEDIUM)
   - Depends on NextAuth session existing (which it doesn't)
   - No fallback mechanism when session fails
   - Creates infinite wait state

---

## ✅ Recommended Solutions

### Solution 1: Fix signIn Callback (IMMEDIATE - CRITICAL)

**File**: `lib/auth.ts`

**Change**:
```typescript
async signIn({ user, account, profile }) {
  if (account?.provider === "google" || account?.provider === "github") {
    try {
      await dbConnect()
      
      const existingUser = await User.findOne({ email: user.email })
      
      if (existingUser) {
        // Update existing user
        if (account.provider === "google" && !existingUser.googleId) {
          existingUser.googleId = account.providerAccountId
          existingUser.provider = "google"
          existingUser.image = user.image
          existingUser.emailVerified = new Date()
          await existingUser.save()
        } else if (account.provider === "github" && !existingUser.githubId) {
          existingUser.githubId = account.providerAccountId
          existingUser.provider = "github"
          existingUser.image = user.image
          existingUser.emailVerified = new Date()
          await existingUser.save()
        }
      } else {
        // Create new user
        const newUserData = {
          name: user.name,
          email: user.email,
          provider: account.provider,
          image: user.image,
          emailVerified: new Date(),
        }
        
        if (account.provider === "google") {
          newUserData.googleId = account.providerAccountId
        } else if (account.provider === "github") {
          newUserData.githubId = account.providerAccountId
        }
        
        await User.create(newUserData)
      }
      
      // ✅ CRITICAL FIX: Return true for OAuth success
      return true
      
    } catch (error) {
      console.error(`Error in ${account.provider} sign-in:`, error)
      return false // Fail authentication on database error
    }
  }
  
  // ✅ Return true for credentials provider
  return true
}
```

**Why This Fixes It**:
- NextAuth properly recognizes OAuth authentication as successful
- Session gets created
- Cookie setting mechanism activates
- Custom callback page receives valid session

---

### Solution 2: Fix Cookie Configuration

**File**: `lib/auth.ts`

**Change**:
```typescript
cookies: {
  sessionToken: {
    name: process.env.NODE_ENV === 'production' 
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token',
    options: {
      httpOnly: true,
      sameSite: 'lax', // Changed from 'none'
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      // Remove explicit domain - let browser handle it
    },
  },
},
```

**Why This Fixes It**:
- `sameSite: 'lax'` works better with OAuth callbacks
- No explicit domain = cookie works on all subdomains
- Maintains security while improving compatibility

---

### Solution 3: Add OAuth Debug Logging

**File**: `lib/auth.ts`

**Add to signIn callback**:
```typescript
async signIn({ user, account, profile }) {
  console.log('[NextAuth signIn] Called with:', {
    provider: account?.provider,
    userId: user?.id,
    email: user?.email
  })
  
  if (account?.provider === "google" || account?.provider === "github") {
    try {
      console.log(`[NextAuth signIn] Processing ${account.provider} OAuth`)
      // ... existing code ...
      console.log(`[NextAuth signIn] ✅ ${account.provider} OAuth succeeded`)
      return true
    } catch (error) {
      console.error(`[NextAuth signIn] ❌ ${account.provider} OAuth failed:`, error)
      return false
    }
  }
  
  console.log('[NextAuth signIn] ✅ Credentials auth succeeded')
  return true
}
```

---

### Solution 4: Improve Custom Callback Page

**File**: `app/auth/callback/page.tsx`

**Add timeout and better error handling**:
```typescript
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function OAuthCallbackPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      if (status === "loading" || status === "unauthenticated") {
        console.error('[OAuth Callback] Timeout - no session after 10s')
        setError("Authentication timeout - please try again")
        setTimeout(() => router.push("/login"), 2000)
      }
    }, 10000)

    async function handleCallback() {
      if (status === "loading") {
        console.log('[OAuth Callback] Waiting for session...')
        return
      }

      if (status === "unauthenticated") {
        console.error('[OAuth Callback] No session found')
        setError("OAuth authentication failed - no session")
        setTimeout(() => router.push("/login"), 2000)
        return
      }

      if (status === "authenticated" && session?.user) {
        console.log('[OAuth Callback] Session found:', session.user.email)
        
        try {
          const response = await fetch("/api/auth/set-oauth-cookie", {
            method: "POST",
            credentials: "include",
          })

          console.log('[OAuth Callback] set-oauth-cookie response:', response.status)

          if (response.ok) {
            console.log('[OAuth Callback] ✅ JWT cookie set, redirecting to dashboard')
            router.push("/dashboard")
          } else {
            const errorData = await response.json()
            console.error('[OAuth Callback] ❌ Failed to set cookie:', errorData)
            setError(`Authentication error: ${errorData.error || 'Unknown error'}`)
            setTimeout(() => router.push("/login"), 2000)
          }
        } catch (error) {
          console.error("[OAuth Callback] ❌ Network error:", error)
          setError("Network error - please check your connection")
          setTimeout(() => router.push("/login"), 2000)
        }
      }
    }

    handleCallback()

    return () => clearTimeout(timeout)
  }, [session, status, router, attempts])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-destructive text-xl mb-4">❌ {error}</div>
            <div className="text-muted-foreground">Redirecting to login...</div>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-xl mb-2">🔐 Completing authentication...</div>
            <div className="text-muted-foreground text-sm">Status: {status}</div>
            <div className="text-muted-foreground text-sm">
              {session ? `User: ${session.user?.email}` : 'Waiting for session...'}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
```

---

### Solution 5: Alternative - Direct OAuth Callback (RECOMMENDED)

**Instead of custom callback page, handle OAuth completion server-side**

**File**: `lib/auth.ts`

**Remove custom callback page logic**:
```typescript
callbacks: {
  async signIn({ user, account, profile }) {
    if (account?.provider === "google" || account?.provider === "github") {
      // ... database operations ...
      return true // ✅ Just return true
    }
    return true
  },
  
  // Add this new callback
  async redirect({ url, baseUrl }) {
    console.log('[NextAuth redirect] URL:', url, 'Base:', baseUrl)
    
    // Always redirect to dashboard after OAuth
    if (url.includes('callback')) {
      return `${baseUrl}/dashboard`
    }
    
    // Allow relative URLs
    if (url.startsWith('/')) {
      return `${baseUrl}${url}`
    }
    
    // Allow same-origin URLs
    if (new URL(url).origin === baseUrl) {
      return url
    }
    
    return baseUrl
  }
}
```

**Remove pages configuration**:
```typescript
pages: {
  signIn: "/login",
  error: "/login",
  // ❌ Remove this: newUser: "/auth/callback",
},
```

**Why This is Better**:
- No dependency on custom callback page
- NextAuth handles full OAuth flow
- Session created before any redirect
- Simpler, more reliable

---

## 🧪 Testing Checklist

After implementing fixes, test in this order:

### Local Testing
- [ ] `pnpm dev` runs without errors
- [ ] Email/password login still works
- [ ] Google OAuth redirects to Google consent page
- [ ] After Google consent, redirects back to app
- [ ] Check browser DevTools → Application → Cookies
  - [ ] `auth-token` cookie present (for email/password)
  - [ ] `next-auth.session-token` or `__Secure-next-auth.session-token` present (for OAuth)
- [ ] Dashboard loads without 401 errors
- [ ] Check browser Console for log messages

### Production Testing (Vercel)
- [ ] Update environment variables in Vercel:
  - [ ] `AUTH_URL=https://cloud-sync-ai.vercel.app`
  - [ ] `NEXTAUTH_URL=https://cloud-sync-ai.vercel.app`
  - [ ] `AUTH_SECRET` (new value)
  - [ ] `NEXTAUTH_SECRET` (new value)
  - [ ] `GOOGLE_CLIENT_ID` (confirm correct)
  - [ ] `GOOGLE_CLIENT_SECRET` (confirm correct)
  - [ ] `GITHUB_CLIENT_ID` (confirm correct)
  - [ ] `GITHUB_CLIENT_SECRET` (confirm correct)
- [ ] Wait for Vercel redeployment (2-3 minutes)
- [ ] Test Google OAuth login
- [ ] Test GitHub OAuth login
- [ ] Check Vercel Function Logs for errors
- [ ] Check browser Console for client-side errors

---

## 📚 Additional Resources

### NextAuth v5 Documentation
- [NextAuth v5 Upgrade Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [NextAuth v5 Cookie Configuration](https://authjs.dev/reference/core#cookies)
- [NextAuth v5 Callbacks](https://authjs.dev/reference/core/types#callbacks)

### Known Issues
- [NextAuth v5 Beta Cookie Issues on Vercel](https://github.com/nextauthjs/next-auth/issues/9870)
- [Edge Runtime Cookie Compatibility](https://github.com/vercel/next.js/discussions/48083)

### OAuth Provider Setup
- [Google OAuth Setup](https://console.cloud.google.com/apis/credentials)
- [GitHub OAuth Setup](https://github.com/settings/developers)

---

## 🎯 Conclusion

The NextAuth OAuth failure is caused by **multiple compounding issues**, with the CRITICAL bug being:

### **The `signIn` callback returns `"/auth/callback"` string instead of boolean `true`**

This single line of code causes:
1. NextAuth to treat OAuth as failed authentication
2. Session never gets created
3. Cookie never gets set
4. Custom callback page receives no session
5. JWT cookie endpoint fails with 401
6. User stuck in authentication limbo

### Immediate Action Required:

1. **FIX signIn callback return value** (5 minutes)
2. **Test locally** (10 minutes)
3. **Deploy to Vercel** (5 minutes)
4. **Test in production** (10 minutes)

Total time to fix: **30 minutes**

### Long-term Recommendations:

1. **Consider NextAuth v4 stable** - More reliable in production
2. **Simplify authentication** - Single system (OAuth only or JWT only)
3. **Add comprehensive logging** - Debug issues faster
4. **Monitor Vercel function logs** - Catch production errors

---

**Generated**: November 5, 2025  
**Author**: GitHub Copilot Deep Research  
**Status**: Critical Bug Analysis Complete
