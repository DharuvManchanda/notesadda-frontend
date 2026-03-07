# Authentication System - Visual Flow Diagrams

## Sign Up Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER VISITS /auth/signup                          │
└────────────────────────┬────────────────────────────────────────────┘
                         │
                         ▼
        ┌─────────────────────────────────┐
        │   SIGN UP FORM PAGE LOADS        │
        │   - Username field               │
        │   - Email field                  │
        │   - Password field (with toggle) │
        │   - "Create Account" button      │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │   USER FILLS IN FORM             │
        │   (Real-time validation)         │
        │                                   │
        │   Username: john_doe ✓          │
        │   Email: john@example.com ✓     │
        │   Password: SecurePass123 ✓     │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │   BUTTON ENABLED                 │
        │   (All fields valid)             │
        └────────────┬────────────────────┘
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
    SUBMIT VALID         SUBMIT INVALID
    (Has data)           (Missing fields)
           │                   │
           ▼                   ▼
   API Call Sent         Error Shown
           │              (Inline text)
           │
           ▼
   ┌──────────────────────────┐
   │   API Response:          │
   │   POST /auth/signup      │
   └────────┬─────────────────┘
            │
    ┌───────┴────────┐
    ▼                ▼
 SUCCESS           ERROR
    │                │
    ▼                ▼
Store email    Show toast
in session    "Email already
storage       registered"
    │
    ▼
Navigate to
/auth/signup/otp
    │
    ▼
┌──────────────────────────────┐
│   OTP VERIFICATION PAGE      │
│   "Enter the 6-digit code    │
│    sent to your email"        │
│   [      123456      ]        │
│   Code expires in: 9:45 ⏱️   │
│   Resend in: 28s               │
└────────┬─────────────────────┘
         │
         ▼
User enters OTP (6 digits)
         │
         ▼
API Call: POST /verify-otp
         │
    ┌────┴──────┐
    ▼           ▼
 SUCCESS     ERROR
    │         │
    ▼         ▼
Store OTP  "Invalid OTP"
verified   (show error)
in session
    │
    ▼
Navigate to /
(HOME PAGE)
    │
    ▼
┌──────────────────────────────┐
│   HOME PAGE                  │
│   Header shows:              │
│   "john_doe | Logout" ✓      │
└──────────────────────────────┘
```

## Sign In Flow

```
┌─────────────────────────────────────────────────────┐
│            USER VISITS /auth/signin                  │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────────┐
        │  SIGN IN FORM PAGE       │
        │  "Welcome Back"          │
        │  - Email field           │
        │  - Password field        │
        │  - "Forgot password?" 🔗 │
        │  - "Sign In" button      │
        │  - "Sign Up" link        │
        └────────┬─────────────────┘
                 │
                 ▼
        ┌──────────────────────────┐
        │  USER ENTERS DETAILS     │
        │                          │
        │  Email: john@example.com │
        │  Password: ••••••••      │
        └────────┬─────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
      CLICK         CLICK FORGOT
   "SIGN IN"       PASSWORD
        │              │
        ▼              ▼
   API Call       Navigate to
   /signin    /forgot-password
        │
        ▼
   ┌──────────────────────┐
   │  API Response:       │
   └────────┬─────────────┘
            │
    ┌───────┴───────┐
    ▼               ▼
 SUCCESS         ERROR
    │              │
    ▼              ▼
setUser()    "Invalid email
Store        or password"
token in     (show error)
localStorage │
    │        └─ User stays
    │          on /signin
    ▼
Navigate to /
(HOME)
    │
    ▼
┌──────────────────────┐
│   HOME PAGE          │
│   Header shows:      │
│   "john_doe | Logout"│
└──────────────────────┘
    │
    ▼
USER CAN:
- Click Logout → Goes to /
  (AuthContext cleared)
- Click Profile
- Click Upload
- Continue browsing
```

## Forgot Password & Password Reset Flow

```
┌────────────────────────────────────────────────────────┐
│        USER VISITS /auth/forgot-password               │
└─────────────────┬──────────────────────────────────────┘
                  │
                  ▼
    ┌──────────────────────────────┐
    │  FORGOT PASSWORD PAGE        │
    │  "Reset Your Password"       │
    │  "Enter your email address"  │
    │  [john@example.com        ]  │
    │  "Send Reset Code"           │
    │  "Back to Sign In" 🔙        │
    └────────┬─────────────────────┘
             │
             ▼
    ┌──────────────────────────────┐
    │  USER ENTERS EMAIL           │
    │  john@example.com            │
    └────────┬─────────────────────┘
             │
             ▼
    API Call: /forgot-password
             │
        ┌────┴──────┐
        ▼           ▼
     SUCCESS     ERROR
        │         │
        ▼         ▼
  Store email  "Email not
  in session   found"
  storage      (show error)
        │
        ▼
  Navigate to
  /forgot-password/otp
        │
        ▼
┌──────────────────────────────┐
│  OTP VERIFICATION PAGE       │
│  "Verify Your Email"         │
│  "Enter code sent to email"  │
│  [      123456      ]        │
│  Code expires: 9:45 ⏱️      │
│  Resend in: 28s              │
│  "Go back" 🔙                │
└────────┬─────────────────────┘
         │
         ▼
   User enters OTP
         │
         ▼
API Call: /verify-otp
         │
    ┌────┴──────┐
    ▼           ▼
 SUCCESS     ERROR
    │         │
    ▼         ▼
Store      "Invalid OTP"
verified   (show toast)
         │
         ▼
    Navigate to
    /forgot-password/reset
         │
         ▼
┌──────────────────────────────┐
│  RESET PASSWORD PAGE         │
│  "Create New Password"       │
│  [••••••••              ]    │
│  New Password field          │
│  [••••••••              ]    │
│  Confirm Password field      │
│  "Reset Password"            │
│  "Go back" 🔙                │
└────────┬─────────────────────┘
         │
         ▼
  User enters passwords
  (must match)
         │
         ▼
API Call: /reset-password
{email, otp, newPassword}
         │
    ┌────┴──────┐
    ▼           ▼
 SUCCESS     ERROR
    │         │
    ▼         ▼
Clear      "Password
session    reset failed"
storage
    │
    ▼
Navigate to
/auth/signin
    │
    ▼
┌──────────────────────────┐
│  SIGN IN PAGE            │
│  Message: "Password      │
│  reset successful!"      │
│  Can now login with      │
│  new password            │
└──────────────────────────┘
```

## OTP Verification Details

```
     OTP PAGE LOADS
            │
            ▼
   setTimeLeft(600)    ← 10 minutes
   setCanResend(false)
   setResendCooldown(30)
            │
     ┌──────┴──────────────┐
     │                     │
     ▼                     ▼
useEffect 1           useEffect 2
(OTP Timer)          (Resend Timer)
     │                     │
     ▼                     ▼
Every 1 second        Every 1 second
timeLeft--            resendCooldown--
     │                     │
     │              When cooldown=0:
     │              setCanResend=true
     │
When timeLeft=0:
"Code Expired"
     │
     ▼
OTP INPUT
[1][2][3][4][5][6]
     │
     ▼
USER TYPES
     │
     ▼
Input validation:
- Length = 6?
- Only digits?
     │
  ┌──┴──┐
  ▼     ▼
YES    NO
  │     │
  ▼     └─ Don't allow input
Enable     Disable submit
submit     button
  │
  ▼
USER CLICKS "VERIFY CODE"
  │
  ▼
API CALL
  │
  ▼
Response
  │
  ├─ Success: Navigate away ✓
  │
  └─ Error: Show error message
     │
     └─ User can:
       - Try again
       - Click "Resend Code" (if ready)
```

## Form Validation Visual

```
USERNAME FIELD
[john_doe        ]
     │
     ▼
Length check:  john_doe = 8 chars ✓ (needs 3-20)
Character ok:  john_doe = alphanumeric + _ ✓
     │
     ▼
   VALID ✓
   └─ Green border
   └─ Enable form



EMAIL FIELD
[john@example     ]
     │
     ▼
Email format check: Missing @ or domain ✗
     │
     ▼
  INVALID ✗
  └─ Red border
  └─ Error: "Invalid email address"
  └─ Disable submit button
  └─ Fix: [john@example.com  ]
  └─ VALID ✓



PASSWORD FIELD
[SecurePass123   ]
     │
     ├─ Length ≥ 8? ✓
     ├─ Has uppercase? ✓ (S, P)
     ├─ Has lowercase? ✓ (ecure, ass)
     ├─ Has number?    ✓ (123)
     │
     ▼
  VALID ✓
  └─ Green indicator
  └─ Password strength: STRONG



PASSWORD FIELD (WEAK)
[pass123         ]
     │
     ├─ Length ≥ 8? ✗ (only 8)
     ├─ Has uppercase? ✗
     ├─ Has lowercase? ✓
     ├─ Has number?    ✓
     │
     ▼
  INVALID ✗
  └─ Red border
  └─ Error: "Password must contain uppercase letter"
  └─ Disable submit
```

## Header State Changes

```
INITIAL STATE
┌─────────────────────────────────────────┐
│  Notes Pitara  Explore Upload Profile   │
│                                   Sign In │
└─────────────────────────────────────────┘

AFTER SIGN IN
┌─────────────────────────────────────────┐
│  Notes Pitara  Explore Upload Profile   │
│                        john_doe | Logout │
└─────────────────────────────────────────┘

AFTER LOGOUT
┌─────────────────────────────────────────┐
│  Notes Pitara  Explore Upload Profile   │
│                                   Sign In │
└─────────────────────────────────────────┘
```

## API Request/Response Timeline

```
Time   Client                          Server
────   ──────                          ──────
0ms    Form submitted
       │
1ms    └─→ POST /auth/signup ────────→
              {username, email, pwd}
                                        │
2ms                                    Validate input
                                        │
3ms                                    Check email exists
                                        │
4ms                                    Hash password
                                        │
5ms                                    Create user
                                        │
6ms                                    Generate OTP
                                        │
7ms                                    Send OTP email
                                        │
8ms                                   ←─ 200 OK
                               {success, message}
       │
9ms    Receive response
       │
10ms   setUser() in context
       │
11ms   sessionStorage.signup_email
       │
12ms   router.push('/auth/signup/otp')
       │
13ms   Page rendered with OTP input ✓
```

## Toast Notification Lifecycle

```
USER ACTION
│
▼
Try to submit form
│
▼
Error occurs (API call failed)
│
▼
toast.error('Error message')
│
▼
Toast appears (bottom right)
┌────────────────────┐
│ ✗ Error message    │
└────────────────────┘
│
▼ After 3 seconds (default)
│
Toast fades out
│
▼
User continues


SUCCESS FLOW
│
▼
API returns success
│
▼
toast.success('Success!')
│
▼
Toast appears (green)
┌────────────────────┐
│ ✓ Success message  │
└────────────────────┘
│
▼ Auto-dismiss or navigate away
│
Toast removed
```

## Loading States

```
BUTTON STATES

Normal State:
┌──────────────────────────┐
│    Create Account        │
└──────────────────────────┘

Submitting State:
┌──────────────────────────┐
│  Creating account... ⟳   │
│  (disabled, button grayed)│
└──────────────────────────┘

Success State:
┌──────────────────────────┐
│   Account Created ✓      │
│   (auto-navigates)       │
└──────────────────────────┘

Error State:
┌──────────────────────────┐
│    Create Account        │
│    (enabled, user retries)
└──────────────────────────┘
```

## Component Reusability

```
OTP VERIFY FORM

Purpose: "signup"
├─ Used by: /auth/signup/otp
├─ After verify: Navigate to /
└─ Toast: "Email verified!"


Purpose: "reset"
├─ Used by: /auth/forgot-password/otp
├─ After verify: Navigate to /forgot-password/reset
└─ Toast: "OTP verified, set new password"


⬇️ SAME COMPONENT, DIFFERENT LOGIC BASED ON PROP
```

---

These visual flows show exactly how users navigate through the authentication system at each step!
