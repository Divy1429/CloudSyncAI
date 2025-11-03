# 💳 Razorpay Payment Integration Guide

## 🎯 Overview

Complete Razorpay payment integration for CloudSyncAI subscription plans:
- ✅ **Starter Plan**: ₹49/month
- ✅ **Professional Plan**: ₹199/month  
- ✅ **Enterprise Plan**: Custom (Contact Sales)

---

## 📦 What Was Installed

```bash
pnpm add razorpay
```

---

## 🗂️ Files Created

### 1. **Models**
- `models/Subscription.ts` - Subscription schema with Razorpay fields

### 2. **API Routes**
- `app/api/payment/create-order/route.ts` - Creates Razorpay order
- `app/api/payment/verify/route.ts` - Verifies payment signature
- `app/api/subscription/route.ts` - Gets user subscription

### 3. **Hooks**
- `hooks/use-razorpay.ts` - Custom hook for Razorpay checkout

### 4. **Updated Components**
- `components/pricing-section.tsx` - Added payment buttons

---

## 🔐 Step 1: Get Razorpay Credentials

### Create Razorpay Account

1. **Sign up**: https://dashboard.razorpay.com/signup
2. **Complete KYC** (for production)
3. **Get Test/Live Keys**

### Generate API Keys

1. Go to: **Settings** → **API Keys**
2. Click **"Generate Test Keys"** or **"Generate Live Keys"**
3. You'll see:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxx`
   - **Key Secret**: Click "Show" to reveal

---

## 🔧 Step 2: Add Credentials to `.env.local`

Replace these placeholders in your `.env.local`:

```bash
# Razorpay Test Mode Credentials
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# For Production (after KYC approval)
# RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
# RAZORPAY_KEY_SECRET=your_live_secret_key
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

⚠️ **Important**:
- `RAZORPAY_KEY_SECRET` is **server-only** (never expose to client)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` is **client-side** (safe to expose)

---

## 🧪 Step 3: Test with Razorpay Test Cards

### Restart Server

```powershell
# Kill all node processes
Get-Process node | Stop-Process -Force

# Restart dev server
pnpm dev
```

### Test Payment Flow

1. **Navigate to homepage**: `http://localhost:3000`
2. **Scroll to Pricing section**
3. **Click "Get Started"** on any plan (except Enterprise)
4. **Login if prompted**
5. **Razorpay checkout opens**
6. **Use test card**:

```
Card Number: 4111 1111 1111 1111
Expiry: Any future date (e.g., 12/25)
CVV: Any 3 digits (e.g., 123)
Name: Test User
```

7. **Click Pay**
8. **Success!** → Redirects to `/dashboard`

---

## 💳 Razorpay Test Cards

### ✅ Successful Payment
```
Card: 4111 1111 1111 1111
CVV: Any
Expiry: Any future date
```

### ❌ Failed Payment (to test error handling)
```
Card: 4000 0000 0000 0002
CVV: Any
Expiry: Any future date
```

### 🔄 3D Secure Authentication
```
Card: 5104 0600 0000 0008
CVV: Any
Expiry: Any future date
OTP: 1234
```

More test cards: https://razorpay.com/docs/payments/payments/test-card-upi-details/

---

## 📊 How It Works

### Payment Flow Diagram

```
User clicks "Get Started"
        ↓
Check if user is logged in
        ↓
Call /api/payment/create-order
        ↓
Razorpay creates order
        ↓
Return order_id, amount, key
        ↓
Load Razorpay Checkout modal
        ↓
User enters payment details
        ↓
Razorpay processes payment
        ↓
Returns payment_id, signature
        ↓
Call /api/payment/verify
        ↓
Verify signature with HMAC
        ↓
Create/Update Subscription in MongoDB
        ↓
Log activity
        ↓
Redirect to /dashboard
        ↓
✅ Subscription Active!
```

---

## 🔍 Verify Subscription in Database

After successful payment, check MongoDB:

```javascript
// Subscription document
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  plan: "professional",
  status: "active",
  razorpayOrderId: "order_xxxxx",
  razorpayPaymentId: "pay_xxxxx",
  amount: 199,
  currency: "INR",
  startDate: ISODate("2025-01-15"),
  endDate: ISODate("2025-02-15"), // 1 month later
  autoRenew: true,
  createdAt: ISODate("2025-01-15"),
  updatedAt: ISODate("2025-01-15")
}
```

---

## 🎨 Features Implemented

### ✅ 1. Order Creation
- Creates Razorpay order with plan details
- Stores user info in order notes
- Returns order_id for checkout

### ✅ 2. Payment Verification
- Verifies Razorpay signature using HMAC SHA256
- Prevents payment tampering
- Ensures secure payment flow

### ✅ 3. Subscription Management
- Stores subscription in MongoDB
- Calculates start/end dates
- Tracks payment IDs

### ✅ 4. Activity Logging
- Logs subscription creation
- Stores payment metadata
- Tracks user actions

### ✅ 5. UI Integration
- Razorpay checkout modal
- Loading states
- Error handling
- Success redirects

---

## 🚀 Production Deployment

### Step 1: Complete KYC on Razorpay

1. Submit business documents
2. Wait for approval (1-2 days)
3. Get Live API keys

### Step 2: Update Environment Variables

On your hosting platform (Vercel, etc.):

```bash
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

### Step 3: Update Webhook (Optional)

For automatic subscription renewals:

1. Go to Razorpay Dashboard → **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`
4. Copy webhook secret
5. Add to env: `RAZORPAY_WEBHOOK_SECRET=your_webhook_secret`

---

## 🔐 Security Features

### ✅ Signature Verification
```typescript
const text = razorpay_order_id + "|" + razorpay_payment_id
const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  .update(text)
  .digest("hex")

if (expectedSignature !== razorpay_signature) {
  throw new Error("Invalid signature")
}
```

### ✅ Server-Side Validation
- All payment verification happens server-side
- Client can't manipulate payment data
- Signature ensures Razorpay authenticity

### ✅ User Authentication
- Requires login before payment
- Ties subscription to authenticated user
- Prevents unauthorized subscriptions

---

## 🐛 Troubleshooting

### Issue 1: "Failed to load Razorpay SDK"

**Cause**: Razorpay script not loading

**Solution**:
```typescript
// Check browser console for errors
// Ensure internet connection
// Try clearing browser cache
```

### Issue 2: "Invalid key_id"

**Cause**: Wrong/missing Razorpay Key ID

**Solution**:
1. Check `.env.local` has `NEXT_PUBLIC_RAZORPAY_KEY_ID`
2. Restart server after adding
3. Ensure key starts with `rzp_test_` or `rzp_live_`

### Issue 3: "Payment verification failed"

**Cause**: Invalid signature

**Solution**:
1. Check `RAZORPAY_KEY_SECRET` is correct
2. Ensure no extra spaces in `.env.local`
3. Restart server

### Issue 4: "Please login to subscribe"

**Cause**: User not authenticated

**Solution**:
- Make sure user is logged in
- Check AuthContext has valid session
- Verify cookies are set

---

## 📊 Dashboard Features to Add (Optional)

### 1. Subscription Management Page

Create `app/dashboard/subscription/page.tsx`:
- Show current plan
- Display renewal date
- Cancel subscription button
- Upgrade/downgrade options

### 2. Payment History

Create `app/dashboard/payments/page.tsx`:
- List all payments
- Show invoices
- Download receipts

### 3. Webhook Handler

Create `app/api/payment/webhook/route.ts`:
- Handle subscription renewals
- Process failed payments
- Send email notifications

---

## 💰 Pricing Configuration

Current plans in code:

```typescript
const PLANS = {
  starter: {
    amount: 4900, // ₹49 in paise
    currency: "INR",
  },
  professional: {
    amount: 19900, // ₹199 in paise
    currency: "INR",
  },
}
```

To change pricing:
1. Update `PLANS` in `app/api/payment/create-order/route.ts`
2. Update display prices in `components/pricing-section.tsx`
3. Always use smallest currency unit (paise for INR)

---

## 🎉 Status: Ready to Accept Payments!

### ✅ Completed:
- Razorpay integration
- Payment flow
- Subscription model
- UI integration
- Security implementation

### 🧪 Next Steps:
1. Get Razorpay test credentials
2. Add to `.env.local`
3. Restart server
4. Test payment with test card
5. Verify subscription in database

---

## 📚 Resources

- **Razorpay Docs**: https://razorpay.com/docs/
- **Test Cards**: https://razorpay.com/docs/payments/payments/test-card-upi-details/
- **Dashboard**: https://dashboard.razorpay.com/
- **API Reference**: https://razorpay.com/docs/api/

---

**Need Help?**
- Check browser console for errors
- Verify environment variables
- Test with different test cards
- Check Razorpay Dashboard logs

🚀 **Your payment system is ready to go live!**
