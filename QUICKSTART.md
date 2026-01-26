# Quick Start Guide

## 🚀 Get Up and Running in 2 Minutes

### Step 1: Open the App
The development server is already running at:
**http://localhost:3000**

Open this URL in your browser.

### Step 2: Configure API Key (One-time setup)

1. Click **Settings** in the navigation
2. Under **API Key** tab:
   - Choose **OpenAI** (recommended) or **Gemini**
   - Paste your API key
   - Click **Save API Key**

**Don't have an API key?**
- OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Gemini: [ai.google.dev](https://ai.google.dev)

### Step 3: Add Your First Word

1. Return to **Home** page
2. Type a German word (try: "Haus")
3. Press Enter
4. Wait 2-3 seconds
5. See the enriched word card with translation!

### Step 4: Review Tomorrow

1. Tomorrow, you'll see "1 card due today"
2. Click **Review** in navigation
3. Click the flashcard to flip it
4. Answer honestly: "I knew it!" or "I didn't know"
5. Card moves to appropriate box

## That's It!

You're now using a professional spaced repetition system to learn German.

---

## Quick Reference

### Pages

| Page | Purpose | URL |
|------|---------|-----|
| Home | Add new words | `/` |
| Review | Study flashcards | `/review` |
| Library | Browse all words | `/library` |
| Dashboard | View statistics | `/dashboard` |
| Settings | Configure app | `/settings` |

### Daily Workflow

**Morning (5 min):**
1. Open app → Check "Due Today"
2. Go to Review → Complete all cards
3. Add new words (up to your limit)

**Done!** That's your daily German practice.

### Understanding the Boxes

- **Box 1** (Daily): New or failed cards
- **Box 2** (2 days): Got it right once
- **Box 3** (4 days): Got it right twice
- **Box 4** (7 days): Got it right 3 times
- **Box 5** (14 days): Mastered!

### Gender Colors

- 🔵 **der** (Blue) = Masculine
- 🔴 **die** (Red) = Feminine  
- 🟢 **das** (Green) = Neuter

---

## Troubleshooting

**"Please enter your API key"**
→ Go to Settings → API Key → Enter and save

**"Daily limit reached"**
→ Come back tomorrow or increase limit in Settings → Learning

**Persian text not showing**
→ Wait a moment for Google Fonts to load

**Need to restart server?**
```bash
npm run dev
```

---

## Next Steps

1. ✅ Add 10 words today
2. ✅ Set a reminder to review tomorrow
3. ✅ Check Dashboard to see progress
4. ✅ Explore Library to browse words
5. ✅ Customize theme in Settings

**Enjoy learning German!** 🇩🇪
