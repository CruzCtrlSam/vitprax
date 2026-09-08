# Release Manifest

Release: Vitprax Practice V7.3 Safer Quiz Navigation

Date: 2026-09-08

Upload target:

`https://cruzctrlsam.github.io/certivo-practice/`

## Upload These Root Files

- `index.html`
- `config.js`
- `styles.css`
- `app.js`
- `question-engine.js`
- `cit-content.js`
- `questions.js`
- `study.js`
- `manifest.webmanifest`
- `favicon.png`
- `apple-touch-icon.png`
- `README.md`
- `CHANGELOG.md`
- `QA_CHECKLIST.md`
- `CONTENT_SCHEMA.md`
- `CIT_CONTENT_SCHEMA.md`
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

No Supabase schema change is required for V7.1. Texas Life can still load protected questions and flashcards from the existing Supabase tables. CIT currently uses the bundled starter architecture and original sample content until a certification-aware protected content table is added in a later phase.

## Stripe

No Stripe product or webhook update is required for V7.1.

## Behavior Change

- Users can choose Texas Life Insurance or BCSP CIT from the home dashboard.
- Texas and CIT keep separate progress, sessions, missed questions, flags, study history, and readiness metrics.
- CIT setup exposes domain, subtopic, difficulty, and question-type filters.
- CIT exam and diagnostic modes use the stored CIT domain weights; Ethics remains supplemental and unweighted.
- CIT now includes an expanded original starter bank for legally clean exam-style practice.
- Quiz navigation stays sticky while Finish is smaller and non-sticky.
- Early Finish taps now ask for confirmation before scoring.
- Cache tags are updated to `7.3-safe-quiz-navigation`.
