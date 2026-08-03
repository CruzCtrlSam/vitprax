# Vitprax Question System Upgrade Notes

## Current Architecture Discovered

- The student app is static HTML, CSS, and JavaScript deployed to GitHub Pages.
- Public preview questions live in `questions.js` as `CERTIVO_QUESTIONS`.
- Paid questions load from Supabase table `certivo_questions`, where each row stores the full question in a `question` JSONB column.
- Flashcards load from `CERTIVO_STUDY.concepts` for preview and from Supabase table `certivo_flashcards` for the full deck.
- English and Spanish are stored ahead of time in each question/card. The app does not translate during study sessions.
- Practice and Exam sessions use stable answer ids and shuffled answer order.
- Progress is stored locally and synced to Supabase for signed-in users through the existing progress table.
- Explanations are rendered from existing localized explanation fields plus deterministic instructor-style helper logic.

## Implementation Choice

Vitprax now uses a hybrid model:

- Keep the existing JSONB question/card content so all legacy content remains functional.
- Add richer metadata inside question JSON when reviewed content is created.
- Add optional Supabase columns and indexes for future server-side filtering.
- Normalize legacy rows in `question-engine.js` when metadata is missing.

This avoids a destructive migration and keeps the current paid bank working while preparing the platform for other certifications.

## New Utilities

- `question-engine.js`
  - Metadata normalization
  - Learning Card normalization
  - Balanced Practice and Exam session selection
  - Duplicate prevention
  - Question-family spacing
  - Largest-remainder count allocation
  - Missing translation fallback
  - Shortcut quality detection
  - Inventory gap reporting
  - Question-style analytics and deterministic insights

## Database Migration

Run this optional additive migration in Supabase SQL Editor after the existing content tables exist:

`supabase/sql/vitprax_question_system_upgrade.sql`

It adds metadata columns and indexes to:

- `certivo_questions`
- `certivo_flashcards`

No existing question text is removed or moved.

## Backward Compatibility

- Legacy questions without `metadata` still work.
- Legacy flashcards with only `term` and `definition` still work.
- English/Spanish fallback prevents blank question text when one language version is missing.
- Existing progress records still work; new answer records include more metadata.

## Content Gaps

The code now supports scenario, comparison, EXCEPT/NOT, recommendation, professional-action, and multi-step formats. The remaining work is content production:

- Add reviewed question-family variants for each high-value concept.
- Add complete Spanish versions written naturally, not machine-translated.
- Replace generic shortcuts with real Exam Shortcuts or Key Distinctions.
- Use `QuestionEngine.inventoryReport()` to find shortages by topic, style, and difficulty.

## Future Forge Mode

The Forge should reuse `question-engine.js` rather than creating another selector. A future Forge mode can target:

- Missed concept families
- Weak question styles
- Higher difficulty bands
- Cooldown rules that avoid showing the exact missed question immediately
- Learning Cards from the same concept family before another scenario question
