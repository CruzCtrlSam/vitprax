(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.VITPRAX_QUESTION_ENGINE = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const QUESTION_STYLES = ["recall", "scenario", "comparison", "except_not", "best_recommendation", "professional_action", "multi_step"];
  const COGNITIVE_SKILLS = ["recall", "understand", "apply", "analyze", "evaluate"];
  const CRITICAL_WORDS = ["NOT", "EXCEPT", "FALSE", "LEAST", "FIRST", "NEXT", "BEST", "MOST"];
  const GENERIC_SHORTCUT_PHRASES = [
    "memorize this",
    "remember the concept",
    "keep in mind",
    "study this carefully",
    "this is important",
    "remember that"
  ];

  const PRACTICE_STYLE_DISTRIBUTION = {
    recall: 0.20,
    scenario: 0.35,
    comparison: 0.15,
    except_not: 0.10,
    best_recommendation: 0.08,
    professional_action: 0.07,
    multi_step: 0.05
  };

  const EXAM_STYLE_DISTRIBUTION = {
    recall: 0.15,
    scenario: 0.40,
    comparison: 0.15,
    except_not: 0.12,
    best_recommendation: 0.07,
    professional_action: 0.06,
    multi_step: 0.05
  };

  const PRACTICE_DIFFICULTY_DISTRIBUTION = { 1: 0.15, 2: 0.30, 3: 0.30, 4: 0.20, 5: 0.05 };
  const EXAM_DIFFICULTY_DISTRIBUTION = { 1: 0.10, 2: 0.25, 3: 0.35, 4: 0.25, 5: 0.05 };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function contentFor(question, language = "en") {
    const preferred = question?.[language] || question?.content?.[language] || {};
    if (preferred.question && answerListFromContent(preferred).length) return preferred;
    return question?.en || question?.content?.en || question?.es || question?.content?.es || preferred || {};
  }

  function answerListFromContent(content) {
    return asArray(content?.answers || content?.choices);
  }

  function answerList(question, language = "en") {
    const content = contentFor(question, language);
    return answerListFromContent(content);
  }

  function textForInference(question) {
    const en = contentFor(question, "en");
    const es = contentFor(question, "es");
    return `${en.question || ""} ${es.question || ""} ${en.explanation || ""}`.toLowerCase();
  }

  function inferStyle(question) {
    const text = textForInference(question);
    if (/\b(not|except|false|least|first|next)\b|excepto|falsa|incorrecta|menos|primero|siguiente/.test(text)) return "except_not";
    if (/\b(best|most accurate|recommend|should|appropriate|suitable)\b|mejor|más adecuada|recomendar|debería/.test(text)) return "best_recommendation";
    if (/\b(agent|producer|licensee|professional|commissioner|insurer must|what action)\b|agente|productor|profesional|aseguradora debe/.test(text)) return "professional_action";
    if (/\bcompare|versus| vs\\.? |difference|distinguish|rather than\b|compar|diferencia/.test(text)) return "comparison";
    if (/\bfirst.*then|two steps|multi-step|after .* before|antes de .* después|dos pasos/.test(text)) return "multi_step";
    if (text.length > 190 || /\bclient|applicant|owner|insured|beneficiary|customer|scenario|wants|needs|income|family\b|cliente|solicitante|dueño|asegurado|beneficiario|quiere|necesita/.test(text)) return "scenario";
    return "recall";
  }

  function inferSkill(style) {
    if (style === "recall") return "recall";
    if (style === "scenario" || style === "professional_action") return "apply";
    if (style === "comparison" || style === "except_not") return "analyze";
    if (style === "best_recommendation" || style === "multi_step") return "evaluate";
    return "understand";
  }

  function inferDifficulty(question, style) {
    const explicit = question?.metadata?.difficulty || question?.difficultyLevel || question?.difficulty;
    if (Number.isFinite(Number(explicit))) return clamp(Number(explicit), 1, 5);
    const value = String(explicit || "").toLowerCase();
    if (value.includes("easy")) return 1;
    if (value.includes("moder")) return 3;
    if (value.includes("chall") || value.includes("hard")) return 4;
    if (style === "multi_step") return 5;
    if (style === "except_not" || style === "best_recommendation") return 4;
    if (style === "scenario" || style === "comparison" || style === "professional_action") return 3;
    return 1;
  }

  function normalizeQuestion(question, options = {}) {
    const metadata = question?.metadata || {};
    const style = QUESTION_STYLES.includes(metadata.style || question?.style) ? (metadata.style || question.style) : inferStyle(question);
    const cognitiveSkill = COGNITIVE_SKILLS.includes(metadata.cognitiveSkill || question?.cognitiveSkill)
      ? (metadata.cognitiveSkill || question.cognitiveSkill)
      : inferSkill(style);
    const difficulty = inferDifficulty(question, style);
    return {
      ...question,
      metadata: {
        topicId: metadata.topicId || question?.topic || "general",
        subtopicId: metadata.subtopicId || question?.subtopic || question?.subtopicId || "",
        conceptId: metadata.conceptId || question?.conceptId || question?.concept || "",
        familyId: metadata.familyId || question?.familyId || question?.conceptId || question?.id,
        style,
        cognitiveSkill,
        difficulty,
        estimatedTimeSeconds: Number(metadata.estimatedTimeSeconds || question?.estimatedTimeSeconds || 60),
        examWeight: metadata.examWeight || question?.examWeight || "medium",
        language: options.language || metadata.language || "en",
        certificationId: metadata.certificationId || question?.certificationId || options.certificationId || "texas-life",
        isActive: metadata.isActive !== false && question?.isActive !== false,
        isReviewed: Boolean(metadata.isReviewed || question?.isReviewed)
      }
    };
  }

  function normalizeQuestions(questions, options = {}) {
    const seen = new Set();
    return asArray(questions).map((question) => normalizeQuestion(question, options)).filter((question) => {
      const key = question.id || `${question.metadata.certificationId}:${contentFor(question, options.language).question}`;
      if (!key || seen.has(key) || question.metadata.isActive === false) return false;
      seen.add(key);
      return true;
    });
  }

  function allocateCounts(total, distribution) {
    const entries = Object.entries(distribution || {}).filter(([, weight]) => Number(weight) > 0);
    const counts = Object.fromEntries(entries.map(([key]) => [key, 0]));
    if (!total || !entries.length) return counts;
    const raw = entries.map(([key, weight]) => {
      const exact = Number(weight) * total;
      const floor = Math.floor(exact);
      return { key, floor, remainder: exact - floor };
    });
    let used = raw.reduce((sum, item) => sum + item.floor, 0);
    raw.forEach((item) => { counts[item.key] = item.floor; });
    raw.sort((a, b) => b.remainder - a.remainder);
    for (let index = 0; used < total; index += 1) {
      counts[raw[index % raw.length].key] += 1;
      used += 1;
    }
    return counts;
  }

  function shuffle(items, random = Math.random) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function seenCount(question, progress = {}) {
    return Number(progress.answers?.[question.id]?.seen) || 0;
  }

  function scoreCandidate(question, progress = {}, usedFamilies = new Set()) {
    let score = seenCount(question, progress) * 100;
    if (progress.missed?.[question.id]) score -= 20;
    if (usedFamilies.has(question.metadata.familyId)) score += 500;
    return score;
  }

  function pickFromGroup(group, needed, progress, usedIds, usedFamilies, random) {
    const sorted = shuffle(group, random).sort((a, b) => scoreCandidate(a, progress, usedFamilies) - scoreCandidate(b, progress, usedFamilies));
    const selected = [];
    sorted.forEach((question) => {
      if (selected.length >= needed) return;
      if (usedIds.has(question.id)) return;
      if (usedFamilies.has(question.metadata.familyId) && sorted.some((item) => !usedFamilies.has(item.metadata.familyId) && !usedIds.has(item.id))) return;
      selected.push(question);
      usedIds.add(question.id);
      usedFamilies.add(question.metadata.familyId);
    });
    return selected;
  }

  function buildQuestionSession(inputQuestions, options = {}) {
    const count = Number(options.count || 10);
    const language = options.language || "en";
    const mode = options.mode === "exam" ? "exam" : "practice";
    const random = options.random || Math.random;
    const normalized = normalizeQuestions(inputQuestions, { language, certificationId: options.certificationId })
      .filter((question) => {
        const hasLanguage = Boolean(contentFor(question, language).question && answerList(question, language).length);
        const hasFallback = Boolean(contentFor(question, "en").question && answerList(question, "en").length);
        const topicMatch = !options.topic || options.topic === "all" || question.topic === options.topic || question.metadata.topicId === options.topic;
        const simulatorMatch = !options.simulator || options.simulator === "all" || String(question.simulator) === String(options.simulator);
        return (hasLanguage || hasFallback) && topicMatch && simulatorMatch;
      });
    const target = Math.min(count, normalized.length);
    const styleDistribution = options.styleDistribution || (mode === "exam" ? EXAM_STYLE_DISTRIBUTION : PRACTICE_STYLE_DISTRIBUTION);
    const difficultyDistribution = options.difficultyDistribution || (mode === "exam" ? EXAM_DIFFICULTY_DISTRIBUTION : PRACTICE_DIFFICULTY_DISTRIBUTION);
    const styleCounts = allocateCounts(target, styleDistribution);
    const difficultyCounts = allocateCounts(target, difficultyDistribution);
    const selected = [];
    const usedIds = new Set();
    const usedFamilies = new Set();
    const shortages = [];

    Object.entries(styleCounts).forEach(([style, needed]) => {
      if (!needed) return;
      const group = normalized.filter((question) => question.metadata.style === style);
      const picks = pickFromGroup(group, needed, options.progress || {}, usedIds, usedFamilies, random);
      selected.push(...picks);
      if (picks.length < needed) shortages.push({ dimension: "style", key: style, requested: needed, available: picks.length });
    });

    if (selected.length < target) {
      selected.push(...pickFromGroup(normalized, target - selected.length, options.progress || {}, usedIds, usedFamilies, random));
    }

    const ordered = selected
      .slice(0, target)
      .sort((a, b) => {
        const difficultyNeedA = difficultyCounts[a.metadata.difficulty] || 0;
        const difficultyNeedB = difficultyCounts[b.metadata.difficulty] || 0;
        return difficultyNeedB - difficultyNeedA || scoreCandidate(a, options.progress || {}, new Set()) - scoreCandidate(b, options.progress || {}, new Set());
      });

    return {
      questions: shuffle(ordered, random).slice(0, target),
      diagnostics: {
        requested: count,
        returned: Math.min(target, ordered.length),
        available: normalized.length,
        styleCounts,
        difficultyCounts,
        shortages
      }
    };
  }

  function hasGenericShortcut(value) {
    const text = String(value || "").toLowerCase();
    return GENERIC_SHORTCUT_PHRASES.some((phrase) => text.includes(phrase));
  }

  function normalizeLearningCard(card, options = {}) {
    const type = card?.type || card?.cardType || "term_definition";
    const definition = card?.definition || {};
    return {
      ...card,
      type,
      topicId: card?.topicId || card?.topic || "general",
      subtopicId: card?.subtopicId || "",
      conceptId: card?.conceptId || card?.term || card?.id || "",
      familyId: card?.familyId || card?.conceptId || card?.id || "",
      difficulty: clamp(Number(card?.difficulty || 1), 1, 5),
      content: card?.content || {
        en: {
          front: card?.front?.en || card?.term || "",
          back: card?.back?.en || definition.en || ""
        },
        es: {
          front: card?.front?.es || card?.term || "",
          back: card?.back?.es || definition.es || definition.en || ""
        }
      },
      language: options.language || card?.language || "en"
    };
  }

  function analyticsFromSession(session, questionLookup) {
    const emptyBucket = () => ({ correct: 0, total: 0 });
    const byStyle = {};
    const bySkill = {};
    const byDifficulty = {};
    const byFamily = {};
    asArray(session?.deck).forEach((deckItem) => {
      const question = normalizeQuestion(questionLookup(deckItem.id));
      const selected = session.answers?.[question.id]?.selectedAnswerId || "";
      const correct = selected === question.correctAnswerId;
      const buckets = [
        [byStyle, question.metadata.style],
        [bySkill, question.metadata.cognitiveSkill],
        [byDifficulty, String(question.metadata.difficulty)],
        [byFamily, question.metadata.familyId]
      ];
      buckets.forEach(([bucket, key]) => {
        bucket[key] ||= emptyBucket();
        bucket[key].total += 1;
        if (correct) bucket[key].correct += 1;
      });
    });
    return { byStyle, bySkill, byDifficulty, byFamily };
  }

  function percent(bucket) {
    return bucket?.total ? Math.round((bucket.correct / bucket.total) * 100) : null;
  }

  function generateInsight(analytics, language = "en") {
    const recall = percent(analytics.byStyle?.recall);
    const scenario = percent(analytics.byStyle?.scenario);
    const comparison = percent(analytics.byStyle?.comparison);
    const exceptNot = percent(analytics.byStyle?.except_not);
    if (recall !== null && scenario !== null && recall - scenario >= 18) {
      return language === "es"
        ? "Dominas definiciones mejor que escenarios. Practica aplicar la regla a situaciones reales."
        : "Your definitions are stronger than your scenarios. Practice applying the rule to real situations.";
    }
    if (exceptNot !== null && exceptNot < 65) {
      return language === "es"
        ? "Las preguntas con NOT/EXCEPT te están quitando puntos. Lee la palabra crítica antes de mirar las respuestas."
        : "NOT/EXCEPT wording is costing points. Read the critical word before looking at the answers.";
    }
    if (comparison !== null && comparison < 65) {
      return language === "es"
        ? "Las comparaciones son el punto débil. Estudia conceptos parecidos lado a lado."
        : "Comparison questions are the weak spot. Study similar concepts side by side.";
    }
    return language === "es"
      ? "Sigue alternando estudio, tarjetas y práctica para fortalecer aplicación y memoria."
      : "Keep rotating study, cards, and practice to strengthen application and memory.";
  }

  function inventoryReport(inputQuestions, options = {}) {
    const questions = normalizeQuestions(inputQuestions, { language: options.language || "en", certificationId: options.certificationId });
    const minimumPerBucket = Number(options.minimumPerBucket || 15);
    const byStyle = {};
    const byDifficulty = {};
    const byTopicStyle = {};
    const missingTranslations = [];
    const missingExplanations = [];
    const weakShortcuts = [];

    questions.forEach((question) => {
      const metadata = question.metadata;
      byStyle[metadata.style] = (byStyle[metadata.style] || 0) + 1;
      byDifficulty[metadata.difficulty] = (byDifficulty[metadata.difficulty] || 0) + 1;
      const key = `${metadata.topicId}:${metadata.style}:${metadata.difficulty}`;
      byTopicStyle[key] ||= { topic: metadata.topicId, style: metadata.style, difficulty: metadata.difficulty, count: 0, recommendedMinimum: minimumPerBucket };
      byTopicStyle[key].count += 1;

      ["en", "es"].forEach((language) => {
        const content = contentFor(question, language);
        if (!content.question || !answerList(question, language).length) missingTranslations.push({ id: question.id, language });
        if (!content.explanation) missingExplanations.push({ id: question.id, language });
        const shortcut = content.memoryShortcut || content.examShortcut || question.memoryShortcut || "";
        if (shortcut && hasGenericShortcut(shortcut)) weakShortcuts.push({ id: question.id, language, shortcut });
      });
    });

    return {
      total: questions.length,
      byStyle,
      byDifficulty,
      gaps: Object.values(byTopicStyle).filter((bucket) => bucket.count < bucket.recommendedMinimum),
      missingTranslations,
      missingExplanations,
      weakShortcuts
    };
  }

  function criticalWordPattern() {
    return new RegExp(`\\\\b(${CRITICAL_WORDS.join("|")})\\\\b`, "gi");
  }

  return {
    QUESTION_STYLES,
    COGNITIVE_SKILLS,
    CRITICAL_WORDS,
    GENERIC_SHORTCUT_PHRASES,
    PRACTICE_STYLE_DISTRIBUTION,
    EXAM_STYLE_DISTRIBUTION,
    PRACTICE_DIFFICULTY_DISTRIBUTION,
    EXAM_DIFFICULTY_DISTRIBUTION,
    allocateCounts,
    normalizeQuestion,
    normalizeQuestions,
    normalizeLearningCard,
    buildQuestionSession,
    analyticsFromSession,
    generateInsight,
    inventoryReport,
    hasGenericShortcut,
    criticalWordPattern,
    contentFor,
    answerList
  };
});
