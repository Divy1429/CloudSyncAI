# CloudSyncAI Platform

A modern SaaS application built with Next.js 14, featuring AI-powered workflow automation, multi-cloud connections, real-time data synchronization, and comprehensive team collaboration tools.

![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 🚀 Features

- **🤖 AI Workflow Builder** - Intelligent automation workflows
- **☁️ Multi-Cloud Connections** - Connect to multiple cloud services
- **⚡ Real-Time Data Sync** - Live data synchronization dashboard
- **📊 Analytics & Reports** - Comprehensive data analytics
- **🔐 Secure Authentication** - JWT-based user authentication
- **👥 Team Collaboration** - Built-in collaboration tools
- **🔔 Smart Alerts** - Intelligent notification system
- **📈 Version History** - Track all changes with timeline
- **🎨 Modern UI** - Beautiful animated components with Framer Motion
- **🌓 Dark Mode** - Theme switching support
- **📱 Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14.2.25 (App Router)
- **Language:** TypeScript 5.9
- **Styling:** TailwindCSS 4.1 + Tailwind Animate
- **UI Components:** Radix UI
- **Animations:** Framer Motion, GSAP
- **3D Graphics:** Three.js + React Three Fiber
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken) + bcryptjs
- **API Routes:** Next.js API Routes

### Development Tools
- **Package Manager:** pnpm
- **Linting:** ESLint
- **Type Checking:** TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **MongoDB** (Local installation or MongoDB Atlas account)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Divy1429/CloudSyncAI.git
cd CloudSyncAI
```

### 2. Install Dependencies

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
# For MongoDB Atlas (Cloud):
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# For Local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/lelo-saas

# JWT Secret Token for Authentication
JWT_SECRET=your-super-secret-jwt-token-here

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### MongoDB Setup Options:

**Option A: MongoDB Atlas (Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string and update `MONGODB_URI`

**Option B: Local MongoDB**
1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use `MONGODB_URI=mongodb://localhost:27017/lelo-saas`

#### Generate Secure JWT Secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output and use it as your `JWT_SECRET`.

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Available Scripts

```bash
# Development server (with hot reload)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## 📁 Project Structure

```
lelo-saas/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   │   ├── login/
│   │   │   └── signup/
│   │   └── contact/        # Contact form endpoint
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── ai-workflow-builder.tsx
│   ├── analytics-reports.tsx
│   ├── multi-cloud-connections.tsx
│   └── ...                 # Other feature components
├── lib/                     # Utility functions
│   ├── db.ts               # MongoDB connection
│   └── utils.ts            # Helper functions
├── models/                  # Mongoose models
│   ├── User.ts             # User model
│   └── Contact.ts          # Contact model
├── hooks/                   # Global hooks
├── styles/                  # Global styles
├── public/                  # Static assets
├── .env.local              # Environment variables (create this)
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🔐 Authentication

The application includes a complete authentication system:

- **Sign Up:** `/signup` - Create a new account
- **Login:** `/login` - Sign in to your account
- **JWT Tokens:** Secure token-based authentication
- **Password Hashing:** bcryptjs for secure password storage

## 🎨 UI Components

The project uses a comprehensive set of UI components from Radix UI:

- Accordion, Alert Dialog, Avatar, Badge
- Button, Card, Checkbox, Dialog
- Dropdown Menu, Form, Input, Label
- Select, Slider, Switch, Tabs
- Toast, Tooltip, and many more...

All styled with TailwindCSS and enhanced with animations.

## 🌐 Key Pages & Features

### Landing Page (`/`)
- Hero section with animated CTA
- Feature showcase
- Pricing section
- FAQ section
- Contact form

### Dashboard Features
- AI Workflow Builder
- Analytics & Reports
- Real-time Sync Dashboard
- Team Collaboration
- Version History
- Smart Alerts
- Custom Integrations

## 🔧 Configuration Files

- **`next.config.mjs`** - Next.js configuration
- **`tailwind.config.ts`** - TailwindCSS customization
- **`tsconfig.json`** - TypeScript compiler options
- **`postcss.config.mjs`** - PostCSS configuration
- **`components.json`** - Shadcn/UI configuration

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎭 Animations

- **Framer Motion** - Page transitions and component animations
- **GSAP** - Complex timeline animations
- **Tailwind Animate** - Utility-based animations
- **Three.js** - 3D graphics and particle effects

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `MONGODB_URI`
- `JWT_SECRET`
- `NEXT_PUBLIC_APP_URL`

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: Please define the MONGODB_URI environment variable
```
**Solution:** Ensure `.env.local` exists with valid `MONGODB_URI`

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution:** Kill the process or use a different port:
```bash
pnpm dev -p 3001
```

### Build Errors
```bash
# Clear Next.js cache and rebuild
rm -rf .next
pnpm build
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Divy1429**
- GitHub: [@Divy1429](https://github.com/Divy1429)
- Repository: [CloudSyncAI](https://github.com/Divy1429/CloudSyncAI)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

**Made with ❤️ using Next.js and TypeScript**

