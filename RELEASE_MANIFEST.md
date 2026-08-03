# Release Manifest

Release: Vitprax Practice V6.8 Question System Architecture

Date: 2026-08-03

Upload target:

`https://cruzctrlsam.github.io/certivo-practice/`

## Upload These Root Files

- `index.html`
- `config.js`
- `styles.css`
- `app.js`
- `question-engine.js`
- `questions.js`
- `study.js`
- `manifest.webmanifest`
- `favicon.png`
- `apple-touch-icon.png`
- `README.md`
- `CHANGELOG.md`
- `QA_CHECKLIST.md`
- `CONTENT_SCHEMA.md`
- `CONTENT_QA_AUDIT.md`
- `QUESTION_SYSTEM_IMPLEMENTATION.md`
- `tests/`
- `samples/`
- `assets/`

## Keep Private

Do not upload these files or folders to GitHub:

- `/Users/samcruz/Documents/Certivo App/SUPABASE_PRIVATE_SETUP/`
- Any Supabase service-role key
- Any Stripe secret key
- Any Stripe webhook secret

## Supabase

Run `supabase/sql/vitprax_question_system_upgrade.sql` after the existing content tables migration if you want the optional metadata columns and indexes in Supabase. Existing questions still work without this migration because the app can derive legacy metadata from the JSONB content.

## Stripe

No Stripe product or webhook update is required for V6.8.

## Behavior Change

- Practice and Exam use a balanced question selector that considers style, difficulty, family, and prior exposure.
- Critical wording such as NOT, EXCEPT, FALSE, LEAST, FIRST, NEXT, BEST, and MOST is emphasized in the question text.
- Results include deterministic learning insight and question-style breakdown.
