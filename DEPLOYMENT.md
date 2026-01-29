# Deployment Guide - Strict Leitner System

This guide will help you deploy the Leitner Box app with Supabase Authentication and database.

## Prerequisites

- A [Supabase](https://supabase.com) account (free tier works)
- A [Vercel](https://vercel.com) account (free tier works)
- GitHub repository (already set up)
- Gemini API key (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

---

## Step 1: Set Up Supabase Project

### 1.1 Create a New Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name**: leitner-box
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes 2-3 minutes)

### 1.2 Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase-migration-v2.sql` from your project
4. Paste into the SQL Editor
5. Click **"Run"** (green play button)
6. You should see: "Success. No rows returned"

### 1.3 Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it's enabled by default)
3. (Optional) Configure email templates in **Authentication** → **Email Templates**

### 1.4 Get API Credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

---

## Step 2: Configure Environment Variables Locally

### 2.1 Create `.env.local`

In your project root, create a file called `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Gemini API Key
GEMINI_API_KEY=your-gemini-api-key-here
```

Replace:
- `your-project.supabase.co` with your actual Supabase URL
- `your-anon-key-here` with your actual anon key
- `your-gemini-api-key-here` with your Gemini API key

### 2.2 Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and:
1. Click "Sign up" to create an account
2. Verify you can sign in
3. Try adding a card
4. Check Supabase dashboard → **Authentication** → **Users** to see your account

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repository

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Select **"Import Git Repository"**
3. Choose your GitHub repository: `HamidrezaGtHb/leitner-box`
4. Click **"Import"**

### 3.2 Configure Environment Variables

In the **"Configure Project"** section:

1. Click **"Environment Variables"**
2. Add each variable:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |
| `GEMINI_API_KEY` | `your-gemini-key` |

3. Click **"Deploy"**

### 3.3 Wait for Deployment

- Deployment takes 2-3 minutes
- You'll get a URL like: `https://leitner-box-xxx.vercel.app`

---

## Step 4: Configure Supabase for Production

### 4.1 Add Site URL

1. Go to Supabase dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to:
   - **Site URL**: `https://leitner-box-xxx.vercel.app`
   - **Redirect URLs**: Add:
     - `https://leitner-box-xxx.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (for local dev)

### 4.2 Test Production Deployment

1. Visit your Vercel URL
2. Sign up with a new account
3. Verify authentication works
4. Try adding cards, reviewing, etc.

---

## Step 5: Optional Enhancements

### 5.1 Custom Domain

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `learn-german.com`)
3. Follow Vercel's DNS instructions
4. Update Supabase Site URL with your custom domain

### 5.2 Email Configuration

By default, Supabase uses their email service. For production:

1. Go to **Project Settings** → **Authentication**
2. Click **"Email Provider"**
3. Configure your own SMTP (Sendgrid, AWS SES, etc.)

### 5.3 Enable Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Follow the setup wizard
4. Add Google Client ID and Secret
5. Users can now sign in with Google

---

## Step 6: Verify Everything Works

### Production Checklist

- [ ] Sign up works
- [ ] Sign in works
- [ ] Password reset works
- [ ] Cards are saved to Supabase (check **Database** → **Table Editor** → **cards**)
- [ ] Settings persist
- [ ] Daily stats are tracked
- [ ] Locked Mode works
- [ ] AI Chat works with Gemini
- [ ] RLS policies prevent users from seeing each other's data

### Test Multi-User

1. Sign up with Account A
2. Add 5 cards
3. Sign out
4. Sign up with Account B
5. Verify Account B sees 0 cards (RLS working!)
6. Add 3 cards
7. Sign out and sign in as Account A
8. Verify Account A still sees 5 cards

---

## Troubleshooting

### "Supabase Not Configured" Error

- Check environment variables in Vercel
- Make sure `NEXT_PUBLIC_` prefix is correct
- Redeploy after adding variables

### "Authentication Error"

- Verify Site URL in Supabase matches your deployment URL
- Check redirect URLs include `/auth/callback`
- Clear browser cache and try again

### "API Key Invalid" (Gemini)

- Get a new key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Update `GEMINI_API_KEY` in Vercel
- Redeploy

### Cards Not Saving

- Check Supabase **Database** → **Table Editor**
- Verify RLS policies are enabled
- Check browser console for errors

---

## Updating the App

When you push new code to GitHub:

1. Vercel automatically deploys
2. Wait 2-3 minutes
3. Visit your site to see changes

For database changes:

1. Write new migration SQL
2. Run in Supabase SQL Editor
3. Test with a few cards
4. Deploy code changes to Vercel

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Supabase logs (Database → Logs)
3. Check browser console (F12 → Console)
4. Verify all environment variables are set

---

## Success! 🎉

Your Leitner Box app is now live with:
- ✅ Supabase authentication
- ✅ Multi-user support with RLS
- ✅ Strict Leitner scheduling
- ✅ Locked Mode
- ✅ AI-powered word enrichment
- ✅ Hybrid storage (Supabase + LocalStorage fallback)

Happy learning! 📚
