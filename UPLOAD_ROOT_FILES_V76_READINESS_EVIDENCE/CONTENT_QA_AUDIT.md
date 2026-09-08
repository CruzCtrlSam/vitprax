# Certivo Content QA Audit

Date: 2026-07-22

Release: V6.0 Texas Content Audit

## What Was Checked

- Protected Supabase question bank: 300 questions.
- Correct answer integrity in English and Spanish.
- Bare answer choices such as "Option A" or "Option B".
- Topic mismatches between the database row and the structured question object.
- Spanish explanations with leftover English fragments that hurt learning.
- Texas-specific rules that appeared in the reviewed rows.

## Supabase Verification Results

The final audit query returned no rows for:

- Topic mismatches.
- Bare option-letter answer choices in English.
- Bare option-letter answer choices in Spanish.
- Missing correct-answer IDs in English answer arrays.
- Missing correct-answer IDs in Spanish answer arrays.
- Targeted Spanish bad phrases such as `waiver of prima`, `Return of prima`, `DB`, `CV`, `cash value`, `income tax`, `conditional receipt`, `underwriter`, `misstatement`, `incontestability`, `free look`, `foreign`, and `alien`.

## Content Fixed

- Conditional receipts now explain that coverage depends on the applicant being insurable as applied.
- Binding receipts now explain how they differ from conditional receipts.
- Universal Life Option A and Option B now use real answer choices, not bare option letters.
- "Aleatory" remains the correct English legal term for unequal exchange of values; Spanish uses "aleatorio" and explains why it is not "variable."
- S4Q7 now clearly tests extended term nonforfeiture, not cash surrender, reduced paid-up, or APL.
- S3Q37 now explains incidents of ownership and why estate inclusion is different from income-tax treatment.
- Spanish terminology now teaches the concept while preserving important exam acronyms when needed.

## Texas Source Anchors

Texas-specific rows were checked against official/public legal anchors, including:

- Texas Insurance Code Chapter 1101: Life Insurance.
- Texas Insurance Code Chapter 1115: Annuity Transactions.
- Texas Insurance Code Chapter 463: Texas Life and Health Insurance Guaranty Association.
- Texas Family Code Section 9.301: divorce and beneficiary designation rules.
- Texas Department of Insurance consumer and agent guidance where applicable.

## Standard For Future Questions

Every new question should include:

- A real-world or exam-style prompt.
- Four meaningful answer choices, never fake "Option A/B" placeholders.
- A correct answer selected by answer ID, not by position.
- A plain-English explanation that teaches the rule.
- A Spanish translation that teaches the same rule, not a literal mixed-language copy.
- A short memory phrase where possible.

