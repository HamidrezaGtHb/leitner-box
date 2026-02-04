# Setup Instructions

## Quick Start (با 2 Demo Users)

### 1. Supabase Setup

1. برو به [supabase.com](https://supabase.com) و یک project بساز
2. برو به **SQL Editor** و migrations را به ترتیب اجرا کن:
   - `supabase/migrations/20260130000001_initial_schema.sql`
   - `supabase/migrations/20260130000002_create_demo_users.sql`

3. برو به **Settings → API** و این موارد را کپی کن:
   - Project URL
   - Anon public key

4. این را در `.env.local` قرار بده:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-key
```

### 2. Disable Email Confirmation (مهم!)

1. برو به **Authentication → Settings**
2. **"Enable email confirmations"** را **OFF** کن
3. Save کن

### 3. Demo Users (Already Created!)

بعد از اجرای migrations، این 2 user آماده‌اند:

**User 1:**
- Email: `user1@example.com`
- Password: `password123`

**User 2:**
- Email: `user2@example.com`
- Password: `password123`

### 4. Run App

```bash
npm run dev
```

برو به `http://localhost:3000` و با یکی از users بالا login کن!

---

## اگر می‌خواهی user جدید اضافه کنی:

### روش 1: از SQL Editor
```sql
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
)
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'YOUR_EMAIL@example.com',
  crypt('YOUR_PASSWORD', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated',
  'authenticated'
);

-- Get the user ID
SELECT id, email FROM auth.users WHERE email = 'YOUR_EMAIL@example.com';

-- Insert identity (use the user ID from above)
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  'USER_ID_FROM_ABOVE',
  'USER_ID_FROM_ABOVE',
  '{"sub":"USER_ID_FROM_ABOVE","email":"YOUR_EMAIL@example.com"}',
  'email',
  now(),
  now(),
  now()
);
```

### روش 2: Disable Email Confirmation و از UI sign up کن

---

## Troubleshooting

### Email Confirmation Issue
اگر sign up کردی اما email نیومد:
1. برو **Authentication → Settings**
2. **"Enable email confirmations"** را OFF کن
3. User را از **Authentication → Users** حذف کن
4. دوباره sign up کن

### Can't Login
- مطمئن شو که email confirmation OFF است
- چک کن که `.env.local` درست باشد
- در **Authentication → Users** ببین که user وجود دارد

---

## Production Deployment

وقتی deploy می‌کنی:
1. Demo users را حذف کن (برای امنیت)
2. Email confirmation را ON کن
3. Email templates را customize کن
4. SMTP provider اضافه کن (اگر می‌خواهی custom emails داشته باشی)
