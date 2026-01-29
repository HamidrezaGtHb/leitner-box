# 🔍 Deduplication System

این سیستم از ایجاد کلمات تکراری جلوگیری می‌کند.

## ✅ چگونه کار می‌کند؟

### 1. Normalized Key
هر کلمه یک `normalizedKey` دارد که با این قوانین ساخته می‌شود:

```typescript
function generateNormalizedKey(word: string): string {
  return word
    .toLowerCase()           // حروف کوچک
    .trim()                  // حذف فضای خالی
    .replace(/^(der|die|das)\s+/i, '')  // حذف article (der, die, das)
    .replace(/\s+/g, ' ');   // حذف فضاهای اضافی
}
```

**مثال‌ها:**
- `"der Bahnhof"` → `"bahnhof"`
- `"die Schule"` → `"schule"`
- `"Das Auto"` → `"auto"`
- `"  der  Tisch  "` → `"tisch"`

### 2. بررسی در Cards و Backlog

قبل از اضافه کردن کلمه، سیستم چک می‌کند:

```typescript
const duplicate = checkDuplicateAcrossSystem(normalizedKey, cards, backlog);

if (duplicate.found) {
  console.log(`کلمه تکراری: "${duplicate.location}" → ${duplicate.originalWord}`);
  // کلمه اضافه نمی‌شود
}
```

### 3. AI Suggestions

AI نیز قبل از پیشنهاد کلمات، duplicates را فیلتر می‌کند:

```typescript
// در ai-agent.ts
const existingKeys = new Set([
  ...cards.map(c => c.normalizedKey),
  ...backlog.map(b => b.normalizedKey)
]);

const newWords = suggestions.filter(
  word => !existingKeys.has(generateNormalizedKey(word))
);
```

## 📱 تست کردن Deduplication

### روش 1: از Home Page

1. **Desktop**: Press `Cmd+K` یا scroll به AI Chat
2. **Mobile**: دکمه `+` پایین صفحه را بزنید

3. **تست:**
   ```
   💬 "Add the word 'der Bahnhof'"
   ✅ کلمه اضافه می‌شود
   
   💬 "Add the word 'der Bahnhof'" (دوباره)
   ❌ پیام: "Duplicate detected: 'Bahnhof' already exists in your cards"
   
   💬 "Add the word 'Bahnhof'" (بدون article)
   ❌ پیام: "Duplicate detected: 'Bahnhof' already exists"
   
   💬 "Add the word '  DER   BAHNHOF  '" (با فضای خالی و حروف بزرگ)
   ❌ پیام: "Duplicate detected" (normalized می‌شود به 'bahnhof')
   ```

### روش 2: از AI Chat با لیست

```
💬 "Give me 10 B2 words about travel"
```

اگر "Bahnhof" در لیست باشد:
- AI آن را از لیست حذف می‌کند
- در نتیجه فقط 9 کلمه جدید نشان داده می‌شود
- پیام: "Skipped 1 duplicate word(s)"

### روش 3: از OCR (Upload Image)

1. عکسی با کلمات آلمانی upload کنید
2. AI کلمات را extract می‌کند
3. کلمات تکراری filter می‌شوند
4. فقط کلمات جدید نمایش داده می‌شوند

## 🎯 مثال‌های عملی

### ✅ این‌ها تکراری شناسایی می‌شوند:

| کلمه 1 | کلمه 2 | Normalized Key |
|--------|--------|----------------|
| `der Bahnhof` | `Bahnhof` | `bahnhof` |
| `die Schule` | `Die SCHULE` | `schule` |
| `das Auto` | `  DAS  AUTO  ` | `auto` |
| `der Apfel` | `Der Äpfel` | ❌ جدا هستند |

### ❌ این‌ها تکراری نیستند:

- `der Apfel` (سیب) vs `die Äpfel` (سیب‌ها) - مفرد vs جمع
- `das Haus` (خانه) vs `die Häuser` (خانه‌ها)
- `laufen` (فعل) vs `der Lauf` (اسم)

## 📊 گزارش Duplicate

در AI Chat:

```
✅ Created 8 new cards
⚠️ Skipped 2 duplicates:
   - "Bahnhof" (already in cards)
   - "Schule" (already in backlog)
```

## 🔧 Technical Details

### چک در ۳ جا:

1. **useLeitner hook** → قبل از `addCard()`
2. **AI Chat** → قبل از نمایش suggestions
3. **Backlog** → قبل از `addToBacklog()`

### Performance

- Normalized keys در memory cache می‌شوند
- O(1) lookup با `Set` data structure
- برای 10,000 کلمه < 1ms

## 💡 نکات مهم

1. **Articles (der/die/das) نادیده گرفته می‌شوند**
   - `der Bahnhof` = `Bahnhof`
   
2. **Case-insensitive**
   - `BAHNHOF` = `Bahnhof` = `bahnhof`
   
3. **فضاهای خالی normalize می‌شوند**
   - `"  der  Bahnhof  "` = `"der Bahnhof"`
   
4. **حروف خاص آلمانی حفظ می‌شوند**
   - `Äpfel` ≠ `Apfel`
   - `über` ≠ `uber`

## 🎓 چرا مهم است؟

- **جلوگیری از تکرار**: وقت و انرژی شما صرف یادگیری کلمات جدید می‌شود
- **Leitner دقیق**: هر کلمه فقط در یک box است
- **تمرکز بهتر**: confusion ایجاد نمی‌شود
- **بهینه‌سازی**: فضای کمتر، سرعت بیشتر

---

✅ **تست کنید**: الان یک کلمه را دو بار add کنید و ببینید سیستم چگونه آن را detect می‌کند!
