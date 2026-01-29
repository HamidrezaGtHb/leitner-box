# Smart Command System - راهنمای کامل

## 🎯 خلاصه

Smart Command System یک interface هوشمند برای مدیریت کلمات در Leitner Box است که جایگزین input ساده شده و قابلیت‌های زیر را ارائه می‌دهد:

### ویژگی‌های اصلی:
- ✅ **Command Palette** - دسترسی سریع با `Cmd+K`
- ✅ **Natural Language Processing** - فهم دستورات طبیعی
- ✅ **Duplicate Detection** - تشخیص خودکار کلمات تکراری
- ✅ **AI Widget** - پیشنهادات context-aware
- ✅ **Quick Actions Bar** - دکمه‌های سریع
- ✅ **Global Keyboard Shortcuts** - کلیدهای میانبر

---

## 🚀 استفاده سریع

### Command Palette

**باز کردن:**
- فشار دادن `Cmd+K` (Mac) یا `Ctrl+K` (Windows/Linux)
- کلیک روی دکمه "Add Word" در Quick Actions

**دستورات معمول:**
```
10 b2          → Generate 10 B2 level words
haus           → Add word "Haus"
image          → Open OCR page
review         → Start review session
stats          → Show dashboard
backlog        → Open backlog
```

### Quick Actions Bar

دکمه‌های سریع در بالای صفحه اصلی:
- **Add Word** (`⌘K`) - باز کردن Command Palette
- **Generate** (`⌘G`) - تولید لیست کلمات
- **From Image** (`⌘I`) - استخراج از عکس
- **Backlog** (`⌘B`) - مدیریت صف کلمات
- **Dashboard** - نمایش آمار

### AI Widget

Widget شناور در پایین سمت راست که:
- پیشنهادات context-aware می‌دهد
- یادآوری review می‌کند
- کلمات backlog را نشان می‌دهد
- اعلان‌های مهم را نمایش می‌دهد

**States:**
- **Minimized**: فقط آیکون
- **Normal**: یک پیشنهاد
- **Expanded**: تمام پیشنهادات

---

## ⌨️ Keyboard Shortcuts

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | باز کردن Command Palette |
| `⌘G` | صفحه Generate |
| `⌘I` | صفحه OCR (Image) |
| `⌘B` | صفحه Backlog |
| `⌘R` | شروع Review |
| `⌘D` | Dashboard |
| `⌘L` | Library |
| `⌘H` | Home |
| `⌘,` | Settings |

### در Command Palette

| Key | Action |
|-----|--------|
| `↑↓` | Navigate |
| `Enter` | Execute command |
| `Esc` | بستن |

---

## 🧠 Natural Language Commands

Command Palette می‌تواند دستورات طبیعی را تفسیر کند:

### Pattern 1: Generate Words
```
"10 b2"        → Generate 10 B2 words
"25 c1"        → Generate 25 C1 words
"generate 50 b1" → Generate 50 B1 words
```

### Pattern 2: Add Single Word
```
"haus"         → Add word "Haus"
"lernen"       → Add word "lernen"
"add schön"    → Add word "schön"
```

### Pattern 3: Navigation
```
"review"       → Go to Review page
"backlog"      → Go to Backlog page
"stats"        → Go to Dashboard
"library"      → Go to Library
```

### Pattern 4: Image/OCR
```
"image"        → Open OCR page
"ocr"          → Open OCR page
"pic"          → Open OCR page
"photo"        → Open OCR page
```

---

## 🔍 Duplicate Detection

سیستم خودکار کلمات تکراری را تشخیص می‌دهد:

### چگونه کار می‌کند؟
- استفاده از **Levenshtein Distance Algorithm**
- Threshold: **85%** similarity
- Real-time checking در Command Palette

### مثال:
```
شما: "haus"
سیستم: ⚠️ "Haus" already exists in Box 3
```

**گزینه‌ها:**
- Skip (رد کردن)
- Add anyway (اضافه کردن به هر حال)
- Review existing card (بازبینی کارت موجود)

---

## 🤖 AI Suggestions

AI Widget پیشنهادات context-aware می‌دهد:

### انواع Suggestions:

#### 1. Review Reminders
```
"10 cards waiting for review!"
Action: [Start Review]
```

#### 2. Backlog Ready
```
"5 words ready in backlog"
Action: [Add Them]
```

#### 3. No New Words
```
"No new words added today"
Action: [Generate 10 B1]
```

#### 4. Daily Limit
```
"3 slots left for today"
(Informational)
```

#### 5. Milestones
```
"50 words milestone! Keep going! 💪"
(Motivational)
```

### Priority System

Suggestions مرتب می‌شوند بر اساس اولویت:
- **10**: Getting started (empty collection)
- **9**: Critical review needed (10+ cards)
- **8**: Backlog ready
- **7**: Milestones
- **6**: Daily suggestions
- **5**: Info messages

---

## 📱 Mobile Support

### Command Palette
- Swipe up from bottom
- Touch-friendly UI
- Virtual keyboard optimization

### Quick Actions Bar
- Horizontal scrollable
- Large touch targets
- Icons + labels on mobile

### AI Widget
- Bottom sheet on mobile
- Swipe to minimize/expand
- Single tap actions

---

## 🎨 UI/UX Highlights

### Command Palette
```
┌─────────────────────────────────────┐
│  🔍 Type a command or search...     │
├─────────────────────────────────────┤
│  ⚠️ "Haus" already exists in Box 3  │
├─────────────────────────────────────┤
│  Recent                              │
│  🕐 10 b2                     →      │
│  🕐 haus                      →      │
│                                      │
│  Actions                             │
│  ➕ Add Word                         │
│  ✨ Generate Words          ⌘G      │
│  📸 Extract from Image      ⌘I      │
│                                      │
│  Navigation                          │
│  🏠 Home                    ⌘H      │
│  📚 Review                  ⌘R      │
│  📅 Backlog                 ⌘B      │
├─────────────────────────────────────┤
│  ↑↓ Navigate  ↵ Execute  Esc Close  │
└─────────────────────────────────────┘
```

### AI Widget
```
┌─────────────────┐
│ 💡 AI Assistant │
├─────────────────┤
│ 5 words ready   │
│ in backlog      │
│                 │
│ [Add Them]      │
│ [Later]         │
└─────────────────┘
```

---

## 🔧 Technical Details

### Architecture

```
src/
├── components/
│   ├── command-palette.tsx      # Main command UI
│   ├── ai-widget.tsx            # AI assistant widget
│   └── quick-actions-bar.tsx   # Quick action buttons
├── hooks/
│   ├── use-commands.ts          # Command registry
│   ├── use-duplicate-check.ts   # Duplicate detection
│   ├── use-ai-suggestions.ts    # AI suggestions logic
│   └── use-keyboard-shortcuts.ts # Global shortcuts
└── lib/
    ├── command-parser.ts        # NLP parser
    └── duplicate-detector.ts    # Levenshtein algorithm
```

### Dependencies

```json
{
  "cmdk": "^0.2.0",           // Command palette library
  "fast-levenshtein": "^3.0.0" // Fuzzy matching
}
```

### Performance

- **Command Search**: Debounced (150ms)
- **Duplicate Check**: Real-time (<50ms)
- **AI Suggestions**: Cached (30s)
- **Command Execution**: <2s average

---

## 🆚 مقایسه با System قبلی

| Feature | Old System | Smart Command System |
|---------|------------|---------------------|
| **Input Method** | Single text input | Command Palette + NLP |
| **Speed** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ (faster) |
| **Flexibility** | ⭐⭐ | ⭐⭐⭐⭐⭐ (anything) |
| **Duplicate Check** | ❌ Manual | ✅ Automatic |
| **AI Assistance** | ❌ None | ✅ Context-aware |
| **Keyboard** | Basic | ⭐⭐⭐⭐⭐ Full support |
| **Mobile** | ⭐⭐⭐ | ⭐⭐⭐⭐ Optimized |

---

## 💡 Tips & Tricks

### 1. Recent Commands
Command Palette به یاد می‌آورد 5 دستور آخر شما را.

### 2. Fuzzy Search
نیازی به نوشتن دقیق نیست:
```
"gen" → Shows "Generate Words"
"rev" → Shows "Review"
```

### 3. Natural Input
می‌توانید به صورت طبیعی بنویسید:
```
"add haus" = "haus"
"generate 10 b2" = "10 b2"
```

### 4. Keyboard First
تمام کارها با keyboard قابل انجام است.

### 5. AI Dismiss
پیشنهادات AI را می‌توانید dismiss کنید و دوباره نمایش داده نمی‌شوند.

---

## 🐛 Troubleshooting

### Command Palette باز نمی‌شود
- چک کنید `Cmd+K` به کار دیگری assign نشده باشد
- در browser console خطا چک کنید

### Duplicate Detection کار نمی‌کند
- کلمه باید حداقل 2 حرف داشته باشد
- Similarity threshold: 85%

### AI Widget نمایش داده نمی‌شود
- بررسی کنید که suggestion هایی وجود داشته باشد
- Widget minimized نباشد

### Keyboard Shortcuts کار نمی‌کند
- در input/textarea shortcuts غیرفعال است (به جز `Cmd+K`)
- Browser shortcuts ممکن است override کنند

---

## 🔮 Future Enhancements

در نسخه‌های بعدی:
1. **Voice Input** - دستورات صوتی
2. **Custom Commands** - کاربر بتواند command تعریف کند
3. **Command History** - تاریخچه کامل
4. **AI Learning** - یادگیری از usage patterns
5. **Plugins** - third-party extensions
6. **Multi-language** - پشتیبانی از زبان‌های دیگر

---

## 📚 مستندات بیشتر

- [ADVANCED_FEATURES.md](./ADVANCED_FEATURES.md) - راهنمای ویژگی‌های پیشرفته
- [API_SETUP.md](./API_SETUP.md) - راهنمای تنظیم API
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - راهنمای استفاده عمومی

---

## 🎉 خلاصه

Smart Command System:
- ✅ **Faster**: سریع‌تر از input ساده
- ✅ **Smarter**: با duplicate detection و AI suggestions
- ✅ **Powerful**: قابلیت‌های بیشتر
- ✅ **User-friendly**: ساده برای beginners، قدرتمند برای pros
- ✅ **Keyboard-first**: تمام چیز با keyboard
- ✅ **Mobile-optimized**: کاملاً responsive

**شروع کنید:** فشار دهید `Cmd+K` و لذت ببرید! 🚀
