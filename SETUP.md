# Setup Guide

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open Your Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Initial Configuration

### Step 1: Configure API Key

1. Click on **Settings** in the navigation
2. Go to the **API Key** tab
3. Choose your AI provider:
   - **OpenAI** (Recommended): Get API key from [platform.openai.com](https://platform.openai.com)
   - **Gemini**: Get API key from [ai.google.dev](https://ai.google.dev)
4. Paste your API key and click **Save**

### Step 2: Set Daily Goals

1. In Settings, go to the **Learning** tab
2. Choose your daily new words limit: 5, 10, or 15
3. This will be saved automatically

### Step 3: Add Your First Word

1. Return to **Home** page
2. Type a German word in the input field (e.g., "Haus", "lernen", "schön")
3. Press Enter or click the + button
4. The AI will automatically fetch:
   - Persian meaning
   - Gender and plural (for nouns)
   - Conjugations (for verbs)
   - Example sentences

## Features Overview

### Home Page
- Add new German words with AI enrichment
- View recent words added
- See quick stats (due today, new words progress, total cards)
- Get notified when cards are due for review

### Review Page
- Interactive flashcard interface
- Click to flip between German and Persian
- Audio pronunciation using browser's speech synthesis
- Track session statistics (correct/incorrect)
- Automatic progression through due cards

### Dashboard
- View total words learned
- See cards due today
- Track daily activity with charts
- View box distribution (Leitner system)
- Monitor mastery level

### Settings
- Configure AI provider and API key
- Set daily new words limit
- Toggle between light/dark/system theme
- View gender color coding reference

## Gender Color Coding

German nouns are color-coded by article:
- **der** (masculine) → Blue
- **die** (feminine) → Red
- **das** (neuter) → Green

## Leitner System Explained

Cards move through 5 boxes based on your performance:

| Box | Interval | Description |
|-----|----------|-------------|
| 1   | Daily    | New or incorrect cards |
| 2   | 2 days   | First successful review |
| 3   | 4 days   | Second successful review |
| 4   | 7 days   | Third successful review |
| 5   | 14 days  | Mastered cards |

- **Correct answer**: Card moves to next box
- **Incorrect answer**: Card returns to Box 1

## Tips for Learning

1. **Be Consistent**: Review your due cards daily
2. **Don't Rush**: Focus on quality over quantity
3. **Use Examples**: Read the example sentences to understand context
4. **Practice Pronunciation**: Click the speaker icon to hear proper pronunciation
5. **Adjust Goals**: Start with 5 words/day and increase as comfortable

## Troubleshooting

### API Key Not Working
- Verify the key is correct and has sufficient credits
- Check that you selected the correct provider (OpenAI vs Gemini)
- Look for error messages when adding words

### Cards Not Saving
- Check browser console for errors
- Ensure localStorage is enabled in your browser
- Try clearing browser cache if issues persist

### Persian Text Not Displaying
- The app uses Vazirmatn font loaded from Google Fonts
- Ensure you have an internet connection on first load

## Data Storage

All your data is stored locally in your browser:
- **Cards**: Your flashcards and progress
- **Settings**: Your preferences
- **Stats**: Daily statistics for charts

**Important**: Clearing browser data will delete all your cards. To backup, you can export localStorage data from browser DevTools.

## Building for Production

```bash
npm run build
npm start
```

The production build will be optimized and ready for deployment.

## Technology Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v3
- Shadcn/UI components
- Radix UI primitives
- Lucide React icons
- next-themes for dark mode

Enjoy learning German! 🇩🇪
