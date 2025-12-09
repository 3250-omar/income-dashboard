# Authentication System Architecture

## Overview

The authentication system uses a **unified register page** that dynamically switches between sign-in and sign-up modes. This approach provides a seamless user experience and follows the Single Responsibility Principle.

## 📁 File Structure

```
app/
├── register/
│   └── page.tsx                    # Unified auth page (orchestrator)
└── layout.tsx                      # Root layout with conditional sidebar

components/
├── auth/                           # Auth-specific components
│   ├── index.ts                    # Barrel exports
│   ├── auth-header.tsx             # Dynamic header (Welcome/Create)
│   ├── auth-toggle.tsx             # Switch between modes
│   ├── sign-in-form.tsx            # Sign-in form component
│   ├── sign-up-form.tsx            # Sign-up form component
│   └── social-auth-buttons.tsx     # Google/GitHub auth
├── app-layout.tsx                  # Sidebar layout for authenticated pages
└── conditional-layout.tsx          # Layout router (shows/hides sidebar)
```

## 🎯 Component Responsibilities

### Page Component (`register/page.tsx`)

- **State Management**: Manages auth mode, form data, loading states
- **Logic Orchestration**: Handles form validation and submission
- **Component Composition**: Assembles auth components based on mode

### Presentation Components

#### `AuthHeader`

- Displays logo and dynamic title
- Changes text based on mode (signin/signup)

#### `SignInForm`

- Email and password inputs
- Remember me checkbox
- Forgot password link
- Controlled component with props

#### `SignUpForm`

- Name, email, password, confirm password inputs
- Real-time validation with error messages
- Terms of service checkbox
- Controlled component with props

#### `SocialAuthButtons`

- Google and GitHub OAuth buttons
- Reusable across both modes

#### `AuthToggle`

- Toggle button to switch modes
- Dynamic text based on current mode

### Layout Components

#### `ConditionalLayout`

- Checks current pathname
- Shows `AppLayout` (sidebar) for authenticated pages
- Shows plain layout for `/register` page

## 🔄 State Flow

```
register/page.tsx (State Manager)
    │
    ├─→ mode: "signin" | "signup"
    │
    ├─→ Sign In State
    │   ├── email
    │   └── password
    │
    └─→ Sign Up State
        ├── name
        ├── email
        ├── password
        ├── confirmPassword
        └── errors
```

## 🎨 Mode Switching

When user clicks toggle:

1. `mode` state switches between "signin" and "signup"
2. Form components conditionally render based on mode
3. All form data is reset
4. Header text updates automatically
5. **No page reload** - instant transition

## 💡 Key Features

### ✅ Single Page Experience

- No navigation between separate pages
- Instant mode switching
- Smooth user experience

### ✅ Component Reusability

- Each component has a single responsibility
- Easy to test independently
- Can be used in other contexts

### ✅ Type Safety

- Full TypeScript support
- Proper prop interfaces
- Type-safe state management

### ✅ Validation

- Real-time error feedback
- Clear error messages
- Form-level validation

### ✅ Conditional Layout

- Sidebar hidden on auth page
- Sidebar shown on dashboard/finance pages
- Automatic based on route

## 🚀 Usage Example

### Switching Modes Programmatically

```tsx
const [mode, setMode] = useState<"signin" | "signup">("signin");

// Switch to sign up
setMode("signup");

// Switch to sign in
setMode("signin");
```

### Using Auth Components

```tsx
import { SignInForm, AuthHeader } from "@/components/auth";

<AuthHeader mode="signin" />
<SignInForm
  email={email}
  password={password}
  isLoading={false}
  onEmailChange={setEmail}
  onPasswordChange={setPassword}
  onSubmit={handleSubmit}
/>
```

## 🔐 Security Considerations

- [ ] Implement actual authentication logic
- [ ] Add CSRF protection
- [ ] Implement rate limiting
- [ ] Add password strength indicator
- [ ] Implement email verification
- [ ] Add OAuth integration
- [ ] Secure password storage (hashing)

## 🎯 Next Steps

1. **Backend Integration**

   - Connect to authentication API
   - Implement JWT/session management
   - Add protected routes

2. **Enhanced Validation**

   - Password strength meter
   - Email format validation
   - Duplicate email checking

3. **User Experience**

   - Loading states
   - Success/error notifications
   - Forgot password flow
   - Email verification

4. **OAuth Integration**
   - Google OAuth setup
   - GitHub OAuth setup
   - Social account linking

## 📊 Component Hierarchy

```
register/page.tsx
│
├── AuthHeader
│   └── Logo + Dynamic Title
│
├── Card
│   ├── CardHeader (Dynamic Title)
│   │
│   └── CardContent
│       ├── SignInForm (if mode === "signin")
│       │   ├── Email Input
│       │   ├── Password Input
│       │   ├── Remember Me
│       │   └── Submit Button
│       │
│       ├── SignUpForm (if mode === "signup")
│       │   ├── Name Input
│       │   ├── Email Input
│       │   ├── Password Input
│       │   ├── Confirm Password Input
│       │   ├── Terms Checkbox
│       │   └── Submit Button
│       │
│       ├── SocialAuthButtons
│       │   ├── Google Button
│       │   └── GitHub Button
│       │
│       └── AuthToggle
│           └── Toggle Button
```

## 🔧 Customization

### Adding New Auth Providers

```tsx
// In social-auth-buttons.tsx
<Button variant="outline" className="w-full">
  <TwitterIcon className="w-5 h-5 mr-2" />
  Twitter
</Button>
```

### Adding New Form Fields

```tsx
// In sign-up-form.tsx
<div className="space-y-2">
  <Label htmlFor="phone">Phone Number</Label>
  <Input
    id="phone"
    name="phone"
    type="tel"
    value={formData.phone}
    onChange={onChange}
  />
</div>
```

### Customizing Validation

```tsx
// In register/page.tsx
const validateSignUpForm = () => {
  // Add custom validation rules
  if (signUpData.password.length < 12) {
    newErrors.password = "Password must be at least 12 characters";
  }
  // Add more rules...
};
```
