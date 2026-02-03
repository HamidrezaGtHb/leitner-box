# Leitner Flashcard App

Minimal Leitner flashcard system for learning German vocabulary.

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

## Local Setup

1. **Clone and install**:
```bash
git clone <repo>
cd leitner-box
npm install
```

2. **Set up Supabase**:
   - Create a project at https://supabase.com
   - Go to Settings > API and copy:
     - Project URL
     - Anon public key
   - Go to SQL Editor and run the migration:
     ```
     supabase/migrations/20260130000001_initial_schema.sql
     ```

3. **Get Gemini API key**:
   - Go to https://ai.google.dev/
   - Create an API key

4. **Environment variables**:
   - Copy `.env.example` to `.env.local`
   - Fill in your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   GEMINI_API_KEY=your-gemini-key
   ```

5. **Run dev server**:
```bash
npm run dev
```

6. **Open http://localhost:3000**

7. **Sign up** with email/password

## Usage

### Today Page
- Shows cards due today
- Tap "Show answer" to reveal card back
- Answer "Correct" or "Wrong"
- Correct moves card up one box
- Wrong sends card back to Box 1

### Backlog Page
- Add German terms (e.g., "der Bahnhof")
- Click "AI Complete" to generate full card back via Gemini
- Or click "Manual" to create basic card
- Term converted to Card (starts in Box 1, due today)

### Cards Page
- Browse all cards
- Filter by box (1-5)
- Search by term
- Delete cards

### Settings Page
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

## Deployment

### Vercel
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## License

MIT
