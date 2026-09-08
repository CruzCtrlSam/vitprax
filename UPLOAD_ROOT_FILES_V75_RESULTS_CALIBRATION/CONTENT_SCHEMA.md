# Vitprax Content Schema

This file documents the content shapes to keep stable as Vitprax expands.

## Question Metadata

Legacy questions still work with only `id`, `topic`, `simulator`, localized content, and `correctAnswerId`. New and reviewed questions should add a certification-neutral `metadata` object:

```js
metadata: {
  topicId: "life insurance",
  subtopicId: "policy types",
  conceptId: "universal-life-flexibility",
  familyId: "UNIVERSAL_LIFE_FLEXIBILITY_001",
  style: "scenario", // recall, scenario, comparison, except_not, best_recommendation, professional_action, multi_step
  cognitiveSkill: "apply", // recall, understand, apply, analyze, evaluate
  difficulty: 3, // 1 direct recall, 5 multi-step/highly plausible distractors
  estimatedTimeSeconds: 75,
  examWeight: "medium",
  certificationId: "texas-life",
  isActive: true,
  isReviewed: true
}
```

The app normalizes missing metadata with `question-engine.js`, so older rows remain functional. Question families allow Vitprax to teach the same concept through multiple styles without repeating the exact same prompt too quickly.

## Public Preview Questions

File: `questions.js`

The public file should stay limited to the free preview questions.

```js
{
  id: "s1q1",
  topic: "annuities",
  simulator: 1,
  chapter: 9,
  en: {
    question: "English question",
    answers: [
      { id: "s1q1-a1", text: "Answer text" }
    ],
    explanation: "English explanation",
    memoryShortcut: "Optional exam shortcut",
    examTrap: "Optional trap",
    realWorldExample: "Optional example"
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

Rules:

- Use stable answer ids.
- Keep answer ids identical between English and Spanish.
- Never score by A/B/C/D position.
- Keep `topic`, `simulator`, and `chapter` consistent for filtering and chapter practice.
- Add `metadata.style`, `metadata.cognitiveSkill`, `metadata.difficulty`, and `metadata.familyId` when writing reviewed production questions.
- Use `memoryShortcut` for real shortcuts only. Generic filler is flagged by `question-engine.js`.

## Protected Question Bank

Supabase table: `certivo_questions`

The protected bank stores each full question in the `question` JSONB column. The JSON shape should match the public preview question format plus optional metadata.

The additive SQL in `supabase/sql/vitprax_question_system_upgrade.sql` adds optional metadata columns and indexes for later server-side filtering:

- `certification_id`
- `topic_id`
- `subtopic_id`
- `concept_id`
- `family_id`
- `style`
- `cognitive_skill`
- `difficulty`
- `exam_weight`
- `is_active`
- `is_reviewed`

Run private seed files from:

`/Users/samcruz/Documents/Certivo App/SUPABASE_PRIVATE_SETUP/`

Do not upload private seed files to GitHub.

## Study Chapters

File: `study.js`

`CERTIVO_STUDY.chapters[]`:

```js
{
  id: "chapter-1",
  number: 1,
  title: {
    en: "English title",
    es: "Título en español"
  },
  sections: [
    {
      heading: {
        en: "English section heading",
        es: "Título de sección"
      },
      markdown: {
        en: "English markdown content",
        es: "Contenido en markdown"
      }
    }
  ]
}
```

Rules:

- Keep chapter numbers stable.
- Keep section headings short enough for mobile.
- Use plain markdown: headings, bullets, paragraphs, and blockquotes.

## Learning Cards

Public preview flashcards currently come from `CERTIVO_STUDY.concepts[]`.

Protected full deck lives in Supabase table: `certivo_flashcards`.

```js
{
  id: "C001",
  term: "Risk transfer",
  topic: "risk_basics",
  chapter: 1,
  definition: {
    en: "English definition",
    es: "Definición en español"
  }
}
```

Reviewed cards may also use richer Learning Card metadata:

```js
{
  id: "UL-FLEX-CARD-001",
  type: "scenario", // term_definition, question_answer, scenario, comparison, true_false, exam_shortcut, common_confusion
  topicId: "life insurance",
  subtopicId: "policy types",
  conceptId: "universal-life-flexibility",
  familyId: "UNIVERSAL_LIFE_FLEXIBILITY_001",
  difficulty: 3,
  content: {
    en: { front: "Scenario prompt", back: "Short answer" },
    es: { front: "Situación", back: "Respuesta breve" }
  }
}
```

Rules:

- Keep `chapter` tied to the study chapter.
- Keep `term` stable so Spanish display overrides can work.
- Keep definitions short enough to fit on phone flashcards.

## Selection And Analytics

`question-engine.js` provides:

- Balanced question selection for Practice and Exam.
- Legacy metadata normalization.
- Duplicate question prevention.
- Question-family spacing.
- Largest-remainder count allocation for small and odd session sizes.
- Question-style analytics.
- Generic shortcut detection.
- Inventory gap reporting.

Normal student sessions never call an AI model. All content should be reviewed and stored before students use it.

## Topics

Use these topic ids unless the app is intentionally expanded:

- `general`
- `contracts`
- `life insurance`
- `policy provisions`
- `riders`
- `retirement`
- `annuities`
- `taxes`
- `underwriting`
- `texas`
- `ethics`
- `beneficiaries`
- `best interest`
- `calculation`
