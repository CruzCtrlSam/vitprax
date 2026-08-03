# Vitprax Practice Changelog

## V6.8 - Question System Architecture

- Added `question-engine.js` for certification-neutral question metadata normalization, balanced session selection, family spacing, analytics, shortcut quality checks, and inventory gap reporting.
- Practice and Exam now use a balanced mix of question styles while preserving existing topic/simulator filters and no-repeat behavior.
- Added accessible emphasis for critical wording such as NOT, EXCEPT, FALSE, LEAST, FIRST, NEXT, BEST, and MOST.
- Added question-style analytics and a deterministic learning insight on the results screen.
- Added representative sample question-family content and Node tests for counts, distribution allocation, duplicate prevention, family spacing, language fallback, analytics, and generic shortcut detection.
- Added an additive Supabase metadata migration for future server-side filtering without changing the existing JSONB content model.

## V6.7 - No-Repeat Practice Sets

- Deduplicated the paid Supabase question pool by question id before building practice or exam sets.
- Updated session building to prioritize unseen questions first, then questions seen the fewest times.
- Kept question shuffling within freshness groups so practice exams still feel randomized without wasting unused questions.
- Updated cache tags so GitHub Pages and Safari load the new session-selection logic.

## V6.6 - iPhone Icon Fix

- Strengthened the iPhone home-screen icon by pointing Apple touch metadata to the root `apple-touch-icon.png`.
- Added mobile app title metadata so iOS labels the saved app as Vitprax.
- Updated cache tags so Safari and GitHub Pages have a fresh static release to load.

## V6.5 - Vitprax Brand Refresh

- Rebranded the public app from Certivo to Vitprax.
- Updated the header mark, tagline, favicon, Apple touch icon, manifest icon, and intro animation.
- Added aligned Vitprax intro layers so the shield and V fade in while the spear rises into place.

## V6.4 - Instructor Explanations

- Replaced the old single explanation box with collapsible instructor-style sections.
- Added "why this is correct," "why the others are wrong," exam tip, optional memory trick, optional real-world example, and related-question practice.
- Added question difficulty badges and repeat-miss concept coaching prompts.
- Removed robotic fallback wording from displayed explanations.

## V6.3 - Paid Mini Lessons Gate

- Kept the free study area focused on complete chapters and bilingual key terms.
- Hid mini lesson cheat-code coaching from free users.
- Updated the upgrade copy so paid access clearly includes mini lessons, explanations, the full trainer, and the full flashcard deck.

## V6.2 - Intro Audio Finish

- Extended the intro display timing to 3 seconds.
- Allowed the Victory Intro audio to finish naturally after the intro fades away.
- Limited the Safari/iPhone audio unlock fallback to taps on the intro itself.

## V6.1 - Intro Audio

- Added the Victory Intro audio asset to the animated Certivo intro.
- Added browser-safe playback logic with a first-interaction fallback for autoplay restrictions.
- Stopping or skipping the intro now stops the intro audio cleanly.

## V6.0 - Texas Content Audit

- Audited the protected Supabase question bank for fake option-letter answers, missing correct answer IDs, topic mismatches, and Spanish explanations with leftover English fragments.
- Expanded key English explanations for Texas and life-insurance concepts including conditional receipts, free-look periods, TLHIGA limits, incontestability, misstatement of age or sex, nonforfeiture options, waiver of premium, Universal Life Option A/B, and incidents of ownership.
- Rechecked the Spanish after English corrections and replaced confusing hybrid wording such as "waiver of prima," "DB," "cash value," "income tax," and raw "conditional receipt" explanations with clearer Spanish.
- Preserved standard exam acronyms where they are the tested term, such as MEC, IRA, LIFO, RMD, MIB, and APS.

## V5.9 - Bilingual Content Quality

- Improved bilingual feedback rendering so correct and incorrect answers show clearer lessons instead of thin one-line explanations.
- Added targeted bilingual coaching for estate-tax incidents of ownership, aleatory contracts, Universal Life Option A/B, and extended term nonforfeiture questions.
- Cleaned live Supabase question rows flagged from mobile review, including S3Q37, S4Q7, S4Q48, and S5Q12.
- Reworded bare Universal Life answer choices so Option A/B appears with real meaning, such as level or increasing death benefit.

## V5.8 - Stabilization

- Added `config.js` for public app settings, version label, Supabase publishable config, free preview limits, and Stripe price ids.
- Added `CHANGELOG.md` so each release has a clear record.
- Added `QA_CHECKLIST.md` for repeatable GitHub/Supabase/mobile checks before uploading.
- Added `CONTENT_SCHEMA.md` to document the question, flashcard, and study chapter data shapes.
- Updated README with the current release workflow and file list.
- Created a clean production-ready release package.

## V5.7 - Study Progress Upgrade

- Made the Study tab easier to read with section guide chips and numbered sections.
- Added chapter progress tracking for studied chapters.
- Improved free-to-paid upgrade messaging in Study and Flashcards.
- Completed phone-width QA in English and Spanish.

## V5.6 - Learning Loop

- Connected Study, Flashcards, Practice, Weakness Review, and Progress into a smoother learning loop.
- Added chapter-filtered flashcards.
- Added chapter-to-practice actions.

## V5.5 - Spanish Term Polish

- Cleaned Spanish coaching language, including replacing awkward English terms such as "hazard" with clearer Spanish wording.

## V5.0 - Protected Content

- Moved the full question bank and full flashcard deck into protected Supabase tables.
- Kept only the free preview content in the public GitHub Pages app.
