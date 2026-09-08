# Vitprax CIT Content Schema

Vitprax now supports a separate BCSP Certified Instructional Trainer (CIT) track.

## Track ID

Use:

```json
"certificationId": "bcsp-cit"
```

## Domains

CIT questions should use one of these domain IDs:

- `cit-d1` - Communication and Facilitation Skills - 18.6%
- `cit-d2` - Needs Assessment - 13.8%
- `cit-d3` - Course Design - 14.4%
- `cit-d4` - Course Development - 15.6%
- `cit-d5` - Course Implementation - 15.7%
- `cit-d6` - Trainee Assessment - 11.9%
- `cit-d7` - Course Evaluation - 10.0%
- `cit-ethics` - Ethics in Training, supplemental only

`cit-ethics` is available for study and drills, but is not treated as an eighth weighted CIT2 exam domain.

## Question Fields

Each CIT question should include:

```json
{
  "id": "cit-d1-q001",
  "certification": "bcsp-cit",
  "certificationId": "bcsp-cit",
  "domain": "cit-d1",
  "topic": "cit-d1",
  "subtopic": "active listening",
  "difficultyLevel": "Intermediate",
  "questionType": "BEST answer",
  "questionText": "Question text here",
  "answerChoices": [
    { "id": "cit-d1-q001-a", "text": "Choice A" },
    { "id": "cit-d1-q001-b", "text": "Choice B" },
    { "id": "cit-d1-q001-c", "text": "Choice C" },
    { "id": "cit-d1-q001-d", "text": "Choice D" }
  ],
  "correctAnswerId": "cit-d1-q001-a",
  "explanation": "Instructor-quality explanation.",
  "incorrectAnswerExplanations": {
    "cit-d1-q001-b": "Why this distractor is wrong.",
    "cit-d1-q001-c": "Why this distractor is wrong.",
    "cit-d1-q001-d": "Why this distractor is wrong."
  },
  "conceptTested": "Active listening before corrective feedback",
  "referenceTopic": "active listening",
  "tags": ["facilitation", "adult learners"],
  "scenarioBased": true,
  "masteryWeight": 1
}
```

## Accepted Difficulty Labels

- `Foundational`
- `Intermediate`
- `Exam-Level`
- `Advanced`

## Accepted Question Types

- `Concept recognition`
- `Terminology`
- `Application`
- `Scenario`
- `BEST answer`
- `FIRST action`
- `MOST appropriate`
- `LEAST appropriate`

## Import Notes

The current app includes only a small original CIT sample bank. Add large batches by appending validated questions to `cit-content.js` or by later adding a Supabase certification-aware content table. Do not copy BCSP exam questions or exam dumps.
