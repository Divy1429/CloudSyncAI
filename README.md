CloudSyncAI Platform :



<div align="center">A modern SaaS application built with Next.js 14, featuring AI-powered workflow automation, multi-cloud connections, real-time data synchronization, and comprehensive team collaboration tools.



**AI-Powered Workflow Automation & Multi-Cloud Data Synchronization Platform**

![React](https://img.shields.io/badge/React-19-blue)

[![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)## 🚀 Features



[Live Demo](https://cloud-sync-ai.vercel.app) • [Quick Summary](PROJECT_SUMMARY.md) • [Report Bug](https://github.com/Divy1429/CloudSyncAI/issues)- **🤖 AI Workflow Builder** - Intelligent automation workflows

- **☁️ Multi-Cloud Connections** - Connect to multiple cloud services

</div>- **⚡ Real-Time Data Sync** - Live data synchronization dashboard

- **📊 Analytics & Reports** - Comprehensive data analytics

---- **🔐 Secure Authentication** - JWT-based user authentication

- **👥 Team Collaboration** - Built-in collaboration tools

## 📑 Table of Contents- **🔔 Smart Alerts** - Intelligent notification system

- **📈 Version History** - Track all changes with timeline

- [About the Project](#-about-the-project)- **🎨 Modern UI** - Beautiful animated components with Framer Motion

- [Features](#-features)- **🌓 Dark Mode** - Theme switching support

- [Tech Stack](#-tech-stack)- **📱 Responsive Design** - Mobile-first approach

- [Getting Started](#-getting-started)

- [Project Structure](#-project-structure)## 🛠️ Tech Stack

- [Authentication System](#-authentication-system)

- [Payment Integration](#-payment-integration)### Frontend

- [Database Schema](#-database-schema)- **Framework:** Next.js 14.2.25 (App Router)

- [API Documentation](#-api-documentation)- **Language:** TypeScript 5.9

- [Deployment](#-deployment)- **Styling:** TailwindCSS 4.1 + Tailwind Animate

- [Troubleshooting](#-troubleshooting)- **UI Components:** Radix UI

- **Animations:** Framer Motion, GSAP

---- **3D Graphics:** Three.js + React Three Fiber

- **Forms:** React Hook Form + Zod validation

## 🚀 About the Project- **Charts:** Recharts

- **Icons:** Lucide React

**CloudSyncAI** is a comprehensive SaaS platform designed to streamline workflow automation and multi-cloud data synchronization. Built with modern web technologies, it provides businesses with powerful tools to manage their data pipelines, automate repetitive tasks, and collaborate in real-time.

### Backend

### Why CloudSyncAI?- **Database:** MongoDB (Mongoose ODM)

- **Authentication:** JWT (jsonwebtoken) + bcryptjs

- 🤖 **AI-Powered Automation**: Leverage artificial intelligence to create intelligent workflows- **API Routes:** Next.js API Routes

- ☁️ **Multi-Cloud Support**: Connect and sync data across multiple cloud platforms

- 🔐 **Enterprise Security**: Bank-level encryption and secure authentication### Development Tools

- 📊 **Real-Time Analytics**: Monitor your data operations with live dashboards- **Package Manager:** pnpm

- 👥 **Team Collaboration**: Built-in tools for seamless team coordination- **Linting:** ESLint

- 🎨 **Modern UI/UX**: Beautiful, intuitive interface with smooth animations- **Type Checking:** TypeScript



---## 📋 Prerequisites



## ✨ FeaturesBefore you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)

### 🔐 Authentication & Security- **pnpm** (v8 or higher)

- **Multiple Login Methods**:- **MongoDB** (Local installation or MongoDB Atlas account)

  - Email/Password authentication with JWT tokens

  - Google OAuth 2.0 integration## 🚀 Getting Started

  - GitHub OAuth integration

- **Secure Password Management**:### 1. Clone the Repository

  - bcryptjs password hashing

  - Change password functionality```bash

  - Secure session managementgit clone https://github.com/Divy1429/CloudSyncAI.git

- **Protected Routes**: Middleware-based route protectioncd CloudSyncAI

- **Activity Logging**: Track all user actions for security audits```



### 💳 Payment & Subscriptions### 2. Install Dependencies

- **Razorpay Integration**:

  - Secure payment processing```bash

  - Multiple subscription plans# Install pnpm globally (if not already installed)

  - Automatic payment verificationnpm install -g pnpm

- **Subscription Management**:

  - Track subscription status (active, cancelled, expired)# Install project dependencies

  - View current plan in pricing sectionpnpm install

  - Automatic subscription renewal```

- **Pricing Plans**:

  - **Starter**: ₹1/month (for testing)### 3. Environment Setup

  - **Professional**: ₹199/month

  - **Enterprise**: Custom pricingCreate a `.env.local` file in the root directory:



### 🎨 User Interface```env

- **Modern Design**:# MongoDB Connection String

  - Framer Motion animations# For MongoDB Atlas (Cloud):

  - GSAP timeline animationsMONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

  - Three.js 3D graphics

  - Particle effects# For Local MongoDB:

- **Responsive Layout**:# MONGODB_URI=mongodb://localhost:27017/lelo-saas

  - Mobile-first design

  - Adaptive components# JWT Secret Token for Authentication

  - Touch-friendly interactionsJWT_SECRET=your-super-secret-jwt-token-here

- **Dark Mode Support**: Seamless theme switching

- **30+ UI Components**: Built with Radix UI primitives# Application URL

NEXT_PUBLIC_APP_URL=http://localhost:3000

### 📊 Dashboard Features```

- **Activity Logs**: Real-time tracking of user actions

- **Integrations**: Manage third-party service connections#### MongoDB Setup Options:

- **Workflows**: Create and manage automation workflows

- **Profile Management**: Update profile information and settings**Option A: MongoDB Atlas (Recommended)**

- **Analytics**: Visual data representation with Recharts1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. Create a new cluster

---3. Create a database user

4. Whitelist your IP address

## 🛠️ Tech Stack5. Get your connection string and update `MONGODB_URI`



### Frontend Technologies**Option B: Local MongoDB**

1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)

| Technology | Version | Purpose |2. Start MongoDB service

|------------|---------|---------|3. Use `MONGODB_URI=mongodb://localhost:27017/lelo-saas`

| **Next.js** | 14.2.25 | React framework with App Router |

| **React** | 18.2.0 | UI library |#### Generate Secure JWT Secret:

| **TypeScript** | 5.0 | Type safety |

| **TailwindCSS** | 4.1.9 | Utility-first CSS framework |```bash

| **Framer Motion** | Latest | Animation library |node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

| **GSAP** | 3.13.0 | Advanced animations |```

| **Three.js** | 0.180.0 | 3D graphics |Copy the output and use it as your `JWT_SECRET`.

| **Radix UI** | Latest | Headless UI components |

| **Lucide React** | 0.454.0 | Icon library |### 4. Run the Development Server

| **React Hook Form** | 7.60.0 | Form management |

| **Zod** | 3.25.67 | Schema validation |```bash

| **Recharts** | 2.15.4 | Data visualization |pnpm dev

```

### Backend Technologies

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

| Technology | Version | Purpose |

|------------|---------|---------|## 📦 Available Scripts

| **MongoDB** | Latest | NoSQL database |

| **Mongoose** | Latest | MongoDB ODM |```bash

| **NextAuth** | 5.0.0-beta.30 | OAuth authentication |# Development server (with hot reload)

| **jsonwebtoken** | 9.0.2 | JWT token generation |pnpm dev

| **bcryptjs** | Latest | Password hashing |

| **Razorpay** | 2.9.6 | Payment processing |# Build for production

pnpm build

---

# Start production server

## 🚀 Getting Startedpnpm start



### Prerequisites# Run linter

pnpm lint

- **Node.js** (v18.0.0 or higher)```

- **pnpm** (v8.0.0 or higher)

- **MongoDB** (Local or Atlas account)## 📁 Project Structure



### Installation```

lelo-saas/

1. **Clone the repository**├── app/                      # Next.js App Router

```bash│   ├── api/                 # API routes

git clone https://github.com/Divy1429/CloudSyncAI.git│   │   ├── auth/           # Authentication endpoints

cd CloudSyncAI│   │   │   ├── login/

```│   │   │   └── signup/

│   │   └── contact/        # Contact form endpoint

2. **Install dependencies**│   ├── login/              # Login page

```bash│   ├── signup/             # Signup page

pnpm install│   ├── contact/            # Contact page

```│   ├── layout.tsx          # Root layout

│   ├── page.tsx            # Home page

3. **Set up environment variables**│   └── globals.css         # Global styles

├── components/              # React components

Create a `.env.local` file:│   ├── ui/                 # Reusable UI components

│   ├── hooks/              # Custom React hooks

```env│   ├── header.tsx

# Database│   ├── footer.tsx

MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>│   ├── hero-section.tsx

│   ├── ai-workflow-builder.tsx

# Authentication│   ├── analytics-reports.tsx

JWT_SECRET=your-super-secret-jwt-token-minimum-64-characters│   ├── multi-cloud-connections.tsx

NEXTAUTH_URL=http://localhost:3000│   └── ...                 # Other feature components

NEXTAUTH_SECRET=your-nextauth-secret-key├── lib/                     # Utility functions

│   ├── db.ts               # MongoDB connection

# Google OAuth (https://console.cloud.google.com/)│   └── utils.ts            # Helper functions

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com├── models/                  # Mongoose models

GOOGLE_CLIENT_SECRET=your-google-client-secret│   ├── User.ts             # User model

│   └── Contact.ts          # Contact model

# GitHub OAuth (https://github.com/settings/developers)├── hooks/                   # Global hooks

GITHUB_CLIENT_ID=your-github-client-id├── styles/                  # Global styles

GITHUB_CLIENT_SECRET=your-github-client-secret├── public/                  # Static assets

├── .env.local              # Environment variables (create this)

# Razorpay (https://dashboard.razorpay.com/)├── next.config.mjs         # Next.js configuration

RAZORPAY_KEY_ID=rzp_test_your_key_id├── tailwind.config.ts      # Tailwind configuration

RAZORPAY_KEY_SECRET=your_razorpay_key_secret├── tsconfig.json           # TypeScript configuration

NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id└── package.json            # Project dependencies

```

# Application

NEXT_PUBLIC_APP_URL=http://localhost:3000## 🔐 Authentication

```

The application includes a complete authentication system:

4. **Run the development server**

```bash- **Sign Up:** `/signup` - Create a new account

pnpm dev- **Login:** `/login` - Sign in to your account

```- **JWT Tokens:** Secure token-based authentication

- **Password Hashing:** bcryptjs for secure password storage

5. **Open your browser**

```## 🎨 UI Components

http://localhost:3000

```The project uses a comprehensive set of UI components from Radix UI:



### Quick Setup Scripts- Accordion, Alert Dialog, Avatar, Badge

- Button, Card, Checkbox, Dialog

**Generate JWT Secret:**- Dropdown Menu, Form, Input, Label

```bash- Select, Slider, Switch, Tabs

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"- Toast, Tooltip, and many more...

```

All styled with TailwindCSS and enhanced with animations.

**Generate NextAuth Secret:**

```bash## 🌐 Key Pages & Features

openssl rand -base64 32

```### Landing Page (`/`)

- Hero section with animated CTA

---- Feature showcase

- Pricing section

## 📁 Project Structure- FAQ section

- Contact form

```

cloudsyncai/### Dashboard Features

├── app/                          # Next.js App Router- AI Workflow Builder

│   ├── api/                      # API endpoints- Analytics & Reports

│   │   ├── activities/           # Activity logs- Real-time Sync Dashboard

│   │   ├── auth/                 # Authentication- Team Collaboration

│   │   ├── payment/              # Payment processing- Version History

│   │   ├── user/                 # User management- Smart Alerts

│   │   └── workflows/            # Workflow management- Custom Integrations

│   ├── dashboard/                # Protected dashboard

│   ├── login/                    # Login page## 🔧 Configuration Files

│   └── signup/                   # Signup page

├── components/                   # React components- **`next.config.mjs`** - Next.js configuration

│   ├── ui/                       # Reusable UI (30+ components)- **`tailwind.config.ts`** - TailwindCSS customization

│   ├── header.tsx                # Navigation header- **`tsconfig.json`** - TypeScript compiler options

│   ├── pricing-section.tsx       # Pricing plans- **`postcss.config.mjs`** - PostCSS configuration

│   └── payment-success-dialog.tsx # Payment success modal- **`components.json`** - Shadcn/UI configuration

├── contexts/                     # React contexts

│   └── AuthContext.tsx           # Authentication state## 📱 Responsive Design

├── lib/                          # Utilities

│   ├── auth.ts                   # NextAuth configThe application is fully responsive and optimized for:

│   ├── auth-helper.ts            # Auth utilities- 📱 Mobile devices (320px+)

│   ├── db.ts                     # MongoDB connection- 📱 Tablets (768px+)

│   └── jwt.ts                    # JWT management- 💻 Desktops (1024px+)

├── models/                       # Mongoose models- 🖥️ Large screens (1440px+)

│   ├── User.ts                   # User schema

│   ├── Subscription.ts           # Subscription schema## 🎭 Animations

│   └── ActivityLog.ts            # Activity schema

├── hooks/                        # Custom hooks- **Framer Motion** - Page transitions and component animations

│   └── use-razorpay.ts           # Razorpay integration- **GSAP** - Complex timeline animations

├── .env.local                    # Environment variables (create this)- **Tailwind Animate** - Utility-based animations

└── package.json                  # Dependencies- **Three.js** - 3D graphics and particle effects

```

## 🚀 Deployment

---

### Deploy to Vercel (Recommended)

## 🔐 Authentication System

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Authentication Flow

1. Push your code to GitHub

```2. Import your repository to Vercel

Email/Password Login3. Add environment variables in Vercel dashboard

├──> POST /api/auth/login4. Deploy!

├──> Validate credentials

├──> Generate JWT token### Environment Variables for Production

└──> Set auth-token cookie

Make sure to set these in your deployment platform:

Google OAuth- `MONGODB_URI`

├──> NextAuth Google Provider- `JWT_SECRET`

├──> Redirect to Google- `NEXT_PUBLIC_APP_URL`

├──> User authorizes

├──> Google callback## 🐛 Troubleshooting

└──> Set session-token cookie

### MongoDB Connection Issues

GitHub OAuth```

├──> NextAuth GitHub ProviderError: Please define the MONGODB_URI environment variable

├──> Redirect to GitHub```

├──> User authorizes**Solution:** Ensure `.env.local` exists with valid `MONGODB_URI`

├──> GitHub callback

└──> Set session-token cookie### Port Already in Use

``````

Error: Port 3000 is already in use

### Protected Routes```

**Solution:** Kill the process or use a different port:

Routes under `/dashboard/*` are automatically protected by middleware. Unauthenticated users are redirected to `/login`.```bash

pnpm dev -p 3001

---```



## 💳 Payment Integration### Build Errors

```bash

### Razorpay Flow# Clear Next.js cache and rebuild

rm -rf .next

```pnpm build

1. User selects plan → POST /api/payment/create-order```

2. Razorpay checkout opens

3. User completes payment## 🤝 Contributing

4. POST /api/payment/verify (verify signature)

5. Create subscription recordContributions are welcome! Please follow these steps:

6. Update user subscription

7. Show success dialog1. Fork the repository

8. Display "Current Plan" badge2. Create a feature branch (`git checkout -b feature/AmazingFeature`)

```3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

### Subscription Plans5. Open a Pull Request



| Plan | Price | Status |## 📄 License

|------|-------|--------|

| Starter | ₹1/month | Testing |This project is private and proprietary.

| Professional | ₹199/month | Production |

| Enterprise | Custom | Contact Sales |## 👨‍💻 Author



---**Divy1429**

- GitHub: [@Divy1429](https://github.com/Divy1429)

## 🗄️ Database Schema- Repository: [CloudSyncAI](https://github.com/Divy1429/CloudSyncAI)



### User Model## 🙏 Acknowledgments

```typescript

{- [Next.js](https://nextjs.org/)

  name: string- [Vercel](https://vercel.com/)

  email: string- [Radix UI](https://www.radix-ui.com/)

  password?: string  // Only for email/password- [TailwindCSS](https://tailwindcss.com/)

  image?: string     // From OAuth- [Framer Motion](https://www.framer.com/motion/)

  provider?: 'credentials' | 'google' | 'github'- [MongoDB](https://www.mongodb.com/)

  subscription?: {

    plan: 'starter' | 'professional' | 'enterprise'## 📞 Support

    status: 'active' | 'cancelled' | 'expired'

    startDate: DateFor support, email your-email@example.com or open an issue in the GitHub repository.

    endDate?: Date

    razorpaySubscriptionId?: string---

  }

}**Made with ❤️ using Next.js and TypeScript**

```


### Subscription Model
```typescript
{
  userId: ObjectId
  plan: string
  status: string
  razorpayOrderId: string
  razorpayPaymentId: string
  amount: number
  startDate: Date
  endDate: Date
}
```

---

## 📡 API Documentation

### Authentication

**POST /api/auth/signup** - Create account
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**POST /api/auth/login** - Login
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### User

**GET /api/user/me** - Get current user + subscription
```json
{
  "user": { "id": "...", "name": "...", "email": "..." },
  "subscription": { "plan": "professional", "status": "active" }
}
```

**POST /api/user/change-password** - Change password
```json
{
  "oldPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

### Payment

**POST /api/payment/create-order** - Create Razorpay order
```json
{
  "plan": "professional"
}
```

**POST /api/payment/verify** - Verify payment
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "xxx",
  "plan": "professional",
  "amount": 19900
}
```

---

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Update OAuth redirect URLs
5. Deploy

**Environment Variables for Production:**
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GITHUB_CLIENT_ID=...
RAZORPAY_KEY_ID=rzp_live_...
```

**Update OAuth Redirects:**
- Google: `https://your-domain.vercel.app/api/auth/callback/google`
- GitHub: `https://your-domain.vercel.app/api/auth/callback/github`

---

## 🛠️ Troubleshooting

### MongoDB Connection Error
```bash
# Check connection string in .env.local
# Verify IP whitelist in MongoDB Atlas
# Test connection:
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✓ Connected'))"
```

### OAuth Not Working
- Verify client IDs and secrets
- Check redirect URLs match exactly
- Clear browser cookies
- Ensure NEXTAUTH_URL is correct

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
pnpm dev -p 3001
```

### Build Errors
```bash
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

---

## 📝 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

**Commit Convention:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring

---

## 📄 License

This project is **private and proprietary**. All rights reserved.

---

## 👨‍💻 Author

**Divy Patel**

- GitHub: [@Divy1429](https://github.com/Divy1429)
- Repository: [CloudSyncAI](https://github.com/Divy1429/CloudSyncAI)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Vercel](https://vercel.com/) - Deployment
- [MongoDB](https://www.mongodb.com/) - Database
- [NextAuth](https://next-auth.js.org/) - Authentication
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Razorpay](https://razorpay.com/) - Payments

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Authentication (Email, Google, GitHub)
- [x] Payment integration (Razorpay)
- [x] User dashboard
- [x] Activity logging

### Phase 2: Enhancement ✅
- [x] Subscription management
- [x] Payment success dialog
- [x] Current plan indicator
- [x] Profile management

### Phase 3: Advanced (Planned)
- [ ] AI workflow builder
- [ ] Real-time data sync
- [ ] Team collaboration
- [ ] API key management
- [ ] Webhook support

---

<div align="center">

**Made with ❤️ using Next.js and TypeScript**

⭐ Star this repository if you find it helpful!

[Live Demo](https://cloud-sync-ai.vercel.app) • [Report Bug](https://github.com/Divy1429/CloudSyncAI/issues) • [Request Feature](https://github.com/Divy1429/CloudSyncAI/issues)

</div>

