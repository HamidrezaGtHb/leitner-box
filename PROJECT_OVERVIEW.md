# Leitner Box - Project Overview

## What's Been Built

A complete, production-ready German-Persian learning application with:

### ✅ Core Features Implemented

1. **AI Word Enrichment**
   - OpenAI GPT-4 Mini integration
   - Google Gemini Flash integration
   - Automatic detection of word type (noun/verb/other)
   - Persian translations with proper RTL support
   - Gender identification with color coding
   - Verb conjugations (Präsens, Präteritum, Perfekt)
   - Example sentences (German-Persian pairs)

2. **Leitner Spaced Repetition System**
   - 5-box algorithm implementation
   - Automatic card progression based on performance
   - Cards move forward on correct answers
   - Cards reset to Box 1 on incorrect answers
   - Intervals: 1, 2, 4, 7, 14 days

3. **Daily Goals & Limits**
   - Configurable daily new word limits (5, 10, 15)
   - Progress tracking for daily goals
   - Visual indicators for remaining words

4. **Dashboard & Analytics**
   - Total words learned
   - Cards due today counter
   - 7-day activity chart
   - Box distribution visualization
   - Mastery level tracking
   - Daily statistics (correct/incorrect answers)

5. **Review System**
   - Interactive flashcard UI
   - Click-to-flip animation
   - Session statistics tracking
   - Automatic progression through due cards
   - Completion screen with results

6. **Modern UI/UX**
   - Clean, minimalist design
   - Dark/Light/System theme support
   - Fully responsive (mobile, tablet, desktop)
   - Persian font support (Vazirmatn)
   - German audio pronunciation (SpeechSynthesis API)
   - Gender color coding (Blue/Red/Green)

### 📁 Project Structure

```
leitnerBox/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   ├── page.tsx              # Home page (add words)
│   │   ├── globals.css           # Global styles + Tailwind
│   │   ├── review/
│   │   │   └── page.tsx          # Flashcard review mode
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Statistics & charts
│   │   └── settings/
│   │       └── page.tsx          # User settings
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # Shadcn/UI base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── label.tsx
│   │   ├── flashcard.tsx         # Main flashcard component
│   │   ├── word-card.tsx         # Word display card
│   │   ├── progress-chart.tsx    # 7-day activity chart
│   │   ├── box-distribution.tsx  # Leitner box visualization
│   │   ├── navigation.tsx        # App navigation bar
│   │   ├── theme-provider.tsx    # Dark mode provider
│   │   └── loading.tsx           # Loading state component
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-leitner.ts        # Leitner system state management
│   │   ├── use-settings.ts       # User settings management
│   │   └── use-stats.ts          # Statistics management
│   │
│   ├── lib/                      # Core business logic
│   │   ├── leitner.ts            # Leitner algorithm implementation
│   │   ├── storage.ts            # LocalStorage utilities
│   │   ├── ai-agent.ts           # AI API integration
│   │   └── utils.ts              # Helper functions
│   │
│   └── types/
│       └── index.ts              # TypeScript type definitions
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── README.md
└── SETUP.md
```

### 🎨 Design System

**Color Palette:**
- Primary: Blue (#3b82f6)
- Gender Colors:
  - der (masculine): Blue
  - die (feminine): Red
  - das (neuter): Green
- Success: Green
- Error: Red
- Muted: Gray

**Typography:**
- Primary: Inter (system font)
- Persian: Vazirmatn (Google Fonts)

**Components:**
- Shadcn/UI for base components
- Radix UI for accessible primitives
- Lucide React for icons
- Tailwind CSS for styling

### 🔧 Technical Implementation

**State Management:**
- React hooks for local state
- LocalStorage for persistence
- No external state management library needed

**Data Flow:**
1. User inputs German word
2. AI API enriches with translations & grammar
3. Leitner card created and stored in LocalStorage
4. Cards appear in review queue based on schedule
5. User reviews cards, performance tracked
6. Cards move between boxes based on results

**API Integration:**
- Client-side API calls to OpenAI or Gemini
- Structured JSON responses
- Error handling and validation
- API key stored securely in browser

**Responsive Design:**
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interactive elements
- Adaptive navigation (bottom bar on mobile)

### 🚀 Key Algorithms

**Leitner Box Intervals:**
```typescript
Box 1: 1 day   (new/failed cards)
Box 2: 2 days  (first success)
Box 3: 4 days  (second success)
Box 4: 7 days  (third success)
Box 5: 14 days (mastered)
```

**Card Movement Logic:**
- Correct answer: `box = min(5, box + 1)`
- Incorrect answer: `box = 1` (reset)
- Next review: `now + interval_days * 24h`

**Due Card Detection:**
```typescript
isDue = card.nextReview <= Date.now()
```

### 📊 Data Models

**LeitnerCard:**
- Unique ID
- Word data (meaning, examples, grammar)
- Current box (1-5)
- Last reviewed timestamp
- Next review timestamp
- Correct/incorrect counters
- Created timestamp

**WordData:**
- German word
- Type (noun/verb/other)
- Article (der/die/das)
- Plural form
- Verb conjugations
- Prepositions
- Persian meaning
- Example sentences

**UserSettings:**
- Daily new words limit
- Theme preference
- AI provider selection

### 🎯 User Experience Flow

1. **First Visit:**
   - See welcome message
   - Prompted to configure API key
   - Navigate to Settings
   - Enter API key and save

2. **Adding Words:**
   - Type German word on Home page
   - AI enriches automatically
   - Card added to Box 1
   - Progress updated

3. **Daily Review:**
   - See "Due Today" count on Home
   - Navigate to Review page
   - Flip through flashcards
   - Answer correct/incorrect
   - Cards move between boxes
   - See completion summary

4. **Tracking Progress:**
   - Visit Dashboard
   - View 7-day activity chart
   - Check box distribution
   - Monitor mastery level

### 🔐 Security & Privacy

- API keys stored in browser localStorage (client-side only)
- No server-side data storage
- No user authentication required
- All data stays on user's device

### 🌐 Browser Compatibility

- Modern browsers with ES6+ support
- LocalStorage support required
- SpeechSynthesis API for pronunciation (optional)
- Tested on: Chrome, Firefox, Safari, Edge

### 📱 Responsive Breakpoints

- Mobile: < 768px (single column, bottom navigation)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns, full features)

### 🎨 Accessibility Features

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Color contrast WCAG AA compliant
- Focus indicators

### 🚀 Performance Optimizations

- Next.js static generation for fast page loads
- Client-side rendering for interactive features
- Lazy loading of images and components
- Minimal JavaScript bundle
- Tailwind CSS purge for small CSS bundle

## What's Next (Optional Enhancements)

### Potential Future Features:
1. Export/Import functionality (backup cards)
2. Audio recordings for pronunciations
3. Image support for visual learning
4. Categories/tags for organizing words
5. Search and filter functionality
6. Multiple languages support
7. Cloud sync (Firebase/Supabase)
8. Mobile app (React Native)
9. Offline PWA support
10. Gamification (streaks, achievements)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Notes

- The app is fully functional and ready to use
- All core features have been implemented
- The UI follows modern design principles
- Code is well-structured and maintainable
- TypeScript provides type safety throughout
