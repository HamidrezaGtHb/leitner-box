# Leitner Box - German-Persian Learning System

A professional, modern web application for learning German vocabulary using the Leitner spaced repetition system with AI-powered word enrichment.

## Features

- **AI Word Enrichment**: Automatically fetch word meanings, gender, conjugations, and example sentences in Persian
- **Leitner System**: 5-box spaced repetition algorithm for optimal learning
- **Daily Goals**: Set daily limits (5, 10, or 15 new words)
- **Dashboard**: Track progress with charts and statistics
- **Flashcard Review**: Interactive flip cards with German pronunciation
- **Dark/Light Mode**: Beautiful UI that adapts to your preference
- **Persian Support**: Full RTL support with Vazirmatn font

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI + Radix UI
- **Icons**: Lucide React
- **Storage**: LocalStorage
- **AI**: OpenAI GPT-4 or Google Gemini

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key OR Google Gemini API key

### Installation

1. Clone or navigate to the project directory:
```bash
cd leitnerBox
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Configuration

1. Navigate to **Settings** page
2. Choose your AI provider (OpenAI or Gemini)
3. Enter your API key:
   - **OpenAI**: Get from [platform.openai.com](https://platform.openai.com)
   - **Gemini**: Get from [ai.google.dev](https://ai.google.dev)
4. Set your daily new words goal (5, 10, or 15)

## How It Works

### Leitner System

The app uses a 5-box spaced repetition system:

- **Box 1**: Review daily (new cards start here)
- **Box 2**: Review every 2 days
- **Box 3**: Review every 4 days
- **Box 4**: Review weekly
- **Box 5**: Review bi-weekly (mastered)

When you answer correctly, the card moves to the next box. When incorrect, it returns to Box 1.

### Gender Color Coding

German nouns are color-coded by gender:
- **der** (masculine) - Blue
- **die** (feminine) - Red
- **das** (neuter) - Green

### Word Types Supported

- **Nouns**: Shows article, plural form, meaning, and examples
- **Verbs**: Shows conjugation (Präsens, Präteritum, Perfekt), prepositions, and examples
- **Other**: Shows meaning and examples

## Usage

### Adding Words

1. Enter a German word in the input field on the Home page
2. Click the + button or press Enter
3. The AI will automatically fetch:
   - Persian meaning
   - Gender (for nouns)
   - Conjugations (for verbs)
   - Two example sentences

### Reviewing Cards

1. Navigate to **Review** page
2. Read the German word on the front of the card
3. Click to flip and see the Persian translation
4. Click "I knew it!" if correct or "I didn't know" if incorrect
5. Cards automatically move between boxes based on your answers

### Tracking Progress

1. Visit the **Dashboard** to see:
   - Total words learned
   - Cards due today
   - Daily activity chart
   - Distribution across boxes
   - Mastery level

## Project Structure

```
leitnerBox/
├── src/
│   ├── app/                 # Next.js pages
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home page
│   │   ├── review/          # Review mode
│   │   ├── dashboard/       # Statistics
│   │   └── settings/        # Settings
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components
│   │   ├── flashcard.tsx
│   │   ├── word-card.tsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── use-leitner.ts
│   │   ├── use-settings.ts
│   │   └── use-stats.ts
│   ├── lib/                 # Core logic
│   │   ├── leitner.ts       # Leitner algorithm
│   │   ├── storage.ts       # LocalStorage utils
│   │   ├── ai-agent.ts      # AI integration
│   │   └── utils.ts         # Helpers
│   └── types/               # TypeScript types
│       └── index.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## AI Integration

The app sends the following prompt to the AI:

- Analyzes the German word
- Returns structured JSON with word data
- Includes Persian translations
- Provides grammatical information
- Generates example sentences

## Data Storage

All data is stored locally in your browser using LocalStorage:
- `leitner_cards`: Your flashcards
- `leitner_settings`: App preferences
- `leitner_daily_stats`: Progress statistics

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
