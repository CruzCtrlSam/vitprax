# Certivo Practice QA Checklist

Use this before uploading a new release to GitHub Pages.

## Version And Upload

- Version pill shows the new version.
- `index.html` script/style cache tags match the new release.
- `question-engine.js` is uploaded with the root files.
- Upload root files only, not a folder inside the repo.
- Wait a few minutes after upload before judging GitHub Pages.
- Hard refresh if Safari shows an older version.

## Public Content Protection

- `questions.js` contains only the 10 free preview questions.
- `study.js` contains free study content and preview flashcard concepts only.
- Private seed SQL files are not uploaded to GitHub.
- No Stripe secret key, webhook secret, or Supabase service-role key appears in frontend files.

## Free User Flow

- Logged-out user sees 10-question free trial.
- Free trial shows right/wrong only.
- Free trial does not reveal final score, correct answers, or explanations.
- Study chapters are visible for free.
- Flashcards show only the free preview deck.
- Practice, Exam, full explanations, full deck, and full progress tools guide to Plans.

## Paid User Flow

- Signed-in paid user sees "Full trainer unlocked."
- Full 300-question bank loads.
- Practice Mode shows instant explanations.
- Exam Mode grades at the end.
- Practice and Exam return the requested count when enough questions are available.
- Result screen shows topic breakdown and question-style insight.
- Missed review works.
- Topic and simulator filters work.
- Progress syncs after answering questions.

## Mobile QA

- Check iPhone-width layout in English.
- Check iPhone-width layout in Spanish.
- Home nav does not overflow.
- Header buttons wrap cleanly.
- Study chapter selector fits.
- Study section guide scrolls horizontally without page overflow.
- Flashcard front/back text fits.
- Plans page prices and benefits are readable.

## Supabase And Stripe

- Supabase Auth login works.
- Paid access row exists after Stripe checkout.
- Optional `supabase/sql/vitprax_question_system_upgrade.sql` migration has been run when metadata columns are needed.
- Webhook secret is saved in Supabase Function secrets.
- `create-checkout-session` and `stripe-webhook` functions are deployed.
- Stripe webhook sends `checkout.session.completed`.
