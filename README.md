# Leitner Flashcard App

Minimal Leitner flashcard system for learning German vocabulary.

## 🚀 Quick Start

برای راه‌اندازی سریع با 2 demo user، [SETUP.md](./SETUP.md) را بخوان.

**TL;DR:**
```bash
# 1. Run migrations in Supabase SQL Editor
# 2. Disable email confirmation in Auth settings
# 3. Update .env.local with your keys
# 4. Login with: user1@example.com / password123
```

---

## Features

- **Leitner System**: 5-box spaced repetition
- **Today Page**: Review only cards that are due
- **Backlog**: Add terms and convert to cards (manual or AI-assisted)
- **Cards Library**: Browse all cards, filter by box, search
- **Supabase Auth**: Email/password authentication
- **Gemini AI**: Generate card backs with meanings, examples, grammar
- **No Duplicates**: Normalized term checking across cards and backlog
- **RLS Policies**: Each user sees only their own data

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Postgres)
- Google Gemini AI

## Demo Users

After running migrations, you can login with:

- **User 1**: `user1@example.com` / `password123`
- **User 2**: `user2@example.com` / `password123`

## Pages

### `/login`
- Email/password authentication
- Sign up (requires email confirmation unless disabled)

### `/today`
- Shows cards due today
- Tap "Show answer" to reveal card back
- Answer "Correct" or "Wrong"
- Correct moves card up one box
- Wrong sends card back to Box 1

### `/backlog`
- Add German terms (e.g., "der Bahnhof")
- Click "AI Complete" to generate full card back via Gemini
- Or click "Manual" to create basic card
- Term converted to Card (starts in Box 1, due today)

### `/cards`
- Browse all cards
- Filter by box (1-5)
- Search by term
- Delete cards

### `/settings`
- View box intervals (read-only for MVP)
- See statistics

## Database Schema

### Tables
- **profiles**: User profiles (auto-created on signup)
- **cards**: Flashcards with term, box, due_date, back_json
- **backlog**: Raw terms waiting to be converted
- **reviews**: Review history (correct/wrong, from_box, to_box)
- **settings**: User settings (intervals)

### RLS Policies
All tables have Row Level Security enabled. Users can only access their own data.

## Card Back JSON Schema

```json
{
  "term": "der Bahnhof",
  "language": "de",
  "level": "B1",
  "pos": "noun",
  "ipa": "ˈbaːnhoːf",
  "meaning_fa": ["ایستگاه قطار"],
  "meaning_en": ["train station"],
  "examples": [
    {
      "de": "Ich warte am Bahnhof.",
      "fa": "من در ایستگاه منتظرم.",
      "note": null
    }
  ],
  "synonyms": [],
  "antonyms": [],
  "collocations": ["am Bahnhof", "zum Bahnhof"],
  "register_note": null,
  "grammar": {
    "noun": {
      "article": "der",
      "plural": "die Bahnhöfe"
    }
  },
  "learning_tips": ["Remember: der (masculine)"]
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

## Common Issues

### Sign up email not received
**Solution**: Disable email confirmation in Supabase:
1. Go to **Authentication → Settings**
2. Turn OFF **"Enable email confirmations"**
3. Save

### Can't login with demo users
**Solution**: Make sure you ran the `20260130000002_create_demo_users.sql` migration

### 404 errors
**Solution**: Check that `.env.local` has valid Supabase credentials

---

## License

MIT
