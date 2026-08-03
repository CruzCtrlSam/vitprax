const assert = require("assert");
const Engine = require("../question-engine.js");

function makeQuestion(index, overrides = {}) {
  const style = overrides.style || Engine.QUESTION_STYLES[index % Engine.QUESTION_STYLES.length];
  const difficulty = overrides.difficulty || ((index % 5) + 1);
  return {
    id: `q${index}`,
    topic: overrides.topic || (index % 2 ? "contracts" : "general"),
    simulator: overrides.simulator || 1,
    metadata: {
      topicId: overrides.topic || (index % 2 ? "contracts" : "general"),
      subtopicId: overrides.subtopicId || "",
      conceptId: overrides.conceptId || `concept-${index}`,
      familyId: overrides.familyId || `family-${index}`,
      style,
      cognitiveSkill: overrides.cognitiveSkill || (style === "recall" ? "recall" : "apply"),
      difficulty,
      certificationId: "sample-cert",
      isActive: true
    },
    en: {
      question: overrides.question || `Question ${index}?`,
      answers: [
        { id: `q${index}-a1`, text: "Correct" },
        { id: `q${index}-a2`, text: "Wrong 1" },
        { id: `q${index}-a3`, text: "Wrong 2" },
        { id: `q${index}-a4`, text: "Wrong 3" }
      ],
      explanation: "Useful explanation.",
      memoryShortcut: overrides.memoryShortcut || "A useful contrast."
    },
    es: {
      question: overrides.esQuestion || `Pregunta ${index}?`,
      answers: [
        { id: `q${index}-a1`, text: "Correcta" },
        { id: `q${index}-a2`, text: "Incorrecta 1" },
        { id: `q${index}-a3`, text: "Incorrecta 2" },
        { id: `q${index}-a4`, text: "Incorrecta 3" }
      ],
      explanation: "Explicación útil.",
      memoryShortcut: "Un contraste útil."
    },
    correctAnswerId: `q${index}-a1`
  };
}

function inventory(total = 180) {
  return Array.from({ length: total }, (_, index) => makeQuestion(index + 1));
}

function exactCount(size) {
  const session = Engine.buildQuestionSession(inventory(180), {
    count: size,
    mode: size >= 100 ? "exam" : "practice",
    language: "en",
    certificationId: "sample-cert"
  });
  assert.strictEqual(session.questions.length, size, `expected ${size} questions`);
  assert.strictEqual(new Set(session.questions.map((question) => question.id)).size, size, "question ids should be unique");
}

[5, 10, 20, 25, 50, 100, 150].forEach(exactCount);

{
  const allocated = Engine.allocateCounts(10, Engine.PRACTICE_STYLE_DISTRIBUTION);
  assert.strictEqual(Object.values(allocated).reduce((sum, value) => sum + value, 0), 10);
  assert.ok(allocated.scenario >= allocated.recall, "practice should favor scenario variety");
}

{
  const questions = [
    makeQuestion(1, { familyId: "same-family", style: "scenario" }),
    makeQuestion(2, { familyId: "same-family", style: "comparison" }),
    makeQuestion(3, { familyId: "different-family", style: "recall" })
  ];
  const session = Engine.buildQuestionSession(questions, { count: 2, language: "en" });
  assert.strictEqual(new Set(session.questions.map((question) => question.metadata.familyId)).size, 2, "should avoid same family when alternatives exist");
}

{
  const progress = {
    answers: {
      q1: { seen: 4 },
      q2: { seen: 3 }
    },
    missed: {}
  };
  const session = Engine.buildQuestionSession([makeQuestion(1), makeQuestion(2), makeQuestion(3)], { count: 2, progress });
  assert.ok(session.questions.some((question) => question.id === "q3"), "fresh questions should be prioritized");
}

{
  assert.strictEqual(Engine.hasGenericShortcut("Remember that this is important."), true);
  assert.strictEqual(Engine.hasGenericShortcut("Think universal remote: adjustable settings."), false);
}

{
  const q = makeQuestion(1, { esQuestion: "" });
  q.es.answers = [];
  const normalized = Engine.normalizeQuestion(q, { language: "es" });
  assert.strictEqual(Engine.contentFor(normalized, "es").question, "Question 1?", "Spanish should safely fall back to English when missing");
}

{
  const questions = [makeQuestion(1, { memoryShortcut: "Remember that this is important." })];
  questions[0].es.question = "";
  const report = Engine.inventoryReport(questions, { minimumPerBucket: 2 });
  assert.strictEqual(report.total, 1);
  assert.ok(report.gaps.length > 0, "inventory should flag underfilled buckets");
  assert.ok(report.weakShortcuts.length > 0, "inventory should flag generic shortcuts");
}

{
  const session = {
    deck: [{ id: "q1" }, { id: "q2" }],
    answers: {
      q1: { selectedAnswerId: "q1-a1" },
      q2: { selectedAnswerId: "q2-a2" }
    }
  };
  const questions = {
    q1: makeQuestion(1, { style: "recall" }),
    q2: makeQuestion(2, { style: "scenario" })
  };
  const analytics = Engine.analyticsFromSession(session, (id) => questions[id]);
  assert.strictEqual(analytics.byStyle.recall.correct, 1);
  assert.strictEqual(analytics.byStyle.scenario.correct, 0);
  assert.ok(Engine.generateInsight(analytics, "en").length > 0);
}

console.log("question-engine tests passed");
