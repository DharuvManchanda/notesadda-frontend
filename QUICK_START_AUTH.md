# Authentication System - Quick Start Guide

## Welcome! 👋

Your authentication system is now ready to use. Here's how to test it and connect it to your backend.

## 🚀 Getting Started

### 1. Access Auth Pages

The following routes are now available:

- **Sign Up**: `http://localhost:3000/auth/signup`
- **Sign In**: `http://localhost:3000/auth/signin`
- **Forgot Password**: `http://localhost:3000/auth/forgot-password`

### 2. Test the UI Flow (Without Backend)

You can test the form validation and UX immediately:

1. Go to `/auth/signup`
2. Try entering invalid data:
   - Short username (less than 3 chars) ❌
   - Invalid email format ❌
   - Weak password (no uppercase/lowercase/numbers) ❌
3. See validation errors appear in real-time

### 3. Configure Your Backend URLs

Open `/lib/api-config.ts` and replace the dummy URLs:

```typescript
// BEFORE
export const API_ENDPOINTS = {
  signup: 'https://api.example.com/auth/signup',
  // ...
};

// AFTER
export const API_ENDPOINTS = {
  signup: 'https://your-backend.com/api/auth/signup',
  verifyOtp: 'https://your-backend.com/api/auth/verify-otp',
  signin: 'https://your-backend.com/api/auth/signin',
  forgotPassword: 'https://your-backend.com/api/auth/forgot-password',
  resetPassword: 'https://your-backend.com/api/auth/reset-password',
};
```

### 4. Test with Your Backend

Once you've updated the API URLs:

1. Open browser **DevTools** → **Network tab**
2. Try signing up
3. Check the Network tab to see the API request
4. Debug any errors in the Console tab

## 📋 Form Validation Rules

Users must follow these rules or see validation errors:

| Field | Rules | Example |
|-------|-------|---------|
| **Username** | 3-20 chars, alphanumeric + underscore | `john_doe` |
| **Email** | Valid email format | `john@example.com` |
| **Password** | 8+ chars, uppercase, lowercase, number | `SecurePass123` |

## 🔄 Authentication Flow

### Sign Up Flow
```
User fills form → Click "Create Account"
     ↓
API call to /signup
     ↓
Success? Store email in sessionStorage
     ↓
Redirect to /auth/signup/otp
     ↓
User enters 6-digit OTP
     ↓
API call to /verify-otp
     ↓
Success? Redirect to home
```

### Sign In Flow
```
User enters email & password → Click "Sign In"
     ↓
API call to /signin
     ↓
Success? Store user in AuthContext
     ↓
Redirect to home
     ↓
Header shows username + logout button
```

### Forgot Password Flow
```
User enters email → Click "Send Reset Code"
     ↓
API call to /forgot-password
     ↓
Success? Redirect to /auth/forgot-password/otp
     ↓
User enters OTP
     ↓
Redirect to /auth/forgot-password/reset
     ↓
User enters new password
     ↓
API call to /reset-password
     ↓
Success? Redirect to /auth/signin
```

## 🎨 Customization

### Change Colors
Edit `/app/globals.css` to customize colors:
```css
--primary: oklch(0.72 0.15 280);  /* Purple */
--destructive: oklch(0.62 0.22 25);  /* Red */
```

### Change Button Text
Edit component files to customize messages:
```tsx
// In SignUpForm.tsx
<Button>
  {isSubmitting ? 'Creating account...' : 'Create Account'}
</Button>
```

### Change Validation Messages
Edit `/lib/auth-schemas.ts` to customize error messages:
```typescript
const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters'),  // ← Change this
});
```

## 🔍 Browser DevTools Tips

### View API Requests
1. Open DevTools → Network tab
2. Try signing up
3. Click the request to see:
   - Request body (what you sent)
   - Response body (what backend sent back)
   - Status code (200, 400, 500, etc)

### Debug JavaScript Errors
1. Open DevTools → Console tab
2. Submit a form
3. See any errors or warnings

### Inspect Element
1. Right-click on element → Inspect
2. See the generated HTML and CSS classes

## 🐛 Troubleshooting

### API Calls Failing
1. Check DevTools → Network tab
2. Verify API endpoint URL is correct
3. Check backend is running
4. Look for CORS errors

### Validation Not Working
1. Check `/lib/auth-schemas.ts` is imported correctly
2. Verify zod package is installed
3. Check browser console for errors

### User Not Storing
1. Check AuthContext is wrapping the app
2. Verify `setUser()` is called after signin
3. Check localStorage if using token storage

### OTP Timer Not Showing
1. Verify `useEffect` is running
2. Check timer interval is clearing properly
3. Open console for JavaScript errors

## 📚 Key Files

| File | Purpose |
|------|---------|
| `/lib/auth-schemas.ts` | Zod validation schemas |
| `/lib/api-config.ts` | API endpoint URLs |
| `/components/auth/AuthContext.tsx` | Global auth state |
| `/components/auth/*Form.tsx` | Form components |
| `/app/auth/**/*.tsx` | Auth pages |

## 🎯 Next Steps

1. ✅ Test form validation and UI
2. ✅ Update API endpoints in `api-config.ts`
3. ✅ Test with your backend
4. ✅ Handle error responses from your API
5. ✅ Customize styling to match your brand
6. ✅ Add route protection for auth-only pages
7. ✅ Implement persistent sessions with tokens

## 💡 Pro Tips

- Use `sessionStorage` for temporary data during auth flow
- Use `localStorage` for persistent data (tokens, preferences)
- Use `AuthContext` for global user state
- Use `toast.success()` and `toast.error()` for feedback
- Check DevTools Network tab when debugging API issues

## 📞 Need Help?

If something isn't working:
1. Check browser console for errors
2. Open DevTools Network tab to see API calls
3. Review `/AUTH_SETUP.md` for detailed API specifications
4. Check validation rules in `/lib/auth-schemas.ts`

---

**You're ready to go!** 🎉 Update your API endpoints and test with your backend.
