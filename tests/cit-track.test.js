const assert = require("assert");
const Engine = require("../question-engine.js");

global.window = {};
require("../cit-content.js");

const tracks = global.window.VITPRAX_CERTIFICATIONS;
assert.ok(tracks["texas-life"], "Texas Life track should remain registered");
assert.ok(tracks["bcsp-cit"], "CIT track should be registered");

const cit = tracks["bcsp-cit"];
assert.strictEqual(cit.blueprint, "CIT2 / 2024.05.01");
assert.strictEqual(cit.domains.filter((domain) => !domain.supplemental).length, 7);
assert.strictEqual(cit.domains.find((domain) => domain.id === "cit-ethics").weight, 0);

const validation = Engine.validateQuestionBatch(cit.questions, { language: "en", certificationId: "bcsp-cit" });
assert.strictEqual(validation.valid, true, validation.errors.join("\n"));
assert.strictEqual(cit.questions.length >= 8, true, "CIT should include a starter sample bank");

const weighted = Engine.buildWeightedQuestionSession(cit.questions, {
  count: 7,
  mode: "exam",
  language: "en",
  certificationId: "bcsp-cit",
  domainWeights: cit.domains
});

assert.strictEqual(weighted.questions.length, 7);
assert.strictEqual(new Set(weighted.questions.map((question) => question.id)).size, 7);
assert.strictEqual(weighted.questions.some((question) => question.domain === "cit-ethics"), false, "Ethics should not be sampled into a weighted CIT exam when enough weighted-domain questions exist");

console.log("cit-track tests passed");
