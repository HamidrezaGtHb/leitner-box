# Usage Guide

## Getting Started in 3 Steps

### 1. Configure Your API Key

Before adding words, you need to set up your AI provider:

1. Navigate to **Settings** page
2. Select **API Key** tab
3. Choose provider:
   - **OpenAI**: Uses GPT-4o-mini model (recommended, faster, cheaper)
   - **Gemini**: Uses Gemini 1.5 Flash model (good alternative)
4. Paste your API key
5. Click **Save API Key**

**Getting API Keys:**
- OpenAI: Sign up at [platform.openai.com](https://platform.openai.com) → API Keys
- Gemini: Sign up at [ai.google.dev](https://ai.google.dev) → Get API Key

### 2. Set Your Daily Goal

1. Stay in **Settings**
2. Go to **Learning** tab
3. Choose your daily new words limit:
   - **5 words**: Beginner/busy schedule
   - **10 words**: Recommended for most learners
   - **15 words**: Advanced/intensive learning

### 3. Start Adding Words

1. Go to **Home** page
2. Type a German word in the input field
3. Press Enter or click the + button
4. Wait 2-3 seconds for AI enrichment
5. Your word is now in your collection!

## Example Workflow

### Day 1: Building Your Vocabulary

**Add 10 nouns:**
```
Haus → AI returns: "das Haus" (neuter, green), plural "Häuser", meaning + examples
Tisch → AI returns: "der Tisch" (masculine, blue), plural "Tische", meaning + examples
Tür → AI returns: "die Tür" (feminine, red), plural "Türen", meaning + examples
...
```

**Add 5 verbs:**
```
lernen → AI returns: conjugations (lerne/lernte/hat gelernt), meaning + examples
gehen → AI returns: conjugations (gehe/ging/ist gegangen), prepositions, meaning + examples
...
```

All 15 words are now in **Box 1** and will be due for review tomorrow.

### Day 2: First Review

1. Go to **Review** page
2. You'll see 15 cards due
3. For each card:
   - Read the German word
   - Try to recall the meaning
   - Click to flip and see the answer
   - Click "I knew it!" → moves to Box 2 (next review in 2 days)
   - Click "I didn't know" → stays in Box 1 (review tomorrow)

### Day 3: Mixed Review + New Words

1. Review cards from Day 2 that you got wrong (still in Box 1)
2. Add 10 new words
3. Your cards are now distributed across boxes

### Week 1: Steady Progress

By the end of week 1:
- **Box 1**: New words + failed reviews (daily)
- **Box 2**: Words you got right once (every 2 days)
- **Box 3**: Words you got right twice (every 4 days)
- **Box 4**: Words you're mastering (weekly)
- **Box 5**: Fully mastered words (bi-weekly)

## Using Each Feature

### Home Page

**Quick Stats Cards:**
- **Due Today**: Number of cards ready to review (click to go to Review)
- **New Words Today**: Progress bar showing X/10 words added
- **Total Cards**: Your complete vocabulary size

**Add Word Input:**
- Type any German word or verb
- AI automatically detects if it's a noun or verb
- Returns appropriate information:
  - Nouns: article, plural, meaning, examples
  - Verbs: conjugations, prepositions, meaning, examples

**Recent Words:**
- Shows your last 5 added words
- Click speaker icon to hear pronunciation
- Review the information before your first quiz

### Review Page

**Flashcard Interface:**
- Front: Shows German word with grammatical info
- Back: Shows Persian translation and examples
- Click anywhere on card to flip

**Session Controls:**
- Progress bar at top shows position
- Session stats show correct/incorrect count
- Cards auto-advance after answering

**Review Strategy Tips:**
1. Read the word carefully
2. Try to recall meaning BEFORE flipping
3. Be honest with yourself
4. Use "I didn't know" if you hesitated too much

### Dashboard Page

**Statistics Overview:**
- Total Words: Complete vocabulary count
- Due Today: Cards waiting for review
- Studied Today: Cards reviewed today
- Accuracy Today: Percentage correct

**Activity Chart:**
- Last 7 days visualization
- Green bars: Correct answers
- Red bars: Incorrect answers
- Hover to see exact numbers

**Box Distribution:**
- Visual representation of cards in each box
- Progress bars show percentage in each level
- Track your mastery progression

**Mastery Level:**
- Mastered: Cards in Box 5
- Learning: Cards in Boxes 1-4
- Goal: Get all cards to Box 5!

### Settings Page

**API Key Tab:**
- Switch between OpenAI and Gemini
- Update API key anytime
- Keys stored locally in browser

**Learning Tab:**
- Adjust daily new words limit
- Changes apply immediately

**Appearance Tab:**
- Toggle Light/Dark/System theme
- View gender color coding reference
- Theme persists across sessions

## Best Practices

### Daily Routine

**Morning (5 minutes):**
1. Check "Due Today" on Home page
2. Complete all due reviews
3. Add new words up to your daily limit

**Evening (5 minutes):**
1. Review any remaining due cards
2. Check Dashboard to see progress
3. Plan tomorrow's words

### Effective Learning

**Do's:**
- Review consistently every day
- Add words in context (from reading/lessons)
- Study example sentences carefully
- Use pronunciation feature regularly
- Start with common, useful words

**Don'ts:**
- Don't add too many words at once
- Don't skip reviews (consistency is key)
- Don't mark incorrect cards as correct
- Don't add words you'll never use

### Word Selection Strategy

**Beginners:**
- Basic nouns (Haus, Auto, Buch)
- Common verbs (sein, haben, gehen)
- Everyday adjectives (gut, schön, klein)

**Intermediate:**
- Topic-specific vocabulary
- Phrasal verbs with prepositions
- Less common but useful words

**Advanced:**
- Academic/professional terms
- Idiomatic expressions
- Nuanced synonyms

## Keyboard Shortcuts

- **Enter**: Submit word on Home page
- **Click/Tap**: Flip flashcard
- **Click buttons**: Answer review questions

## Data Management

### Viewing Your Data

Your data is in browser LocalStorage:
1. Open browser DevTools (F12)
2. Go to Application/Storage → LocalStorage
3. Look for `leitner_cards`, `leitner_settings`, `leitner_daily_stats`

### Backup Your Data

To backup (manual method):
1. Open DevTools → Console
2. Run: `JSON.stringify(localStorage)`
3. Copy the output and save to a file

### Restore Data

To restore:
1. Open DevTools → Console
2. Run: `localStorage.setItem('leitner_cards', 'YOUR_BACKUP_DATA')`

### Reset Everything

To start fresh:
1. Open DevTools → Application → LocalStorage
2. Delete all `leitner_*` entries
3. Refresh the page

## Troubleshooting

### "Daily limit reached"
- You've added your daily maximum
- Wait until tomorrow or increase limit in Settings

### "Please enter your API key"
- Go to Settings → API Key tab
- Configure your provider and key

### Word not being enriched
- Check API key is valid
- Verify you have API credits/quota
- Check browser console for errors
- Try switching providers

### Cards not saving
- Check LocalStorage is enabled
- Try different browser
- Check browser storage isn't full

### Persian text showing as boxes
- Ensure internet connection (font loads from Google)
- Wait a moment for font to load
- Refresh the page

## Example Learning Path

### Week 1: Foundations (70 words)
- Mon-Fri: 10 common nouns + 4 basic verbs
- Daily reviews: ~5-10 minutes
- Focus: Articles and basic meanings

### Week 2: Building (140 words)
- Continue 10 words/day
- Start seeing Box 2-3 cards
- Reviews increase to ~10-15 minutes
- Focus: Example sentences

### Week 3: Acceleration (210 words)
- Increase to 15 words/day if comfortable
- Cards distributed across all boxes
- Reviews: ~15-20 minutes
- Focus: Verb conjugations

### Month 1: Milestone (300+ words)
- Solid foundation built
- Many cards in Boxes 4-5
- Efficient review sessions
- Ready for real conversations!

## Pro Tips

1. **Add words from your textbook/course**: More relevant and contextual
2. **Review at same time daily**: Build a habit
3. **Don't just memorize**: Understand the examples
4. **Use words in sentences**: Practice actively
5. **Track your progress**: Celebrate milestones
6. **Adjust pace**: Listen to your capacity
7. **Focus on accuracy**: Better to know 100 words well than 500 poorly

## Support

If you encounter issues:
1. Check this guide first
2. Review SETUP.md for installation issues
3. Check browser console for errors
4. Verify API key and credits

Happy Learning! 📚
