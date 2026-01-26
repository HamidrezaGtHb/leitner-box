# Leitner System - How It Works

## The Algorithm

### Box System

```
┌─────────────────────────────────────────────────────────────┐
│  BOX 1          BOX 2          BOX 3          BOX 4     BOX 5│
│  Daily          2 Days         4 Days         7 Days  14 Days│
│  ┌────┐         ┌────┐         ┌────┐         ┌────┐  ┌────┐│
│  │New │         │    │         │    │         │    │  │Won!││
│  │ ↓  │ ──────→ │ ↓  │ ──────→ │ ↓  │ ──────→ │ ↓  │→ │ ✓  ││
│  │    │         │    │         │    │         │    │  │    ││
│  └────┘         └────┘         └────┘         └────┘  └────┘│
│    ↑              ↑              ↑              ↑             │
│    └──────────────┴──────────────┴──────────────┘            │
│              Incorrect Answer (Reset to Box 1)               │
└─────────────────────────────────────────────────────────────┘
```

### Card Movement Rules

**✅ Correct Answer:**
```
Current Box → Next Box (max: Box 5)
Box 1 → Box 2
Box 2 → Box 3
Box 3 → Box 4
Box 4 → Box 5
Box 5 → Box 5 (stays)
```

**❌ Incorrect Answer:**
```
Any Box → Box 1 (reset)
Box 2 → Box 1
Box 3 → Box 1
Box 4 → Box 1
Box 5 → Box 1
```

### Review Intervals

| Box | Interval | When to Review | Purpose |
|-----|----------|---------------|---------|
| 📕 1 | 1 day | Every day | New cards, needs frequent practice |
| 📙 2 | 2 days | Every 2 days | First success, building familiarity |
| 📗 3 | 4 days | Twice weekly | Second success, forming memory |
| 📘 4 | 7 days | Weekly | Third success, solidifying knowledge |
| 📓 5 | 14 days | Bi-weekly | Mastered, long-term retention |

---

## Example Learning Journey

### Day 1: New Word Added
```
Word: "das Haus" (the house)
Status: Added to Box 1
Next Review: Tomorrow
```

### Day 2: First Review
```
Review: Flip card, recall meaning
Answer: ✅ Correct!
New Status: Moved to Box 2
Next Review: In 2 days (Day 4)
```

### Day 4: Second Review
```
Review: Recall "das Haus"
Answer: ✅ Correct!
New Status: Moved to Box 3
Next Review: In 4 days (Day 8)
```

### Day 8: Third Review
```
Review: Recall "das Haus"
Answer: ✅ Correct!
New Status: Moved to Box 4
Next Review: In 7 days (Day 15)
```

### Day 15: Fourth Review
```
Review: Recall "das Haus"
Answer: ❌ Incorrect (forgot)
New Status: Back to Box 1
Next Review: Tomorrow
```

**Key Lesson**: Even if you forget after weeks, the system ensures you practice again until mastered.

---

## Why It Works

### Scientific Basis

1. **Spaced Repetition**: Reviews timed just before you forget
2. **Active Recall**: Retrieving from memory strengthens it
3. **Immediate Feedback**: Know if you're right or wrong
4. **Adaptive Difficulty**: More review for harder words
5. **Long-term Retention**: Gradual spacing prevents forgetting

### The Forgetting Curve

```
Memory
  100% │
       │╲
       │ ╲               ← Without review
    75%│  ╲___
       │      ╲___       ← With Leitner reviews
    50%│          ╲___   ↑  ↑  ↑  ↑  ↑
       │              ╲__(1d)(2d)(4d)(7d)(14d)
    25%│
       │
     0%└─────────────────────────────────→ Time
```

### Efficiency Benefits

- **Optimal Timing**: Review when needed, not too early or late
- **Focus on Weak Cards**: Difficult words reviewed more often
- **Reduce Workload**: Mastered words need less attention
- **Measurable Progress**: See cards move through boxes
- **Motivation**: Visual progress encourages continued study

---

## Usage Strategy

### Starting Out

**Week 1:**
- Add 5-10 words/day
- Everything in Box 1
- Review daily
- Expect ~70% accuracy
- Don't worry about perfection

**Week 2:**
- Cards start spreading to Box 2-3
- Reviews become varied
- Some words move up quickly
- Some return to Box 1 (normal!)
- Accuracy improves to ~75%

**Month 1:**
- Cards in all 5 boxes
- Clear mastery progression
- Efficient review sessions
- High retention rate
- Confidence building

### Daily Routine

**Recommended Schedule:**
```
Morning:
├─ Check "Due Today" count
├─ Complete all reviews (5-15 min)
└─ Add new words to daily limit

Evening:
├─ Optional: Extra review if time
└─ Check Dashboard for progress
```

### Success Tips

1. **Consistency Over Intensity**
   - Better: 10 words/day for 30 days
   - Worse: 100 words in 3 days, then quit

2. **Honest Answers**
   - Mark incorrect if you hesitated
   - Don't cheat yourself
   - Repetition is learning

3. **Use the System**
   - Trust the algorithm
   - Don't manually manage boxes
   - Let the system schedule reviews

4. **Add Contextual Words**
   - From your textbook
   - From conversations
   - Words you actually need

---

## The Math Behind It

### Card Distribution (After 30 Days)

Example with 10 words/day, 80% accuracy:

```
Box 1: 60 cards  (20% - struggling words)
Box 2: 80 cards  (27% - learning)
Box 3: 70 cards  (23% - familiar)
Box 4: 50 cards  (17% - confident)
Box 5: 40 cards  (13% - mastered)
────────────────────────────────
Total: 300 cards (100%)
```

### Daily Review Load

```
Box 1: 60 cards × 1.0 (daily)      = 60 reviews/day
Box 2: 80 cards × 0.5 (every 2d)   = 40 reviews/day
Box 3: 70 cards × 0.25 (every 4d)  = 18 reviews/day
Box 4: 50 cards × 0.14 (weekly)    = 7 reviews/day
Box 5: 40 cards × 0.07 (bi-weekly) = 3 reviews/day
──────────────────────────────────────────────────
Total: ~128 reviews/day (average)
```

**Time Required**: ~15-20 minutes/day

### Retention Rate

Studies show Leitner system achieves:
- **85-95%** long-term retention
- **3-5x** more efficient than cramming
- **70-80%** reduction in study time

---

## Comparison with Other Methods

### vs. Traditional Flashcards
- ❌ Review all cards equally (inefficient)
- ❌ No scheduling system
- ❌ Manual sorting required
- ✅ Leitner: Adaptive, automated, efficient

### vs. Random Review
- ❌ May review too soon or too late
- ❌ Wastes time on known words
- ❌ Neglects difficult words
- ✅ Leitner: Optimal timing for each card

### vs. Mass Memorization
- ❌ Forgotten within days
- ❌ Stressful and exhausting
- ❌ Poor long-term retention
- ✅ Leitner: Gradual, sustainable, permanent

---

## Advanced Concepts

### Promotion Criteria
A card promotes when:
1. Reviewed on due date
2. Answered correctly
3. Moved to next box
4. New review date calculated

### Demotion Criteria
A card demotes when:
1. Reviewed (on any date)
2. Answered incorrectly
3. Sent back to Box 1
4. Review date set to tomorrow

### Due Date Logic
```typescript
nextReview = now + (boxInterval × 24 hours)

Examples:
Box 1: now + 1 day
Box 2: now + 2 days
Box 3: now + 4 days
Box 4: now + 7 days
Box 5: now + 14 days
```

### Overdue Cards
- Still appear in review queue
- No penalty for being late
- Review on next session
- Same promotion/demotion rules apply

---

## Psychology of Learning

### Why Leitner Works

1. **Spacing Effect**: Information reviewed over time is better retained
2. **Testing Effect**: Retrieval practice strengthens memory
3. **Metacognition**: Self-assessment improves learning
4. **Distributed Practice**: Prevents interference and fatigue
5. **Mastery-Based**: Progress by understanding, not time

### Cognitive Benefits

- **Reduced Cognitive Load**: Focus on what you don't know
- **Increased Confidence**: See measurable progress
- **Better Encoding**: Multiple exposures strengthen neural pathways
- **Long-term Storage**: Moves from short-term to long-term memory
- **Efficient Learning**: Maximize retention per minute studied

---

## Tips from Experts

1. **Sebastian Leitner** (Creator):
   > "The key is not how many times you review, but when you review."

2. **Research Shows**:
   - Optimal first review: 1 day after learning
   - Each successful recall: Double the interval
   - Failed recall: Start over (not a failure, part of learning)

3. **Best Practices**:
   - Review at same time daily (builds habit)
   - Don't review too early (wastes time)
   - Don't skip reviews (breaks the system)
   - Trust the algorithm (it's proven)

---

**Remember**: The Leitner system is a tool. Your consistent practice is what makes it work!

Happy Learning! 🎓
