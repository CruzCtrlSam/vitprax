# Vitprax Practice Changelog

## V7.8 - CIT 60-Question Original Bank

- Expanded the bundled BCSP CIT practice bank to 60 original questions.
- Added three new original simulation questions to each weighted CIT domain.
- Added one additional ethics/confidentiality question as supplemental practice.
- Replaced the weakest obvious distractors in Course Evaluation and Assessment with more realistic professional mistakes.
- Updated the CIT visible question count to match the bundled 60-question bank.
- Updated cache tags so Safari and GitHub Pages load the expanded CIT bank.

## V7.7 - Track Result Snapshots

- Added separate readiness, answered, and last-score snapshots to each certification card on the Home screen.
- Made Texas Life and CIT progress easier to distinguish before switching tracks.
- Kept the snapshot layout compact on desktop and stacked on narrow phone screens.
- Updated cache tags so Safari and GitHub Pages load the Home track-result upgrade.

## V7.6 - Readiness Evidence Model

- Added a stricter readiness estimate that uses answer volume, topic coverage, question-style coverage, difficulty coverage, weak-topic penalties, recent accuracy, and exam-style history.
- Requires a 50-question baseline before Vitprax treats readiness as meaningful.
- Shows readiness confidence instead of a pass-chance number when evidence is still thin.
- Clarified that CIT readiness is a Vitprax estimate because BCSP does not present readiness as a simple public percent cutoff.
- Updated cache tags so Safari and GitHub Pages load the readiness model upgrade.

## V7.5 - Practice Result Calibration

- Reworded short practice-set results so a high score does not imply full exam readiness from a small sample.
- Changed small-session breakdown headings to describe the current set rather than broad certification mastery.
- Added limited-sample markers to topic and question-style rows with only a few questions.
- Marked supplemental topics in the breakdown so non-weighted practice content is easier to interpret.
- Updated cache tags so Safari and GitHub Pages load the calibrated results screen.

## V7.4 - CIT Simulation Distractor Polish

- Rewrote obvious CIT distractors into plausible professional training mistakes so practice feels more like a real simulation.
- Removed throwaway answer choices about lunch, logos, room temperature, entertainment, and other non-exam-like options.
- Fixed CIT question source labels so they show Domain instead of "Simulator undefined."
- Updated cache tags so Safari and GitHub Pages load the polished CIT practice content.

## V7.3 - Safer Quiz Navigation

- Removed the large sticky Finish button from the bottom thumb zone during practice and exam sessions.
- Made the question navigation row sticky so Previous, Flag, and Check/Next remain easy to reach while scrolling.
- Added an early-finish confirmation so accidental Finish taps do not immediately score the session.
- Updated cache tags so Safari and GitHub Pages load the safer quiz controls.

## V7.2 - CIT Original Question Bank Expansion

- Expanded the BCSP CIT starter bank with original, exam-style questions mapped to Communication, Needs Assessment, Course Design, Course Development, Course Implementation, Trainee Assessment, Course Evaluation, and supplemental Ethics.
- Kept all CIT questions original and blueprint-aligned rather than copied from paid practice tests, dumps, or actual exam items.
- Added scenario, BEST answer, FIRST action, terminology, and application formats with distractor explanations.
- Updated cache tags so Safari and GitHub Pages load the expanded CIT question bank.

## V7.1 - CIT Track Architecture

- Added a separate BCSP Certified Instructional Trainer (CIT) track alongside Texas Life Insurance.
- Added CIT2 / 2024.05.01 domain metadata, official domain weights, and Ethics as a supplemental non-weighted study category.
- Added certification switching on the home screen with separate local sessions, progress, history, missed questions, flags, and study chapter progress per track.
- Added CIT-specific setup filters for domain, subtopic, difficulty, and question type.
- Added blueprint-aware weighted session selection for CIT exam and diagnostic modes.
- Added an original CIT starter sample bank and flashcards so the architecture can be tested without using exam dumps.
- Added `CIT_CONTENT_SCHEMA.md` and automated CIT validation tests for future question imports.

## V7.0 - Explanation Specificity Fix

- Removed the broad fallback explanation that produced generic "this concept belongs to General" feedback.
- Added bilingual instructor-style lessons for valued contracts, indemnity, speculative risk, bilateral contracts, contract of adhesion, ambiguity rules, pure risk, hazard, and peril.
- Added clearer distractor explanations for common contract-characteristic answer choices in English and Spanish.
- Updated cache tags so GitHub Pages and Safari load the corrected explanation engine.

## V6.9 - Learning Card Filter Polish

- Hid the Card type filter when the current flashcard deck only contains one card type.
- Removed the visible card-type prefix from flashcards until multiple Learning Card types exist in the deck.
- Kept the multi-format Learning Card architecture ready for future scenario, comparison, shortcut, and common-confusion cards.

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
