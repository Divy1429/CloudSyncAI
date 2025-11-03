# 🚀 Vercel Deployment Guide for CloudSync AI

## ✅ Pre-Deployment Checklist

### 1. **Generate Production Secrets**

You need to change these secrets before deployment:

```bash
# Generate secure secrets using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this command **3 times** to generate:
- `JWT_SECRET`
- `AUTH_SECRET`
- `NEXTAUTH_SECRET`

### 2. **Update OAuth Redirect URIs**

#### **Google OAuth** (Google Cloud Console)
1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Add Authorized redirect URIs:
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
4. Add Authorized JavaScript origins:
   ```
   https://your-domain.vercel.app
   ```

#### **GitHub OAuth** (GitHub Developer Settings)
1. Go to: https://github.com/settings/developers
2. Select your OAuth App
3. Update **Homepage URL**:
   ```
   https://your-domain.vercel.app
   ```
4. Update **Authorization callback URL**:
   ```
   https://your-domain.vercel.app/api/auth/callback/github
   ```

### 3. **Razorpay Setup** (If using payment)
1. Get production credentials from: https://dashboard.razorpay.com/
2. Add your deployed domain to Razorpay's webhook settings

### 4. **MongoDB Atlas Network Access**
1. Go to: https://cloud.mongodb.com/
2. Navigate to: Network Access
3. Add IP: `0.0.0.0/0` (Allow from anywhere - Vercel uses dynamic IPs)
   - Or use specific Vercel IP ranges if preferred

---

## 📦 Step-by-Step Deployment

### **Option 1: Deploy via Vercel Dashboard (Recommended)**

#### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/cloudsyncai.git
git branch -M main
git push -u origin main
```

#### Step 2: Import to Vercel
1. Go to: https://vercel.com/new
2. Click **Import Project**
3. Select your GitHub repository: `cloudsyncai`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `.next` (auto-detected)

#### Step 3: Add Environment Variables
In Vercel dashboard, add these environment variables:

**Database:**
```
MONGODB_URI=mongodb+srv://divy:divy2510@cluster0.tdemlww.mongodb.net/cloudsyncai
```

**Authentication Secrets** (Generate new ones!):
```
JWT_SECRET=<GENERATE_NEW_SECRET>
AUTH_SECRET=<GENERATE_NEW_SECRET>
NEXTAUTH_SECRET=<GENERATE_NEW_SECRET>
```

**URLs** (Replace with your Vercel domain):
```
AUTH_URL=https://your-project.vercel.app
NEXTAUTH_URL=https://your-project.vercel.app
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

**Google OAuth:**
```
GOOGLE_CLIENT_ID=81529124035-1kfg7ff7jk498c0bfgfqf3jnl2orr4br.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

**GitHub OAuth:**
```
GITHUB_CLIENT_ID=Ov23liuqoqq4b9f5vTK
GITHUB_CLIENT_SECRET=6e74b23cf2be3cb794955134460d3aeb05bde899
```

**Razorpay** (Update with production keys):
```
RAZORPAY_KEY_ID=your_production_key_id
RAZORPAY_KEY_SECRET=your_production_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_production_key_id
```

#### Step 4: Deploy
1. Click **Deploy**
2. Wait for build to complete (2-5 minutes)
3. Get your deployment URL: `https://your-project.vercel.app`

---

### **Option 2: Deploy via Vercel CLI**

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy
```bash
# Navigate to your project
cd d:\Desktop\cloudsyncai

# Deploy to production
vercel --prod
```

#### Step 4: Add Environment Variables via CLI
```bash
# Add each environment variable
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add AUTH_SECRET production
# ... (add all variables)
```

---

## 🔧 Required Code Changes Before Deployment

### 1. **Create `.env.example` file**
Create this file to document required environment variables (don't include actual values):

```bash
# MongoDB Connection
MONGODB_URI=

# JWT Secret Token
JWT_SECRET=

# NextAuth Configuration
AUTH_URL=
NEXTAUTH_URL=
AUTH_SECRET=
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Application URL
NEXT_PUBLIC_APP_URL=
```

### 2. **Update `.gitignore`**
Ensure these are in your `.gitignore`:
```
.env
.env.local
.env*.local
.vercel
```

### 3. **Add `vercel.json` (Optional - for custom configuration)**
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### 4. **Check Image Paths**
Make sure all images in `public/images/` are committed to git:
```bash
git add public/images/
git commit -m "Add images for deployment"
```

---

## 🔒 Security Checklist

- [ ] ✅ Generate NEW production secrets (don't reuse local ones)
- [ ] ✅ Update OAuth redirect URIs to production domain
- [ ] ✅ Add `.env.local` to `.gitignore`
- [ ] ✅ Never commit secrets to GitHub
- [ ] ✅ Use environment variables in Vercel dashboard
- [ ] ✅ Enable MongoDB Atlas IP whitelist (0.0.0.0/0 for Vercel)
- [ ] ✅ Use Razorpay **production** keys (not test keys)
- [ ] ✅ Add custom domain (optional but recommended)

---

## 🐛 Common Deployment Issues & Fixes

### Issue 1: "Module not found" errors
**Fix:** Make sure all dependencies are in `dependencies`, not `devDependencies`
```bash
pnpm install
```

### Issue 2: OAuth redirect errors
**Fix:** Update OAuth redirect URIs in Google/GitHub to match your Vercel domain

### Issue 3: MongoDB connection timeout
**Fix:** Add `0.0.0.0/0` to MongoDB Atlas Network Access

### Issue 4: Environment variables not working
**Fix:** Make sure they're added in Vercel dashboard and redeploy:
```bash
vercel --prod --force
```

### Issue 5: Build fails
**Fix:** Check build logs in Vercel dashboard, usually missing env vars or dependencies

---

## 📊 Post-Deployment Steps

### 1. **Test Authentication**
- ✅ Test email/password login
- ✅ Test Google OAuth
- ✅ Test GitHub OAuth

### 2. **Test Dashboard**
- ✅ Create workflow
- ✅ Add integration
- ✅ Check responsive design on mobile

### 3. **Test Payment (if enabled)**
- ✅ Test Razorpay checkout
- ✅ Verify payment webhook

### 4. **Add Custom Domain** (Optional)
1. Go to: Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `cloudsync.ai`)
3. Update DNS records as instructed
4. Update OAuth redirect URIs to use custom domain

### 5. **Enable Analytics**
Your project already has `@vercel/analytics` installed, it will work automatically!

---

## 🔄 Continuous Deployment

After initial deployment, Vercel automatically:
- ✅ Deploys on every `git push` to main branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs builds and shows status checks

To trigger a new deployment:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

---

## 📝 Environment Variables Summary

**Total Required:** 14 environment variables

| Variable | Type | Update for Production? |
|----------|------|------------------------|
| `MONGODB_URI` | Database | ❌ Keep same |
| `JWT_SECRET` | Secret | ✅ **Generate new** |
| `AUTH_SECRET` | Secret | ✅ **Generate new** |
| `NEXTAUTH_SECRET` | Secret | ✅ **Generate new** |
| `AUTH_URL` | URL | ✅ Change to Vercel URL |
| `NEXTAUTH_URL` | URL | ✅ Change to Vercel URL |
| `NEXT_PUBLIC_APP_URL` | URL | ✅ Change to Vercel URL |
| `GOOGLE_CLIENT_ID` | OAuth | ❌ Keep same (update redirect) |
| `GOOGLE_CLIENT_SECRET` | OAuth | ❌ Keep same |
| `GITHUB_CLIENT_ID` | OAuth | ❌ Keep same (update redirect) |
| `GITHUB_CLIENT_SECRET` | OAuth | ❌ Keep same |
| `RAZORPAY_KEY_ID` | Payment | ✅ Use production key |
| `RAZORPAY_KEY_SECRET` | Payment | ✅ Use production key |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Payment | ✅ Use production key |

---

## 🎉 Your Deployment URL

After deployment, your site will be live at:
```
https://cloudsyncai.vercel.app
```

Or with custom domain:
```
https://your-domain.com
```

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/
- **NextAuth.js**: https://next-auth.js.org/deployment

Good luck with your deployment! 🚀
