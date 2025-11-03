# 🚀 Quick Deployment Steps

## Step 1: Generate New Secrets
Run this command 3 times to generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save these for:
- JWT_SECRET
- AUTH_SECRET  
- NEXTAUTH_SECRET

## Step 2: Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

## Step 3: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add all environment variables (see DEPLOYMENT-GUIDE.md)
4. Click Deploy

## Step 4: Update OAuth URLs
After deployment, get your Vercel URL and update:

**Google OAuth:** https://console.cloud.google.com/apis/credentials
- Add redirect: `https://YOUR-URL.vercel.app/api/auth/callback/google`

**GitHub OAuth:** https://github.com/settings/developers
- Update callback: `https://YOUR-URL.vercel.app/api/auth/callback/github`

## Step 5: Test Your Site!
Visit: `https://YOUR-URL.vercel.app`

✅ Test login/signup
✅ Test Google/GitHub OAuth
✅ Test dashboard features
✅ Check mobile responsiveness

Done! 🎉
