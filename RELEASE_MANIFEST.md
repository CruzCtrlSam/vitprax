# Release Manifest

Release: Vitprax Practice V6.7 No-Repeat Practice Sets

Date: 2026-07-31

Upload target:

`https://cruzctrlsam.github.io/certivo-practice/`

## Upload These Root Files

- `index.html`
- `config.js`
- `styles.css`
- `app.js`
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
- `assets/`

## Keep Private

Do not upload these files or folders to GitHub:

- `/Users/samcruz/Documents/Certivo App/SUPABASE_PRIVATE_SETUP/`
- Any Supabase service-role key
- Any Stripe secret key
- Any Stripe webhook secret

## Supabase

No Supabase schema update is required for V6.7. The app now deduplicates Supabase question rows by question id and prioritizes unseen questions when building a session.

## Stripe

No Stripe product or webhook update is required for V6.7.

## Behavior Change

- Practice and exam sets pull unseen questions first.
- If a filter has fewer fresh questions than the requested count, the app fills the rest with questions seen the fewest times.
- A 300-question run still uses the full available pool, so it cannot avoid previously seen questions across repeated full-bank attempts.
