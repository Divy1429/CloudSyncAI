# CloudSyncAI - Phase 2 Quick Reference Guide

## 🎯 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser
http://localhost:3000
```

## 📍 Important URLs

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User login |
| Signup | `/signup` | Create account |
| Dashboard | `/dashboard` | Main dashboard |
| Profile | `/dashboard/profile` | User profile & settings |
| Workflows | `/dashboard/workflows` | Manage workflows |
| Integrations | `/dashboard/integrations` | Cloud connections |
| Activity | `/dashboard/activity` | Activity logs |

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/signup          - Create account
POST /api/auth/login           - Sign in
POST /api/auth/logout          - Sign out
GET  /api/user/me              - Get current user
```

### Profile
```
PUT  /api/user/profile         - Update name/email
PUT  /api/user/password        - Change password
```

### Workflows
```
GET    /api/workflows          - List all workflows
POST   /api/workflows          - Create workflow
GET    /api/workflows/:id      - Get single workflow
PUT    /api/workflows/:id      - Update workflow
DELETE /api/workflows/:id      - Delete workflow
```

### Integrations
```
GET    /api/integrations       - List all integrations
POST   /api/integrations       - Create integration
GET    /api/integrations/:id   - Get single integration
PUT    /api/integrations/:id   - Update integration
DELETE /api/integrations/:id   - Delete integration
```

### Activity
```
GET /api/activities            - Get activity logs
GET /api/activities?limit=50   - Get limited results
```

### Dashboard
```
GET /api/dashboard/stats       - Get user statistics
```

## 📦 Database Models

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  createdAt: Date
}
```

### Workflow
```typescript
{
  userId: ObjectId
  name: string
  description: string
  status: "active" | "paused" | "draft"
  trigger: { type, config }
  actions: Array
  runCount: number
  successCount: number
  failureCount: number
  lastRun: Date
  createdAt: Date
  updatedAt: Date
}
```

### Integration
```typescript
{
  userId: ObjectId
  name: string
  provider: string
  status: "connected" | "disconnected" | "error"
  credentials: object (hidden)
  config: object
  lastSync: Date
  syncCount: number
  createdAt: Date
  updatedAt: Date
}
```

### ActivityLog
```typescript
{
  userId: ObjectId
  action: string
  description: string
  metadata: object
  ipAddress: string
  userAgent: string
  createdAt: Date
}
```

## 🛠️ Common Commands

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Production
pnpm start

# Lint
pnpm lint

# Clear cache
rm -rf .next
```

## 🔐 Environment Variables

```env
# Required
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 Testing Checklist

### Phase 1 (Authentication)
- [ ] Signup with new account
- [ ] Login with credentials
- [ ] Access dashboard
- [ ] Logout
- [ ] Try accessing /dashboard while logged out (should redirect)
- [ ] Try accessing /login while logged in (should redirect)

### Phase 2 (Features)
- [ ] Update profile name and email
- [ ] Change password
- [ ] Create a workflow
- [ ] Edit workflow status (play/pause)
- [ ] Delete workflow
- [ ] Add an integration
- [ ] View integration details
- [ ] Delete integration
- [ ] View activity logs
- [ ] Verify all activities are logged

## 🎨 Key Components

```typescript
// Authentication Hook
import { useAuth } from "@/contexts/AuthContext"
const { user, login, signup, logout, loading } = useAuth()

// UI Components
import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Activity Logging
import { createActivityLog } from "@/lib/activity"
await createActivityLog({
  userId: user._id,
  action: "workflow.create",
  description: "Created workflow",
  metadata: { workflowId: id }
})
```

## 🐛 Common Issues & Fixes

### "Not authenticated"
```bash
# Clear cookies and login again
# Or check JWT_SECRET in .env.local
```

### MongoDB connection error
```bash
# Verify MONGODB_URI in .env.local
# Check MongoDB Atlas IP whitelist
```

### Port 3000 already in use
```bash
# Kill process or use different port
pnpm dev -p 3001
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

## 📊 Project Statistics

- **Total Files:** 100+
- **Total Routes:** 20+
- **API Endpoints:** 15+
- **UI Components:** 50+
- **Database Models:** 5
- **Pages:** 10+

## ✅ Phase 2 Completion Status

✅ Profile Update API  
✅ Password Change API  
✅ Workflows CRUD APIs  
✅ Workflows Dashboard Page  
✅ Integrations CRUD APIs  
✅ Integrations Dashboard Page  
✅ Activity Logs API  
✅ Activity Dashboard Page  

## 🚀 Next Phase Ideas

- Email verification
- Password reset
- Two-factor authentication (2FA)
- Workflow execution engine
- Real-time notifications
- Team collaboration
- Advanced analytics
- Billing & subscriptions

## 📚 Documentation Files

- `README.md` - Project overview & setup
- `PHASE-1-COMPLETE.md` - Authentication implementation
- `PHASE-2-COMPLETE.md` - Full feature implementation
- `QUICK-REFERENCE.md` - This file!

---

**Happy Coding! 🎉**
