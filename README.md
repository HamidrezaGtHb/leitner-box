# Leitner Box - German Learning System 🇩🇪

A professional, modern German-Persian flashcard app using the **Strict Leitner Spaced Repetition System** with AI-powered word enrichment.

## ✨ Features

### Core Learning System
- **Strict Leitner Scheduling**: Cards move through 5 boxes with precise intervals (1, 2, 4, 7, 14 days)
- **Locked Mode**: Enforces discipline by only allowing review of due cards
- **Hard Button**: Mark difficult cards to review them more frequently
- **Daily Goals**: Set limits (5, 10, or 15 new words per day)
- **Progress Tracking**: Visualize your learning with charts and statistics

### AI-Powered Features
- **AI Chat Interface**: Natural language commands like "Generate 10 B2 words about travel"
- **Automatic Word Enrichment**: AI adds:
  - Persian meaning
  - Article & gender (with color coding)
  - Plural forms for nouns
  - Verb conjugations (Präsens, Präteritum, Perfekt)
  - Example sentences (German + Persian translation)
  - Collocations and prepositions
- **OCR Support**: Upload images to extract German words
- **Smart Deduplication**: Prevents adding duplicate words

### Multi-User Support
- **Supabase Authentication**: Secure email/password login
- **Row Level Security (RLS)**: Each user's data is completely isolated
- **Hybrid Storage**: Works with Supabase (cloud) or LocalStorage (offline fallback)

### Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching
- **Persian Font Support**: Beautiful Vazirmatn font for Persian text
- **Duolingo-inspired**: Clean, minimalist design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier)
- Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HamidrezaGtHb/leitner-box.git
cd leitner-box
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GEMINI_API_KEY=your-gemini-api-key
```

4. **Run database migration**

- Open Supabase SQL Editor
- Copy contents of `supabase-migration-v2.sql`
- Run the migration

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📖 Usage

### Getting Started
1. **Sign Up**: Create an account or continue without authentication (LocalStorage only)
2. **Add Words**: Use AI Chat to generate words or add manually
3. **Review Daily**: Study due cards in Locked Mode
4. **Track Progress**: View your learning statistics on the Dashboard

### AI Chat Commands
- `"Generate 10 B2 words about travel"` - Create word lists
- `"Add der Bahnhof"` - Add a single word
- Upload an image with German text - Extract words automatically

### Locked Mode
- Enable in Settings for disciplined learning
- Only shows cards that are due for review
- Displays countdown to next review session
- Blocks access to library and future cards

## 🏗️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini Pro
- **OCR**: Tesseract.js
- **Deployment**: Vercel

## 📂 Project Structure

```
leitner-box/
├── src/
│   ├── app/              # Next.js pages and API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── api/          # API endpoints
│   │   └── ...           # App pages (home, review, settings, etc.)
│   ├── components/       # React components
│   │   ├── ui/           # Shadcn/UI components
│   │   └── ...           # Custom components
│   ├── contexts/         # React contexts (auth)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   │   ├── leitner.ts    # Leitner algorithm
│   │   ├── locked-mode.ts # Locked mode logic
│   │   ├── storage-adapter.ts # Hybrid storage
│   │   ├── ai-agent.ts   # AI integration
│   │   └── ...
│   └── types/            # TypeScript types
├── supabase-migration-v2.sql  # Database schema
└── DEPLOYMENT.md         # Deployment guide
```

## 🔐 Security

- **RLS Policies**: Users can only access their own data
- **Server-side API**: AI API keys never exposed to client
- **Authentication**: Secure Supabase Auth with email verification
- **Environment Variables**: Sensitive data stored securely

## 📊 Database Schema

### Tables
- **cards**: Flashcards with Leitner scheduling data
- **settings**: User preferences (locked mode, intervals, etc.)
- **daily_stats**: Learning statistics per day
- **backlog**: Scheduled words for future addition

### Key Features
- `normalized_key`: Prevents duplicate words
- `box_index`: Current Leitner box (1-5)
- `next_review_at`: Precise scheduling timestamp
- `last_answer`: Tracks performance ('correct', 'wrong', 'hard')

## 🎯 Strict Leitner Rules

1. **Correct Answer** → Move to next box (max box 5)
2. **Wrong Answer** → Reset to Box 1
3. **Hard Answer** → Move back one box (min box 1)
4. **Review Intervals**: 
   - Box 1: 1 day
   - Box 2: 2 days
   - Box 3: 4 days
   - Box 4: 7 days
   - Box 5: 14 days

## 🔧 Configuration

### Review Intervals
Customize in Settings:
```json
[1, 2, 4, 7, 14]  // days per box
```

### Daily Limits
- 5 new words/day (beginner)
- 10 new words/day (intermediate)
- 15 new words/day (advanced)

### Locked Mode
- Enable/disable in Settings
- Strictly enforces due-only review
- Shows countdown to next session

## 🧪 Testing

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check

# Build for production
npm run build
```

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Vercel with Supabase.

Quick deploy:
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and create a Pull Request

## 📝 License

MIT License - feel free to use this project for learning!

## 🙏 Acknowledgments

- **Leitner System**: Sebastian Leitner's spaced repetition method
- **Shadcn/UI**: Beautiful component library
- **Supabase**: Amazing backend-as-a-service
- **Google Gemini**: Powerful AI for word enrichment

## 📧 Contact

- GitHub: [@HamidrezaGtHb](https://github.com/HamidrezaGtHb)
- Email: hamidrezahaji.uix@gmail.com

---

**Happy Learning! 🎓📚**
