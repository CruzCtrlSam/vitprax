(function () {
  const domains = [
    { id: "cit-d1", number: 1, weight: 18.6, title: "Communication and Facilitation Skills", shortTitle: "Communication", topics: ["verbal communication", "nonverbal communication", "communication styles", "active listening", "questioning techniques", "feedback", "corrective feedback", "learner engagement", "adult learners", "literacy considerations", "audience diversity", "conflict resolution", "difficult participants", "facilitation", "clear language", "technology-assisted communication", "administrative communication"] },
    { id: "cit-d2", number: 2, weight: 13.8, title: "Needs Assessment", shortTitle: "Needs Assessment", topics: ["training needs analysis", "performance gaps", "training vs non-training problems", "target audience", "stakeholder needs", "organizational culture", "diversity/accessibility", "prerequisite knowledge", "knowledge skills and abilities", "task analysis", "job analysis", "gap analysis", "regulatory training requirements", "available resources"] },
    { id: "cit-d3", number: 3, weight: 14.4, title: "Course Design", shortTitle: "Course Design", topics: ["ADDIE", "SAT", "SAM", "Agile instructional design", "Bloom's taxonomy", "adult learning principles", "instructional strategies", "learning objectives", "SMART objectives", "Terminal Learning Objectives", "Enabling Learning Objectives", "action condition criterion", "delivery methods", "regulatory requirements", "consensus standards", "cost-benefit considerations"] },
    { id: "cit-d4", number: 4, weight: 15.6, title: "Course Development", shortTitle: "Development", topics: ["lesson plans", "instructor guides", "trainee materials", "handouts", "job aids", "simulations", "classroom learning", "on-the-job training", "eLearning", "mobile learning", "subject matter experts", "pilot testing", "validation", "course revision", "training records", "information security"] },
    { id: "cit-d5", number: 5, weight: 15.7, title: "Course Implementation", shortTitle: "Implementation", topics: ["classroom setup", "field training", "online training", "scheduling", "logistics", "training resources", "environmental distractions", "noise", "lighting", "temperature", "adapting instruction", "learner engagement", "disengagement", "time management", "collective learning", "technical problems", "instructor response to unexpected situations"] },
    { id: "cit-d6", number: 6, weight: 11.9, title: "Trainee Assessment", shortTitle: "Assessment", topics: ["knowledge assessment", "skills assessment", "written tests", "performance tests", "checklists", "observations", "assessment standards", "retraining", "retesting", "documentation", "behavior measurement", "competency verification"] },
    { id: "cit-d7", number: 7, weight: 10.0, title: "Course Evaluation", shortTitle: "Evaluation", topics: ["Kirkpatrick Evaluation Model", "Level 1 Reaction", "Level 2 Learning", "Level 3 Behavior", "Level 4 Results", "course effectiveness", "evaluation data", "stakeholder feedback", "continuous improvement", "course revision based on results"] },
    { id: "cit-ethics", number: 8, weight: 0, supplemental: true, title: "Ethics in Training", shortTitle: "Ethics", topics: ["BCSP professional ethics", "honesty", "competence", "truthful representation", "conflicts of interest", "professional conduct", "safety and health responsibility", "confidentiality", "discrimination/harassment", "credential representation"] }
  ];

  function q(id, domain, subtopic, difficulty, questionType, questionText, choices, correctAnswerId, explanation, incorrect, conceptTested, tags = []) {
    return {
      id,
      certification: "bcsp-cit",
      certificationId: "bcsp-cit",
      topic: domain,
      domain,
      subtopic,
      difficultyLevel: difficulty,
      questionType,
      questionText,
      answerChoices: choices,
      correctAnswer: correctAnswerId,
      correctAnswerId,
      explanation,
      incorrectAnswerExplanations: incorrect,
      conceptTested,
      referenceTopic: subtopic,
      tags,
      scenarioBased: /scenario|best|first|most|least/i.test(questionType),
      masteryWeight: difficulty === "Advanced" ? 1.4 : difficulty === "Exam-Level" ? 1.2 : difficulty === "Intermediate" ? 1 : 0.8,
      source: { type: "Vitprax Original", batch: "cit-sample-2026-09", reviewed: false },
      metadata: {
        certificationId: "bcsp-cit",
        topicId: domain,
        subtopicId: subtopic,
        conceptId: conceptTested.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        familyId: conceptTested.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        style: questionType === "Scenario" ? "scenario" : questionType === "BEST answer" ? "best_recommendation" : questionType === "FIRST action" ? "professional_action" : "recall",
        cognitiveSkill: questionType === "Concept recognition" || questionType === "Terminology" ? "understand" : "apply",
        difficulty: { Foundational: 1, Intermediate: 2, "Exam-Level": 4, Advanced: 5 }[difficulty] || 3,
        estimatedTimeSeconds: questionType === "Scenario" ? 90 : 60,
        examWeight: domain,
        isActive: true,
        isReviewed: false
      },
      en: {
        question: questionText,
        answers: choices,
        explanation,
        explanationSections: {
          whyCorrect: explanation,
          whyOthersWrong: Object.entries(incorrect).map(([answerId, text]) => {
            const label = choices.find((choice) => choice.id === answerId)?.text || answerId;
            return `${label}: ${text}`;
          }),
          examTip: conceptTested,
          memoryTrick: "",
          example: ""
        }
      },
      es: {
        question: questionText,
        answers: choices,
        explanation
      }
    };
  }

  const questions = [
    q(
      "cit-sample-d1-q1",
      "cit-d1",
      "active listening",
      "Intermediate",
      "BEST answer",
      "During a safety training class, a participant challenges the instructor and says the procedure will never work in the field. What is the BEST first response?",
      [
        { id: "cit-sample-d1-q1-a1", text: "Ask the participant to explain the field concern and connect it back to the learning objective" },
        { id: "cit-sample-d1-q1-a2", text: "Move on quickly so the class schedule is not interrupted" },
        { id: "cit-sample-d1-q1-a3", text: "Tell the participant the procedure is required and debate is not useful" },
        { id: "cit-sample-d1-q1-a4", text: "End the class discussion and report the participant to management" }
      ],
      "cit-sample-d1-q1-a1",
      "A skilled trainer uses active listening before correcting or redirecting. Asking for the concern keeps control of the class while showing respect, then the instructor can tie the discussion back to the objective.",
      {
        "cit-sample-d1-q1-a2": "Avoiding the concern may protect the clock but loses engagement and misses useful field information.",
        "cit-sample-d1-q1-a3": "Shutting down the learner may create resistance and does not model effective facilitation.",
        "cit-sample-d1-q1-a4": "Escalation is not the first instructional response unless safety, harassment, or serious misconduct is involved."
      },
      "Active listening before corrective feedback",
      ["facilitation", "corrective feedback", "adult learners"]
    ),
    q(
      "cit-sample-d2-q1",
      "cit-d2",
      "training vs non-training problems",
      "Exam-Level",
      "Scenario",
      "Incident reports show forklift operators know the inspection checklist but skip it when production is behind. What does this most likely indicate?",
      [
        { id: "cit-sample-d2-q1-a1", text: "A training need because operators forgot the checklist" },
        { id: "cit-sample-d2-q1-a2", text: "A non-training performance barrier related to work pressure or supervision" },
        { id: "cit-sample-d2-q1-a3", text: "A need to remove all hands-on forklift exercises from training" },
        { id: "cit-sample-d2-q1-a4", text: "A course evaluation problem only" }
      ],
      "cit-sample-d2-q1-a2",
      "Needs assessment separates knowledge gaps from performance barriers. If learners already know what to do but the workplace rewards skipping the step, more training alone will not fix the root cause.",
      {
        "cit-sample-d2-q1-a1": "The scenario says they know the checklist, so the problem is not primarily missing knowledge.",
        "cit-sample-d2-q1-a3": "Removing practice would weaken training and does not address the workplace pressure.",
        "cit-sample-d2-q1-a4": "Evaluation data may reveal the issue, but the likely cause is a performance-system barrier."
      },
      "Training need vs non-training performance problem",
      ["needs assessment", "gap analysis", "performance gaps"]
    ),
    q(
      "cit-sample-d3-q1",
      "cit-d3",
      "learning objectives",
      "Foundational",
      "Terminology",
      "Which part of a well-written learning objective describes the standard used to judge acceptable performance?",
      [
        { id: "cit-sample-d3-q1-a1", text: "Action" },
        { id: "cit-sample-d3-q1-a2", text: "Condition" },
        { id: "cit-sample-d3-q1-a3", text: "Criterion" },
        { id: "cit-sample-d3-q1-a4", text: "Audience" }
      ],
      "cit-sample-d3-q1-a3",
      "The criterion is the measurable standard for success. In objective writing, action says what the learner does, condition says under what circumstances, and criterion says how well it must be done.",
      {
        "cit-sample-d3-q1-a1": "Action is the observable behavior, not the success standard.",
        "cit-sample-d3-q1-a2": "Condition describes tools, setting, or limits.",
        "cit-sample-d3-q1-a4": "Audience identifies the learner but does not define performance quality."
      },
      "Action-condition-criterion objectives",
      ["objectives", "TLO", "ELO"]
    ),
    q(
      "cit-sample-d4-q1",
      "cit-d4",
      "pilot testing",
      "Intermediate",
      "Concept recognition",
      "A trainer delivers a new confined-space lesson to a small representative group before full rollout to identify confusing sections. This is an example of:",
      [
        { id: "cit-sample-d4-q1-a1", text: "Pilot testing" },
        { id: "cit-sample-d4-q1-a2", text: "Summative evaluation only" },
        { id: "cit-sample-d4-q1-a3", text: "Credential maintenance" },
        { id: "cit-sample-d4-q1-a4", text: "Job rotation" }
      ],
      "cit-sample-d4-q1-a1",
      "Pilot testing tries the course before full implementation so the trainer can find confusing content, timing problems, missing materials, or unrealistic activities.",
      {
        "cit-sample-d4-q1-a2": "Summative evaluation happens after implementation to judge final effectiveness.",
        "cit-sample-d4-q1-a3": "Credential maintenance relates to keeping a certification, not testing a course.",
        "cit-sample-d4-q1-a4": "Job rotation is a work assignment strategy, not a course validation step."
      },
      "Pilot testing before rollout",
      ["course development", "validation"]
    ),
    q(
      "cit-sample-d5-q1",
      "cit-d5",
      "adapting instruction",
      "Exam-Level",
      "FIRST action",
      "Halfway through outdoor training, nearby construction noise makes it hard for learners to hear instructions. What should the trainer do FIRST?",
      [
        { id: "cit-sample-d5-q1-a1", text: "Pause and adjust the learning environment or delivery method so learners can receive the instruction" },
        { id: "cit-sample-d5-q1-a2", text: "Continue because changing the plan would reduce consistency" },
        { id: "cit-sample-d5-q1-a3", text: "Skip the remaining practice activity" },
        { id: "cit-sample-d5-q1-a4", text: "Lower the passing score for the assessment" }
      ],
      "cit-sample-d5-q1-a1",
      "Implementation requires the instructor to manage distractions that interfere with learning. The first move is to restore communication and safety before continuing the lesson.",
      {
        "cit-sample-d5-q1-a2": "Consistency is not useful if learners cannot hear the instruction.",
        "cit-sample-d5-q1-a3": "Skipping practice removes a learning opportunity instead of fixing the barrier.",
        "cit-sample-d5-q1-a4": "Assessment standards should not be lowered because the environment was poorly controlled."
      },
      "Instructor response to environmental distractions",
      ["implementation", "environment", "field training"]
    ),
    q(
      "cit-sample-d6-q1",
      "cit-d6",
      "performance tests",
      "Exam-Level",
      "Scenario",
      "A lockout/tagout course requires workers to demonstrate each step on actual equipment. Which assessment method best verifies competency?",
      [
        { id: "cit-sample-d6-q1-a1", text: "A performance test using a checklist of required steps" },
        { id: "cit-sample-d6-q1-a2", text: "A learner satisfaction survey" },
        { id: "cit-sample-d6-q1-a3", text: "A lecture attendance roster" },
        { id: "cit-sample-d6-q1-a4", text: "A multiple-choice test only" }
      ],
      "cit-sample-d6-q1-a1",
      "When the objective is a skill, the assessment should require performance of that skill. A checklist makes the standard observable and helps the evaluator verify each required step.",
      {
        "cit-sample-d6-q1-a2": "Satisfaction measures reaction, not skill competency.",
        "cit-sample-d6-q1-a3": "Attendance proves presence, not ability.",
        "cit-sample-d6-q1-a4": "A written test may check knowledge but does not verify hands-on performance by itself."
      },
      "Performance assessment for skill competency",
      ["assessment", "skills", "checklists"]
    ),
    q(
      "cit-sample-d7-q1",
      "cit-d7",
      "Kirkpatrick Level 3",
      "Intermediate",
      "Concept recognition",
      "A supervisor observes employees three weeks after training to see whether they now use the safe lifting method on the job. Which Kirkpatrick level is being evaluated?",
      [
        { id: "cit-sample-d7-q1-a1", text: "Level 1 Reaction" },
        { id: "cit-sample-d7-q1-a2", text: "Level 2 Learning" },
        { id: "cit-sample-d7-q1-a3", text: "Level 3 Behavior" },
        { id: "cit-sample-d7-q1-a4", text: "Level 4 Results" }
      ],
      "cit-sample-d7-q1-a3",
      "Level 3 asks whether learners changed behavior back on the job. Observation after training is stronger evidence of behavior transfer than a classroom test or satisfaction survey.",
      {
        "cit-sample-d7-q1-a1": "Reaction asks whether learners liked or valued the training.",
        "cit-sample-d7-q1-a2": "Learning checks knowledge or skill gained during training.",
        "cit-sample-d7-q1-a4": "Results looks at organizational outcomes such as injury reduction or productivity."
      },
      "Kirkpatrick Level 3 behavior transfer",
      ["evaluation", "Kirkpatrick", "behavior"]
    ),
    q(
      "cit-sample-ethics-q1",
      "cit-ethics",
      "truthful representation",
      "Foundational",
      "Professional action",
      "A trainer is asked to advertise that a short internal refresher course makes attendees BCSP certified. What should the trainer do?",
      [
        { id: "cit-sample-ethics-q1-a1", text: "Refuse or correct the claim because training completion is not the same as certification" },
        { id: "cit-sample-ethics-q1-a2", text: "Use the claim if it increases course enrollment" },
        { id: "cit-sample-ethics-q1-a3", text: "Add the claim only to social media posts" },
        { id: "cit-sample-ethics-q1-a4", text: "Let marketing decide because ethics does not apply to course advertising" }
      ],
      "cit-sample-ethics-q1-a1",
      "Professional ethics require truthful representation of credentials and training outcomes. Completing a course may support preparation or compliance, but it does not grant a BCSP credential unless BCSP awards it.",
      {
        "cit-sample-ethics-q1-a2": "Enrollment goals do not justify misleading credential claims.",
        "cit-sample-ethics-q1-a3": "A misleading claim is still misleading on social media.",
        "cit-sample-ethics-q1-a4": "Ethical responsibility applies to how training and credentials are represented."
      },
      "Truthful credential representation",
      ["ethics", "credential representation"]
    )
  ];

  const chapters = domains.map((domain) => ({
    id: domain.id,
    number: domain.number,
    weight: domain.weight,
    supplemental: Boolean(domain.supplemental),
    title: { en: domain.title, es: domain.title },
    sections: [
      {
        id: `${domain.id}-overview`,
        heading: { en: "What this domain is really testing", es: "What this domain is really testing" },
        markdown: {
          en: domain.supplemental
            ? `This supplemental category supports BCSP professional conduct. It is not an eighth weighted CIT2 examination domain, but it protects the credibility of the trainer and the credential.\n\nFocus on truthful representation, competence, confidentiality, conflicts of interest, and professional conduct.`
            : `${domain.title} represents ${domain.weight}% of the CIT2 blueprint. The practical test is whether a trainer can use these concepts to improve learning, safety performance, and defensible training decisions.\n\nKey subjects: ${domain.topics.join(", ")}.`,
          es: domain.supplemental
            ? `Esta categoría suplementaria apoya la conducta profesional de BCSP. No es un octavo dominio ponderado del examen CIT2, pero protege la credibilidad del instructor y de la credencial.\n\nMantén los términos oficiales en inglés cuando estudies para el examen.`
            : `${domain.title} representa ${domain.weight}% del blueprint CIT2. Para estudiar en español, conserva los términos oficiales en inglés junto con la explicación.`
        }
      },
      {
        id: `${domain.id}-exam-traps`,
        heading: { en: "Exam traps", es: "Exam traps" },
        markdown: {
          en: `Do not answer as a generic good instructor. Answer as a safety trainer using a documented process. Watch for BEST, FIRST, MOST, and LEAST wording. Those words usually decide whether the answer is about listening, analysis, design, implementation, assessment, or evaluation.`,
          es: `No respondas solo como "buen instructor" en general. Responde como safety trainer usando un proceso documentado. Mantén BEST, FIRST, MOST y LEAST en inglés porque esas palabras aparecen así en el examen.`
        }
      }
    ]
  }));

  const concepts = domains.flatMap((domain) => domain.topics.slice(0, 6).map((topic, index) => ({
    id: `${domain.id}-card-${index + 1}`,
    certificationId: "bcsp-cit",
    chapter: domain.number,
    topicId: domain.id,
    subtopicId: topic,
    conceptId: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    term: topic.replace(/\b\w/g, (letter) => letter.toUpperCase()),
    type: index % 3 === 0 ? "exam_shortcut" : "term_definition",
    difficulty: domain.supplemental ? 2 : 3,
    definition: {
      en: domain.supplemental
        ? `Ethics check: represent ${topic} honestly and professionally.`
        : `CIT ${domain.shortTitle}: know how ${topic} affects training decisions, learner performance, and documentation.`,
      es: domain.supplemental
        ? `Ética: representa ${topic} con honestidad y profesionalismo.`
        : `CIT ${domain.shortTitle}: entiende cómo ${topic} afecta decisiones de entrenamiento, desempeño del aprendiz y documentación.`
    }
  })));

  window.VITPRAX_CERTIFICATIONS = {
    "texas-life": {
      id: "texas-life",
      label: "Texas Life Insurance",
      shortLabel: "Texas Life",
      organization: "Texas Department of Insurance / Pearson VUE",
      questionTarget: 300,
      examQuestionCount: 100,
      examMinutes: 120,
      defaultLanguage: "en",
      bilingual: true,
      questionGlobal: "CERTIVO_QUESTIONS",
      studyGlobal: "CERTIVO_STUDY"
    },
    "bcsp-cit": {
      id: "bcsp-cit",
      label: "BCSP Certified Instructional Trainer (CIT)",
      shortLabel: "BCSP CIT",
      organization: "Board of Certified Safety Professionals",
      blueprint: "CIT2 / 2024.05.01",
      questionTarget: 100,
      examQuestionCount: 100,
      examMinutes: 120,
      diagnosticQuestionCount: 50,
      defaultLanguage: "en",
      bilingual: "architecture-ready",
      domains,
      study: { meta: { title: "BCSP CIT2 Study Architecture", exam: "Certified Instructional Trainer (CIT)", schema_version: "1.0", requires_professional_review: true }, chapters, concepts },
      questions
    }
  };
})();
