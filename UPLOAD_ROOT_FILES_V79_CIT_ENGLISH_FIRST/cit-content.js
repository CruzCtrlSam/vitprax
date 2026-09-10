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

  const expansionQuestions = [
    q(
      "cit-d1-original-q002",
      "cit-d1",
      "questioning techniques",
      "Intermediate",
      "Application",
      "An instructor wants learners to explain why a lockout/tagout step matters instead of simply repeating the step. Which questioning approach best supports that goal?",
      [
        { id: "cit-d1-original-q002-a", text: "Ask open-ended questions that require learners to explain the reason behind the action" },
        { id: "cit-d1-original-q002-b", text: "Ask only yes-or-no questions so the class moves faster" },
        { id: "cit-d1-original-q002-c", text: "Read the written procedure again without discussion" },
        { id: "cit-d1-original-q002-d", text: "Avoid questions until the final test" }
      ],
      "cit-d1-original-q002-a",
      "Open-ended questions reveal whether learners understand the purpose behind a safety step. For adult learners, explaining the reason for an action improves transfer because they can connect the rule to field conditions.",
      {
        "cit-d1-original-q002-b": "Yes-or-no questions may confirm recall, but they rarely show reasoning.",
        "cit-d1-original-q002-c": "Repeating content does not verify understanding.",
        "cit-d1-original-q002-d": "Waiting until the final test misses opportunities to correct confusion during instruction."
      },
      "Open-ended questioning for understanding",
      ["communication", "facilitation", "adult learners"]
    ),
    q(
      "cit-d1-original-q003",
      "cit-d1",
      "corrective feedback",
      "Exam-Level",
      "BEST answer",
      "A learner performs a respirator seal check incorrectly during practice. What is the BEST feedback response?",
      [
        { id: "cit-d1-original-q003-a", text: "Stop the practice, identify the specific error, demonstrate the correct step, and have the learner try again" },
        { id: "cit-d1-original-q003-b", text: "Tell the learner they failed and move to the next person" },
        { id: "cit-d1-original-q003-c", text: "Ignore the mistake until the written exam" },
        { id: "cit-d1-original-q003-d", text: "Lower the skill standard because the class is short on time" }
      ],
      "cit-d1-original-q003-a",
      "Corrective feedback should be specific, timely, and tied to the required performance. The trainer protects learning and safety by correcting the observable error and requiring another attempt.",
      {
        "cit-d1-original-q003-b": "A pass/fail statement without coaching does not teach the correct performance.",
        "cit-d1-original-q003-c": "A written exam does not fix an unsafe hands-on technique.",
        "cit-d1-original-q003-d": "Assessment standards should not be reduced to solve a time-management problem."
      },
      "Specific feedback plus re-practice",
      ["feedback", "skills practice", "facilitation"]
    ),
    q(
      "cit-d1-original-q004",
      "cit-d1",
      "literacy considerations",
      "Exam-Level",
      "MOST appropriate",
      "A group includes employees with different reading levels. Which course adjustment is MOST appropriate?",
      [
        { id: "cit-d1-original-q004-a", text: "Use plain language, demonstrations, visuals, and checks for understanding without lowering the safety standard" },
        { id: "cit-d1-original-q004-b", text: "Remove technical terms from the course even when they are required on the job" },
        { id: "cit-d1-original-q004-c", text: "Give only a written handout and avoid discussion" },
        { id: "cit-d1-original-q004-d", text: "Excuse lower-literacy learners from the assessment" }
      ],
      "cit-d1-original-q004-a",
      "Instruction should be accessible while preserving the competency requirement. Plain language and demonstrations help learners understand the material, while checks for understanding confirm that the standard is still met.",
      {
        "cit-d1-original-q004-b": "Required job terms should be taught clearly, not removed.",
        "cit-d1-original-q004-c": "A handout-only method can increase the barrier for lower-literacy learners.",
        "cit-d1-original-q004-d": "Removing the assessment undermines competency verification."
      },
      "Accessible delivery, same standard",
      ["literacy", "audience diversity", "adult learners"]
    ),
    q(
      "cit-d1-original-q005",
      "cit-d1",
      "difficult participants",
      "Advanced",
      "FIRST action",
      "A participant repeatedly interrupts with unrelated complaints during a hazard communication class. What should the instructor do FIRST?",
      [
        { id: "cit-d1-original-q005-a", text: "Redirect the comments to the lesson objective and set a respectful boundary for discussion" },
        { id: "cit-d1-original-q005-b", text: "End the training immediately" },
        { id: "cit-d1-original-q005-c", text: "Argue with the participant until the class agrees with the instructor" },
        { id: "cit-d1-original-q005-d", text: "Ignore the behavior for the rest of the session" }
      ],
      "cit-d1-original-q005-a",
      "Facilitation requires maintaining a productive learning environment without humiliating the learner. A clear redirect protects the class objective and gives the participant a path back into appropriate participation.",
      {
        "cit-d1-original-q005-b": "Ending training is disproportionate unless safety or serious misconduct requires it.",
        "cit-d1-original-q005-c": "Arguing escalates conflict and shifts attention away from learning.",
        "cit-d1-original-q005-d": "Ignoring repeated disruption allows the learning environment to deteriorate."
      },
      "Redirect behavior back to objective",
      ["conflict resolution", "difficult participants", "facilitation"]
    ),
    q(
      "cit-d2-original-q002",
      "cit-d2",
      "performance gaps",
      "Intermediate",
      "Concept recognition",
      "A training request states that employees are making errors, but no one has compared current performance to the expected standard. What is missing?",
      [
        { id: "cit-d2-original-q002-a", text: "A performance gap analysis" },
        { id: "cit-d2-original-q002-b", text: "A final course evaluation" },
        { id: "cit-d2-original-q002-c", text: "A learner reaction survey" },
        { id: "cit-d2-original-q002-d", text: "A room setup checklist" }
      ],
      "cit-d2-original-q002-a",
      "A performance gap is the difference between what people are doing and what they are expected to do. Before designing training, the trainer must understand that gap and whether training is the right solution.",
      {
        "cit-d2-original-q002-b": "Final evaluation happens after training and cannot define the initial gap by itself.",
        "cit-d2-original-q002-c": "Reaction surveys measure satisfaction, not current versus expected job performance.",
        "cit-d2-original-q002-d": "Room setup is an implementation concern, not a needs assessment tool."
      },
      "Current performance versus required performance",
      ["needs assessment", "gap analysis"]
    ),
    q(
      "cit-d2-original-q003",
      "cit-d2",
      "task analysis",
      "Exam-Level",
      "Application",
      "A trainer watches experienced workers perform a confined-space entry process and breaks the job into required steps, hazards, tools, and decisions. This is primarily:",
      [
        { id: "cit-d2-original-q003-a", text: "Task analysis" },
        { id: "cit-d2-original-q003-b", text: "Learning objective sequencing" },
        { id: "cit-d2-original-q003-c", text: "Post-training behavior evaluation" },
        { id: "cit-d2-original-q003-d", text: "Instructor-led demonstration planning" }
      ],
      "cit-d2-original-q003-a",
      "Task analysis identifies the work steps and conditions that training must address. It helps convert real job performance into teachable objectives, practice activities, and assessment criteria.",
      {
        "cit-d2-original-q003-b": "Sequencing objectives happens after the job tasks and required performance have been analyzed.",
        "cit-d2-original-q003-c": "Behavior evaluation checks transfer after training, not the original breakdown of the job.",
        "cit-d2-original-q003-d": "Demonstration planning may use the task analysis, but it is not the analysis itself."
      },
      "Analyze the job before designing the lesson",
      ["task analysis", "job analysis", "KSAs"]
    ),
    q(
      "cit-d2-original-q004",
      "cit-d2",
      "stakeholder needs",
      "Intermediate",
      "BEST answer",
      "A supervisor wants a short refresher, employees report equipment problems, and incident data shows inconsistent procedures. What should the trainer do before building the course?",
      [
        { id: "cit-d2-original-q004-a", text: "Gather stakeholder input and performance data to define the actual need" },
        { id: "cit-d2-original-q004-b", text: "Build the refresher exactly as requested" },
        { id: "cit-d2-original-q004-c", text: "Ignore employee input because supervisors requested the training" },
        { id: "cit-d2-original-q004-d", text: "Cancel training because equipment problems are mentioned" }
      ],
      "cit-d2-original-q004-a",
      "Needs assessment should reconcile stakeholder perspectives with objective performance data. The trainer should clarify whether the issue is knowledge, procedure, equipment, supervision, or a mix of causes.",
      {
        "cit-d2-original-q004-b": "A requested course may not address the true cause of the performance problem.",
        "cit-d2-original-q004-c": "Employee input can reveal barriers that supervisors do not see.",
        "cit-d2-original-q004-d": "Equipment issues may be part of the solution, but they do not automatically eliminate all training needs."
      },
      "Verify the need before designing",
      ["stakeholders", "needs assessment", "performance data"]
    ),
    q(
      "cit-d2-original-q005",
      "cit-d2",
      "regulatory training requirements",
      "Foundational",
      "Terminology",
      "When a regulation requires workers to receive training before performing a hazardous task, the requirement should be captured during:",
      [
        { id: "cit-d2-original-q005-a", text: "Needs assessment" },
        { id: "cit-d2-original-q005-b", text: "Course evaluation" },
        { id: "cit-d2-original-q005-c", text: "Training delivery" },
        { id: "cit-d2-original-q005-d", text: "Learner assessment scoring" }
      ],
      "cit-d2-original-q005-a",
      "Regulatory requirements are part of determining what training is required, who needs it, and when it must occur. Capturing them early keeps the design aligned with compliance and job performance.",
      {
        "cit-d2-original-q005-b": "Course evaluation judges training effectiveness after delivery.",
        "cit-d2-original-q005-c": "Delivery is when instruction occurs, not when the required need is first identified.",
        "cit-d2-original-q005-d": "Assessment scoring verifies learner performance after the requirement has already been defined."
      },
      "Required training belongs in needs assessment",
      ["regulatory training", "compliance"]
    ),
    q(
      "cit-d3-original-q002",
      "cit-d3",
      "Bloom's taxonomy",
      "Intermediate",
      "Application",
      "A learning objective asks trainees to inspect a scaffold and identify unsafe conditions. Which cognitive level is most directly involved?",
      [
        { id: "cit-d3-original-q002-a", text: "Analyze" },
        { id: "cit-d3-original-q002-b", text: "Remember" },
        { id: "cit-d3-original-q002-c", text: "Understand" },
        { id: "cit-d3-original-q002-d", text: "Evaluate training reaction" }
      ],
      "cit-d3-original-q002-a",
      "Identifying unsafe conditions requires breaking the situation into parts and judging whether each part meets the standard. That goes beyond memorizing terms because the learner applies criteria to a real or simulated condition.",
      {
        "cit-d3-original-q002-b": "Remembering facts is lower-level recall and does not require interpreting a scaffold condition.",
        "cit-d3-original-q002-c": "Understanding explains meaning, but this task requires applying criteria to parts of a work scene.",
        "cit-d3-original-q002-d": "Reaction is a course-evaluation measure, not the cognitive level of the scaffold inspection objective."
      },
      "Inspect and identify usually means analyze/apply",
      ["Bloom's taxonomy", "learning objectives"]
    ),
    q(
      "cit-d3-original-q003",
      "cit-d3",
      "Terminal Learning Objectives",
      "Exam-Level",
      "Concept recognition",
      "A course goal states that by the end of training, learners will safely perform a complete machine-guarding inspection. This is best described as a:",
      [
        { id: "cit-d3-original-q003-a", text: "Terminal Learning Objective" },
        { id: "cit-d3-original-q003-b", text: "Enabling Learning Objective" },
        { id: "cit-d3-original-q003-c", text: "Performance assessment criterion" },
        { id: "cit-d3-original-q003-d", text: "Course evaluation outcome" }
      ],
      "cit-d3-original-q003-a",
      "A Terminal Learning Objective describes the major performance learners should be able to complete by the end of the course. Supporting enabling objectives break that larger performance into smaller teachable pieces.",
      {
        "cit-d3-original-q003-b": "An enabling objective supports the terminal objective by teaching a smaller component skill.",
        "cit-d3-original-q003-c": "A criterion defines how performance will be judged, not the complete end-of-course performance itself.",
        "cit-d3-original-q003-d": "Evaluation outcomes measure course effectiveness rather than stating what the learner will perform."
      },
      "TLO = final course performance",
      ["TLO", "learning objectives", "course design"]
    ),
    q(
      "cit-d3-original-q004",
      "cit-d3",
      "delivery methods",
      "Exam-Level",
      "MOST appropriate",
      "The objective requires workers to demonstrate emergency eyewash activation and flushing technique. Which delivery method is MOST appropriate?",
      [
        { id: "cit-d3-original-q004-a", text: "Hands-on demonstration and practice with performance feedback" },
        { id: "cit-d3-original-q004-b", text: "Instructor lecture followed by a written knowledge check only" },
        { id: "cit-d3-original-q004-c", text: "Self-paced reading with supervisor sign-off only" },
        { id: "cit-d3-original-q004-d", text: "Video demonstration with no learner practice" }
      ],
      "cit-d3-original-q004-a",
      "The delivery method should match the objective. When the objective requires physical performance, learners need to see the task, practice it, and receive feedback on the required steps.",
      {
        "cit-d3-original-q004-b": "Lecture and a written check may support knowledge, but the objective requires demonstrated technique.",
        "cit-d3-original-q004-c": "Reading and sign-off do not give the trainer direct evidence of skill performance.",
        "cit-d3-original-q004-d": "Watching a video can model the skill, but learners still need to perform it."
      },
      "Match skill objectives with skill practice",
      ["delivery methods", "performance objective"]
    ),
    q(
      "cit-d3-original-q005",
      "cit-d3",
      "SMART objectives",
      "Foundational",
      "Terminology",
      "Which objective is written most like a measurable training objective?",
      [
        { id: "cit-d3-original-q005-a", text: "Given a checklist, identify five fall hazards in a photo with 100% accuracy" },
        { id: "cit-d3-original-q005-b", text: "Understand fall protection requirements for the work area" },
        { id: "cit-d3-original-q005-c", text: "Discuss fall protection concepts during the class" },
        { id: "cit-d3-original-q005-d", text: "Become familiar with common fall hazards" }
      ],
      "cit-d3-original-q005-a",
      "A measurable objective names the condition, observable action, and performance standard. This wording tells the learner what to do, what tool is provided, and how success will be judged.",
      {
        "cit-d3-original-q005-b": "Understand names the desired learning but not an observable performance.",
        "cit-d3-original-q005-c": "Discuss is observable, but the wording lacks a clear performance standard.",
        "cit-d3-original-q005-d": "Become familiar is too vague to measure reliably."
      },
      "Objective = condition + action + criterion",
      ["SMART objectives", "criterion"]
    ),
    q(
      "cit-d4-original-q002",
      "cit-d4",
      "instructor guides",
      "Intermediate",
      "Application",
      "A company wants different trainers to deliver the same excavation safety class consistently. Which development product best supports that consistency?",
      [
        { id: "cit-d4-original-q002-a", text: "An instructor guide with timing, prompts, activities, and key teaching points" },
        { id: "cit-d4-original-q002-b", text: "A trainee workbook without instructor notes" },
        { id: "cit-d4-original-q002-c", text: "A slide deck without activities or timing guidance" },
        { id: "cit-d4-original-q002-d", text: "A roster and completion certificate template" }
      ],
      "cit-d4-original-q002-a",
      "An instructor guide standardizes how the course is delivered while still allowing professional facilitation. It helps trainers cover required points, run activities, manage time, and apply the same performance standard.",
      {
        "cit-d4-original-q002-b": "A workbook supports learners but does not tell instructors how to facilitate consistently.",
        "cit-d4-original-q002-c": "Slides alone can vary widely in delivery if timing, prompts, and activities are not defined.",
        "cit-d4-original-q002-d": "Rosters and certificates document completion but do not standardize instruction."
      },
      "Instructor guides protect consistency",
      ["instructor guides", "course development"]
    ),
    q(
      "cit-d4-original-q003",
      "cit-d4",
      "job aids",
      "Foundational",
      "Concept recognition",
      "A laminated pre-use inspection checklist attached to equipment is best described as a:",
      [
        { id: "cit-d4-original-q003-a", text: "Job aid" },
        { id: "cit-d4-original-q003-b", text: "Terminal objective" },
        { id: "cit-d4-original-q003-c", text: "Level 4 result" },
        { id: "cit-d4-original-q003-d", text: "Instructor guide" }
      ],
      "cit-d4-original-q003-a",
      "A job aid supports correct performance at the point of work. It is especially useful when workers must follow a sequence, verify critical steps, or reduce memory load.",
      {
        "cit-d4-original-q003-b": "A terminal objective describes final learner performance, not a workplace support tool.",
        "cit-d4-original-q003-c": "Level 4 results are organizational outcomes.",
        "cit-d4-original-q003-d": "An instructor guide supports course delivery, not worker performance at the equipment."
      },
      "Job aid = performance support at work",
      ["job aids", "performance support"]
    ),
    q(
      "cit-d4-original-q004",
      "cit-d4",
      "subject matter experts",
      "Exam-Level",
      "BEST answer",
      "A trainer is developing electrical safety content outside their own technical expertise. What is the BEST use of a subject matter expert?",
      [
        { id: "cit-d4-original-q004-a", text: "Have the SME verify technical accuracy while the trainer controls instructional design" },
        { id: "cit-d4-original-q004-b", text: "Let the SME replace all learning objectives with personal stories" },
        { id: "cit-d4-original-q004-c", text: "Skip review if the slides look professional" },
        { id: "cit-d4-original-q004-d", text: "Ask the SME to deliver the course without aligning content to objectives" }
      ],
      "cit-d4-original-q004-a",
      "SMEs are valuable for technical accuracy, current practice, and real workplace examples. The trainer still translates that expertise into objectives, activities, materials, and assessment methods.",
      {
        "cit-d4-original-q004-b": "Stories may help, but they cannot replace defined learning outcomes.",
        "cit-d4-original-q004-c": "Professional-looking materials can still contain technical errors.",
        "cit-d4-original-q004-d": "SME delivery still needs instructional alignment, objectives, and assessment design."
      },
      "SME verifies accuracy; trainer designs learning",
      ["SME", "course development", "validation"]
    ),
    q(
      "cit-d4-original-q005",
      "cit-d4",
      "information security",
      "Intermediate",
      "Professional action",
      "A trainee workbook includes confidential incident details that are not needed for the learning objective. What should the trainer do?",
      [
        { id: "cit-d4-original-q005-a", text: "Remove or anonymize unnecessary confidential information before distribution" },
        { id: "cit-d4-original-q005-b", text: "Leave the details because real names make the case study interesting" },
        { id: "cit-d4-original-q005-c", text: "Post the workbook publicly so everyone can prepare" },
        { id: "cit-d4-original-q005-d", text: "Ask learners to ignore the confidential details" }
      ],
      "cit-d4-original-q005-a",
      "Course materials should protect confidential information while still supporting the learning objective. Anonymizing or removing unnecessary details preserves instructional value and reduces privacy and trust problems.",
      {
        "cit-d4-original-q005-b": "Interest does not justify exposing unnecessary confidential information.",
        "cit-d4-original-q005-c": "Public posting increases the risk of improper disclosure.",
        "cit-d4-original-q005-d": "Asking learners to ignore the information does not protect it."
      },
      "Use only the information training requires",
      ["information security", "training records", "ethics"]
    ),
    q(
      "cit-d5-original-q002",
      "cit-d5",
      "classroom setup",
      "Foundational",
      "Application",
      "Before a skills-based class begins, the instructor checks equipment, space, visibility, and emergency access. This is part of:",
      [
        { id: "cit-d5-original-q002-a", text: "Preparing the learning environment" },
        { id: "cit-d5-original-q002-b", text: "Conducting the performance assessment" },
        { id: "cit-d5-original-q002-c", text: "Revising the course after evaluation data" },
        { id: "cit-d5-original-q002-d", text: "Completing the needs assessment" }
      ],
      "cit-d5-original-q002-a",
      "Implementation includes making sure the training environment supports safe and effective learning. Equipment, layout, visibility, and emergency access can directly affect participation and safety.",
      {
        "cit-d5-original-q002-b": "Assessment verifies learner performance; the scenario is preparing conditions before instruction starts.",
        "cit-d5-original-q002-c": "Course revision happens after evaluation, not during pre-class setup.",
        "cit-d5-original-q002-d": "Needs assessment identifies the training need before implementation."
      },
      "Set up the environment before delivery",
      ["classroom setup", "implementation"]
    ),
    q(
      "cit-d5-original-q003",
      "cit-d5",
      "technical problems",
      "Exam-Level",
      "FIRST action",
      "An online training platform fails ten minutes before a required live session. What should the trainer do FIRST?",
      [
        { id: "cit-d5-original-q003-a", text: "Activate the backup delivery plan and communicate clear instructions to learners" },
        { id: "cit-d5-original-q003-b", text: "Convert the course to self-study without checking objective alignment" },
        { id: "cit-d5-original-q003-c", text: "Proceed with the original plan and address access issues after class" },
        { id: "cit-d5-original-q003-d", text: "Reschedule immediately without notifying learners of alternatives" }
      ],
      "cit-d5-original-q003-a",
      "Implementation problems should be managed in a way that protects learning continuity. A prepared backup plan and clear communication reduce confusion and keep the session aligned with its objectives.",
      {
        "cit-d5-original-q003-b": "Self-study may not support the same objectives or required interaction.",
        "cit-d5-original-q003-c": "Continuing without access prevents learners from receiving the instruction.",
        "cit-d5-original-q003-d": "Rescheduling may be needed, but the trainer should first use a prepared contingency plan if one exists."
      },
      "Have and use a backup plan",
      ["online training", "technical problems", "logistics"]
    ),
    q(
      "cit-d5-original-q004",
      "cit-d5",
      "time management",
      "Intermediate",
      "BEST answer",
      "A class discussion is useful but is consuming time needed for required hands-on practice. What is the BEST instructor response?",
      [
        { id: "cit-d5-original-q004-a", text: "Summarize the key point, park extra questions, and move to the required practice activity" },
        { id: "cit-d5-original-q004-b", text: "Let discussion continue until all practice time is gone" },
        { id: "cit-d5-original-q004-c", text: "Stop all questions for the rest of the course" },
        { id: "cit-d5-original-q004-d", text: "Remove the assessment to regain time" }
      ],
      "cit-d5-original-q004-a",
      "The instructor should balance engagement with required performance practice. Parking extra questions preserves respect for learners while protecting the course objective and assessment readiness.",
      {
        "cit-d5-original-q004-b": "Useful discussion cannot replace required skill practice.",
        "cit-d5-original-q004-c": "Banning questions harms engagement and may hide confusion.",
        "cit-d5-original-q004-d": "Removing assessment weakens competency verification."
      },
      "Protect required practice time",
      ["time management", "learner engagement"]
    ),
    q(
      "cit-d5-original-q005",
      "cit-d5",
      "disengagement",
      "Advanced",
      "MOST appropriate",
      "During refresher training, experienced workers appear disengaged because they believe the material is too basic. Which adjustment is MOST appropriate?",
      [
        { id: "cit-d5-original-q005-a", text: "Use realistic scenarios and ask learners to apply the standard to difficult field conditions" },
        { id: "cit-d5-original-q005-b", text: "Reduce the refresher to a policy reading with no discussion" },
        { id: "cit-d5-original-q005-c", text: "Skip foundational content without checking prerequisite knowledge" },
        { id: "cit-d5-original-q005-d", text: "Replace the refresher with a reaction survey" }
      ],
      "cit-d5-original-q005-a",
      "Experienced adult learners often engage when training respects their experience and challenges them to apply the rule. Scenario-based application keeps the standard intact while making the content more relevant.",
      {
        "cit-d5-original-q005-b": "Policy reading is likely to worsen disengagement and still may not prove application.",
        "cit-d5-original-q005-c": "Skipping basics can create gaps if the trainer has not verified readiness.",
        "cit-d5-original-q005-d": "A reaction survey measures perception but does not teach or reinforce performance."
      },
      "Make refreshers applied, not shallow",
      ["adult learners", "disengagement", "implementation"]
    ),
    q(
      "cit-d6-original-q002",
      "cit-d6",
      "written tests",
      "Intermediate",
      "Concept recognition",
      "A written test is most appropriate when the objective is to verify:",
      [
        { id: "cit-d6-original-q002-a", text: "Knowledge of rules, terms, or decision criteria" },
        { id: "cit-d6-original-q002-b", text: "Whether a learner can physically operate rescue equipment without coaching" },
        { id: "cit-d6-original-q002-c", text: "Whether a learner follows every step of a lockout/tagout sequence on equipment" },
        { id: "cit-d6-original-q002-d", text: "Whether a learner can demonstrate respirator seal-check technique correctly" }
      ],
      "cit-d6-original-q002-a",
      "Written tests are useful for knowledge, recall, interpretation, and decision-making scenarios. They are weaker when the objective requires direct demonstration of a physical skill.",
      {
        "cit-d6-original-q002-b": "Physical equipment operation should be verified with a performance assessment.",
        "cit-d6-original-q002-c": "A step-by-step work sequence is best verified through observation or checklist-based performance testing.",
        "cit-d6-original-q002-d": "Seal-check technique is a hands-on skill, not just knowledge."
      },
      "Knowledge can be written; skills must be shown",
      ["written tests", "knowledge assessment"]
    ),
    q(
      "cit-d6-original-q003",
      "cit-d6",
      "assessment standards",
      "Exam-Level",
      "BEST answer",
      "Two evaluators score the same equipment inspection differently because the checklist does not define acceptable performance. What should be improved?",
      [
        { id: "cit-d6-original-q003-a", text: "The assessment criteria or scoring rubric" },
        { id: "cit-d6-original-q003-b", text: "The number of questions on the written knowledge test" },
        { id: "cit-d6-original-q003-c", text: "The course delivery method" },
        { id: "cit-d6-original-q003-d", text: "The learner reaction survey" }
      ],
      "cit-d6-original-q003-a",
      "Assessment criteria should make acceptable performance observable and consistent. Clear rubrics reduce evaluator subjectivity and improve fairness in competency decisions.",
      {
        "cit-d6-original-q003-b": "More written questions do not define how evaluators should score the inspection.",
        "cit-d6-original-q003-c": "Delivery method may affect learning, but the disagreement is caused by unclear scoring criteria.",
        "cit-d6-original-q003-d": "Reaction surveys capture perception, not evaluator scoring standards."
      },
      "Rubrics make scoring defensible",
      ["assessment standards", "rubrics", "checklists"]
    ),
    q(
      "cit-d6-original-q004",
      "cit-d6",
      "retraining",
      "Exam-Level",
      "FIRST action",
      "A trainee fails a required forklift skills assessment. What should happen before allowing another attempt?",
      [
        { id: "cit-d6-original-q004-a", text: "Provide targeted retraining on the failed performance steps" },
        { id: "cit-d6-original-q004-b", text: "Change the trainee's score to passing" },
        { id: "cit-d6-original-q004-c", text: "Ignore the failed item if the written test was passed" },
        { id: "cit-d6-original-q004-d", text: "Remove the failed step from future assessments" }
      ],
      "cit-d6-original-q004-a",
      "A failed performance assessment should lead to focused correction before retesting. Retesting without retraining may repeat the same unsafe behavior and does not support competency.",
      {
        "cit-d6-original-q004-b": "Changing the score falsifies the competency record.",
        "cit-d6-original-q004-c": "A written test does not replace a required skills demonstration.",
        "cit-d6-original-q004-d": "Removing a required step weakens the standard."
      },
      "Fail, retrain, then retest",
      ["retraining", "retesting", "competency verification"]
    ),
    q(
      "cit-d6-original-q005",
      "cit-d6",
      "documentation",
      "Foundational",
      "Application",
      "Which record best supports proof that a trainee met a required skill standard?",
      [
        { id: "cit-d6-original-q005-a", text: "A completed performance checklist showing the required steps and evaluator result" },
        { id: "cit-d6-original-q005-b", text: "A course roster showing the trainee attended the session" },
        { id: "cit-d6-original-q005-c", text: "A written test score that does not cover the skill demonstration" },
        { id: "cit-d6-original-q005-d", text: "A supervisor note that the trainee participated actively during practice" }
      ],
      "cit-d6-original-q005-a",
      "Competency documentation should connect the trainee, the standard, the assessment method, and the result. A completed checklist is stronger evidence than general notes because it shows what was evaluated.",
      {
        "cit-d6-original-q005-b": "Attendance does not prove the trainee performed the skill to standard.",
        "cit-d6-original-q005-c": "A written score may prove knowledge but not a required hands-on skill.",
        "cit-d6-original-q005-d": "Participation supports engagement, but it is not a documented result against a skill standard."
      },
      "Document the standard and the result",
      ["documentation", "performance tests"]
    ),
    q(
      "cit-d7-original-q002",
      "cit-d7",
      "Level 1 Reaction",
      "Foundational",
      "Terminology",
      "A survey asks learners whether the instructor was clear and the course felt useful. Which Kirkpatrick level is this?",
      [
        { id: "cit-d7-original-q002-a", text: "Level 1 Reaction" },
        { id: "cit-d7-original-q002-b", text: "Level 2 Learning" },
        { id: "cit-d7-original-q002-c", text: "Level 3 Behavior" },
        { id: "cit-d7-original-q002-d", text: "Level 4 Results" }
      ],
      "cit-d7-original-q002-a",
      "Reaction measures how learners perceived the training experience. It can show satisfaction and perceived relevance, but it does not prove learning, behavior change, or business results by itself.",
      {
        "cit-d7-original-q002-b": "Learning measures knowledge or skill gained.",
        "cit-d7-original-q002-c": "Behavior measures transfer to the job.",
        "cit-d7-original-q002-d": "Results measures organizational outcomes."
      },
      "Reaction = learner opinion",
      ["Kirkpatrick", "reaction"]
    ),
    q(
      "cit-d7-original-q003",
      "cit-d7",
      "Level 4 Results",
      "Intermediate",
      "Application",
      "After a lifting course, injury rates and lost-time days decrease over the next quarter. Which evaluation level is most closely represented?",
      [
        { id: "cit-d7-original-q003-a", text: "Level 4 Results" },
        { id: "cit-d7-original-q003-b", text: "Level 1 Reaction" },
        { id: "cit-d7-original-q003-c", text: "Attendance tracking" },
        { id: "cit-d7-original-q003-d", text: "Course scheduling" }
      ],
      "cit-d7-original-q003-a",
      "Level 4 focuses on organizational results that training is intended to influence. Injury rates and lost-time days are outcome measures, not just learner opinions or test scores.",
      {
        "cit-d7-original-q003-b": "Reaction is about learner perception of training.",
        "cit-d7-original-q003-c": "Attendance shows participation, not outcome impact.",
        "cit-d7-original-q003-d": "Scheduling is an implementation activity."
      },
      "Results = organizational outcomes",
      ["Kirkpatrick", "course evaluation", "results"]
    ),
    q(
      "cit-d7-original-q004",
      "cit-d7",
      "continuous improvement",
      "Exam-Level",
      "BEST answer",
      "Evaluation data shows learners passed the written test but still skip critical steps on the job. What is the BEST course-improvement action?",
      [
        { id: "cit-d7-original-q004-a", text: "Revise the course and assessment to include more realistic performance practice and job-transfer checks" },
        { id: "cit-d7-original-q004-b", text: "Keep the course unchanged because test scores were high" },
        { id: "cit-d7-original-q004-c", text: "Remove all assessments" },
        { id: "cit-d7-original-q004-d", text: "Evaluate only whether learners liked the instructor" }
      ],
      "cit-d7-original-q004-a",
      "Course evaluation should drive improvement when learning does not transfer to the job. Strong written scores with poor field behavior suggest the course needs better practice, assessment alignment, or reinforcement after training.",
      {
        "cit-d7-original-q004-b": "High written scores do not prove job behavior changed.",
        "cit-d7-original-q004-c": "Removing assessment makes the problem harder to detect.",
        "cit-d7-original-q004-d": "Instructor ratings alone cannot diagnose transfer failure."
      },
      "Use evaluation data to revise the course",
      ["continuous improvement", "behavior transfer"]
    ),
    q(
      "cit-d7-original-q005",
      "cit-d7",
      "stakeholder feedback",
      "Intermediate",
      "MOST appropriate",
      "Which feedback source is most useful for determining whether training changed on-the-job behavior?",
      [
        { id: "cit-d7-original-q005-a", text: "Supervisor observation of workers after training" },
        { id: "cit-d7-original-q005-b", text: "Learner comments that the instructor explained the topic clearly" },
        { id: "cit-d7-original-q005-c", text: "A sign-in sheet showing who attended the session" },
        { id: "cit-d7-original-q005-d", text: "A written post-test showing learners remembered the procedure" }
      ],
      "cit-d7-original-q005-a",
      "Behavior change is best evaluated after learners return to the job. Supervisors can observe whether the trained behavior is actually being used in normal work conditions.",
      {
        "cit-d7-original-q005-b": "Clear instruction is Level 1 reaction feedback, not proof of job behavior.",
        "cit-d7-original-q005-c": "Attendance proves participation, not transfer to the job.",
        "cit-d7-original-q005-d": "A post-test supports Level 2 learning, but behavior requires observation after training."
      },
      "Behavior is checked back on the job",
      ["Kirkpatrick Level 3", "stakeholder feedback"]
    ),
    q(
      "cit-ethics-original-q002",
      "cit-ethics",
      "conflicts of interest",
      "Intermediate",
      "Professional action",
      "A trainer is asked to recommend a vendor while secretly receiving a payment from that vendor for each referral. What is the most ethical action?",
      [
        { id: "cit-ethics-original-q002-a", text: "Disclose the conflict and avoid misleading the client or employer" },
        { id: "cit-ethics-original-q002-b", text: "Hide the payment if the vendor is popular" },
        { id: "cit-ethics-original-q002-c", text: "Recommend the vendor without reviewing alternatives" },
        { id: "cit-ethics-original-q002-d", text: "Tell learners conflicts of interest do not apply to trainers" }
      ],
      "cit-ethics-original-q002-a",
      "Professional conduct requires honesty and transparency when personal benefit could influence judgment. Disclosure protects trust and allows the organization to decide how to manage the conflict.",
      {
        "cit-ethics-original-q002-b": "Concealing payment is misleading.",
        "cit-ethics-original-q002-c": "A recommendation should not be driven by undisclosed personal gain.",
        "cit-ethics-original-q002-d": "Ethical obligations apply to training and professional recommendations."
      },
      "Disclose conflicts before they shape decisions",
      ["ethics", "conflicts of interest"]
    ),
    q(
      "cit-ethics-original-q003",
      "cit-ethics",
      "competence",
      "Exam-Level",
      "BEST answer",
      "A trainer is assigned to teach a highly technical topic they are not qualified to teach. What is the BEST professional response?",
      [
        { id: "cit-ethics-original-q003-a", text: "Seek qualified support, decline the assignment, or limit instruction to areas of competence" },
        { id: "cit-ethics-original-q003-b", text: "Teach the topic anyway and hope learners do not ask questions" },
        { id: "cit-ethics-original-q003-c", text: "Copy another trainer's course without review" },
        { id: "cit-ethics-original-q003-d", text: "Tell learners the topic is not important" }
      ],
      "cit-ethics-original-q003-a",
      "A trainer should work within competence and use qualified support when needed. Technical safety training can affect real-world risk, so guessing or overstating expertise is not acceptable.",
      {
        "cit-ethics-original-q003-b": "Teaching beyond competence can mislead learners and create safety risk.",
        "cit-ethics-original-q003-c": "Copied material can still be inaccurate or inappropriate without review.",
        "cit-ethics-original-q003-d": "Minimizing a required topic avoids the responsibility to teach it correctly."
      },
      "Competence protects learners and credibility",
      ["ethics", "competence", "professional conduct"]
    ),
    q(
      "cit-ethics-original-q004",
      "cit-ethics",
      "confidentiality",
      "Intermediate",
      "Professional action",
      "A trainer wants to use a real incident report in class, but it includes names, medical details, and disciplinary notes that are not needed for the objective. What is the most professional action?",
      [
        { id: "cit-ethics-original-q004-a", text: "Remove or anonymize sensitive details before using the incident as a learning example" },
        { id: "cit-ethics-original-q004-b", text: "Use the full report because real details always improve learning" },
        { id: "cit-ethics-original-q004-c", text: "Share the report only with learners who promise not to discuss it" },
        { id: "cit-ethics-original-q004-d", text: "Skip the learning objective and focus on the disciplinary story" }
      ],
      "cit-ethics-original-q004-a",
      "Professional trainers protect confidential and unnecessary personal information while preserving the learning value of the scenario. Anonymizing the case keeps the discussion focused on the safety lesson rather than private details.",
      {
        "cit-ethics-original-q004-b": "Realism does not justify disclosing information that is not needed for training.",
        "cit-ethics-original-q004-c": "Learner promises do not remove the trainer's responsibility to protect sensitive information.",
        "cit-ethics-original-q004-d": "The course should stay aligned to the learning objective, not unnecessary personal details."
      },
      "Use the case, protect the people",
      ["ethics", "confidentiality", "professional conduct"]
    )
  ];

  const simulationExpansionQuestions = [
    q(
      "cit-d1-sim-q006",
      "cit-d1",
      "conflict resolution",
      "Exam-Level",
      "BEST answer",
      "Two experienced employees argue during a hazard-recognition exercise and the discussion is pulling the class away from the objective. What is the BEST instructor response?",
      [
        { id: "cit-d1-sim-q006-a", text: "Acknowledge the concern, restate the learning objective, and redirect the group to evidence-based criteria" },
        { id: "cit-d1-sim-q006-b", text: "Let the argument continue because experienced workers should control the discussion" },
        { id: "cit-d1-sim-q006-c", text: "End the activity and move directly to the final assessment" },
        { id: "cit-d1-sim-q006-d", text: "Choose the louder participant's answer to restore momentum" }
      ],
      "cit-d1-sim-q006-a",
      "Effective facilitation manages disagreement without humiliating learners or losing the instructional target. The instructor should keep the discussion respectful, use the objective as the anchor, and guide learners back to observable safety criteria.",
      {
        "cit-d1-sim-q006-b": "Experience can enrich discussion, but the instructor still owns the learning environment and objective.",
        "cit-d1-sim-q006-c": "Stopping the activity loses a useful learning opportunity and may leave the conflict unresolved.",
        "cit-d1-sim-q006-d": "Volume is not a valid basis for an instructional or safety decision."
      },
      "Facilitation redirects conflict back to the objective",
      ["conflict resolution", "facilitation", "learner engagement"]
    ),
    q(
      "cit-d1-sim-q007",
      "cit-d1",
      "feedback",
      "Intermediate",
      "Scenario",
      "A trainee answers a scenario incorrectly but explains their reasoning clearly. What should the instructor do next?",
      [
        { id: "cit-d1-sim-q007-a", text: "Use the reasoning to identify the misconception and connect the correction to the scenario" },
        { id: "cit-d1-sim-q007-b", text: "Only announce the correct answer because the test will handle the rest" },
        { id: "cit-d1-sim-q007-c", text: "Avoid correcting the answer to keep the trainee confident" },
        { id: "cit-d1-sim-q007-d", text: "Mark the trainee competent because they participated" }
      ],
      "cit-d1-sim-q007-a",
      "A wrong answer with clear reasoning is useful diagnostic information. The trainer can correct the specific thinking error and help the learner transfer the right principle to similar workplace situations.",
      {
        "cit-d1-sim-q007-b": "Announcing an answer does not address the thinking that caused the mistake.",
        "cit-d1-sim-q007-c": "Confidence should not be protected at the expense of accurate safety performance.",
        "cit-d1-sim-q007-d": "Participation is not the same as competency."
      },
      "Correct the misconception, not just the answer",
      ["feedback", "questioning techniques", "adult learners"]
    ),
    q(
      "cit-d1-sim-q008",
      "cit-d1",
      "technology-assisted communication",
      "Advanced",
      "MOST appropriate",
      "A live virtual class includes remote learners with delayed audio and frequent cross-talk. Which adjustment is MOST appropriate?",
      [
        { id: "cit-d1-sim-q008-a", text: "Set participation protocols, use chat or polling strategically, and check understanding more often" },
        { id: "cit-d1-sim-q008-b", text: "Disable all learner interaction for the rest of the course" },
        { id: "cit-d1-sim-q008-c", text: "Continue using the same discussion format because the content has not changed" },
        { id: "cit-d1-sim-q008-d", text: "Shorten the course by removing practice questions" }
      ],
      "cit-d1-sim-q008-a",
      "Technology changes the communication channel, so the trainer must manage participation deliberately. Clear protocols and alternate response methods preserve interaction while reducing confusion.",
      {
        "cit-d1-sim-q008-b": "Removing interaction may harm learning and prevents the instructor from checking understanding.",
        "cit-d1-sim-q008-c": "Delivery problems affect learning even when the content itself is unchanged.",
        "cit-d1-sim-q008-d": "Removing practice weakens learning instead of solving the communication problem."
      },
      "Virtual facilitation still needs interaction",
      ["online training", "communication", "technology"]
    ),
    q(
      "cit-d2-sim-q006",
      "cit-d2",
      "task analysis",
      "Exam-Level",
      "FIRST action",
      "A company asks for training after several near misses, but no one has identified which job steps are breaking down. What should the trainer do FIRST?",
      [
        { id: "cit-d2-sim-q006-a", text: "Analyze the task and compare expected performance with actual work practice" },
        { id: "cit-d2-sim-q006-b", text: "Build a slide deck based on the last annual refresher" },
        { id: "cit-d2-sim-q006-c", text: "Schedule the longest available training room" },
        { id: "cit-d2-sim-q006-d", text: "Administer the final test before defining the performance gap" }
      ],
      "cit-d2-sim-q006-a",
      "Needs assessment starts by defining the performance gap. A task analysis identifies the required steps, conditions, hazards, and decision points so training is aimed at the actual breakdown.",
      {
        "cit-d2-sim-q006-b": "Reusing old content may miss the specific failure pattern.",
        "cit-d2-sim-q006-c": "Scheduling solves logistics, not diagnosis.",
        "cit-d2-sim-q006-d": "Testing before defining the gap does not identify what training must address."
      },
      "Diagnose the task before designing the course",
      ["needs assessment", "task analysis", "performance gaps"]
    ),
    q(
      "cit-d2-sim-q007",
      "cit-d2",
      "target audience",
      "Intermediate",
      "BEST answer",
      "A course will include new hires, supervisors, and maintenance specialists. What information is most important for the trainer to gather during needs assessment?",
      [
        { id: "cit-d2-sim-q007-a", text: "The specific duties, prior knowledge, and performance expectations for each learner group" },
        { id: "cit-d2-sim-q007-b", text: "A single generic objective that applies identically to every role" },
        { id: "cit-d2-sim-q007-c", text: "Only the number of chairs needed in the classroom" },
        { id: "cit-d2-sim-q007-d", text: "Whether the learners prefer morning or afternoon sessions" }
      ],
      "cit-d2-sim-q007-a",
      "Audience analysis helps the trainer match content, examples, practice, and assessment to the learners' responsibilities. Different roles may need different depth even when the safety topic is shared.",
      {
        "cit-d2-sim-q007-b": "One objective may be too broad if job duties and decision authority differ.",
        "cit-d2-sim-q007-c": "Room setup matters later, but it does not define learning need.",
        "cit-d2-sim-q007-d": "Scheduling preference helps logistics, not instructional diagnosis."
      },
      "Know who performs which task",
      ["target audience", "job analysis", "learner needs"]
    ),
    q(
      "cit-d2-sim-q008",
      "cit-d2",
      "regulatory training requirements",
      "Advanced",
      "Scenario",
      "A manager wants to shorten required safety training by removing documented hands-on practice. Which need should the trainer verify before redesigning the course?",
      [
        { id: "cit-d2-sim-q008-a", text: "Whether regulations, standards, or company policy require demonstration, duration, or documentation" },
        { id: "cit-d2-sim-q008-b", text: "Whether the new course title sounds more modern" },
        { id: "cit-d2-sim-q008-c", text: "Whether learners can complete the course on their phones" },
        { id: "cit-d2-sim-q008-d", text: "Whether the current instructor prefers lecture" }
      ],
      "cit-d2-sim-q008-a",
      "Needs assessment includes constraints that the course must satisfy. If a regulation, standard, or internal policy requires practice or documentation, the design must preserve that requirement.",
      {
        "cit-d2-sim-q008-b": "A modern title does not determine compliance or competency requirements.",
        "cit-d2-sim-q008-c": "Mobile delivery may help access, but it cannot replace required demonstration by itself.",
        "cit-d2-sim-q008-d": "Instructor preference does not override required training elements."
      },
      "Verify requirements before cutting content",
      ["regulatory requirements", "available resources", "needs assessment"]
    ),
    q(
      "cit-d3-sim-q006",
      "cit-d3",
      "Bloom's taxonomy",
      "Intermediate",
      "Application",
      "A learning objective asks trainees to compare two control methods and select the safer option for a given hazard. Which cognitive level is most involved?",
      [
        { id: "cit-d3-sim-q006-a", text: "Analysis or evaluation" },
        { id: "cit-d3-sim-q006-b", text: "Simple recall only" },
        { id: "cit-d3-sim-q006-c", text: "Learner satisfaction" },
        { id: "cit-d3-sim-q006-d", text: "Classroom logistics" }
      ],
      "cit-d3-sim-q006-a",
      "Comparing alternatives and selecting the safer option requires more than remembering a term. The learner must analyze conditions and evaluate which control best fits the hazard.",
      {
        "cit-d3-sim-q006-b": "Recall would ask for a definition, not a comparison and decision.",
        "cit-d3-sim-q006-c": "Satisfaction is an evaluation outcome, not a cognitive objective level.",
        "cit-d3-sim-q006-d": "Logistics describe delivery conditions, not the thinking skill being assessed."
      },
      "Compare and choose = higher-order thinking",
      ["Bloom's taxonomy", "learning objectives", "cognitive skill"]
    ),
    q(
      "cit-d3-sim-q007",
      "cit-d3",
      "delivery methods",
      "Exam-Level",
      "BEST answer",
      "The objective requires workers to inspect equipment and reject unsafe components. Which design choice best aligns instruction with the objective?",
      [
        { id: "cit-d3-sim-q007-a", text: "Use examples, hands-on inspection practice, and a performance check against defined criteria" },
        { id: "cit-d3-sim-q007-b", text: "Use only a lecture on the history of the equipment" },
        { id: "cit-d3-sim-q007-c", text: "Replace inspection practice with a course satisfaction survey" },
        { id: "cit-d3-sim-q007-d", text: "Teach the topic only through unrelated safety slogans" }
      ],
      "cit-d3-sim-q007-a",
      "Instructional design should align content, practice, and assessment with the required performance. If workers must inspect equipment, the course should let them practice inspection and be assessed on the same behavior.",
      {
        "cit-d3-sim-q007-b": "Background information may support context but does not build inspection skill by itself.",
        "cit-d3-sim-q007-c": "A satisfaction survey does not measure equipment-inspection competency.",
        "cit-d3-sim-q007-d": "Slogans do not provide criteria or practice for a technical task."
      },
      "Design practice around the performance",
      ["delivery methods", "assessment alignment", "instructional strategies"]
    ),
    q(
      "cit-d3-sim-q008",
      "cit-d3",
      "Enabling Learning Objectives",
      "Foundational",
      "Terminology",
      "How do enabling learning objectives support a terminal learning objective?",
      [
        { id: "cit-d3-sim-q008-a", text: "They define smaller knowledge or skill steps needed to reach the final performance" },
        { id: "cit-d3-sim-q008-b", text: "They replace the final performance standard" },
        { id: "cit-d3-sim-q008-c", text: "They document attendance after the course" },
        { id: "cit-d3-sim-q008-d", text: "They measure learner satisfaction with the instructor" }
      ],
      "cit-d3-sim-q008-a",
      "Enabling objectives break the larger terminal objective into teachable and assessable steps. They help sequence instruction so learners build toward the final required performance.",
      {
        "cit-d3-sim-q008-b": "They support the terminal objective; they do not replace it.",
        "cit-d3-sim-q008-c": "Attendance is documentation, not objective structure.",
        "cit-d3-sim-q008-d": "Satisfaction is reaction feedback, not an enabling objective."
      },
      "ELOs are stepping stones to the TLO",
      ["ELO", "TLO", "learning objectives"]
    ),
    q(
      "cit-d4-sim-q006",
      "cit-d4",
      "simulations",
      "Exam-Level",
      "MOST appropriate",
      "A hazard-response course must prepare supervisors to make decisions during a changing emergency scenario. Which development activity is MOST appropriate?",
      [
        { id: "cit-d4-sim-q006-a", text: "Build a scenario simulation with decision points, consequences, and debrief questions" },
        { id: "cit-d4-sim-q006-b", text: "Provide only a list of definitions for independent reading" },
        { id: "cit-d4-sim-q006-c", text: "Remove uncertainty so every learner follows a script without decisions" },
        { id: "cit-d4-sim-q006-d", text: "Use the same quiz after class without changing the learning activity" }
      ],
      "cit-d4-sim-q006-a",
      "Simulations are useful when learners must practice judgment in realistic conditions. Decision points and debriefing help learners connect choices to consequences and improve future performance.",
      {
        "cit-d4-sim-q006-b": "Definitions alone do not prepare learners for dynamic decision-making.",
        "cit-d4-sim-q006-c": "Removing decisions defeats the purpose of a decision-based scenario.",
        "cit-d4-sim-q006-d": "Assessment alone does not create realistic practice."
      },
      "Use simulations when judgment must be practiced",
      ["simulations", "course development", "decision-making"]
    ),
    q(
      "cit-d4-sim-q007",
      "cit-d4",
      "course revision",
      "Intermediate",
      "Scenario",
      "Pilot learners consistently misunderstand one graphic in a hazard-control lesson. What is the best development response?",
      [
        { id: "cit-d4-sim-q007-a", text: "Revise the graphic and retest whether learners interpret it correctly" },
        { id: "cit-d4-sim-q007-b", text: "Keep the graphic because it was already approved for formatting" },
        { id: "cit-d4-sim-q007-c", text: "Remove the objective connected to the confusing graphic" },
        { id: "cit-d4-sim-q007-d", text: "Tell instructors to skip questions about the graphic" }
      ],
      "cit-d4-sim-q007-a",
      "Pilot feedback should be used to improve materials before full rollout. If a graphic causes misunderstanding, revision and verification protect the learning objective.",
      {
        "cit-d4-sim-q007-b": "Formatting approval does not prove instructional clarity.",
        "cit-d4-sim-q007-c": "Removing the objective avoids the learning need instead of fixing the material.",
        "cit-d4-sim-q007-d": "Skipping questions hides confusion rather than correcting it."
      },
      "Pilot problems should drive revision",
      ["pilot testing", "course revision", "validation"]
    ),
    q(
      "cit-d4-sim-q008",
      "cit-d4",
      "training records",
      "Foundational",
      "Application",
      "Which course material best helps an organization show what content was taught and what standard was assessed?",
      [
        { id: "cit-d4-sim-q008-a", text: "A controlled lesson plan with objectives, content outline, activities, and assessment criteria" },
        { id: "cit-d4-sim-q008-b", text: "An informal reminder that training happened" },
        { id: "cit-d4-sim-q008-c", text: "A generic certificate with no course details" },
        { id: "cit-d4-sim-q008-d", text: "A sign-in sheet that omits the topic and assessment method" }
      ],
      "cit-d4-sim-q008-a",
      "A defensible training record should connect the course to its objectives, content, activities, and assessment standard. Controlled lesson materials help show consistency and intent.",
      {
        "cit-d4-sim-q008-b": "An informal reminder is weak documentation.",
        "cit-d4-sim-q008-c": "A certificate without details may not show what was taught or assessed.",
        "cit-d4-sim-q008-d": "A sign-in sheet alone shows attendance, not content or competency."
      },
      "Records should prove more than attendance",
      ["training records", "lesson plans", "documentation"]
    ),
    q(
      "cit-d5-sim-q006",
      "cit-d5",
      "training resources",
      "Intermediate",
      "FIRST action",
      "A hands-on class begins and the required practice equipment is missing. What should the trainer do FIRST?",
      [
        { id: "cit-d5-sim-q006-a", text: "Determine whether the objective can still be met safely using an approved backup resource or reschedule the skill portion" },
        { id: "cit-d5-sim-q006-b", text: "Mark all learners competent because the missing equipment is not their fault" },
        { id: "cit-d5-sim-q006-c", text: "Replace the hands-on requirement with a casual discussion" },
        { id: "cit-d5-sim-q006-d", text: "Ignore the missing equipment and continue with the performance test" }
      ],
      "cit-d5-sim-q006-a",
      "Implementation decisions must protect both safety and objective alignment. If required equipment is missing, the trainer must either use a valid backup or preserve the skill requirement for a later session.",
      {
        "cit-d5-sim-q006-b": "Competency cannot be granted without required evidence.",
        "cit-d5-sim-q006-c": "Discussion does not replace required skill performance.",
        "cit-d5-sim-q006-d": "Testing without the needed equipment is not valid or safe."
      },
      "No equipment means no fake competency",
      ["training resources", "implementation", "skills practice"]
    ),
    q(
      "cit-d5-sim-q007",
      "cit-d5",
      "collective learning",
      "Advanced",
      "BEST answer",
      "A crew has strong field experience, but practices vary by shift. Which facilitation strategy best supports collective learning?",
      [
        { id: "cit-d5-sim-q007-a", text: "Have shifts compare practices against the standard and agree on the correct common approach" },
        { id: "cit-d5-sim-q007-b", text: "Let each shift keep its own method as long as it is familiar" },
        { id: "cit-d5-sim-q007-c", text: "Lecture without allowing workers to discuss field differences" },
        { id: "cit-d5-sim-q007-d", text: "Assess only the newest employees" }
      ],
      "cit-d5-sim-q007-a",
      "Collective learning uses group experience while aligning everyone to the required standard. Comparing current practice to the standard helps expose variation and build shared expectations.",
      {
        "cit-d5-sim-q007-b": "Familiar practice may still be inconsistent or unsafe.",
        "cit-d5-sim-q007-c": "Lecture alone misses the chance to surface and correct shift variation.",
        "cit-d5-sim-q007-d": "Experienced workers can also have inconsistent practices."
      },
      "Use experience, then anchor it to the standard",
      ["collective learning", "field training", "standards"]
    ),
    q(
      "cit-d5-sim-q008",
      "cit-d5",
      "instructor response to unexpected situations",
      "Exam-Level",
      "Professional action",
      "During a live demonstration, the instructor notices an unsafe condition in the training area. What should happen before instruction continues?",
      [
        { id: "cit-d5-sim-q008-a", text: "Stop the activity and control the unsafe condition before resuming" },
        { id: "cit-d5-sim-q008-b", text: "Continue so the schedule and lesson plan remain intact" },
        { id: "cit-d5-sim-q008-c", text: "Ask learners to stand farther away while the hazard remains uncontrolled" },
        { id: "cit-d5-sim-q008-d", text: "Use the incident as a discussion topic after the demonstration is finished" }
      ],
      "cit-d5-sim-q008-a",
      "A trainer is responsible for a safe learning environment. When an unsafe condition appears, controlling the hazard takes priority over schedule, convenience, or completing the demonstration.",
      {
        "cit-d5-sim-q008-b": "The lesson plan does not override immediate safety.",
        "cit-d5-sim-q008-c": "Distance may reduce exposure, but the hazard still needs to be controlled before continuing.",
        "cit-d5-sim-q008-d": "Debriefing is useful after the condition is made safe."
      },
      "Safety controls come before instruction",
      ["unexpected situations", "field training", "safety"]
    ),
    q(
      "cit-d6-sim-q006",
      "cit-d6",
      "retesting",
      "Intermediate",
      "Scenario",
      "After retraining, a trainee is retested on only the step they previously missed, even though the task requires a complete sequence. What is the main assessment concern?",
      [
        { id: "cit-d6-sim-q006-a", text: "The retest may not verify the trainee can perform the full task to standard" },
        { id: "cit-d6-sim-q006-b", text: "The retest should always be easier than the original assessment" },
        { id: "cit-d6-sim-q006-c", text: "The written test score should replace the performance retest" },
        { id: "cit-d6-sim-q006-d", text: "The evaluator should avoid documenting the retest result" }
      ],
      "cit-d6-sim-q006-a",
      "Retesting should match the competency being certified. If the job requires a complete sequence, the assessment should verify the full sequence, not only an isolated fragment.",
      {
        "cit-d6-sim-q006-b": "A retest should be fair and valid, not easier by default.",
        "cit-d6-sim-q006-c": "A written score does not replace required hands-on performance.",
        "cit-d6-sim-q006-d": "Retest results should be documented."
      },
      "Retest the competency, not just the memory of one correction",
      ["retesting", "competency verification", "performance tests"]
    ),
    q(
      "cit-d6-sim-q007",
      "cit-d6",
      "observations",
      "Exam-Level",
      "BEST answer",
      "An evaluator observes a trainee operate equipment correctly once in a highly coached practice session. Why might this be insufficient as final competency evidence?",
      [
        { id: "cit-d6-sim-q007-a", text: "Coaching during performance can mask whether the trainee can perform independently to the standard" },
        { id: "cit-d6-sim-q007-b", text: "Observation can never be used to assess skill performance" },
        { id: "cit-d6-sim-q007-c", text: "Competency is proven by confidence rather than performance" },
        { id: "cit-d6-sim-q007-d", text: "Skill assessments should not have criteria" }
      ],
      "cit-d6-sim-q007-a",
      "Final performance assessment should show the learner can meet the standard without inappropriate prompting. Coaching is useful during practice, but competency decisions need valid evidence of independent performance.",
      {
        "cit-d6-sim-q007-b": "Observation is often appropriate for skill assessment when criteria are clear.",
        "cit-d6-sim-q007-c": "Confidence is not a substitute for demonstrated performance.",
        "cit-d6-sim-q007-d": "Criteria are what make skill assessment consistent and defensible."
      },
      "Practice can be coached; competency must be demonstrated",
      ["observations", "performance tests", "competency"]
    ),
    q(
      "cit-d6-sim-q008",
      "cit-d6",
      "behavior measurement",
      "Advanced",
      "MOST appropriate",
      "A course objective says supervisors will intervene when they observe unsafe shortcuts. Which assessment evidence is MOST aligned with that objective?",
      [
        { id: "cit-d6-sim-q008-a", text: "A scenario or observed role-play where supervisors identify the shortcut and practice the intervention" },
        { id: "cit-d6-sim-q008-b", text: "A memorized definition of supervisor responsibility only" },
        { id: "cit-d6-sim-q008-c", text: "A reaction survey asking if supervisors liked the topic" },
        { id: "cit-d6-sim-q008-d", text: "An attendance roster signed before class begins" }
      ],
      "cit-d6-sim-q008-a",
      "The assessment should match the behavior in the objective. If supervisors must intervene, the best evidence asks them to recognize the unsafe shortcut and perform or explain the intervention.",
      {
        "cit-d6-sim-q008-b": "Definitions support knowledge but do not prove intervention behavior.",
        "cit-d6-sim-q008-c": "Reaction data does not measure performance.",
        "cit-d6-sim-q008-d": "Attendance does not show behavior capability."
      },
      "Assess the behavior the objective names",
      ["behavior measurement", "assessment alignment", "scenario"]
    ),
    q(
      "cit-d7-sim-q006",
      "cit-d7",
      "evaluation data",
      "Intermediate",
      "BEST answer",
      "Post-test scores improved, but incident data did not change after training. What is the BEST interpretation?",
      [
        { id: "cit-d7-sim-q006-a", text: "Learning may have improved, but behavior transfer or workplace conditions may still need investigation" },
        { id: "cit-d7-sim-q006-b", text: "The training definitely failed because no learner remembered anything" },
        { id: "cit-d7-sim-q006-c", text: "The course should be judged only by learner satisfaction" },
        { id: "cit-d7-sim-q006-d", text: "Incident data is never relevant to course evaluation" }
      ],
      "cit-d7-sim-q006-a",
      "Different evaluation levels can tell different stories. Better test scores suggest learning, but unchanged incident data may point to weak transfer, missing reinforcement, or barriers outside training.",
      {
        "cit-d7-sim-q006-b": "Improved post-test scores show at least some learning occurred.",
        "cit-d7-sim-q006-c": "Satisfaction alone cannot evaluate safety performance impact.",
        "cit-d7-sim-q006-d": "Incident data can be relevant when the course is intended to affect safety outcomes."
      },
      "Learning gains do not always equal results",
      ["course evaluation", "Kirkpatrick", "results"]
    ),
    q(
      "cit-d7-sim-q007",
      "cit-d7",
      "continuous improvement",
      "Exam-Level",
      "FIRST action",
      "Evaluation comments show learners are confused by a required procedure, but the trainer is unsure whether the issue is the material, delivery, or workplace procedure itself. What should happen FIRST?",
      [
        { id: "cit-d7-sim-q007-a", text: "Review evaluation evidence and consult appropriate stakeholders or SMEs to identify the root cause" },
        { id: "cit-d7-sim-q007-b", text: "Delete the procedure from the course immediately" },
        { id: "cit-d7-sim-q007-c", text: "Assume learners did not pay attention and make no changes" },
        { id: "cit-d7-sim-q007-d", text: "Change the passing standard before reviewing the content" }
      ],
      "cit-d7-sim-q007-a",
      "Continuous improvement should be based on evidence, not guesses. Reviewing data with stakeholders or SMEs helps determine whether the fix belongs in materials, instruction, assessment, or the work process.",
      {
        "cit-d7-sim-q007-b": "Removing required content may create a compliance or competency gap.",
        "cit-d7-sim-q007-c": "Blaming learners ignores possible course or process problems.",
        "cit-d7-sim-q007-d": "Changing the standard does not diagnose the source of confusion."
      },
      "Use evidence before revising",
      ["continuous improvement", "stakeholder feedback", "SME"]
    ),
    q(
      "cit-d7-sim-q008",
      "cit-d7",
      "course effectiveness",
      "Advanced",
      "MOST appropriate",
      "A safety course is intended to reduce improper chemical labeling. Which evaluation plan is MOST appropriate?",
      [
        { id: "cit-d7-sim-q008-a", text: "Measure learning during training and review workplace labeling observations after learners return to work" },
        { id: "cit-d7-sim-q008-b", text: "Use only a smile-sheet because learners can report whether the course felt useful" },
        { id: "cit-d7-sim-q008-c", text: "Check only whether the course started on time" },
        { id: "cit-d7-sim-q008-d", text: "Count certificates without reviewing labeling performance" }
      ],
      "cit-d7-sim-q008-a",
      "Course effectiveness is strongest when evaluation connects learning to workplace behavior. Measuring both in-class learning and later job performance gives a better picture of whether the course changed the targeted behavior.",
      {
        "cit-d7-sim-q008-b": "Reaction data is useful but too limited by itself.",
        "cit-d7-sim-q008-c": "Starting on time is a logistics measure, not effectiveness.",
        "cit-d7-sim-q008-d": "Certificates document completion, not behavior change."
      },
      "Match evaluation to the result you want",
      ["course effectiveness", "behavior", "results"]
    )
  ];

  questions.push(...expansionQuestions, ...simulationExpansionQuestions);

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
      questionTarget: 60,
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
