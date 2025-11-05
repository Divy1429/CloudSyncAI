# CloudSyncAI - Project Summary

## 📋 Overview
**CloudSyncAI** is a modern SaaS platform for AI-powered workflow automation and multi-cloud data synchronization. Built with Next.js 14, TypeScript, and MongoDB, it offers secure authentication, payment integration, and real-time collaboration features.

## 🎯 Key Features
- ✅ **Multiple Authentication Methods**: Email/Password, Google OAuth, GitHub OAuth
- ✅ **Payment Integration**: Razorpay with subscription management (₹1 test plan)
- ✅ **Real-time Dashboard**: Activity logs, integrations, workflows, profile management
- ✅ **Modern UI**: Framer Motion animations, Radix UI components, dark mode support
- ✅ **Responsive Design**: Mobile-first approach with adaptive layouts

## 🛠️ Tech Stack
- **Frontend**: Next.js 14.2.25, React 18, TypeScript 5, TailwindCSS 4.1
- **Backend**: MongoDB (Mongoose), NextAuth v5, JWT authentication
- **Payments**: Razorpay integration
- **UI**: Radix UI, Framer Motion, GSAP, Three.js, Lucide Icons
- **Deployment**: Vercel-ready

## 📁 Project Structure
```
cloudsyncai/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints (auth, payment, user, workflows)
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/            # Login page
│   └── signup/           # Signup page
├── components/            # React components (30+ UI components)
├── contexts/             # AuthContext for global state
├── lib/                  # Utilities (db, jwt, auth-helper)
├── models/               # Mongoose models (User, Subscription, Integration, etc.)
└── hooks/                # Custom React hooks
```

## 🔐 Authentication System
- **Email/Password**: JWT tokens with bcryptjs hashing
- **OAuth**: Google & GitHub via NextAuth v5
- **Session Management**: Dual cookie system (NextAuth + JWT)
- **Protected Routes**: Middleware-based authentication

## 💳 Payment System
- **Provider**: Razorpay
- **Plans**: Starter (₹1), Professional (₹199), Enterprise (Custom)
- **Features**: Order creation, payment verification, subscription tracking
- **UI**: Success dialog, current plan badges, disabled buttons for active plans

## 🗄️ Database Models
- **User**: Authentication, profile, subscription info
- **Subscription**: Plan details, payment tracking
- **ActivityLog**: User action tracking
- **Integration**: Third-party service connections
- **Workflow**: Automation workflows
- **Contact**: Contact form submissions

## 🚀 Quick Start
```bash
# Install dependencies
pnpm install

# Configure environment (.env.local)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=...
GITHUB_CLIENT_ID=...
RAZORPAY_KEY_ID=...

# Run development server
pnpm dev
```

## 📊 Current Status
- ✅ OAuth authentication working (Google + GitHub)
- ✅ Payment integration functional
- ✅ Subscription tracking implemented
- ✅ Dashboard with activity logs
- ✅ Profile management with password change
- ✅ Responsive header with logout button
- ✅ Payment success dialog with plan display
- ✅ Production-ready environment configuration

## 🌐 Deployment
- **Platform**: Vercel
- **URL**: https://cloud-sync-ai.vercel.app
- **Status**: Production-ready with all environment variables configured

## 📝 Recent Updates
1. Fixed OAuth 401 authentication issues
2. Implemented payment success dialog (removed alerts)
3. Added subscription tracking to User model
4. Added "Current Plan" badges in pricing section
5. Added visible logout button in desktop header
6. Changed post-login redirect to home page

## 👨‍💻 Developer
- **GitHub**: [@Divy1429](https://github.com/Divy1429)
- **Repository**: [CloudSyncAI](https://github.com/Divy1429/CloudSyncAI)

---

**Built with Next.js 14 | TypeScript | MongoDB | TailwindCSS**
