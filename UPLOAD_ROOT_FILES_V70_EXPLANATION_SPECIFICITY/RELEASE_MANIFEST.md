# Release Manifest

Release: Vitprax Practice V7.0 Explanation Specificity Fix

Date: 2026-08-21

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

No Stripe product or webhook update is required for V7.0.

## Behavior Change

- The generic explanation fallback no longer displays "this concept belongs to General" style feedback.
- Common contract-characteristic mistakes now get bilingual instructor explanations, including valued vs indemnity, speculative risk, bilateral contracts, adhesion, ambiguity, pure risk, hazard, and peril.
- Distractor explanations now teach why common wrong answer choices are wrong instead of simply repeating the correct answer.
- Cache tags are updated to `7.0-explanation-specificity`.
