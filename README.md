# Vitprax Practice

Vitprax Practice is a mobile-first bilingual certification practice app. The student-facing app uses plain HTML, CSS, and JavaScript on GitHub Pages. Account login and payment checks use Supabase Auth, Supabase Edge Functions, and Stripe Checkout.

## What Is Included

- 10 public preview questions
- Protected Supabase question bank for the full 300 paired English/Spanish questions
- Practice Mode with instant explanations
- Exam Mode with grading at the end
- Topic and simulator filters
- Safe answer shuffling scored by stable answer ids
- Score screen with topic breakdown
- Review missed questions
- Saved local progress, history, missed questions, and flags
- Dark mode
- Header navigation
- Mission Control home screen with readiness, daily missions, and weakest-topic guidance
- Weakness Center with mini lesson, targeted quiz, and flashcard actions
- Vitprax logo, favicon, and installable app icons
- Free 10-question trial
- Free Study Guide section with English/Spanish chapters and bilingual key terms
- Protected Supabase flashcard deck with a 10-card free preview and paid full-deck access
- Supabase login/signup
- Supabase cloud progress sync for signed-in students
- Stripe plan buttons for weekly and 90-day access

## Files

- `index.html` - app screens
- `styles.css` - responsive light/dark styling
- `app.js` - quiz behavior, progress, scoring, flags, history, and filters
- `config.js` - public app configuration, version, Supabase publishable config, free preview limit, and Stripe price ids
- `questions.js` - public 10-question preview only
- `study.js` - free bilingual study chapters and glossary terms
- `manifest.webmanifest` - installable app metadata
- `supabase/sql/certivo_access.sql` - database table for paid access
- `supabase/sql/certivo_content_tables.sql` - protected question table and RLS policies, no question text
- `supabase/functions/create-checkout-session/` - secure Stripe Checkout function
- `supabase/functions/stripe-webhook/` - Stripe payment confirmation function
- `CHANGELOG.md` - release history
- `QA_CHECKLIST.md` - pre-upload test checklist
- `CONTENT_SCHEMA.md` - content structure for questions, study chapters, and flashcards
- `RELEASE_MANIFEST.md` - exact release/upload notes
- `README.md` - this file

## Supabase And Stripe Setup

The website must never contain private Stripe or Supabase service keys. Store private keys only in Supabase Edge Function secrets.

Supabase secrets needed:

- `STRIPE_SECRET_KEY`
- `SERVICE_ROLE_KEY`
- `STRIPE_WEBHOOK_SECRET` after the Stripe webhook is created

Stripe price ids currently used in `config.js`:

- Weekly access: `price_1TtfWp0TcCPzwDfBL5E60kgn`
- 90-day access: `price_1TtfYz0TcCPzwDfBjIKv18nv`

Before payments unlock access and signed-in progress sync works, run the SQL in `supabase/sql/certivo_access.sql` inside the Supabase SQL Editor, then deploy the two Edge Functions.

To protect the question bank and flashcard deck, also run `supabase/sql/certivo_content_tables.sql` in Supabase. Then run these private seed files from your computer:

`/Users/samcruz/Documents/Certivo App/SUPABASE_PRIVATE_SETUP/certivo_questions_private_seed.sql`

`/Users/samcruz/Documents/Certivo App/SUPABASE_PRIVATE_SETUP/certivo_flashcards_private_seed.sql`

Do not upload the private seed files to GitHub. They contain the full question bank and full flashcard deck.

## Question Format

Add more questions in `questions.js` inside `CERTIVO_QUESTIONS`.

```js
{
  id: "s1q1",
  topic: "annuities",
  simulator: 1,
  en: {
    question: "English question",
    answers: [
      { id: "s1q1-a1", text: "Answer text" }
    ],
    explanation: "English explanation"
  },
  es: {
    question: "Spanish question",
    answers: [
      { id: "s1q1-a1", text: "Texto de respuesta" }
    ],
    explanation: "Spanish explanation"
  },
  correctAnswerId: "s1q1-a1"
}
```

Keep answer ids identical between English and Spanish. The app shuffles answers and scores by `correctAnswerId`, not by visible position.

## GitHub Pages Upload

1. Open the `certivo-practice` repository on GitHub.
2. Replace or upload these files at the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`
   - `questions.js`
   - `study.js`
   - `manifest.webmanifest`
   - `favicon.png`
   - `apple-touch-icon.png`
   - `CHANGELOG.md`
   - `QA_CHECKLIST.md`
   - `CONTENT_SCHEMA.md`
   - `RELEASE_MANIFEST.md`
   - `README.md`
3. Keep the Supabase files locally or in GitHub for reference, but deploy Edge Functions from Supabase.
4. Go to **Settings > Pages**.
5. Set the source to the main branch and root folder.
6. Save. The app will be available at:

`https://cruzctrlsam.github.io/vitprax/`

## Local Preview

From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Release Discipline

Use `CHANGELOG.md` for every new version. Before uploading to GitHub, run through `QA_CHECKLIST.md`.

Keep one clean current-production folder for the latest approved release. Older version folders are useful for history, but GitHub should receive only the current root files.

Safe to expose in frontend:

- Supabase project URL
- Supabase publishable key
- Stripe price ids

Never expose in frontend:

- Supabase service-role key
- Stripe secret key
- Stripe webhook secret
- Private full question or flashcard seed files
