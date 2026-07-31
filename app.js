(function () {
  const CONFIG = window.CERTIVO_CONFIG || {};
  const SESSION_KEY = "certivoPracticeSession";
  const PROGRESS_KEY = "certivoPracticeProgress";
  const PREF_KEY = "certivoPracticePrefs";
  const SUPABASE_URL = CONFIG.supabaseUrl || "";
  const SUPABASE_KEY = CONFIG.supabasePublishableKey || "";
  const CHECKOUT_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/create-checkout-session`;
  const PRICE_IDS = {
    weekly: CONFIG.plans?.weekly?.priceId || "",
    ninety: CONFIG.plans?.ninety?.priceId || ""
  };
  const FREE_FLASHCARD_LIMIT = Number(CONFIG.freeFlashcardLimit || 10);
  const FLASHCARD_TERM_ES = {
    "Risk transfer": "Transferencia de riesgo",
    "Pure risk": "Riesgo puro",
    "Speculative risk": "Riesgo especulativo",
    "Peril": "Peligro",
    "Hazard": "Condición que aumenta el riesgo",
    "Law of Large Numbers": "Ley de los grandes números",
    "Pooling": "Mancomunación del riesgo",
    "Adverse selection": "Selección adversa",
    "Insurable interest": "Interés asegurable",
    "Insurable interest (vida)": "Interés asegurable en vida"
  };

  const text = {
    en: {
      subTitle: "Forge Your Future.",
      darkMode: "Dark mode",
      lightMode: "Light mode",
      homeTitle: "Continue Studying",
      homeDesc: "Bilingual Texas Life practice with saved progress.",
      readiness: "Readiness",
      missionControl: "Mission Control",
      missionPrompt: "What should I study right now?",
      readinessScore: "Readiness Score",
      continueLearning: "Continue Learning",
      resumeLastSession: "Resume Last Session",
      fixWeaknesses: "Fix My Weaknesses",
      weaknessDesc: "Start with the concepts that are most likely to cost you points.",
      estimatedPassChance: "Estimated chance of passing",
      studyTimeRemaining: "Study time remaining",
      currentStreak: "Current streak",
      topicsMastered: "Topics mastered",
      weakestTopic: "Weakest topic",
      todaysGoal: "Today's study goal",
      dailyMissions: "Daily Missions",
      needsWork: "Needs Work",
      improving: "Improving",
      nearlyReady: "Nearly Ready",
      examReady: "Exam Ready",
      noWeaknessesYet: "No weaknesses yet. Start a practice set so Vitprax can find your weak spots.",
      miniLesson: "Mini lesson",
      studyChapter: "Study chapter",
      cheatCode: "Cheat-code summary",
      examTrap: "Exam trap",
      targetedQuiz: "Targeted quiz",
      reviewFlashcards: "Flashcards",
      mastery: "Mastery",
      whyWeak: "Why this matters",
      commonMistake: "Common mistake",
      memoryTip: "Memory phrase",
      recommendedFix: "Recommended fix",
      missionQuestions: "Answer 10 questions",
      missionWeakTopic: "Review your weakest topic",
      missionFlashcards: "Flip 10 flashcards",
      notEnoughData: "Not enough data",
      diagnosticNeeded: "Diagnostic needed",
      takeDiagnostic: "Take a 25-question diagnostic",
      diagnosticDetail: "Build your baseline first",
      reviewMissedMission: "Review missed questions",
      examSimulationMission: "Take an exam simulation",
      noEstimateYet: "Not enough data yet",
      baselineGoal: "Answer at least 25 questions so Vitprax can build your baseline.",
      examScoreWeight: "Exam simulations count the most",
      xp: "XP",
      days: "days",
      hours: "hours",
      startWithPractice: "Start with practice",
      study: "Study",
      studyGuide: "Study Guide",
      studyPathDesc: "Free chapters and terms",
      studyDesc: "Free study chapters and bilingual key terms.",
      flashcards: "Flashcards",
      flashcardsPathDesc: "10 free preview cards",
      flashcardsDesc: "Review key terms quickly. The first 10 cards are free; the full deck unlocks with paid access.",
      studyFlashcards: "Study flashcards",
      flashcardFilter: "Flashcard set",
      practiceChapter: "Practice this chapter",
      allChapters: "All chapters",
      chapterCoach: "Chapter cheat code",
      examMove: "Exam move",
      nextStep: "Next step",
      chapterProgress: "Chapter progress",
      chaptersStudied: "chapters studied",
      currentChapterDone: "Current chapter started",
      currentChapterNotDone: "Open this chapter to count it",
      continueFreeStudy: "Continue free study",
      unlockPracticeLoop: "Unlock the practice loop",
      freeIncludes: "Free includes",
      paidUnlocks: "Paid unlocks",
      freeStudyList: "Study chapters, bilingual key terms, 10 quiz questions, and 10 preview flashcards.",
      paidStudyList: "300 questions, full explanations, mini lessons, full flashcard deck, saved progress, exam mode, and weakness review.",
      sectionGuide: "Section guide",
      freeStudyPaidPractice: "Chapters are free. Full practice, explanations, mini lessons, and the full card deck unlock with paid access.",
      previewUpgradeNote: "Preview · full deck is paid",
      chapterCardCount: "cards in this set",
      flipCard: "Flip card",
      knewIt: "I knew it",
      missedIt: "Missed it",
      flashcardPreview: "Free preview",
      flashcardUnlocked: "Full deck unlocked",
      flashcardLockedTitle: "That is the end of the free flashcard preview.",
      flashcardLockedText: "Subscribe to unlock the full flashcard deck, explanations, practice mode, exam mode, and progress tools.",
      chapter: "Chapter",
      keyTerms: "Key terms",
      practiceThisTopic: "Practice this topic",
      spanishStudyNote: "Study chapters and key terms are available in English and Spanish.",
      startPractice: "Start Practice",
      freeTrial: "Try 10 Free Questions",
      freeTrialDesc: "Right or wrong only",
      examSimulation: "Exam Simulation",
      dashboard: "Dashboard",
      account: "Account",
      plans: "Plans",
      accountDesc: "Create an account to save progress and unlock paid access.",
      freeTrialStatus: "Free Trial",
      activeStatus: "Signed in",
      createAccount: "Create account",
      logIn: "Log in",
      logOut: "Log out",
      signedInAs: "Signed in as",
      email: "Email",
      password: "Password",
      supabaseComing: "Create your account with Supabase Auth.",
      loginComing: "Log in with your Vitprax account.",
      accountPlaceholder: "Create an account or log in to prepare for paid access.",
      authUnavailable: "Supabase could not load. Check your internet connection and try again.",
      signupSuccess: "Account created. Check your email if Supabase asks you to confirm before logging in.",
      loginSuccess: "You are logged in.",
      logoutSuccess: "You are logged out.",
      authError: "Account action could not be completed. Check the email/password and try again.",
      paidPlaceholder: "Payment status will connect after Stripe is added.",
      accessFree: "Free trial access. Subscribe to unlock the full trainer.",
      accessActive: "Full trainer unlocked.",
      paymentChecking: "Checking your access...",
      paymentSuccess: "Payment complete. Your access will unlock after Stripe confirms it.",
      paymentCanceled: "Checkout was canceled. You can choose a plan when you are ready.",
      mustLogin: "Create an account or log in before choosing a paid plan.",
      checkoutStarting: "Opening secure Stripe checkout...",
      checkoutError: "Checkout could not be started. Please try again.",
      paidRequired: "The full trainer requires paid access. Try 10 free questions or choose a plan.",
      unlockFullTrainer: "Unlock the full trainer",
      plansDesc: "Choose the access length that fits your study timeline.",
      flexible: "Flexible",
      weeklyAccess: "Weekly Access",
      perWeek: "/ week",
      weeklyDesc: "Best if you only need a short final review window.",
      chooseWeekly: "Choose weekly",
      bestValue: "Best value",
      ninetyDayAccess: "90-Day Access",
      bundleDesc: "Best if you want room to study, review missed questions, and retake practice exams.",
      chooseNinety: "Choose 90-day",
      paidIncludes: "Paid access includes",
      includeQuestions: "Full 300-question trainer",
      includeExplanations: "Correct answers, explanations, mini lessons, and memory phrases",
      includeFlashcards: "Full flashcard deck",
      includeProgress: "Saved progress, missed review, filters, and exam mode",
      includeLanguage: "Full English and Spanish practice",
      view: "View",
      answered: "Answered",
      accuracy: "Accuracy",
      missed: "Missed",
      flagged: "Flagged",
      choosePath: "Choose a path",
      quickActions: "Quick actions",
      studyTools: "Study tools",
      practiceMode: "Practice Mode",
      practiceDesc: "Instant explanations",
      examMode: "Exam Mode",
      examDesc: "Grade at the end",
      reviewMissed: "Review missed",
      missedDesc: "Retry weak spots",
      progress: "Progress",
      progressDesc: "History and stats",
      setupTitle: "Set up practice",
      home: "Home",
      mode: "Mode",
      topic: "Topic",
      simulator: "Simulator",
      questionCount: "Questions",
      shuffle: "Shuffle",
      shuffleBoth: "Questions and answers",
      shuffleAnswers: "Answers only",
      shuffleNone: "No shuffle",
      begin: "Begin",
      resume: "Resume",
      clearSession: "Clear session",
      previous: "Previous",
      flag: "Flag",
      unflag: "Unflag",
      check: "Check",
      next: "Next",
      finish: "Finish",
      results: "Results",
      reviewMistakes: "Review mistakes",
      practiceAgain: "Practice again",
      topicBreakdown: "Topic breakdown",
      correctCount: "Correct",
      resetProgress: "Reset progress",
      recentSessions: "Recent sessions",
      practice: "Practice",
      exam: "Exam",
      stats: "Stats",
      allTopics: "All topics",
      allSimulators: "All simulators",
      allQuestions: "All questions",
      available: "available",
      sessionSaved: "Saved session",
      noSession: "No saved session yet.",
      question: "Question",
      of: "of",
      correct: "Correct",
      incorrect: "Incorrect",
      notQuite: "Not quite",
      trialCorrect: "Correct. Keep going.",
      trialIncorrect: "Not quite. Unlock the full trainer to see the correct answer and explanation.",
      trialLockedTitle: "Free practice complete",
      trialLockedSummary: "Subscribe to unlock your score, correct answers, explanations, memory phrases, progress tracking, and the full 300-question trainer.",
      locked: "Locked",
      unlockResults: "Unlock Results",
      viewPlans: "View Plans",
      weeklyPlan: "Weekly access - $14.99/week",
      bundlePlan: "90-day access - $149.99",
      accountComingSoon: "Account and payment setup is the next step.",
      correctAnswer: "Correct answer",
      explanation: "Explanation",
      basicExplanation: "Explanation",
      whyCorrect: "✅ Why this is Correct",
      whyOthersWrong: "❌ Why the Others are Wrong",
      examTip: "💡 Exam Tip",
      memoryTrick: "🧠 Memory Trick",
      realWorldExample: "📘 Real-world Example",
      practiceSimilarQuestions: "Practice Similar Questions",
      similarQuestions: "Related Questions",
      repeatMissTitle: "You have missed this concept more than once.",
      repeatMissBody: "Would you like to review this concept before continuing?",
      reviewConcept: "Review Concept",
      continueExam: "Continue Exam",
      easy: "🟢 Easy",
      moderate: "🟡 Moderate",
      challenging: "🔴 Challenging",
      memoryPhrase: "Memory phrase",
      chooseAnswer: "Choose an answer to continue.",
      emptyMissed: "No missed questions yet.",
      noHistory: "No sessions yet.",
      resetConfirm: "Reset all saved progress on this device?",
      strong: "Ready with margin",
      passing: "Passing",
      keepPracticing: "Keep practicing",
      youScored: "You scored",
      reviewingMissed: "Reviewing missed",
      noQuestions: "No questions match those filters.",
      disclaimer: "Vitprax is a training tool only. Using this app does not grant a certification, license, or guarantee a passing score. You must still take and pass the official exam required by the certifying authority."
    },
    es: {
      subTitle: "Forge Your Future.",
      darkMode: "Modo oscuro",
      lightMode: "Modo claro",
      homeTitle: "Continúa estudiando",
      homeDesc: "Práctica bilingüe de Texas Life con progreso guardado.",
      readiness: "Preparación",
      missionControl: "Centro de control",
      missionPrompt: "¿Qué debo estudiar ahora?",
      readinessScore: "Nivel de preparación",
      continueLearning: "Continuar estudiando",
      resumeLastSession: "Continuar sesión",
      fixWeaknesses: "Corregir mis puntos débiles",
      weaknessDesc: "Empieza con los conceptos que más probablemente te pueden costar puntos.",
      estimatedPassChance: "Probabilidad estimada de aprobar",
      studyTimeRemaining: "Tiempo de estudio restante",
      currentStreak: "Racha actual",
      topicsMastered: "Temas dominados",
      weakestTopic: "Tema más débil",
      todaysGoal: "Meta de hoy",
      dailyMissions: "Misiones diarias",
      needsWork: "Necesita trabajo",
      improving: "Mejorando",
      nearlyReady: "Casi listo",
      examReady: "Listo para examen",
      noWeaknessesYet: "Todavía no hay puntos débiles. Inicia una práctica para que Vitprax los encuentre.",
      miniLesson: "Mini lección",
      studyChapter: "Estudiar capítulo",
      cheatCode: "Resumen clave",
      examTrap: "Trampa del examen",
      targetedQuiz: "Quiz enfocado",
      reviewFlashcards: "Tarjetas",
      mastery: "Dominio",
      whyWeak: "Por qué importa",
      commonMistake: "Error común",
      memoryTip: "Frase para memorizar",
      recommendedFix: "Corrección recomendada",
      missionQuestions: "Contesta 10 preguntas",
      missionWeakTopic: "Repasa tu tema más débil",
      missionFlashcards: "Voltea 10 tarjetas",
      notEnoughData: "Datos insuficientes",
      diagnosticNeeded: "Necesitas diagnóstico",
      takeDiagnostic: "Haz un diagnóstico de 25 preguntas",
      diagnosticDetail: "Primero crea tu base",
      reviewMissedMission: "Repasa preguntas falladas",
      examSimulationMission: "Haz una simulación de examen",
      noEstimateYet: "Todavía no hay datos suficientes",
      baselineGoal: "Contesta al menos 25 preguntas para que Vitprax cree tu base.",
      examScoreWeight: "Las simulaciones cuentan más",
      xp: "XP",
      days: "días",
      hours: "horas",
      startWithPractice: "Empieza con práctica",
      study: "Estudiar",
      studyGuide: "Guía de estudio",
      studyPathDesc: "Capítulos y términos gratis",
      studyDesc: "Capítulos de estudio gratis y términos clave bilingües.",
      flashcards: "Tarjetas",
      flashcardsPathDesc: "10 tarjetas gratis",
      flashcardsDesc: "Repasa términos clave rápidamente. Las primeras 10 tarjetas son gratis; el mazo completo se desbloquea con acceso pagado.",
      studyFlashcards: "Estudiar tarjetas",
      flashcardFilter: "Mazo de tarjetas",
      practiceChapter: "Practicar este capítulo",
      allChapters: "Todos los capítulos",
      chapterCoach: "Clave del capítulo",
      examMove: "Movimiento de examen",
      nextStep: "Siguiente paso",
      chapterProgress: "Progreso por capítulo",
      chaptersStudied: "capítulos estudiados",
      currentChapterDone: "Capítulo actual iniciado",
      currentChapterNotDone: "Abre este capítulo para contarlo",
      continueFreeStudy: "Continuar estudio gratis",
      unlockPracticeLoop: "Desbloquear práctica completa",
      freeIncludes: "Gratis incluye",
      paidUnlocks: "Pagado desbloquea",
      freeStudyList: "Capítulos de estudio, términos clave bilingües, 10 preguntas y 10 tarjetas de vista previa.",
      paidStudyList: "300 preguntas, explicaciones completas, mini lecciones, mazo completo de tarjetas, progreso guardado, modo examen y repaso de puntos débiles.",
      sectionGuide: "Guía de secciones",
      freeStudyPaidPractice: "Los capítulos son gratis. La práctica completa, explicaciones, mini lecciones y el mazo completo se desbloquean con acceso pagado.",
      previewUpgradeNote: "Vista gratis · mazo completo pagado",
      chapterCardCount: "tarjetas en este mazo",
      flipCard: "Voltear tarjeta",
      knewIt: "La sabía",
      missedIt: "La fallé",
      flashcardPreview: "Vista gratis",
      flashcardUnlocked: "Mazo completo desbloqueado",
      flashcardLockedTitle: "Ese es el final de la vista gratis de tarjetas.",
      flashcardLockedText: "Suscríbete para desbloquear el mazo completo de tarjetas, explicaciones, modo práctica, modo examen y herramientas de progreso.",
      chapter: "Capítulo",
      keyTerms: "Términos clave",
      practiceThisTopic: "Practicar este tema",
      spanishStudyNote: "Los capítulos y términos clave están disponibles en español e inglés.",
      startPractice: "Iniciar práctica",
      freeTrial: "Probar 10 preguntas gratis",
      freeTrialDesc: "Solo correcto o incorrecto",
      examSimulation: "Simulación de examen",
      dashboard: "Panel",
      account: "Cuenta",
      plans: "Planes",
      accountDesc: "Crea una cuenta para guardar progreso y desbloquear acceso pagado.",
      freeTrialStatus: "Prueba gratis",
      activeStatus: "Sesión iniciada",
      createAccount: "Crear cuenta",
      logIn: "Iniciar sesión",
      logOut: "Cerrar sesión",
      signedInAs: "Sesión iniciada como",
      email: "Correo electrónico",
      password: "Contraseña",
      supabaseComing: "Crea tu cuenta con Supabase Auth.",
      loginComing: "Inicia sesión con tu cuenta de Vitprax.",
      accountPlaceholder: "Crea una cuenta o inicia sesión para prepararte para el acceso pagado.",
      authUnavailable: "Supabase no pudo cargar. Revisa tu conexión a internet e inténtalo otra vez.",
      signupSuccess: "Cuenta creada. Revisa tu correo si Supabase te pide confirmar antes de iniciar sesión.",
      loginSuccess: "Has iniciado sesión.",
      logoutSuccess: "Has cerrado sesión.",
      authError: "No se pudo completar la acción de cuenta. Revisa el correo/contraseña e inténtalo otra vez.",
      paidPlaceholder: "El estado de pago se conectará después de agregar Stripe.",
      accessFree: "Acceso de prueba gratis. Suscríbete para desbloquear el entrenador completo.",
      accessActive: "Entrenador completo desbloqueado.",
      paymentChecking: "Revisando tu acceso...",
      paymentSuccess: "Pago completado. Tu acceso se desbloqueará cuando Stripe lo confirme.",
      paymentCanceled: "Se canceló el pago. Puedes elegir un plan cuando estés listo.",
      mustLogin: "Crea una cuenta o inicia sesión antes de elegir un plan pagado.",
      checkoutStarting: "Abriendo el pago seguro de Stripe...",
      checkoutError: "No se pudo iniciar el pago. Inténtalo otra vez.",
      paidRequired: "El entrenador completo requiere acceso pagado. Prueba 10 preguntas gratis o elige un plan.",
      unlockFullTrainer: "Desbloquear el entrenador completo",
      plansDesc: "Elige el tiempo de acceso que se ajuste a tu plan de estudio.",
      flexible: "Flexible",
      weeklyAccess: "Acceso semanal",
      perWeek: "/ semana",
      weeklyDesc: "Ideal si solo necesitas un repaso final corto.",
      chooseWeekly: "Elegir semanal",
      bestValue: "Mejor valor",
      ninetyDayAccess: "Acceso de 90 días",
      bundleDesc: "Ideal si quieres tiempo para estudiar, repasar falladas y repetir simulaciones de examen.",
      chooseNinety: "Elegir 90 días",
      paidIncludes: "El acceso pagado incluye",
      includeQuestions: "Entrenador completo de 300 preguntas",
      includeExplanations: "Respuestas correctas, explicaciones, mini lecciones y frases para memorizar",
      includeFlashcards: "Mazo completo de tarjetas",
      includeProgress: "Progreso guardado, repaso de falladas, filtros y modo examen",
      includeLanguage: "Práctica completa en inglés y español",
      view: "Ver",
      answered: "Respondidas",
      accuracy: "Precisión",
      missed: "Falladas",
      flagged: "Marcadas",
      choosePath: "Elige una ruta",
      quickActions: "Acciones rápidas",
      studyTools: "Herramientas de estudio",
      practiceMode: "Modo práctica",
      practiceDesc: "Explicaciones inmediatas",
      examMode: "Modo examen",
      examDesc: "Calificación al final",
      reviewMissed: "Repasar falladas",
      missedDesc: "Reintenta puntos débiles",
      progress: "Progreso",
      progressDesc: "Historial y estadísticas",
      setupTitle: "Configurar práctica",
      home: "Inicio",
      mode: "Modo",
      topic: "Tema",
      simulator: "Simulador",
      questionCount: "Preguntas",
      shuffle: "Mezclar",
      shuffleBoth: "Preguntas y respuestas",
      shuffleAnswers: "Solo respuestas",
      shuffleNone: "No mezclar",
      begin: "Comenzar",
      resume: "Continuar",
      clearSession: "Borrar sesión",
      previous: "Anterior",
      flag: "Marcar",
      unflag: "Quitar marca",
      check: "Revisar",
      next: "Siguiente",
      finish: "Finalizar",
      results: "Resultados",
      reviewMistakes: "Revisar errores",
      practiceAgain: "Practicar otra vez",
      topicBreakdown: "Desglose por tema",
      correctCount: "Correctas",
      resetProgress: "Reiniciar progreso",
      recentSessions: "Sesiones recientes",
      practice: "Práctica",
      exam: "Examen",
      stats: "Stats",
      allTopics: "Todos los temas",
      allSimulators: "Todos los simuladores",
      allQuestions: "Todas las preguntas",
      available: "disponibles",
      sessionSaved: "Sesión guardada",
      noSession: "Todavía no hay una sesión guardada.",
      question: "Pregunta",
      of: "de",
      correct: "Correcto",
      incorrect: "Incorrecto",
      notQuite: "Casi",
      trialCorrect: "Correcto. Sigue adelante.",
      trialIncorrect: "Casi. Desbloquea el entrenador completo para ver la respuesta correcta y la explicación.",
      trialLockedTitle: "Práctica gratis completada",
      trialLockedSummary: "Suscríbete para desbloquear tu calificación, respuestas correctas, explicaciones, frases para memorizar, progreso guardado y el entrenador completo de 300 preguntas.",
      locked: "Bloqueado",
      unlockResults: "Desbloquear resultados",
      viewPlans: "Ver planes",
      weeklyPlan: "Acceso semanal - $14.99/semana",
      bundlePlan: "Acceso de 90 días - $149.99",
      accountComingSoon: "La cuenta y el pago son el siguiente paso.",
      correctAnswer: "Respuesta correcta",
      explanation: "Explicación",
      basicExplanation: "Explicación",
      whyCorrect: "✅ Por qué es correcta",
      whyOthersWrong: "❌ Por qué las otras son incorrectas",
      examTip: "💡 Consejo de examen",
      memoryTrick: "🧠 Truco para memorizar",
      realWorldExample: "📘 Ejemplo real",
      practiceSimilarQuestions: "Practicar preguntas similares",
      similarQuestions: "Preguntas relacionadas",
      repeatMissTitle: "Has fallado este concepto más de una vez.",
      repeatMissBody: "¿Quieres repasar este concepto antes de continuar?",
      reviewConcept: "Repasar concepto",
      continueExam: "Continuar examen",
      easy: "🟢 Fácil",
      moderate: "🟡 Moderada",
      challenging: "🔴 Difícil",
      memoryPhrase: "Frase para memorizar",
      chooseAnswer: "Elige una respuesta para continuar.",
      emptyMissed: "Todavía no hay preguntas falladas.",
      noHistory: "Aún no hay sesiones.",
      resetConfirm: "¿Borrar todo el progreso guardado en este dispositivo?",
      strong: "Listo con holgura",
      passing: "Aprobado",
      keepPracticing: "Sigue practicando",
      youScored: "Tu resultado",
      reviewingMissed: "Repasando falladas",
      noQuestions: "Ninguna pregunta coincide con esos filtros.",
      disclaimer: "Vitprax es solo una herramienta de entrenamiento. Usar esta aplicación no otorga una certificación, licencia ni garantiza una calificación aprobatoria. Aún debes tomar y aprobar el examen oficial requerido por la autoridad certificadora."
    }
  };

  const els = {
    screens: {
      home: document.getElementById("homeScreen"),
      weakness: document.getElementById("weaknessScreen"),
      study: document.getElementById("studyScreen"),
      flashcards: document.getElementById("flashcardsScreen"),
      setup: document.getElementById("setupScreen"),
      quiz: document.getElementById("quizScreen"),
      results: document.getElementById("resultsScreen"),
      progress: document.getElementById("progressScreen"),
      account: document.getElementById("accountScreen"),
      pricing: document.getElementById("pricingScreen")
    },
    langEn: document.getElementById("langEn"),
    langEs: document.getElementById("langEs"),
    theme: document.getElementById("themeToggle"),
    bankPill: document.getElementById("bankPill"),
    accountBadge: document.getElementById("accountBadge"),
    readinessBar: document.getElementById("readinessBar"),
    missionReadinessScore: document.getElementById("missionReadinessScore"),
    missionReadinessLabel: document.getElementById("missionReadinessLabel"),
    missionPassingChance: document.getElementById("missionPassingChance"),
    missionStudyTime: document.getElementById("missionStudyTime"),
    missionStreak: document.getElementById("missionStreak"),
    missionMastered: document.getElementById("missionMastered"),
    missionWeakestTopic: document.getElementById("missionWeakestTopic"),
    missionTodayGoal: document.getElementById("missionTodayGoal"),
    dailyMissionsList: document.getElementById("dailyMissionsList"),
    weaknessList: document.getElementById("weaknessList"),
    studyChapterSelect: document.getElementById("studyChapterSelect"),
    studyChapterTitle: document.getElementById("studyChapterTitle"),
    studyChapterProgress: document.getElementById("studyChapterProgress"),
    studySectionNav: document.getElementById("studySectionNav"),
    studyContent: document.getElementById("studyContent"),
    studyTerms: document.getElementById("studyTerms"),
    studyLanguageNote: document.getElementById("studyLanguageNote"),
    studyChapterSummary: document.getElementById("studyChapterSummary"),
    studyUpgradePrompt: document.getElementById("studyUpgradePrompt"),
    studyPracticeButton: document.getElementById("studyPracticeButton"),
    studyFlashcardsButton: document.getElementById("studyFlashcardsButton"),
    flashcardsAccessBadge: document.getElementById("flashcardsAccessBadge"),
    flashcardsProgress: document.getElementById("flashcardsProgress"),
    flashcardChapterSelect: document.getElementById("flashcardChapterSelect"),
    flashcardPracticeChapterButton: document.getElementById("flashcardPracticeChapterButton"),
    flashcardCard: document.getElementById("flashcardCard"),
    flashcardChapter: document.getElementById("flashcardChapter"),
    flashcardFront: document.getElementById("flashcardFront"),
    flashcardBack: document.getElementById("flashcardBack"),
    flashcardFlipButton: document.getElementById("flashcardFlipButton"),
    flashcardMissedButton: document.getElementById("flashcardMissedButton"),
    flashcardKnewButton: document.getElementById("flashcardKnewButton"),
    flashcardsStatus: document.getElementById("flashcardsStatus"),
    flashcardsUpgradePrompt: document.getElementById("flashcardsUpgradePrompt"),
    statAnswered: document.getElementById("statAnswered"),
    statAccuracy: document.getElementById("statAccuracy"),
    statMissed: document.getElementById("statMissed"),
    statFlagged: document.getElementById("statFlagged"),
    setupTitle: document.getElementById("setupTitle"),
    mode: document.getElementById("modeSelect"),
    topic: document.getElementById("topicSelect"),
    simulator: document.getElementById("simulatorSelect"),
    count: document.getElementById("countSelect"),
    shuffle: document.getElementById("shuffleSelect"),
    start: document.getElementById("startButton"),
    resume: document.getElementById("resumeButton"),
    clearSession: document.getElementById("clearSessionButton"),
    sessionSummary: document.getElementById("sessionSummary"),
    questionCounter: document.getElementById("questionCounter"),
    timer: document.getElementById("timerText"),
    questionTopic: document.getElementById("questionTopic"),
    questionProgress: document.getElementById("questionProgress"),
    questionSource: document.getElementById("questionSource"),
    questionText: document.getElementById("questionText"),
    answers: document.getElementById("answersList"),
    feedback: document.getElementById("feedbackBox"),
    previous: document.getElementById("previousButton"),
    flag: document.getElementById("flagButton"),
    check: document.getElementById("checkButton"),
    finish: document.getElementById("finishButton"),
    scoreCircle: document.getElementById("scoreCircle"),
    scorePercent: document.getElementById("scorePercent"),
    resultTitle: document.getElementById("resultTitle"),
    resultSummary: document.getElementById("resultSummary"),
    reviewLastMissed: document.getElementById("reviewLastMissedButton"),
    topicBreakdownTitle: document.getElementById("topicBreakdownTitle"),
    topicBreakdown: document.getElementById("topicBreakdown"),
    accountStatus: document.getElementById("accountStatus"),
    currentAccountCard: document.getElementById("currentAccountCard"),
    accountEmail: document.getElementById("accountEmail"),
    paidStatus: document.getElementById("paidStatus"),
    authForm: document.getElementById("authForm"),
    authTitle: document.getElementById("authTitle"),
    authEmail: document.getElementById("authEmail"),
    authPassword: document.getElementById("authPassword"),
    authSubmitButton: document.getElementById("authSubmitButton"),
    authHelper: document.getElementById("authHelper"),
    authModeButtons: document.querySelectorAll("[data-auth-mode]"),
    progressAnswered: document.getElementById("progressAnswered"),
    progressCorrect: document.getElementById("progressCorrect"),
    progressAccuracy: document.getElementById("progressAccuracy"),
    progressFlagged: document.getElementById("progressFlagged"),
    historyList: document.getElementById("historyList"),
    navButtons: document.querySelectorAll(".nav-button")
  };
  els.intro = document.getElementById("introScreen");
  els.introSkip = document.getElementById("introSkip");
  els.introAudio = document.getElementById("introAudio");

  let prefs = loadJson(PREF_KEY, { language: "en", theme: "light" });
  let progress = loadJson(`${PROGRESS_KEY}:guest`, loadJson(PROGRESS_KEY, defaultProgress()));
  let questionBank = Array.isArray(window.CERTIVO_QUESTIONS) ? [...window.CERTIVO_QUESTIONS] : [...CERTIVO_QUESTIONS];
  let flashcardBank = Array.isArray(window.CERTIVO_STUDY?.concepts) ? [...window.CERTIVO_STUDY.concepts] : [];
  let session = loadJson(SESSION_KEY, null);
  let activeScreen = "home";
  let timerId = null;
  let supabaseClient = null;
  let authUser = null;
  let accessState = { status: "free", plan: "free", access_until: null };
  let authMode = "login";
  let flashcardIndex = 0;
  let flashcardFlipped = false;
  let flashcardChapterFilter = "all";
  let progressSyncTimer = null;
  let introAudioUnlocked = false;

  function defaultProgress() {
    return { answers: {}, missed: {}, flagged: {}, history: [], study: { chapters: {} } };
  }

  function normalizeProgress(value) {
    const study = value?.study && typeof value.study === "object" ? value.study : {};
    return {
      answers: value?.answers && typeof value.answers === "object" ? value.answers : {},
      missed: value?.missed && typeof value.missed === "object" ? value.missed : {},
      flagged: value?.flagged && typeof value.flagged === "object" ? value.flagged : {},
      history: Array.isArray(value?.history) ? value.history : [],
      study: {
        chapters: study.chapters && typeof study.chapters === "object" ? study.chapters : {}
      }
    };
  }

  function mergeProgress(localValue, cloudValue) {
    const local = normalizeProgress(localValue);
    const cloud = normalizeProgress(cloudValue);
    const merged = defaultProgress();
    const answerIds = new Set([...Object.keys(cloud.answers), ...Object.keys(local.answers)]);
    answerIds.forEach((id) => {
      const localRecord = local.answers[id];
      const cloudRecord = cloud.answers[id];
      if (!localRecord) {
        merged.answers[id] = cloudRecord;
        return;
      }
      if (!cloudRecord) {
        merged.answers[id] = localRecord;
        return;
      }
      merged.answers[id] = (Number(localRecord.seen) || 0) >= (Number(cloudRecord.seen) || 0) ? localRecord : cloudRecord;
    });

    Object.keys(cloud.missed).forEach((id) => {
      if (!local.answers[id]) merged.missed[id] = true;
    });
    Object.keys(local.missed).forEach((id) => {
      merged.missed[id] = true;
    });
    merged.flagged = { ...cloud.flagged, ...local.flagged };

    const historyMap = new Map();
    [...cloud.history, ...local.history].forEach((entry) => {
      if (!entry?.date) return;
      historyMap.set(`${entry.date}-${entry.mode}-${entry.total}-${entry.percent}`, entry);
    });
    merged.history = [...historyMap.values()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20);
    const chapterIds = new Set([...Object.keys(cloud.study.chapters), ...Object.keys(local.study.chapters)]);
    chapterIds.forEach((chapterId) => {
      const cloudChapter = cloud.study.chapters[chapterId] || {};
      const localChapter = local.study.chapters[chapterId] || {};
      const cloudSeen = new Date(cloudChapter.updatedAt || cloudChapter.viewedAt || 0).getTime();
      const localSeen = new Date(localChapter.updatedAt || localChapter.viewedAt || 0).getTime();
      merged.study.chapters[chapterId] = cloudSeen >= localSeen ? cloudChapter : localChapter;
    });
    return merged;
  }

  function loadJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value || fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function progressKey() {
    return authUser?.id ? `${PROGRESS_KEY}:${authUser.id}` : `${PROGRESS_KEY}:guest`;
  }

  function loadStoredProgress() {
    progress = loadJson(progressKey(), defaultProgress());
  }

  function refreshAfterProgressChange() {
    renderSessionSummary();
    updateDashboard();
    if (activeScreen === "progress") renderProgress();
    if (activeScreen === "weakness") renderWeaknessCenter();
    if (activeScreen === "home") renderMissionControl();
  }

  function saveProgress(sync = true) {
    saveJson(progressKey(), progress);
    if (sync) queueProgressSync();
  }

  function t(key) {
    return text[prefs.language][key] || text.en[key] || key;
  }

  function qById(id) {
    return questionBank.find((question) => question.id === id);
  }

  function questionKey(question) {
    return question?.id || `${question?.simulator || ""}:${question?.en?.question || question?.es?.question || ""}`;
  }

  function uniqueQuestions(questions) {
    const seen = new Set();
    return questions.filter((question) => {
      const key = questionKey(question);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function questionSeenCount(question) {
    return Number(progress.answers?.[question.id]?.seen) || 0;
  }

  function orderQuestionsForSession(pool) {
    const base = els.shuffle.value === "both" ? shuffle(pool) : [...pool];
    return base.sort((first, second) => questionSeenCount(first) - questionSeenCount(second));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function titleCase(value) {
    return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function isTrialSession() {
    return session?.mode === "trial";
  }

  function hasFullAccess() {
    if (accessState.status !== "active") return false;
    if (!accessState.access_until) return true;
    return new Date(accessState.access_until).getTime() > Date.now();
  }

  function givesInstantFeedback() {
    return session?.mode === "practice" || isTrialSession();
  }

  function topicLabel(topic) {
    const labels = {
      es: {
        annuities: "Anualidades",
        beneficiaries: "Beneficiarios",
        "best interest": "Mejor interés",
        calculation: "Cálculos",
        contracts: "Contratos",
        ethics: "Ética",
        general: "General",
        "life insurance": "Seguro de vida",
        "policy provisions": "Cláusulas de póliza",
        retirement: "Retiro",
        riders: "Cláusulas adicionales",
        taxes: "Impuestos",
        texas: "Texas",
        underwriting: "Evaluación de riesgo"
      },
      en: {}
    };
    return labels[prefs.language]?.[topic] || titleCase(topic);
  }

  function localize() {
    document.documentElement.lang = prefs.language;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    els.langEn.classList.toggle("active", prefs.language === "en");
    els.langEs.classList.toggle("active", prefs.language === "es");
    els.theme.textContent = prefs.theme === "dark" ? t("lightMode") : t("darkMode");
    els.bankPill.textContent = `${questionBank.length} ${prefs.language === "es" ? "preguntas" : "questions"}`;
    populateFilters();
    updateDashboard();
    renderSessionSummary();
    if (activeScreen === "quiz" && session) renderQuestion();
    if (activeScreen === "results" && session) renderResults();
    if (activeScreen === "progress") renderProgress();
    if (activeScreen === "weakness") renderWeaknessCenter();
    if (activeScreen === "study") renderStudy();
    if (activeScreen === "flashcards") renderFlashcards();
    updateAuthForm();
    updateAuthUi();
  }

  function initSupabase() {
    if (!window.supabase?.createClient) {
      setAccountStatus(t("authUnavailable"));
      updateAuthUi();
      return;
    }
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    supabaseClient.auth.getSession().then(async ({ data }) => {
      authUser = data.session?.user || null;
      loadStoredProgress();
      handleCheckoutReturn();
      await refreshAccess();
      await loadQuestionBank();
      await loadFlashcardBank();
      await loadCloudProgress();
      refreshAfterProgressChange();
      updateAuthUi();
    });
    supabaseClient.auth.onAuthStateChange(async (_event, currentSession) => {
      authUser = currentSession?.user || null;
      loadStoredProgress();
      await refreshAccess();
      await loadQuestionBank();
      await loadFlashcardBank();
      await loadCloudProgress();
      refreshAfterProgressChange();
      updateAuthUi();
    });
  }

  function setAccountStatus(message) {
    els.accountStatus.textContent = message;
    els.accountStatus.classList.add("visible");
  }

  function updateAuthUi() {
    if (!els.currentAccountCard) return;
    const isLoggedIn = Boolean(authUser);
    if (els.authForm) els.authForm.classList.toggle("hidden", isLoggedIn);
    els.currentAccountCard.classList.toggle("hidden", !isLoggedIn);
    els.accountBadge.textContent = isLoggedIn ? t("activeStatus") : t("freeTrialStatus");
    els.accountEmail.textContent = authUser?.email || "";
    if (els.paidStatus) {
      els.paidStatus.textContent = hasFullAccess() ? t("accessActive") : t("accessFree");
    }
    if (!isLoggedIn && !els.accountStatus.textContent.trim()) setAccountStatus(t("accountPlaceholder"));
  }

  async function refreshAccess() {
    if (!supabaseClient || !authUser) {
      accessState = { status: "free", plan: "free", access_until: null };
      updateAuthUi();
      return;
    }
    setAccountStatus(t("paymentChecking"));
    const { data, error } = await supabaseClient
      .from("certivo_access")
      .select("status, plan, access_until")
      .eq("user_id", authUser.id)
      .maybeSingle();

    if (!error && data) {
      accessState = data;
    } else {
      accessState = { status: "free", plan: "free", access_until: null };
    }
    updateAuthUi();
  }

  async function loadQuestionBank() {
    if (!supabaseClient) return;
    const query = supabaseClient
      .from("certivo_questions")
      .select("question")
      .order("sort_order", { ascending: true });
    const { data, error } = await query;
    if (error || !Array.isArray(data) || !data.length) {
      questionBank = Array.isArray(CERTIVO_QUESTIONS) ? [...CERTIVO_QUESTIONS] : questionBank;
      return;
    }
    questionBank = uniqueQuestions(data.map((row) => row.question).filter(Boolean));
    populateFilters();
    updateDashboard();
    if (activeScreen === "setup") renderSessionSummary();
    if (activeScreen === "progress") renderProgress();
    if (activeScreen === "weakness") renderWeaknessCenter();
    if (activeScreen === "home") renderMissionControl();
    els.bankPill.textContent = `${questionBank.length} ${prefs.language === "es" ? "preguntas" : "questions"}`;
  }

  async function loadFlashcardBank() {
    if (!supabaseClient) return;
    const { data, error } = await supabaseClient
      .from("certivo_flashcards")
      .select("card")
      .order("sort_order", { ascending: true });
    if (error || !Array.isArray(data) || !data.length) {
      flashcardBank = Array.isArray(window.CERTIVO_STUDY?.concepts) ? [...window.CERTIVO_STUDY.concepts] : flashcardBank;
      return;
    }
    flashcardBank = data.map((row) => row.card).filter(Boolean);
    if (window.CERTIVO_STUDY) window.CERTIVO_STUDY.concepts = flashcardBank;
    if (activeScreen === "study") renderStudy();
    if (activeScreen === "flashcards") renderFlashcards();
  }

  async function loadCloudProgress() {
    if (!supabaseClient || !authUser) return;
    const { data, error } = await supabaseClient
      .from("certivo_progress")
      .select("progress")
      .eq("user_id", authUser.id)
      .maybeSingle();
    if (error) return;
    progress = mergeProgress(progress, data?.progress || defaultProgress());
    saveProgress(false);
    renderSessionSummary();
    updateDashboard();
    if (activeScreen === "progress") renderProgress();
    if (activeScreen === "weakness") renderWeaknessCenter();
    queueProgressSync();
  }

  function queueProgressSync() {
    window.clearTimeout(progressSyncTimer);
    progressSyncTimer = window.setTimeout(syncProgressToCloud, 800);
  }

  async function syncProgressToCloud() {
    if (!supabaseClient || !authUser) return;
    await supabaseClient
      .from("certivo_progress")
      .upsert({
        user_id: authUser.id,
        progress: normalizeProgress(progress),
        updated_at: new Date().toISOString()
      });
  }

  function handleCheckoutReturn() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "success") setAccountStatus(t("paymentSuccess"));
    if (params.get("checkout") === "cancelled") setAccountStatus(t("paymentCanceled"));
  }

  function authErrorMessage(error) {
    return error?.message ? `${t("authError")} ${error.message}` : t("authError");
  }

  function setAuthMode(mode) {
    authMode = mode === "signup" ? "signup" : "login";
    updateAuthForm();
  }

  function updateAuthForm() {
    if (!els.authForm) return;
    const isSignup = authMode === "signup";
    els.authTitle.textContent = isSignup ? t("createAccount") : t("logIn");
    els.authSubmitButton.textContent = isSignup ? t("createAccount") : t("logIn");
    els.authHelper.textContent = isSignup ? t("supabaseComing") : t("loginComing");
    els.authPassword.autocomplete = isSignup ? "new-password" : "current-password";
    els.authModeButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.authMode === authMode);
    });
  }

  function applyTheme() {
    document.documentElement.dataset.theme = prefs.theme;
  }

  function showScreen(name) {
    activeScreen = name;
    Object.entries(els.screens).forEach(([screen, node]) => node.classList.toggle("hidden", screen !== name));
    els.navButtons.forEach((button) => button.classList.remove("active"));
    const navMap = { home: "navHome", weakness: "navHome", study: "navStudy", flashcards: "navStudy", setup: session?.mode === "exam" ? "navExam" : "navPractice", quiz: session?.mode === "exam" ? "navExam" : "navPractice", results: "navStats", progress: "navStats", account: "navStats", pricing: "navStats" };
    const active = document.getElementById(navMap[name]);
    if (active) active.classList.add("active");
    if (name === "progress") renderProgress();
    if (name === "weakness") renderWeaknessCenter();
    if (name === "study") renderStudy();
    if (name === "flashcards") renderFlashcards();
    if (name === "home") updateDashboard();
    window.scrollTo({ top: 0, behavior: "instant" });
    tickTimer();
  }

  function populateFilters() {
    const previousTopic = els.topic.value || "all";
    const previousSimulator = els.simulator.value || "all";
    const topics = [...new Set(questionBank.map((question) => question.topic))].sort();
    const simulators = [...new Set(questionBank.map((question) => question.simulator))].sort((a, b) => a - b);
    fillSelect(els.topic, [{ value: "all", label: t("allTopics") }, { value: "missed", label: t("reviewMissed") }, ...topics.map((topic) => ({ value: topic, label: topicLabel(topic) }))], previousTopic);
    fillSelect(els.simulator, [{ value: "all", label: t("allSimulators") }, ...simulators.map((sim) => ({ value: String(sim), label: `${t("simulator")} ${sim}` }))], previousSimulator);
    populateCounts();
  }

  function populateStudyChapters() {
    if (!els.studyChapterSelect || !window.CERTIVO_STUDY?.chapters?.length) return;
    const selected = els.studyChapterSelect.value;
    fillSelect(
      els.studyChapterSelect,
      window.CERTIVO_STUDY.chapters.map((chapter) => ({
        value: chapter.id,
        label: `${t("chapter")} ${chapter.number}: ${chapter.title[prefs.language] || chapter.title.en || chapter.title.es}`
      })),
      selected || window.CERTIVO_STUDY.chapters[0].id
    );
  }

  function currentStudyChapter() {
    return window.CERTIVO_STUDY?.chapters?.find((chapter) => chapter.id === els.studyChapterSelect.value) || window.CERTIVO_STUDY?.chapters?.[0];
  }

  function topicForChapter(number) {
    return {
      1: "general",
      2: "general",
      3: "contracts",
      4: "life insurance",
      5: "policy provisions",
      6: "policy provisions",
      7: "riders",
      8: "retirement",
      9: "annuities",
      10: "taxes",
      11: "underwriting",
      12: "underwriting",
      13: "texas",
      14: "ethics",
      15: "general",
      16: "general",
      17: "general"
    }[Number(number)] || "general";
  }

  function chapterForTopic(topic) {
    const chapter = window.CERTIVO_STUDY?.chapters?.find((item) => topicForChapter(item.number) === topic);
    return chapter?.id || window.CERTIVO_STUDY?.chapters?.[0]?.id || "";
  }

  function chapterCheatCode(chapter) {
    const number = Number(chapter?.number || 0);
    const lines = {
      en: {
        1: ["Risk is the exam's foundation: risk is uncertainty, peril causes loss, hazard makes loss more likely.", "Do not pick the word that sounds familiar. Match the scenario to risk, peril, hazard, or pooling.", "Read the short rules, then drill the General topic."],
        2: ["Insurance works by pooling many similar risks so predictable losses can be paid from many premiums.", "If the question says the loss is predictable across a group, think law of large numbers.", "Use flashcards for pooling, adverse selection, and risk transfer."],
        3: ["Contracts questions are vocabulary traps: adhesion, aleatory, unilateral, conditional, and personal.", "If only the insurer makes an enforceable promise, the contract is unilateral.", "Practice contracts until each word feels like a clue."],
        4: ["Life insurance pays at death. Term is temporary protection; permanent policies can build cash value.", "Do not treat term, whole, universal, and variable as interchangeable.", "Compare policy types, then practice Life Insurance."],
        5: ["Policy provisions are the policy rulebook: grace, reinstatement, loans, incontestability, and free-look.", "Timeline words usually decide the answer.", "Make a quick timeline and then practice provisions."],
        6: ["Options and nonforfeiture rules answer: what happens if the owner stops paying or wants cash?", "Do not confuse dividend options with nonforfeiture options.", "Practice policy options after reading the examples."],
        7: ["Riders are add-ons. Match the rider to the problem: disability, accidental death, future insurability, or long-term care.", "The question usually names the problem before it asks for the rider.", "Filter flashcards to this chapter before practice."],
        8: ["Retirement plans are tax-rule machines. Contributions, growth, rollovers, and distributions are separate events.", "Do not mix contribution rules with distribution rules.", "Drill qualified vs nonqualified and IRA rules."],
        9: ["Annuities protect against living too long. Immediate pays soon; deferred pays later; variable keeps investment risk with the owner.", "Ask who carries the risk and when payments start.", "Practice annuities after flashcards."],
        10: ["Tax questions ask what is taxable and when. Death benefits are usually tax-free; gain and interest usually are not.", "Do not assume every insurance payment is taxable.", "Practice taxes slowly and read every money clue."],
        11: ["Underwriting is the decision process. Field gathers facts; home office decides; risk class controls premium.", "Agents collect information, but the insurer approves or declines.", "Drill underwriting roles and risk classes."],
        12: ["The application and delivery chapter is about signatures, receipts, delivery, and when coverage begins.", "Conditional receipt questions turn on conditions being met.", "Practice application timing questions."],
        13: ["Texas rules are state-specific: licensing, CE, TLHIGA, replacement, prompt payment, and divorce revocation.", "When the question says Texas, stop using generic insurance rules.", "Memorize the Texas numbers with flashcards."],
        14: ["Ethics is consumer protection: tell the truth, disclose, document, and avoid pressure.", "If it hides, pressures, or misleads, it is wrong.", "Practice unfair trade practice vocabulary."],
        15: ["The concept bank is your rapid review list. Treat each term as a possible exam clue.", "Knowing the word is not enough; know what scenario triggers it.", "Flip flashcards until definitions are instant."],
        16: ["Final review is about weak spots, not rereading everything.", "Do not spend equal time on topics you already know.", "Use Mission Control and Weakness Center first."],
        17: ["Exam readiness comes from timed practice plus review, not just reading.", "A good score without review still leaves points on the table.", "Take a simulator, review misses, then retest."]
      },
      es: {
        1: ["Riesgo es la base del examen: riesgo es incertidumbre, peligro causa la pérdida y una condición de riesgo aumenta la probabilidad.", "No escojas la palabra que solo suena familiar. Conecta el escenario con riesgo, peligro, condición de riesgo o agrupación de riesgos.", "Lee las reglas cortas y luego practica General."],
        2: ["El seguro funciona agrupando muchos riesgos parecidos para pagar pérdidas previsibles con muchas primas.", "Si la pregunta habla de pérdidas previsibles en grupo, piensa en la ley de los grandes números.", "Usa tarjetas para agrupación, selección adversa y transferencia de riesgo."],
        3: ["Contratos son trampas de vocabulario: adhesión, aleatorio, unilateral, condicional y personal.", "Si solo la aseguradora hace una promesa exigible, el contrato es unilateral.", "Practica contratos hasta que cada palabra sea una pista."],
        4: ["El seguro de vida paga al morir. Temporal es protección por un tiempo; permanente puede crear valor en efectivo.", "No trates temporal, vida entera, universal y variable como si fueran lo mismo.", "Compara tipos de póliza y luego practica Seguro de Vida."],
        5: ["Las cláusulas son el reglamento de la póliza: gracia, reinstalación, préstamos, incontestabilidad y revisión gratuita.", "Las palabras de tiempo casi siempre deciden la respuesta.", "Haz una línea de tiempo y luego practica cláusulas."],
        6: ["Opciones y no caducidad contestan: qué pasa si el dueño deja de pagar o quiere valor en efectivo.", "No confundas opciones de dividendos con opciones de no caducidad.", "Practica opciones de póliza después de leer los ejemplos."],
        7: ["Las cláusulas adicionales son agregados. Une la cláusula con el problema: discapacidad, muerte accidental, asegurabilidad futura o cuidado a largo plazo.", "La pregunta normalmente menciona el problema antes de pedir la cláusula.", "Filtra las tarjetas a este capítulo antes de practicar."],
        8: ["Los planes de retiro son máquinas de reglas fiscales. Contribuciones, crecimiento, traspasos y distribuciones son eventos distintos.", "No mezcles reglas de contribución con reglas de distribución.", "Practica calificado vs no calificado y reglas de IRA."],
        9: ["Las anualidades protegen contra vivir demasiado. Inmediata paga pronto; diferida paga después; variable deja riesgo de inversión al dueño.", "Pregunta quién carga el riesgo y cuándo empiezan los pagos.", "Practica anualidades después de las tarjetas."],
        10: ["Impuestos pregunta qué paga impuesto y cuándo. Beneficio por muerte normalmente no paga; ganancia e interés normalmente sí.", "No asumas que todo pago de seguro es tributable.", "Practica impuestos despacio y lee cada pista de dinero."],
        11: ["La evaluación de riesgo es el proceso de decisión. Campo recopila datos; oficina central decide; clase de riesgo controla la prima.", "El agente recoge información, pero la aseguradora aprueba o rechaza.", "Practica funciones de evaluación y clases de riesgo."],
        12: ["Solicitud y entrega trata firmas, recibos, entrega y cuándo comienza la cobertura.", "Las preguntas de recibo condicional dependen de que se cumplan condiciones.", "Practica preguntas de tiempo de solicitud."],
        13: ["Texas es específico: licencia, educación continua, TLHIGA, reemplazo, pago puntual y revocación por divorcio.", "Cuando la pregunta dice Texas, deja la regla genérica.", "Memoriza los números de Texas con tarjetas."],
        14: ["Ética es protección del consumidor: decir la verdad, divulgar, documentar y evitar presión.", "Si oculta, presiona o engaña, está mal.", "Practica vocabulario de prácticas injustas."],
        15: ["El banco de conceptos es tu repaso rápido. Trata cada término como una posible pista de examen.", "Saber la palabra no basta; debes saber qué escenario la activa.", "Voltea tarjetas hasta que las definiciones salgan rápido."],
        16: ["El repaso final se basa en puntos débiles, no en leer todo otra vez.", "No le des el mismo tiempo a temas que ya dominas.", "Usa Centro de control y Puntos débiles primero."],
        17: ["La preparación real viene de práctica con tiempo y repaso, no solo lectura.", "Un buen resultado sin repasar todavía deja puntos en la mesa.", "Haz simulador, revisa falladas y vuelve a probar."]
      }
    };
    const fallbackTopic = topicForChapter(number);
    const coaching = weaknessCoaching(fallbackTopic);
    return lines[prefs.language]?.[number] || [coaching.memory, coaching.mistake, coaching.fix];
  }

  function renderStudySummary(chapter) {
    if (!els.studyChapterSummary) return;
    const [coach, trap, next] = chapterCheatCode(chapter);
    els.studyChapterSummary.innerHTML = `
      <div>
        <span>${escapeHtml(t("chapterCoach"))}</span>
        <strong>${escapeHtml(coach)}</strong>
      </div>
      <div>
        <span>${escapeHtml(t("examMove"))}</span>
        <p>${escapeHtml(trap)}</p>
      </div>
      <div>
        <span>${escapeHtml(t("nextStep"))}</span>
        <p>${escapeHtml(next)}</p>
      </div>
    `;
  }

  function markChapterStudied(chapter) {
    if (!chapter?.id) return;
    progress.study = progress.study || { chapters: {} };
    progress.study.chapters = progress.study.chapters || {};
    const current = progress.study.chapters[chapter.id];
    if (current?.viewed) return;
    progress.study.chapters[chapter.id] = {
      viewed: true,
      number: chapter.number,
      updatedAt: new Date().toISOString()
    };
    saveProgress();
  }

  function renderChapterProgress(chapter) {
    if (!els.studyChapterProgress || !window.CERTIVO_STUDY?.chapters?.length) return;
    const chapters = window.CERTIVO_STUDY.chapters;
    const studied = progress.study?.chapters || {};
    const studiedCount = chapters.filter((item) => studied[item.id]?.viewed).length;
    const percent = chapters.length ? Math.round((studiedCount / chapters.length) * 100) : 0;
    const currentDone = Boolean(studied[chapter.id]?.viewed);
    const chapterButtons = chapters.map((item) => {
      const title = item.title[prefs.language] || item.title.en || item.title.es || "";
      const state = studied[item.id]?.viewed ? "is-studied" : "";
      const current = item.id === chapter.id ? "is-current" : "";
      return `<button class="chapter-dot ${state} ${current}" type="button" data-chapter-id="${escapeHtml(item.id)}" title="${escapeHtml(title)}">${escapeHtml(item.number)}</button>`;
    }).join("");
    els.studyChapterProgress.innerHTML = `
      <div class="chapter-progress-head">
        <div>
          <span>${escapeHtml(t("chapterProgress"))}</span>
          <strong>${percent}%</strong>
        </div>
        <p>${escapeHtml(studiedCount)} ${escapeHtml(t("of"))} ${escapeHtml(chapters.length)} ${escapeHtml(t("chaptersStudied"))}</p>
      </div>
      <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${percent}%"></div></div>
      <div class="chapter-dot-grid">${chapterButtons}</div>
      <p class="chapter-current-note">${escapeHtml(currentDone ? t("currentChapterDone") : t("currentChapterNotDone"))}</p>
    `;
    els.studyChapterProgress.querySelectorAll("[data-chapter-id]").forEach((button) => {
      button.addEventListener("click", () => {
        els.studyChapterSelect.value = button.dataset.chapterId;
        renderStudy();
      });
    });
  }

  function renderSectionGuide(chapter) {
    if (!els.studySectionNav) return;
    const sections = chapter.sections || [];
    els.studySectionNav.innerHTML = "";
    if (!sections.length) return;
    const label = document.createElement("span");
    label.textContent = t("sectionGuide");
    els.studySectionNav.appendChild(label);
    sections.forEach((section, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${index + 1}. ${section.heading[prefs.language] || section.heading.es || section.heading.en}`;
      button.addEventListener("click", () => {
        document.getElementById(`study-section-${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      els.studySectionNav.appendChild(button);
    });
  }

  function upgradePromptHtml() {
    return `
      <div>
        <span>${escapeHtml(t("freeIncludes"))}</span>
        <p>${escapeHtml(t("freeStudyList"))}</p>
      </div>
      <div>
        <span>${escapeHtml(t("paidUnlocks"))}</span>
        <p>${escapeHtml(t("paidStudyList"))}</p>
      </div>
      <button class="button primary compact" type="button">${escapeHtml(t("unlockPracticeLoop"))}</button>
    `;
  }

  function renderUpgradePrompt(node) {
    if (!node) return;
    node.classList.toggle("hidden", hasFullAccess());
    if (hasFullAccess()) {
      node.innerHTML = "";
      return;
    }
    node.innerHTML = upgradePromptHtml();
    node.querySelector("button")?.addEventListener("click", () => showScreen("pricing"));
  }

  function renderStudy() {
    if (!window.CERTIVO_STUDY?.chapters?.length) return;
    populateStudyChapters();
    const chapter = currentStudyChapter();
    if (!chapter) return;
    markChapterStudied(chapter);
    els.studyChapterTitle.textContent = `${t("chapter")} ${chapter.number}: ${chapter.title[prefs.language] || chapter.title.es || chapter.title.en}`;
    els.studyLanguageNote.textContent = `${t("spanishStudyNote")} ${t("freeStudyPaidPractice")}`;
    renderStudySummary(chapter);
    renderChapterProgress(chapter);
    renderSectionGuide(chapter);
    renderUpgradePrompt(els.studyUpgradePrompt);
    els.studyContent.innerHTML = "";
    chapter.sections.forEach((section, index) => {
      const article = document.createElement("article");
      article.className = "study-section";
      article.id = `study-section-${index + 1}`;
      const heading = document.createElement("h3");
      heading.innerHTML = `<span>${index + 1}</span>${escapeHtml(section.heading[prefs.language] || section.heading.es || section.heading.en)}`;
      const body = document.createElement("div");
      body.className = "study-markdown";
      body.innerHTML = markdownToHtml(section.markdown[prefs.language] || section.markdown.es || section.markdown.en || "");
      article.append(heading, body);
      els.studyContent.appendChild(article);
    });
    renderStudyTerms(chapter.number);
  }

  function renderStudyTerms(chapterNumber) {
    els.studyTerms.innerHTML = "";
    const terms = (window.CERTIVO_STUDY?.concepts || []).filter((concept) => Number(concept.chapter) === Number(chapterNumber)).slice(0, 24);
    if (!terms.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = t("noQuestions");
      els.studyTerms.appendChild(empty);
      return;
    }
    terms.forEach((concept) => {
      const card = document.createElement("article");
      card.className = "term-card";
      const definition = concept.definition[prefs.language] || concept.definition.es || concept.definition.en;
      card.innerHTML = `<strong>${escapeHtml(concept.term)}</strong><p>${escapeHtml(definition)}</p>`;
      els.studyTerms.appendChild(card);
    });
  }

  function allFlashcards() {
    return (flashcardBank || []).map((concept, index) => {
      const chapter = window.CERTIVO_STUDY?.chapters?.find((item) => Number(item.number) === Number(concept.chapter));
      return {
        id: concept.id || `flashcard-${index + 1}`,
        chapter: concept.chapter,
        chapterTitle: chapter?.title || {},
        term: concept.term,
        definition: concept.definition || {}
      };
    });
  }

  function populateFlashcardChapters() {
    if (!els.flashcardChapterSelect) return;
    const cards = allFlashcards();
    const chapterNumbers = [...new Set(cards.map((card) => Number(card.chapter)).filter(Boolean))].sort((a, b) => a - b);
    const options = [{ value: "all", label: t("allChapters") }, ...chapterNumbers.map((number) => {
      const chapter = window.CERTIVO_STUDY?.chapters?.find((item) => Number(item.number) === Number(number));
      const title = chapter?.title?.[prefs.language] || chapter?.title?.en || chapter?.title?.es || "";
      const count = cards.filter((card) => Number(card.chapter) === Number(number)).length;
      return {
        value: String(number),
        label: `${t("chapter")} ${number}${title ? `: ${title}` : ""} · ${count}`
      };
    })];
    fillSelect(els.flashcardChapterSelect, options, flashcardChapterFilter);
    flashcardChapterFilter = els.flashcardChapterSelect.value || "all";
  }

  function filteredFlashcards() {
    const deck = allFlashcards();
    if (flashcardChapterFilter === "all") return deck;
    return deck.filter((card) => String(card.chapter) === String(flashcardChapterFilter));
  }

  function availableFlashcards() {
    const deck = filteredFlashcards();
    return hasFullAccess() ? deck : deck.slice(0, FREE_FLASHCARD_LIMIT);
  }

  function flashcardTerm(card) {
    if (prefs.language === "es") return FLASHCARD_TERM_ES[card.term] || card.term;
    return card.term;
  }

  function renderFlashcards() {
    if (!els.flashcardCard) return;
    populateFlashcardChapters();
    renderUpgradePrompt(els.flashcardsUpgradePrompt);
    const deck = availableFlashcards();
    const fullDeck = filteredFlashcards();
    const fullAccess = hasFullAccess();
    if (!deck.length) {
      renderFlashcardLock(fullAccess ? t("noQuestions") : `${t("flashcardLockedTitle")} ${t("flashcardLockedText")}`);
      return;
    }
    if (flashcardIndex >= deck.length) {
      if (!fullAccess && fullDeck.length > deck.length) {
        renderFlashcardLock(`${t("flashcardLockedTitle")} ${t("flashcardLockedText")}`);
        return;
      }
      flashcardIndex = 0;
    }

    const card = deck[flashcardIndex];
    const definition = card.definition[prefs.language] || card.definition.en || card.definition.es || "";
    const chapterTitle = card.chapterTitle[prefs.language] || card.chapterTitle.en || card.chapterTitle.es || "";

    els.flashcardsStatus.classList.add("hidden");
    els.flashcardsStatus.textContent = "";
    els.flashcardCard.classList.remove("is-locked");
    els.flashcardChapter.textContent = `${t("chapter")} ${card.chapter}${chapterTitle ? ` · ${chapterTitle}` : ""}`;
    els.flashcardFront.textContent = flashcardTerm(card);
    els.flashcardBack.textContent = flashcardFlipped ? definition : prefs.language === "es" ? "Toca voltear para ver la definición." : "Tap flip to see the definition.";
    els.flashcardBack.classList.toggle("is-hidden-answer", !flashcardFlipped);
    els.flashcardsAccessBadge.textContent = fullAccess ? t("flashcardUnlocked") : t("flashcardPreview");
    els.flashcardsProgress.textContent = `${flashcardIndex + 1} ${t("of")} ${deck.length}${fullAccess ? ` · ${fullDeck.length} ${t("chapterCardCount")}` : ` · ${t("previewUpgradeNote")}`}`;
    els.flashcardFlipButton.disabled = false;
    els.flashcardMissedButton.disabled = !flashcardFlipped;
    els.flashcardKnewButton.disabled = !flashcardFlipped;
    if (els.flashcardPracticeChapterButton) els.flashcardPracticeChapterButton.disabled = flashcardChapterFilter === "all";
  }

  function renderFlashcardLock(message) {
    renderUpgradePrompt(els.flashcardsUpgradePrompt);
    els.flashcardCard.classList.add("is-locked");
    els.flashcardChapter.textContent = t("locked");
    els.flashcardFront.textContent = t("flashcardLockedTitle");
    els.flashcardBack.textContent = t("flashcardLockedText");
    els.flashcardBack.classList.remove("is-hidden-answer");
    els.flashcardsAccessBadge.textContent = t("flashcardPreview");
    els.flashcardsProgress.textContent = `${FREE_FLASHCARD_LIMIT} ${t("of")} ${filteredFlashcards().length || allFlashcards().length}`;
    els.flashcardFlipButton.disabled = true;
    els.flashcardMissedButton.disabled = true;
    els.flashcardKnewButton.disabled = true;
    if (els.flashcardPracticeChapterButton) els.flashcardPracticeChapterButton.disabled = flashcardChapterFilter === "all";
    els.flashcardsStatus.innerHTML = `<p>${escapeHtml(message)}</p><button class="button primary compact" type="button">${escapeHtml(t("viewPlans"))}</button>`;
    els.flashcardsStatus.classList.remove("hidden");
    els.flashcardsStatus.querySelector("button").addEventListener("click", () => showScreen("pricing"));
  }

  function openFlashcards(chapterNumber = "all") {
    flashcardChapterFilter = chapterNumber && chapterNumber !== "all" ? String(chapterNumber) : "all";
    if (els.flashcardChapterSelect) els.flashcardChapterSelect.value = flashcardChapterFilter;
    flashcardIndex = 0;
    flashcardFlipped = false;
    showScreen("flashcards");
  }

  function advanceFlashcard() {
    flashcardIndex += 1;
    flashcardFlipped = false;
    renderFlashcards();
  }

  function markdownToHtml(markdown) {
    const lines = String(markdown).split(/\r?\n/);
    const html = [];
    let listOpen = false;
    const closeList = () => {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        closeList();
        return;
      }
      if (/^---+$/.test(trimmed)) {
        closeList();
        html.push("<hr>");
        return;
      }
      const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        closeList();
        const level = Math.min(4, heading[1].length + 2);
        html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        return;
      }
      if (trimmed.startsWith(">")) {
        closeList();
        html.push(`<blockquote>${inlineMarkdown(trimmed.replace(/^>\s*/, ""))}</blockquote>`);
        return;
      }
      if (/^[-*]\s+/.test(trimmed)) {
        if (!listOpen) {
          html.push("<ul>");
          listOpen = true;
        }
        html.push(`<li>${inlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
        return;
      }
      closeList();
      html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
    });
    closeList();
    return html.join("");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function practiceStudyChapter() {
    const chapter = currentStudyChapter();
    const chapterQuestions = questionBank.filter((question) => Number(question.chapter || 0) === Number(chapter?.number || 0));
    if (chapterQuestions.length) {
      const firstTopic = chapterQuestions[0].topic;
      openSetup("practice");
      els.topic.value = firstTopic;
      populateCounts();
      return;
    }
    const mappedTopic = topicForChapter(chapter?.number);
    openSetup("practice");
    if (mappedTopic && [...els.topic.options].some((option) => option.value === mappedTopic)) {
      els.topic.value = mappedTopic;
      populateCounts();
    }
  }

  function practiceFlashcardChapter() {
    const chapterNumber = flashcardChapterFilter === "all" ? currentStudyChapter()?.number : flashcardChapterFilter;
    const mappedTopic = topicForChapter(chapterNumber);
    openSetup("practice");
    if (mappedTopic && [...els.topic.options].some((option) => option.value === mappedTopic)) {
      els.topic.value = mappedTopic;
      populateCounts();
    }
  }

  function populateCounts() {
    const available = filteredQuestions().length;
    const preferred = els.count.value;
    const base = [10, 20, 25, 50, 100, 300, available].filter((count) => count > 0 && count <= available);
    const unique = [...new Set(base)];
    fillSelect(els.count, unique.map((count) => ({ value: String(count), label: `${count} ${t("available")}` })), preferred || String(unique.at(-1) || ""));
    els.start.disabled = available === 0;
  }

  function fillSelect(select, options, selectedValue) {
    select.innerHTML = "";
    options.forEach((option) => {
      const node = document.createElement("option");
      node.value = option.value;
      node.textContent = option.label;
      select.appendChild(node);
    });
    select.value = options.some((option) => option.value === selectedValue) ? selectedValue : options[0]?.value || "";
  }

  function filteredQuestions() {
    return uniqueQuestions(questionBank.filter((question) => {
      const topicMatch = els.topic.value === "all" || els.topic.value === "" || question.topic === els.topic.value || (els.topic.value === "missed" && progress.missed[question.id]);
      const simulatorMatch = els.simulator.value === "all" || els.simulator.value === "" || String(question.simulator) === String(els.simulator.value);
      return topicMatch && simulatorMatch;
    }));
  }

  function openSetup(mode) {
    els.mode.value = mode === "exam" ? "exam" : "practice";
    els.topic.value = mode === "missed" ? "missed" : "all";
    els.setupTitle.textContent = mode === "exam" ? t("examSimulation") : mode === "missed" ? t("reviewMissed") : t("setupTitle");
    populateCounts();
    showScreen("setup");
  }

  function buildDeck() {
    const pool = filteredQuestions();
    const questionOrder = orderQuestionsForSession(pool);
    const count = Math.min(Number(els.count.value), questionOrder.length);
    return questionOrder.slice(0, count).map((question) => ({
      id: question.id,
      answerOrder: els.shuffle.value === "none" ? question.en.answers.map((answer) => answer.id) : shuffle(question.en.answers.map((answer) => answer.id))
    }));
  }

  function startSession() {
    if (!hasFullAccess()) {
      setAccountStatus(t("paidRequired"));
      showScreen("pricing");
      return;
    }
    const deck = buildDeck();
    if (!deck.length) {
      renderMessage(els.sessionSummary, t("noQuestions"));
      return;
    }
    session = {
      mode: els.mode.value,
      deck,
      index: 0,
      answers: {},
      startedAt: Date.now(),
      lastMissed: [],
      reviewingMissed: els.topic.value === "missed"
    };
    saveJson(SESSION_KEY, session);
    showScreen("quiz");
    renderQuestion();
  }

  function startTrialSession() {
    const deck = shuffle(questionBank).slice(0, 10).map((question) => ({
      id: question.id,
      answerOrder: shuffle(question.en.answers.map((answer) => answer.id))
    }));
    session = {
      mode: "trial",
      deck,
      index: 0,
      answers: {},
      startedAt: Date.now(),
      lastMissed: [],
      reviewingMissed: false
    };
    saveJson(SESSION_KEY, session);
    showScreen("quiz");
    renderQuestion();
  }

  function resumeSession() {
    session = loadJson(SESSION_KEY, null);
    if (!session?.deck?.length) return;
    showScreen("quiz");
    renderQuestion();
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    session = null;
    renderSessionSummary();
  }

  function renderSessionSummary() {
    const saved = loadJson(SESSION_KEY, null);
    if (!saved?.deck?.length) {
      renderMessage(els.sessionSummary, t("noSession"));
      els.resume.disabled = true;
      return;
    }
    els.resume.disabled = false;
    renderMessage(els.sessionSummary, `${t("sessionSaved")}: ${saved.index + 1}/${saved.deck.length} · ${saved.mode}`);
  }

  function renderMessage(node, message) {
    node.classList.add("visible");
    node.textContent = message;
  }

  function renderQuestion() {
    const deckItem = session.deck[session.index];
    const question = qById(deckItem.id);
    const answerState = session.answers[question.id] || {};
    const selectedId = answerState.selectedAnswerId || "";
    const checked = Boolean(answerState.checked);
    const copy = question[prefs.language];
    const elapsed = Math.max(0, Math.floor((Date.now() - session.startedAt) / 1000));
    const minutes = Math.floor(elapsed / 60);
    const seconds = String(elapsed % 60).padStart(2, "0");

    els.questionCounter.textContent = `${t("question")} ${session.index + 1} ${t("of")} ${session.deck.length}`;
    els.timer.textContent = `${minutes}:${seconds}`;
    els.questionTopic.textContent = topicLabel(question.topic);
    els.questionProgress.style.width = `${((session.index + 1) / session.deck.length) * 100}%`;
    const difficulty = questionDifficulty(question);
    els.questionSource.innerHTML = `
      <span>${escapeHtml(t("simulator"))} ${escapeHtml(question.simulator)} · ${escapeHtml(question.id.toUpperCase())}${session.reviewingMissed ? ` · ${escapeHtml(t("reviewingMissed"))}` : ""}</span>
      <span class="difficulty-badge ${difficulty.level}">${escapeHtml(difficulty.label)}</span>
    `;
    els.questionText.textContent = copy.question;

    els.answers.innerHTML = "";
    deckItem.answerOrder.forEach((answerId) => {
      const answer = copy.answers.find((item) => item.id === answerId);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.textContent = answer.text;
      button.setAttribute("aria-pressed", String(selectedId === answer.id));
      if (selectedId === answer.id) button.classList.add("selected");
      if (checked && answer.id === question.correctAnswerId && !isTrialSession()) button.classList.add("correct");
      if (checked && isTrialSession() && selectedId === answer.id && answer.id === question.correctAnswerId) button.classList.add("correct");
      if (checked && selectedId === answer.id && answer.id !== question.correctAnswerId) button.classList.add("wrong");
      button.addEventListener("click", () => selectAnswer(question.id, answer.id));
      els.answers.appendChild(button);
    });

    renderFeedback(question, selectedId, checked);
    els.previous.disabled = session.index === 0;
    els.flag.textContent = progress.flagged[question.id] ? t("unflag") : t("flag");
    if (session.mode === "exam") {
      els.check.textContent = session.index === session.deck.length - 1 ? t("finish") : t("next");
    } else {
      els.check.textContent = checked ? t("next") : t("check");
    }
    saveJson(SESSION_KEY, session);
  }

  function renderFeedback(question, selectedId, checked) {
    els.feedback.className = "feedback hidden";
    els.feedback.innerHTML = "";
    if (!checked || session.mode === "exam") return;

    const isCorrect = selectedId === question.correctAnswerId;
    if (isTrialSession()) {
      els.feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
      const title = document.createElement("strong");
      const message = document.createElement("p");
      message.className = "feedback-detail";
      title.textContent = isCorrect ? t("correct") : t("notQuite");
      message.textContent = isCorrect ? t("trialCorrect") : t("trialIncorrect");
      els.feedback.append(title, message);
      return;
    }

    els.feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;

    const title = document.createElement("strong");
    title.textContent = isCorrect ? t("correct") : t("incorrect");
    els.feedback.appendChild(title);
    const lesson = buildInstructorExplanation(question);
    if (!isCorrect && repeatedConceptMisses(question) >= 2) {
      els.feedback.appendChild(repeatMissPrompt(question));
    }
    els.feedback.append(
      explanationDetails(t("whyCorrect"), lesson.whyCorrect, true),
      explanationDetails(t("whyOthersWrong"), lesson.whyOthersWrong, false, "list"),
      explanationDetails(t("examTip"), lesson.examTip, false)
    );
    if (lesson.memoryTrick) els.feedback.appendChild(explanationDetails(t("memoryTrick"), lesson.memoryTrick, false));
    if (lesson.example) els.feedback.appendChild(explanationDetails(t("realWorldExample"), lesson.example, false));
    els.feedback.appendChild(relatedQuestionsBlock(question));
  }

  function explanationDetails(label, value, open = false, kind = "text") {
    const details = document.createElement("details");
    details.className = "explanation-section";
    details.open = open;
    const summary = document.createElement("summary");
    summary.textContent = label;
    const body = document.createElement("div");
    body.className = "explanation-body";
    if (kind === "list") {
      const list = document.createElement("ul");
      value.forEach((line) => {
        const item = document.createElement("li");
        item.textContent = line;
        list.appendChild(item);
      });
      body.appendChild(list);
    } else {
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      body.appendChild(paragraph);
    }
    details.append(summary, body);
    return details;
  }

  function buildInstructorExplanation(question) {
    const answers = question[prefs.language].answers;
    const correct = answers.find((answer) => answer.id === question.correctAnswerId);
    const concept = conceptLesson(question, correct?.text || "");
    const whyCorrect = instructorWhyCorrect(question, concept);
    const whyOthersWrong = answers
      .filter((answer) => answer.id !== question.correctAnswerId)
      .map((answer) => distractorExplanation(question, answer, concept));
    return {
      whyCorrect,
      whyOthersWrong,
      examTip: instructorExamTip(question, concept, correct?.text || ""),
      memoryTrick: instructorMemoryTrick(question, concept, correct?.text || ""),
      example: instructorExample(question, concept)
    };
  }

  function cleanInstructorText(value) {
    return String(value || "")
      .replace(/\bThe correct answer is\b/gi, "This concept is")
      .replace(/\bThe correct answer says\b/gi, "This choice describes")
      .replace(/\bThe key clue points to\b/gi, "The question is testing")
      .replace(/\bUnder the rule tested for the Texas insurance license,?\s*/gi, "")
      .replace(/\bOn the exam,?\s*/gi, "")
      .replace(/\bSegún la regla que se prueba para la licencia de seguros de Texas,?\s*/gi, "")
      .replace(/\bLa respuesta correcta es\b/gi, "La idea correcta es")
      .replace(/\bLa respuesta correcta dice\b/gi, "Esta opción describe")
      .replace(/\bLa pista correcta es\b/gi, "La pregunta evalúa")
      .replace(/\s+/g, " ")
      .trim();
  }

  function instructorWhyCorrect(question, concept) {
    const raw = [concept.plain, concept.correct].filter(Boolean).map(cleanInstructorText).join(" ");
    if (raw.length > 80) return raw;
    const stored = cleanInstructorText(question[prefs.language].explanation || "");
    if (stored.length > 70) return stored;
    const topic = topicLabel(question.topic);
    if (prefs.language === "es") {
      return `Este concepto pertenece a ${topic}. La pregunta evalúa si puedes conectar la situación con la función real de la póliza, contrato o regla. En seguro de vida, no basta memorizar una palabra: hay que identificar qué derecho, riesgo, beneficio o plazo está funcionando en el escenario.`;
    }
    return `This concept belongs to ${topic}. The question is asking you to connect the situation to the real function of the policy, contract, or rule. In life insurance, the right choice usually comes from identifying which right, risk, benefit, or time limit is operating in the scenario.`;
  }

  function distractorExplanation(question, answer, concept) {
    const textValue = answer.text;
    const lower = textValue.toLowerCase();
    const spanish = prefs.language === "es";
    const bank = spanish ? DISTRACTOR_EXPLANATIONS.es : DISTRACTOR_EXPLANATIONS.en;
    const found = bank.find((item) => item.match.test(lower));
    if (found) return `${textValue}: ${found.text}`;
    if (concept.wrong) return `${textValue}: ${cleanInstructorText(concept.wrong)}`;
    if (spanish) {
      return `${textValue}: describe otra idea de seguro y no resuelve la situación específica planteada.`;
    }
    return `${textValue}: describes a different insurance idea and does not solve the specific situation being asked.`;
  }

  const DISTRACTOR_EXPLANATIONS = {
    en: [
      { match: /mutual/, text: "mutual insurers are owned by policyholders and commonly issue participating policies." },
      { match: /stock/, text: "stock insurers are owned by shareholders, so policyholders are not the owners." },
      { match: /fraternal/, text: "fraternal insurers provide coverage through a lodge or membership system." },
      { match: /reciprocal/, text: "reciprocal insurers exchange insurance among subscribers through an attorney-in-fact." },
      { match: /adhesion/, text: "adhesion means the insurer writes the contract and ambiguities favor the insured." },
      { match: /aleatory/, text: "aleatory means the exchange of value can be unequal because a small premium may create a large benefit." },
      { match: /unilateral/, text: "unilateral means only the insurer makes an enforceable promise after premiums are paid." },
      { match: /conditional/, text: "conditional means policy benefits depend on policy conditions being met." },
      { match: /extended term/, text: "extended term keeps the same face amount only for the time the cash value can buy." },
      { match: /reduced paid-up/, text: "reduced paid-up keeps permanent coverage but lowers the face amount." },
      { match: /cash surrender/, text: "cash surrender ends the policy and pays the available cash value." },
      { match: /\bapl\b|automatic premium loan/, text: "automatic premium loan uses policy value to pay a premium; it is not a nonforfeiture payout choice." },
      { match: /option a|level/, text: "Universal Life Option A is a level death benefit." },
      { match: /option b|increasing/, text: "Universal Life Option B is an increasing death benefit equal to face amount plus cash value." },
      { match: /indexed/, text: "indexed describes how interest may be credited, not the death-benefit option." },
      { match: /single-premium/, text: "single-premium describes how the policy is funded, not the tested benefit design." }
    ],
    es: [
      { match: /mutua|mutual/, text: "las aseguradoras mutuas pertenecen a los asegurados y suelen emitir pólizas participantes." },
      { match: /stock|acciones|accionistas/, text: "las aseguradoras stock pertenecen a accionistas, no a los asegurados." },
      { match: /fraternal/, text: "las aseguradoras fraternales funcionan mediante un sistema de logia o membresía." },
      { match: /recíproca|reciprocal/, text: "las recíprocas intercambian seguro entre suscriptores mediante un attorney-in-fact." },
      { match: /adhesión|adhesion/, text: "adhesión significa que la aseguradora redacta el contrato y las ambigüedades favorecen al asegurado." },
      { match: /aleatorio|aleatory/, text: "aleatorio significa que el intercambio de valores puede ser desigual." },
      { match: /unilateral/, text: "unilateral significa que solo la aseguradora tiene una promesa exigible después de pagar primas." },
      { match: /condicional|conditional/, text: "condicional significa que los beneficios dependen de cumplir las condiciones de la póliza." },
      { match: /término extendido|extended term/, text: "término extendido mantiene la misma suma asegurada solo por el tiempo que compra el valor en efectivo." },
      { match: /saldado reducido|reduced paid-up/, text: "saldado reducido mantiene cobertura permanente, pero reduce la suma asegurada." },
      { match: /rescate|cash surrender/, text: "rescate en efectivo termina la póliza y entrega el valor en efectivo disponible." },
      { match: /\bapl\b|préstamo automático/, text: "el préstamo automático de prima usa valor de póliza para pagar una prima; no es una opción de pago de no confiscación." },
      { match: /opción a|option a|nivelada/, text: "Universal Life Opción A es un beneficio por muerte nivelado." },
      { match: /opción b|option b|creciente/, text: "Universal Life Opción B es un beneficio creciente igual a suma asegurada más valor en efectivo." },
      { match: /indexada|indexed/, text: "indexada describe cómo se puede acreditar interés, no la opción de beneficio por muerte." },
      { match: /prima única|single-premium/, text: "prima única describe cómo se financia la póliza, no el diseño del beneficio." }
    ]
  };

  function instructorExamTip(question, concept, correctText) {
    if (concept.rule) return cleanInstructorText(concept.rule);
    const source = `${question.en.question} ${question.en.explanation} ${correctText}`.toLowerCase();
    if (/stock/.test(source)) return prefs.language === "es" ? "Accionistas = compañía stock." : "Shareholders = Stock Company.";
    if (/mutual/.test(source)) return prefs.language === "es" ? "Asegurados = compañía mutua." : "Policyholders = Mutual Company.";
    if (/substandard/.test(source)) return prefs.language === "es" ? "Substandard = aceptado con prima más alta." : "Substandard = accepted with a higher premium.";
    if (/free-look|free look/.test(source)) return prefs.language === "es" ? "Free-look = periodo de reembolso." : "Free-look = refund period.";
    return prefs.language === "es" ? "Define el término antes de escoger la opción." : "Define the term before choosing the option.";
  }

  function instructorMemoryTrick(question, concept, correctText) {
    const source = `${question.en.question} ${question.en.explanation} ${correctText}`.toLowerCase();
    if (/stock/.test(source)) return prefs.language === "es" ? "Stockholders own Stock companies." : "Stockholders own Stock companies.";
    if (/mutual/.test(source)) return prefs.language === "es" ? "Mutual empieza como miembros: los asegurados son dueños." : "Mutual starts with members: policyholders own it.";
    if (/spia|single-premium immediate/.test(source)) return prefs.language === "es" ? "SPIA: Single Payment, Income ASAP." : "SPIA: Single Payment, Income ASAP.";
    if (/extended term/.test(source)) return prefs.language === "es" ? "Extendido = extiende tiempo, no reduce la suma." : "Extended term extends time, not the face amount.";
    if (/option b|face amount plus/.test(source)) return prefs.language === "es" ? "B = Bigger benefit: suma asegurada + valor en efectivo." : "B = Bigger benefit: face amount + cash value.";
    return "";
  }

  function instructorExample(question, concept) {
    const source = `${question.en.question} ${question.en.explanation}`.toLowerCase();
    if (/substandard/.test(source)) {
      return prefs.language === "es"
        ? "Si la salud del solicitante es mala pero la aseguradora aún lo acepta con una prima más alta, es un riesgo substandard."
        : "If an applicant has poor health but the insurer still accepts them with a higher premium, they are a substandard risk.";
    }
    if (/annuity|anualidad|spia/.test(source)) {
      return prefs.language === "es"
        ? "Si alguien entrega una suma grande y empieza a recibir pagos mensuales pronto, está usando la anualidad para crear ingreso."
        : "If someone pays one large amount and soon starts receiving monthly payments, the annuity is being used to create income.";
    }
    if (/incidents of ownership/.test(source)) {
      return prefs.language === "es"
        ? "Si el asegurado todavía podía cambiar beneficiarios o pedir préstamos al morir, conservaba control sobre la póliza."
        : "If the insured could still change beneficiaries or borrow from the policy at death, they kept control over the policy.";
    }
    return cleanInstructorText(concept.example || "");
  }

  function relatedQuestionsBlock(question) {
    const related = questionBank
      .filter((item) => item.id !== question.id && item.topic === question.topic)
      .slice(0, 5);
    const section = document.createElement("section");
    section.className = "related-questions";
    const title = document.createElement("h4");
    title.textContent = t("similarQuestions");
    section.appendChild(title);
    if (!related.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = t("noQuestions");
      section.appendChild(empty);
      return section;
    }
    const list = document.createElement("div");
    list.className = "related-question-list";
    related.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "related-question";
      button.dataset.relatedId = item.id;
      button.innerHTML = `<span>${escapeHtml(item.id.toUpperCase())}</span><strong>${escapeHtml(item[prefs.language].question)}</strong>`;
      list.appendChild(button);
    });
    const action = document.createElement("button");
    action.type = "button";
    action.className = "button primary compact";
    action.textContent = t("practiceSimilarQuestions");
    action.addEventListener("click", () => startRelatedQuestionSession(question, related.map((item) => item.id)));
    list.querySelectorAll("[data-related-id]").forEach((button) => {
      button.addEventListener("click", () => startRelatedQuestionSession(question, [button.dataset.relatedId, ...related.map((item) => item.id)]));
    });
    section.append(list, action);
    return section;
  }

  function startRelatedQuestionSession(question, preferredIds = []) {
    const ids = [...new Set(preferredIds)]
      .filter((id) => id && id !== question.id && qById(id))
      .slice(0, 5);
    const fallback = questionBank
      .filter((item) => item.id !== question.id && item.topic === question.topic && !ids.includes(item.id))
      .slice(0, 5 - ids.length)
      .map((item) => item.id);
    const deck = [...ids, ...fallback].map((id) => {
      const item = qById(id);
      return { id, answerOrder: shuffle(item.en.answers.map((answer) => answer.id)) };
    });
    if (!deck.length) return;
    session = {
      mode: "practice",
      deck,
      index: 0,
      answers: {},
      startedAt: Date.now(),
      lastMissed: [],
      reviewingMissed: false
    };
    saveJson(SESSION_KEY, session);
    showScreen("quiz");
    renderQuestion();
  }

  function repeatMissPrompt(question) {
    const box = document.createElement("section");
    box.className = "repeat-miss-prompt";
    box.innerHTML = `
      <strong>⚠️ ${escapeHtml(t("repeatMissTitle"))}</strong>
      <p>${escapeHtml(repeatMissMessage(question))}</p>
      <div class="actions">
        <button class="button primary compact" type="button" data-action="review">${escapeHtml(t("reviewConcept"))}</button>
        <button class="button quiet compact" type="button" data-action="continue">${escapeHtml(t("continueExam"))}</button>
      </div>
    `;
    box.querySelector("[data-action='review']")?.addEventListener("click", () => {
      const mappedChapter = chapterForTopic(question.topic);
      if (mappedChapter && els.studyChapterSelect) els.studyChapterSelect.value = String(mappedChapter);
      showScreen("study");
      renderStudy();
    });
    box.querySelector("[data-action='continue']")?.addEventListener("click", () => box.remove());
    return box;
  }

  function repeatMissMessage(question) {
    const label = conceptLabel(question);
    if (prefs.language === "es") {
      return `Has fallado preguntas sobre ${label} varias veces. ${t("repeatMissBody")}`;
    }
    return `You have missed questions about ${label} multiple times. ${t("repeatMissBody")}`;
  }

  function questionConceptKey(question) {
    const source = `${question.en.question} ${question.en.explanation} ${question.en.answers.map((answer) => answer.text).join(" ")}`.toLowerCase();
    const patterns = [
      ["stock-mutual", /stock|mutual|participating|non-participating/],
      ["ul-option-ab", /option a|option b|face amount plus|universal life/],
      ["aleatory", /aleatory|unequal values/],
      ["extended-term", /extended term|nonforfeiture|same face amount/],
      ["insurable-interest", /insurable interest/],
      ["estate-incidents", /incidents of ownership|estate/],
      ["annuity-tax", /lifo|nonqualified annuity|withdrawal/],
      ["spia", /single-premium immediate|spia/],
      ["texas-rules", /texas|tlhiga|commissioner|license|free-look|free look/]
    ];
    return patterns.find(([, match]) => match.test(source))?.[0] || `topic-${question.topic}`;
  }

  function conceptLabel(question) {
    const labels = {
      en: {
        "stock-mutual": "Stock vs Mutual insurers",
        "ul-option-ab": "Universal Life Option A vs Option B",
        aleatory: "Aleatory contracts",
        "extended-term": "Extended term nonforfeiture",
        "insurable-interest": "Insurable interest",
        "estate-incidents": "Incidents of ownership",
        "annuity-tax": "annuity taxation",
        spia: "single-premium immediate annuities",
        "texas-rules": "Texas insurance rules"
      },
      es: {
        "stock-mutual": "aseguradoras stock vs mutuas",
        "ul-option-ab": "Universal Life Opción A vs Opción B",
        aleatory: "contratos aleatorios",
        "extended-term": "término extendido de no confiscación",
        "insurable-interest": "interés asegurable",
        "estate-incidents": "incidents of ownership",
        "annuity-tax": "impuestos de anualidades",
        spia: "anualidades inmediatas de prima única",
        "texas-rules": "reglas de seguros de Texas"
      }
    };
    const key = questionConceptKey(question);
    return labels[prefs.language]?.[key] || topicLabel(question.topic);
  }

  function repeatedConceptMisses(question) {
    const key = questionConceptKey(question);
    return questionBank.reduce((count, item) => {
      if (questionConceptKey(item) !== key) return count;
      return count + (Number(progress.answers?.[item.id]?.wrong) || 0);
    }, 0);
  }

  function questionDifficulty(question) {
    const explicit = String(question.difficulty || "").toLowerCase();
    const source = `${question.en.question} ${question.en.explanation}`.toLowerCase();
    let level = explicit.includes("easy") ? "easy" : explicit.includes("chall") || explicit.includes("hard") ? "challenging" : explicit.includes("moder") ? "moderate" : "";
    if (!level) {
      if (/estate|incidents of ownership|tax|lifo|mec|replacement|tlhiga|commissioner|universal life|nonforfeiture|aleatory/.test(source)) level = "challenging";
      else if (Number(question.simulator || 0) >= 4) level = "moderate";
      else level = "easy";
    }
    return { level, label: t(level) };
  }

  function conceptLesson(question, correctText) {
    const source = `${question.en.question} ${question.en.explanation} ${correctText}`.toLowerCase();
    const spanish = prefs.language === "es";
    const lessons = [
      {
        match: /single-premium immediate annuity|spia/,
        en: {
          notice: "The key words are single-premium and immediate.",
          plain: "Single-premium means the owner pays one lump sum. Immediate means income payments start soon, usually within about one year.",
          correct: "Payments begin within about one year and there is no accumulation phase. That matches an immediate annuity exactly.",
          wrong: "The wrong choices describe other ideas: flexible payments, variable-only products, or long accumulation. A SPIA is not built that way. It is funded once, then it starts paying.",
          rule: "SPIA = one payment in, income starts soon."
        },
        es: {
          notice: "Las palabras clave son prima única e inmediata.",
          plain: "Prima única significa que el dueño paga una sola suma grande. Inmediata significa que los pagos de ingreso empiezan pronto, normalmente dentro de aproximadamente un año.",
          correct: "Empieza a pagar dentro de aproximadamente un año y no tiene fase de acumulación. Eso describe exactamente una anualidad inmediata.",
          wrong: "Las respuestas incorrectas describen otras ideas: pagos flexibles, productos solo variables o una acumulación larga. Una SPIA no funciona así. Se paga una vez y luego empieza a pagar ingresos.",
          rule: "SPIA = un pago entra, el ingreso empieza pronto."
        }
      },
      {
        match: /best interest|suitability|liquidity|surrender charge/,
        en: {
          notice: "Look for the client's need first: age, liquidity, risk tolerance, and time horizon.",
          plain: "Best interest means the recommendation must fit the client, not just the product features or the commission.",
          correct: "The recommendation protects the client's stated need. If the client needs money soon, a product with long surrender charges is usually a bad fit.",
          wrong: "Your answer focuses on one feature, but suitability is about the whole client situation. A good feature does not fix a product that blocks money the client needs.",
          rule: "Client need first, product second."
        },
        es: {
          notice: "Primero mira la necesidad del cliente: edad, liquidez, tolerancia al riesgo y plazo.",
          plain: "Mejor interés significa que la recomendación debe encajar con el cliente, no solo con las características del producto o la comisión.",
          correct: "La recomendación protege la necesidad declarada del cliente. Si el cliente necesita dinero pronto, un producto con cargos de rescate largos normalmente no encaja.",
          wrong: "Tu respuesta se enfoca en una característica, pero la idoneidad mira la situación completa del cliente. Una característica buena no arregla un producto que bloquea el dinero que el cliente necesita.",
          rule: "Primero la necesidad del cliente, después el producto."
        }
      },
      {
        match: /lifo|fifo|nonqualified annuity|withdrawal|annuity withdrawals/,
        en: {
          notice: "Watch whether the annuity is nonqualified and whether the question says withdrawal instead of annuitized payment.",
          plain: "For a nonqualified annuity withdrawal, the IRS treats earnings as coming out first.",
          correct: "LIFO means last in, first out. The gain comes out first, so it is taxable first.",
          wrong: "Your answer treats the owner's basis as coming out first or treats the money as tax-free. That is not how nonqualified annuity withdrawals are tested.",
          rule: "Nonqualified annuity withdrawal = gain first = taxable first."
        },
        es: {
          notice: "Fíjate si la anualidad es no calificada y si la pregunta dice retiro en vez de pago anualizado.",
          plain: "En un retiro de anualidad no calificada, el IRS trata la ganancia como si saliera primero.",
          correct: "LIFO significa que lo último que entró sale primero. La ganancia sale primero, así que se grava primero.",
          wrong: "Tu respuesta trata la base del dueño como si saliera primero o como si el dinero fuera libre de impuesto. Así no se prueban los retiros de anualidades no calificadas.",
          rule: "Retiro de anualidad no calificada = ganancia primero = impuesto primero."
        }
      },
      {
        match: /required minimum distribution|rmd|traditional ira/,
        en: {
          notice: "The key is the account type and the required beginning age.",
          plain: "Traditional IRA money was usually tax-deferred, so the IRS eventually forces minimum withdrawals.",
          correct: "The age given is the current general RMD start age for a traditional IRA.",
          wrong: "Your answer is either an old rule, a penalty-free withdrawal age, or a retirement age. Those are different rules.",
          rule: "Traditional IRA RMDs currently start at 73 for this exam rule."
        },
        es: {
          notice: "La clave es el tipo de cuenta y la edad en que deben empezar las distribuciones.",
          plain: "El dinero de una IRA tradicional normalmente fue diferido de impuestos, por eso el IRS eventualmente exige retiros mínimos.",
          correct: "La edad indicada es la edad general vigente para empezar RMD en una IRA tradicional.",
          wrong: "Tu respuesta puede ser una regla vieja, una edad para retirar sin penalidad o una edad de retiro. Son reglas distintas.",
          rule: "RMD de IRA tradicional empieza generalmente a los 73 bajo esta regla de examen."
        }
      },
      {
        match: /insurable interest/,
        en: {
          notice: "Ask when insurable interest must exist.",
          plain: "For life insurance, insurable interest is checked when the policy starts. It does not have to be proven again at death.",
          correct: "Application or policy issue is the required timing for life insurance.",
          wrong: "Your answer adds another timing requirement that belongs more to property insurance thinking, not life insurance.",
          rule: "Life insurance insurable interest = required at the beginning."
        },
        es: {
          notice: "Pregunta cuándo debe existir el interés asegurable.",
          plain: "En seguro de vida, el interés asegurable se revisa cuando empieza la póliza. No tiene que probarse otra vez al morir.",
          correct: "Solicitud o emisión de la póliza es el momento requerido en seguro de vida.",
          wrong: "Tu respuesta agrega otro momento que se parece más a la lógica de seguros de propiedad, no de vida.",
          rule: "Interés asegurable en vida = se exige al inicio."
        }
      },
      {
        match: /incidents of ownership|estate if the insured|included in the estate/,
        en: {
          notice: "Separate income tax from estate tax.",
          plain: "A life insurance death benefit paid in a lump sum is usually income-tax-free to the beneficiary. But estate tax asks a different question: did the insured still control the policy at death?",
          correct: "If the insured had incidents of ownership, the death benefit can be included in the insured's estate. Incidents of ownership means control rights like changing the beneficiary, borrowing against the policy, surrendering it, assigning it, or controlling policy benefits.",
          wrong: "The other choices do not prove control of the policy. Being under 65, living in Texas, or paying premiums does not automatically mean the insured owned or controlled the policy at death.",
          rule: "Income tax asks who receives money. Estate tax asks who controlled the policy."
        },
        es: {
          notice: "Separa income tax de estate tax.",
          plain: "Un beneficio por muerte pagado en suma global normalmente no paga income tax para el beneficiario. Pero estate tax hace otra pregunta: ¿el asegurado todavía controlaba la póliza al morir?",
          correct: "Si el asegurado tenía incidents of ownership, el beneficio puede entrar al patrimonio del asegurado. Eso significa derechos de control como cambiar beneficiario, pedir préstamo, rescatar la póliza, cederla o controlar beneficios.",
          wrong: "Las otras opciones no prueban control de la póliza. Tener menos de 65, vivir en Texas o pagar primas no significa automáticamente que el asegurado controlaba la póliza al morir.",
          rule: "Income tax pregunta quién recibe dinero. Estate tax pregunta quién controlaba la póliza."
        }
      },
      {
        match: /unequal values|aleatory|exchange of unequal/,
        en: {
          notice: "The exam clue is unequal values.",
          plain: "An aleatory insurance contract does not trade equal dollars for equal dollars. The policyowner may pay a small premium, but the insurer may have to pay a much larger benefit if the covered event happens.",
          correct: "That unequal exchange is called aleatory. It is a contract characteristic, not a policy type.",
          wrong: "Do not translate this idea as variable. Variable life is a separate product tied to investment performance. Aleatory means unequal values and uncertainty in the exchange.",
          rule: "Aleatory = unequal values. Variable = investment-linked product."
        },
        es: {
          notice: "La pista del examen es valores desiguales.",
          plain: "Un contrato aleatorio de seguro no intercambia dólares iguales por dólares iguales. El dueño puede pagar una prima pequeña, pero la aseguradora podría pagar un beneficio mucho mayor si ocurre el evento cubierto.",
          correct: "Ese intercambio desigual se llama aleatorio. Es una característica del contrato, no un tipo de póliza.",
          wrong: "No traduzcas esta idea como variable. Vida variable es un producto distinto ligado a inversiones. Aleatorio significa valores desiguales e incertidumbre en el intercambio.",
          rule: "Aleatorio = valores desiguales. Variable = producto ligado a inversiones."
        }
      },
      {
        match: /option b|face amount plus the cash value|face amount \\+ cash value|death benefit grows|increasing death benefit/,
        en: {
          notice: "For Universal Life, compare Option A and Option B.",
          plain: "Universal Life has two common death benefit designs. Option A is level: the total death benefit stays about the same. Option B is increasing: it pays the face amount plus the cash value.",
          correct: "If the question says face amount plus cash value, or says the death benefit grows with cash value, it is pointing to the increasing death benefit, Option B.",
          wrong: "Indexed describes how interest is credited, and single-premium describes how the policy is paid. Those do not answer how the Universal Life death benefit is calculated.",
          rule: "UL Option A = level. UL Option B = face amount plus cash value."
        },
        es: {
          notice: "En Universal Life, compara Opción A y Opción B.",
          plain: "Universal Life tiene dos diseños comunes de beneficio por muerte. Opción A es nivelada: el beneficio total se mantiene casi igual. Opción B es creciente: paga la suma asegurada más el valor en efectivo.",
          correct: "Si la pregunta dice suma asegurada más valor en efectivo, o dice que el beneficio crece con el cash value, apunta al beneficio creciente: Opción B.",
          wrong: "Indexada describe cómo se acredita interés, y prima única describe cómo se paga la póliza. Eso no contesta cómo se calcula el beneficio por muerte de Universal Life.",
          rule: "UL Opción A = nivelada. UL Opción B = suma asegurada más cash value."
        }
      },
      {
        match: /extended term|nonforfeiture|same face amount|stops paying|cash value allows/,
        en: {
          notice: "Look at what happens to the face amount and the length of coverage.",
          plain: "Nonforfeiture options protect the policyowner from losing all value when a permanent policy lapses. Extended term uses the cash value to buy term insurance.",
          correct: "Extended term keeps the same face amount, but only for as long as the cash value can buy. That is why the clue says same face amount for a limited time.",
          wrong: "Reduced paid-up keeps lifetime coverage but lowers the face amount. Cash surrender ends the policy for cash. Automatic premium loan pays a premium by loan; it is not the same as the automatic nonforfeiture option.",
          rule: "Extended term = same face amount, shorter time."
        },
        es: {
          notice: "Mira qué pasa con la suma asegurada y con la duración de la cobertura.",
          plain: "Las opciones de no confiscación protegen al dueño para que no pierda todo el valor cuando una póliza permanente caduca. Término extendido usa el cash value para comprar seguro temporal.",
          correct: "Término extendido mantiene la misma suma asegurada, pero solo por el tiempo que el valor en efectivo pueda comprar. Por eso la pista dice misma suma por tiempo limitado.",
          wrong: "Seguro saldado reducido mantiene cobertura de por vida pero baja la suma asegurada. Rescate en efectivo termina la póliza por dinero. Préstamo automático de prima paga una prima con préstamo; no es lo mismo que la opción automática de no confiscación.",
          rule: "Término extendido = misma suma, menos tiempo."
        }
      },
      {
        match: /guaranty association|tlhiga/,
        en: {
          notice: "This is asking for a Texas guaranty association dollar limit.",
          plain: "The guaranty association is a safety net if an insurer fails, but it only protects up to set limits.",
          correct: "The amount tested here is the death benefit limit for life insurance.",
          wrong: "Your answer is likely a different benefit limit. The exam expects you to match the limit to the type of benefit.",
          rule: "TLHIGA life death benefit limit = $300,000."
        },
        es: {
          notice: "La pregunta pide un límite en dólares de la asociación de garantía de Texas.",
          plain: "La asociación de garantía funciona como protección si una aseguradora falla, pero solo protege hasta ciertos límites.",
          correct: "La cantidad evaluada aquí es el límite para beneficio por muerte en seguro de vida.",
          wrong: "Tu respuesta probablemente corresponde a otro tipo de límite. El examen espera que conectes el límite con el tipo de beneficio.",
          rule: "Límite TLHIGA para beneficio por muerte de vida = $300,000."
        }
      },
      {
        match: /churning|twisting|rebating|sliding|commingling/,
        en: {
          notice: "This is an ethics vocabulary question. Small wording differences matter.",
          plain: "The question describes a prohibited sales behavior. Match the behavior to the exact term.",
          correct: "The term names the specific unfair practice described in the question.",
          wrong: "Your answer is a different unfair practice. These terms are close, but each one describes a different bad action.",
          rule: "Define the behavior first, then pick the term."
        },
        es: {
          notice: "Esta es una pregunta de vocabulario ético. Las diferencias pequeñas importan.",
          plain: "La pregunta describe una práctica de venta prohibida. Debes conectar la conducta con el término exacto.",
          correct: "El término nombra la práctica injusta específica descrita en la pregunta.",
          wrong: "Tu respuesta es otra práctica injusta distinta. Estos términos se parecen, pero cada uno describe una mala conducta diferente.",
          rule: "Primero define la conducta, luego escoge el término."
        }
      },
      {
        match: /waiver of premium|disability/,
        en: {
          notice: "Look for total disability and premium payments.",
          plain: "Waiver of premium means the policy can stay in force without the insured paying premiums after a qualifying disability.",
          correct: "This rider connects to disability, not death, loans, or beneficiary changes.",
          wrong: "Your answer points to a different policy feature. The disability clue should lead you to waiver of premium.",
          rule: "Disability clue = waiver of premium."
        },
        es: {
          notice: "Busca discapacidad total y pagos de prima.",
          plain: "Exención de prima significa que la póliza puede seguir activa sin que el asegurado pague primas después de una discapacidad que califica.",
          correct: "Esta cláusula adicional se conecta con discapacidad, no con muerte, préstamos o cambios de beneficiario.",
          wrong: "Tu respuesta apunta a otra característica de la póliza. La pista de discapacidad debe llevarte a exención de prima.",
          rule: "Pista de discapacidad = exención de prima."
        }
      }
    ];

    const match = lessons.find((lesson) => lesson.match.test(source));
    return match ? match[spanish ? "es" : "en"] : {};
  }

  function selectAnswer(questionId, answerId) {
    const current = session.answers[questionId];
    if (current?.checked && givesInstantFeedback()) return;
    session.answers[questionId] = { selectedAnswerId: answerId, checked: false };
    renderQuestion();
  }

  function checkOrNext() {
    const question = qById(session.deck[session.index].id);
    const current = session.answers[question.id];
    if (givesInstantFeedback() && !current?.checked) {
      if (!current?.selectedAnswerId) {
        renderMessage(els.feedback, t("chooseAnswer"));
        els.feedback.className = "feedback";
        return;
      }
      session.answers[question.id] = { ...current, checked: true };
      if (!isTrialSession()) recordAnswer(question, current.selectedAnswerId);
      renderQuestion();
      return;
    }

    if (session.mode === "exam" && current?.selectedAnswerId && !current.checked) {
      session.answers[question.id] = { ...current, checked: true };
    }

    if (session.index < session.deck.length - 1) {
      session.index += 1;
      renderQuestion();
    } else {
      finishSession();
    }
  }

  function recordAnswer(question, selectedAnswerId) {
    const existing = progress.answers[question.id] || { seen: 0, correct: 0, wrong: 0 };
    const isCorrect = selectedAnswerId === question.correctAnswerId;
    existing.seen += 1;
    if (isCorrect) {
      existing.correct += 1;
      delete progress.missed[question.id];
    } else {
      existing.wrong += 1;
      progress.missed[question.id] = true;
    }
    progress.answers[question.id] = existing;
    saveProgress();
  }

  function previousQuestion() {
    if (session.index > 0) {
      session.index -= 1;
      renderQuestion();
    }
  }

  function toggleFlag() {
    const question = qById(session.deck[session.index].id);
    if (progress.flagged[question.id]) {
      delete progress.flagged[question.id];
    } else {
      progress.flagged[question.id] = true;
    }
    saveProgress();
    renderQuestion();
    updateDashboard();
  }

  function finishSession() {
    const missed = [];
    let correct = 0;

    session.deck.forEach((deckItem) => {
      const question = qById(deckItem.id);
      const current = session.answers[question.id];
      const selected = current?.selectedAnswerId || "";
      if (session.mode === "exam" && selected) {
        recordAnswer(question, selected);
      }
      if (selected === question.correctAnswerId) {
        correct += 1;
      } else if (!isTrialSession()) {
        progress.missed[question.id] = true;
        missed.push(question.id);
      }
    });

    const total = session.deck.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    session.lastMissed = missed;
    if (!isTrialSession()) {
      progress.history.unshift({ date: new Date().toISOString(), mode: session.mode, language: prefs.language, correct, total, percent });
      progress.history = progress.history.slice(0, 20);
      saveProgress();
    }
    saveJson(SESSION_KEY, session);
    showScreen("results");
    renderResults();
  }

  function sessionScore() {
    let correct = 0;
    const missed = [];
    session.deck.forEach((deckItem) => {
      const question = qById(deckItem.id);
      const selected = session.answers[question.id]?.selectedAnswerId || "";
      if (selected === question.correctAnswerId) correct += 1;
      else missed.push(question);
    });
    return { correct, missed, total: session.deck.length, percent: session.deck.length ? Math.round((correct / session.deck.length) * 100) : 0 };
  }

  function renderResults() {
    const score = sessionScore();
    if (isTrialSession()) {
      renderTrialLockedResults();
      return;
    }
    document.getElementById("practiceAgainButton").textContent = t("practiceAgain");
    els.topicBreakdownTitle.textContent = t("topicBreakdown");
    els.scoreCircle.classList.remove("locked");
    els.scoreCircle.style.setProperty("--pct", String(score.percent));
    els.scorePercent.textContent = `${score.percent}%`;
    els.resultTitle.textContent = score.percent >= 84 ? t("strong") : score.percent >= 70 ? t("passing") : t("keepPracticing");
    els.resultSummary.textContent = `${t("youScored")}: ${score.correct} / ${score.total}`;
    els.reviewLastMissed.classList.toggle("hidden", score.missed.length === 0);
    renderTopicBreakdown();
  }

  function renderTrialLockedResults() {
    els.scoreCircle.style.setProperty("--pct", "100");
    els.scoreCircle.classList.add("locked");
    els.scorePercent.textContent = t("locked");
    els.resultTitle.textContent = t("trialLockedTitle");
    els.resultSummary.textContent = t("trialLockedSummary");
    els.reviewLastMissed.classList.add("hidden");
    els.topicBreakdownTitle.textContent = t("unlockResults");
    const practiceAgain = document.getElementById("practiceAgainButton");
    practiceAgain.textContent = t("viewPlans");
    els.topicBreakdown.innerHTML = "";
    const panel = document.createElement("div");
    panel.className = "pricing-grid";
    panel.innerHTML = `
      <article class="price-card">
        <strong>${t("weeklyPlan")}</strong>
        <p class="muted">${t("unlockResults")}</p>
        <button class="button primary compact plan-jump" type="button">${t("viewPlans")}</button>
      </article>
      <article class="price-card featured">
        <strong>${t("bundlePlan")}</strong>
        <p class="muted">${t("accountComingSoon")}</p>
        <button class="button primary compact plan-jump" type="button">${t("viewPlans")}</button>
      </article>
    `;
    els.topicBreakdown.appendChild(panel);
    panel.querySelectorAll(".plan-jump").forEach((button) => button.addEventListener("click", () => showScreen("pricing")));
  }

  function handlePracticeAgain() {
    if (isTrialSession()) {
      showScreen("pricing");
      return;
    }
    openSetup("practice");
  }

  function showPlaceholderStatus(messageKey = "accountPlaceholder") {
    setAccountStatus(t(messageKey));
    showScreen("account");
  }

  async function handleSignup(event) {
    event.preventDefault();
    if (!supabaseClient) {
      showPlaceholderStatus("authUnavailable");
      return;
    }
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    setAccountStatus(t("supabaseComing"));
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) {
      setAccountStatus(authErrorMessage(error));
      return;
    }
    authUser = data.user || authUser;
    setAccountStatus(t("signupSuccess"));
    updateAuthUi();
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (!supabaseClient) {
      showPlaceholderStatus("authUnavailable");
      return;
    }
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    setAccountStatus(t("loginComing"));
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      setAccountStatus(authErrorMessage(error));
      return;
    }
    authUser = data.user || null;
    setAccountStatus(t("loginSuccess"));
    updateAuthUi();
  }

  async function handleAuth(event) {
    event.preventDefault();
    if (!supabaseClient) {
      showPlaceholderStatus("authUnavailable");
      return;
    }
    const email = els.authEmail.value.trim();
    const password = els.authPassword.value;
    if (authMode === "signup") {
      setAccountStatus(t("supabaseComing"));
      const { data, error } = await supabaseClient.auth.signUp({ email, password });
      if (error) {
        setAccountStatus(authErrorMessage(error));
        return;
      }
      authUser = data.user || authUser;
      setAccountStatus(t("signupSuccess"));
      updateAuthUi();
      return;
    }

    setAccountStatus(t("loginComing"));
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      setAccountStatus(authErrorMessage(error));
      return;
    }
    authUser = data.user || null;
    setAccountStatus(t("loginSuccess"));
    updateAuthUi();
  }

  async function handleLogout() {
    if (!supabaseClient) {
      showPlaceholderStatus("authUnavailable");
      return;
    }
    await supabaseClient.auth.signOut();
    authUser = null;
    accessState = { status: "free", plan: "free", access_until: null };
    clearSession();
    loadStoredProgress();
    await loadQuestionBank();
    await loadFlashcardBank();
    refreshAfterProgressChange();
    setAccountStatus(t("logoutSuccess"));
    updateAuthUi();
  }

  async function startCheckout(plan) {
    if (!supabaseClient) {
      showPlaceholderStatus("authUnavailable");
      return;
    }
    const { data } = await supabaseClient.auth.getSession();
    const token = data.session?.access_token;
    if (!token) {
      setAccountStatus(t("mustLogin"));
      showScreen("account");
      return;
    }

    setAccountStatus(t("checkoutStarting"));
    try {
      const response = await fetch(CHECKOUT_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          plan,
          priceId: PRICE_IDS[plan],
          language: prefs.language
        })
      });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || "Missing checkout URL");
      window.location.href = payload.url;
    } catch (error) {
      setAccountStatus(`${t("checkoutError")} ${error.message || ""}`.trim());
      showScreen("account");
    }
  }

  function renderTopicBreakdown() {
    const byTopic = {};
    session.deck.forEach((deckItem) => {
      const question = qById(deckItem.id);
      byTopic[question.topic] ||= { correct: 0, total: 0 };
      byTopic[question.topic].total += 1;
      if (session.answers[question.id]?.selectedAnswerId === question.correctAnswerId) byTopic[question.topic].correct += 1;
    });

    els.topicBreakdown.innerHTML = "";
    Object.entries(byTopic).sort(([a], [b]) => a.localeCompare(b)).forEach(([topic, value]) => {
      const percent = Math.round((value.correct / value.total) * 100);
      const row = document.createElement("div");
      row.className = "topic-row";
      row.innerHTML = `<div class="topic-top"><span>${topicLabel(topic)}</span><span>${value.correct}/${value.total} · ${percent}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>`;
      els.topicBreakdown.appendChild(row);
    });
  }

  function reviewLastMissed() {
    const ids = session?.lastMissed || [];
    if (!ids.length) {
      showScreen("home");
      return;
    }
    session = {
      mode: "practice",
      deck: shuffle(ids).map((id) => {
        const question = qById(id);
        return { id, answerOrder: shuffle(question.en.answers.map((answer) => answer.id)) };
      }),
      index: 0,
      answers: {},
      startedAt: Date.now(),
      lastMissed: [],
      reviewingMissed: true
    };
    saveJson(SESSION_KEY, session);
    showScreen("quiz");
    renderQuestion();
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function totalAnswered() {
    return Object.values(progress.answers || {}).reduce((sum, record) => sum + (Number(record.seen) || 0), 0);
  }

  function topicStats() {
    const stats = {};
    questionBank.forEach((question) => {
      stats[question.topic] ||= { topic: question.topic, seen: 0, correct: 0, wrong: 0, missed: 0, total: 0 };
      stats[question.topic].total += 1;
      const record = progress.answers?.[question.id];
      if (record) {
        stats[question.topic].seen += Number(record.seen) || 0;
        stats[question.topic].correct += Number(record.correct) || 0;
        stats[question.topic].wrong += Number(record.wrong) || 0;
      }
      if (progress.missed?.[question.id]) stats[question.topic].missed += 1;
    });
    return Object.values(stats).map((item) => ({
      ...item,
      accuracy: item.seen ? Math.round((item.correct / item.seen) * 100) : 0,
      weakness: item.missed * 18 + item.wrong * 9 + (item.seen ? Math.max(0, 78 - Math.round((item.correct / item.seen) * 100)) : 8)
    }));
  }

  function studyStreak() {
    const days = new Set((progress.history || []).map((entry) => new Date(entry.date).toDateString()));
    if (!days.size) return 0;
    let streak = 0;
    const cursor = new Date();
    for (let index = 0; index < 30; index += 1) {
      if (days.has(cursor.toDateString())) streak += 1;
      else if (index > 0) break;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function recentAccuracy() {
    const recent = (progress.history || []).slice(0, 5);
    const total = recent.reduce((sum, entry) => sum + (Number(entry.total) || 0), 0);
    const correct = recent.reduce((sum, entry) => sum + (Number(entry.correct) || 0), 0);
    return total ? Math.round((correct / total) * 100) : null;
  }

  function examHistory() {
    return (progress.history || []).filter((entry) => entry.mode === "exam" && Number(entry.total) >= 25);
  }

  function weightedExamScore() {
    const exams = examHistory().slice(0, 3);
    if (!exams.length) return null;
    const weights = [3, 2, 1];
    const totalWeight = exams.reduce((sum, _entry, index) => sum + weights[index], 0);
    return Math.round(exams.reduce((sum, entry, index) => sum + Number(entry.percent || 0) * weights[index], 0) / totalWeight);
  }

  function nextStudyAction(model) {
    if (!model.hasBaseline) return { kind: "diagnostic", label: t("takeDiagnostic"), detail: t("diagnosticDetail") };
    if (Object.keys(progress.missed || {}).length >= 5) return { kind: "missed", label: t("reviewMissedMission"), detail: t("missedDesc") };
    if (model.weakest) return { kind: "weakness", label: `${t("missionWeakTopic")}: ${topicLabel(model.weakest.topic)}`, detail: t("targetedQuiz") };
    if (model.readiness >= 70) return { kind: "exam", label: t("examSimulationMission"), detail: t("examScoreWeight") };
    return { kind: "practice", label: t("missionQuestions"), detail: t("practiceDesc") };
  }

  function readinessModel() {
    const records = Object.values(progress.answers || {});
    const answered = records.reduce((sum, record) => sum + (Number(record.seen) || 0), 0);
    const correct = records.reduce((sum, record) => sum + (Number(record.correct) || 0), 0);
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
    const stats = topicStats();
    const mastered = stats.filter((item) => item.seen >= 5 && item.accuracy >= 82 && item.missed === 0).length;
    const masteryPercent = stats.length ? Math.round((mastered / stats.length) * 100) : 0;
    const recent = recentAccuracy();
    const examScore = weightedExamScore();
    const examsTaken = examHistory().length;
    const consistency = clamp(studyStreak() * 12, 0, 100);
    const hasBaseline = answered >= 25 || examsTaken > 0;
    const readiness = hasBaseline
      ? Math.round((examScore ?? accuracy) * 0.45 + (recent ?? accuracy) * 0.25 + accuracy * 0.15 + masteryPercent * 0.1 + consistency * 0.05)
      : null;
    const weakest = stats
      .filter((item) => item.seen || item.missed)
      .sort((a, b) => b.weakness - a.weakness)[0];
    const safeReadiness = readiness === null ? 0 : clamp(readiness, 0, 100);
    const label = !hasBaseline ? t("notEnoughData") : safeReadiness >= 84 ? t("examReady") : safeReadiness >= 70 ? t("nearlyReady") : safeReadiness >= 45 ? t("improving") : t("needsWork");
    const passingChance = !hasBaseline ? null : clamp(Math.round(safeReadiness + (examScore !== null ? 4 : -4)), 10, 95);
    return {
      answered,
      correct,
      accuracy,
      readiness: safeReadiness,
      passingChance,
      studyHours: hasBaseline ? clamp(Math.ceil((100 - safeReadiness) / 7), 1, 12) : 6,
      streak: studyStreak(),
      mastered,
      weakest,
      label,
      hasBaseline,
      examScore,
      examsTaken
    };
  }

  function renderMissionControl() {
    if (!els.missionReadinessScore) return;
    const model = readinessModel();
    const weakestLabel = model.weakest ? topicLabel(model.weakest.topic) : t("startWithPractice");
    const action = nextStudyAction(model);
    els.statAnswered.textContent = String(model.answered);
    els.statAccuracy.textContent = `${model.accuracy}%`;
    els.statMissed.textContent = String(Object.keys(progress.missed || {}).length);
    els.statFlagged.textContent = String(Object.keys(progress.flagged || {}).length);
    els.readinessBar.style.width = `${model.readiness}%`;
    els.missionReadinessScore.textContent = model.hasBaseline ? `${model.readiness}%` : "--";
    els.missionReadinessLabel.textContent = model.label;
    els.missionPassingChance.textContent = model.passingChance === null ? t("noEstimateYet") : `${model.passingChance}%`;
    els.missionPassingChance.classList.toggle("is-text", model.passingChance === null);
    els.missionStudyTime.textContent = `${model.studyHours} ${t("hours")}`;
    els.missionStreak.textContent = `${model.streak} ${t("days")}`;
    els.missionMastered.textContent = String(model.mastered);
    els.missionWeakestTopic.textContent = weakestLabel;
    els.missionTodayGoal.textContent = model.hasBaseline ? action.label : t("baselineGoal");
    renderDailyMissions(model);
  }

  function renderDailyMissions(model) {
    if (!els.dailyMissionsList) return;
    const action = nextStudyAction(model);
    const missions = [
      { label: action.label, detail: action.detail, xp: model.hasBaseline ? 35 : 30 },
      { label: model.weakest ? `${t("missionWeakTopic")}: ${topicLabel(model.weakest.topic)}` : t("missionQuestions"), detail: model.hasBaseline ? t("targetedQuiz") : `${model.answered} ${t("answered")}`, xp: 40 },
      { label: t("missionFlashcards"), detail: t("reviewFlashcards"), xp: 15 }
    ];
    els.dailyMissionsList.innerHTML = "";
    missions.forEach((mission, index) => {
      const item = document.createElement("button");
      item.className = "daily-mission";
      item.type = "button";
      item.dataset.mission = String(index);
      item.innerHTML = `<span>${escapeHtml(mission.label)}</span><small>${escapeHtml(mission.detail)}</small><b>+${mission.xp} ${t("xp")}</b>`;
      els.dailyMissionsList.appendChild(item);
    });
  }

  function startTopicPractice(topic) {
    openSetup("practice");
    if (topic && [...els.topic.options].some((option) => option.value === topic)) {
      els.topic.value = topic;
      populateCounts();
    }
  }

  function openDiagnostic() {
    openSetup("practice");
    els.topic.value = "all";
    els.simulator.value = "all";
    populateCounts();
    if ([...els.count.options].some((option) => option.value === "25")) els.count.value = "25";
  }

  function openExamSimulation() {
    openSetup("exam");
    els.topic.value = "all";
    els.simulator.value = "all";
    populateCounts();
  }

  function openWeakTopicStudy(topic) {
    const chapterByTopic = {
      general: 1,
      contracts: 3,
      "life insurance": 4,
      "policy provisions": 5,
      riders: 7,
      retirement: 8,
      annuities: 9,
      taxes: 10,
      underwriting: 11,
      texas: 13,
      ethics: 14,
      beneficiaries: 4,
      calculation: 4,
      "best interest": 14
    };
    showScreen("study");
    const chapterNumber = chapterByTopic[topic];
    const chapter = window.CERTIVO_STUDY?.chapters?.find((item) => Number(item.number) === Number(chapterNumber));
    if (chapter && els.studyChapterSelect) {
      els.studyChapterSelect.value = chapter.id;
      renderStudy();
    }
  }

  const WEAKNESS_COACHING = {
    en: {
      annuities: {
        why: "Annuity questions test whether you know when money is growing, when payments begin, and who carries the risk.",
        mistake: "Students mix immediate annuities with deferred annuities, or confuse annuities with life insurance.",
        memory: "Life insurance creates money when someone dies. Annuities protect against living too long.",
        fix: "Review annuity timing, then do a focused annuity quiz."
      },
      beneficiaries: {
        why: "Beneficiary rules decide who receives the death benefit and whether the policyowner can change that person.",
        mistake: "Students forget that irrevocable beneficiaries usually must consent to major changes.",
        memory: "Revocable can be revised. Irrevocable is locked in.",
        fix: "Practice owner, insured, beneficiary, and consent questions together."
      },
      "best interest": {
        why: "Best-interest questions test whether the agent put the client first and documented the recommendation.",
        mistake: "Students choose the product that sounds profitable instead of the step that protects the client.",
        memory: "Know the client before you sell the product.",
        fix: "Review suitability facts, disclosure, replacement, and documentation."
      },
      contracts: {
        why: "Contract questions are vocabulary traps: aleatory, adhesion, unilateral, conditional, and personal.",
        mistake: "Students confuse unilateral with bilateral, or aleatory with equal exchange.",
        memory: "A-A-U-C-P: Adhesion, Aleatory, Unilateral, Conditional, Personal.",
        fix: "Study each contract word as a clue, then quiz only contract characteristics."
      },
      ethics: {
        why: "Ethics questions test agent behavior, disclosure, misrepresentation, twisting, and client-first conduct.",
        mistake: "Students pick the answer that closes the sale instead of the answer that protects the consumer.",
        memory: "If it hides, pressures, or misleads, it is wrong.",
        fix: "Review unfair trade practices and best-interest examples."
      },
      general: {
        why: "General insurance concepts are the foundation for almost every later chapter.",
        mistake: "Students memorize words but cannot tell risk, peril, hazard, and pooling apart in a scenario.",
        memory: "Risk is uncertainty. Peril causes loss. Hazard makes loss more likely.",
        fix: "Review the foundation lesson, then do a 25-question diagnostic."
      },
      "life insurance": {
        why: "Life insurance questions test what type of policy fits the need: temporary, permanent, cash value, or protection.",
        mistake: "Students confuse term with whole life or forget that life insurance pays on death.",
        memory: "Term is temporary. Whole life is permanent.",
        fix: "Compare term, whole, universal, and variable life side by side."
      },
      "policy provisions": {
        why: "Policy provisions are the rules inside the policy: grace period, reinstatement, loans, incontestability, and riders.",
        mistake: "Students mix up time limits and what happens after missed premiums.",
        memory: "Provisions are the policy's rulebook.",
        fix: "Make a quick timeline of grace, reinstatement, contestability, and free-look rules."
      },
      retirement: {
        why: "Retirement questions test tax treatment, rollovers, qualified plans, and income timing.",
        mistake: "Students confuse contribution rules with distribution rules.",
        memory: "Qualified plans get tax favors because they follow tax rules.",
        fix: "Review qualified vs nonqualified and when taxes are paid."
      },
      riders: {
        why: "Riders change or add benefits to the base policy.",
        mistake: "Students choose the policy type instead of the rider that solves the specific problem.",
        memory: "A rider rides on top of the policy.",
        fix: "Match each rider to the problem it solves."
      },
      taxes: {
        why: "Tax questions test what is taxable, what is not, and when money is taxed.",
        mistake: "Students assume every insurance payment is taxable.",
        memory: "Death benefits are usually tax-free; gains and interest usually are not.",
        fix: "Review premium, death benefit, cash value, loan, and annuity taxation separately."
      },
      texas: {
        why: "Texas questions test state-specific rules, deadlines, licensing, replacement, and consumer protections.",
        mistake: "Students answer with a general insurance rule when Texas has a specific rule.",
        memory: "If the question says Texas, look for the Texas rule.",
        fix: "Review Texas deadlines and required notices, then quiz Texas-only questions."
      },
      underwriting: {
        why: "Underwriting questions test how insurers classify risk and decide whether to issue coverage.",
        mistake: "Students confuse field underwriting, home office underwriting, and premium classification.",
        memory: "Field gathers. Home office decides.",
        fix: "Review application, medical info, risk classes, and agent responsibilities."
      }
    },
    es: {
      annuities: {
        why: "Las anualidades evalúan si sabes cuándo crece el dinero, cuándo empiezan los pagos y quién carga el riesgo.",
        mistake: "Los estudiantes mezclan anualidades inmediatas con diferidas, o confunden anualidades con seguro de vida.",
        memory: "Vida crea dinero al morir. Anualidad protege si vives demasiado.",
        fix: "Repasa el tiempo de las anualidades y luego haz un quiz enfocado."
      },
      beneficiaries: {
        why: "Las reglas de beneficiarios deciden quién recibe el beneficio por muerte y si se puede cambiar.",
        mistake: "Se olvida que el beneficiario irrevocable normalmente debe consentir cambios importantes.",
        memory: "Revocable se revisa. Irrevocable queda fijo.",
        fix: "Practica preguntas de dueño, asegurado, beneficiario y consentimiento."
      },
      "best interest": {
        why: "Mejor interés evalúa si el agente puso al cliente primero y documentó la recomendación.",
        mistake: "Se elige el producto que suena rentable en vez del paso que protege al cliente.",
        memory: "Conoce al cliente antes de vender el producto.",
        fix: "Repasa datos de idoneidad, divulgación, reemplazo y documentación."
      },
      contracts: {
        why: "Contratos son trampas de vocabulario: aleatorio, adhesión, unilateral, condicional y personal.",
        mistake: "Se confunde unilateral con bilateral, o aleatorio con intercambio igual.",
        memory: "A-A-U-C-P: Adhesión, Aleatorio, Unilateral, Condicional, Personal.",
        fix: "Estudia cada palabra como pista y luego practica características del contrato."
      },
      ethics: {
        why: "Ética evalúa conducta del agente, divulgación, tergiversación, presión y protección del consumidor.",
        mistake: "Se escoge la respuesta que cierra la venta en vez de la que protege al consumidor.",
        memory: "Si oculta, presiona o engaña, está mal.",
        fix: "Repasa prácticas injustas y ejemplos de mejor interés."
      },
      general: {
        why: "Los conceptos generales son la base de casi todos los capítulos.",
        mistake: "Se memorizan palabras sin distinguir riesgo, peligro, condición de riesgo y agrupación de riesgos en escenarios.",
        memory: "Riesgo es incertidumbre. Peligro causa la pérdida. Una condición de riesgo aumenta la probabilidad.",
        fix: "Repasa la lección base y luego haz un diagnóstico de 25 preguntas."
      },
      "life insurance": {
        why: "Seguro de vida evalúa qué póliza encaja con la necesidad: temporal, permanente, valor en efectivo o protección.",
        mistake: "Se confunde seguro temporal con vida entera o se olvida que el seguro de vida paga al morir.",
        memory: "Seguro temporal es temporal. Vida entera es permanente.",
        fix: "Compara seguro temporal, vida entera, vida universal y vida variable lado a lado."
      },
      "policy provisions": {
        why: "Las cláusulas son las reglas dentro de la póliza: gracia, reinstalación, préstamos e incontestabilidad.",
        mistake: "Se mezclan límites de tiempo y consecuencias de no pagar primas.",
        memory: "Las cláusulas son el reglamento de la póliza.",
        fix: "Haz una línea de tiempo de gracia, reinstalación, contestabilidad y periodo de revisión gratuita."
      },
      retirement: {
        why: "Retiro evalúa impuestos, traspasos, planes calificados y momento de ingresos.",
        mistake: "Se confunden reglas de contribución con reglas de distribución.",
        memory: "Planes calificados reciben favor fiscal porque siguen reglas fiscales.",
        fix: "Repasa calificado vs no calificado y cuándo se pagan impuestos."
      },
      riders: {
        why: "Las cláusulas adicionales cambian o agregan beneficios a la póliza base.",
        mistake: "Se escoge el tipo de póliza en vez de la cláusula adicional que resuelve el problema.",
        memory: "Una cláusula adicional va encima de la póliza.",
        fix: "Une cada cláusula adicional con el problema que resuelve."
      },
      taxes: {
        why: "Impuestos evalúa qué es tributable, qué no, y cuándo se paga impuesto.",
        mistake: "Se asume que todo pago de seguro paga impuestos.",
        memory: "Beneficio por muerte normalmente no paga impuestos; ganancias e interés normalmente sí.",
        fix: "Repasa primas, beneficio por muerte, valor en efectivo, préstamos y anualidades por separado."
      },
      texas: {
        why: "Texas evalúa reglas estatales, fechas límite, licencia, reemplazo y protección del consumidor.",
        mistake: "Se contesta con regla general cuando Texas tiene una regla específica.",
        memory: "Si la pregunta dice Texas, busca la regla de Texas.",
        fix: "Repasa fechas límite y avisos obligatorios de Texas."
      },
      underwriting: {
        why: "La evaluación de riesgo evalúa cómo la aseguradora clasifica el riesgo y decide si emite cobertura.",
        mistake: "Se confunde la evaluación de campo, la evaluación de oficina central y la clasificación de prima.",
        memory: "La evaluación de campo recopila datos. La oficina central decide.",
        fix: "Repasa solicitud, información médica, clases de riesgo y responsabilidades del agente."
      }
    }
  };

  function weaknessExplanation(topic) {
    const label = topicLabel(topic);
    if (prefs.language === "es") {
      return `Si fallas ${label}, no memorices solamente la respuesta. Estudia la regla sencilla, mira un ejemplo y luego contesta preguntas del mismo tema hasta que puedas explicar por qué las otras opciones son incorrectas.`;
    }
    return `If you are missing ${label}, do not just memorize the answer. Study the simple rule, look at one example, then answer questions from this topic until you can explain why the other choices are wrong.`;
  }

  function weaknessCoaching(topic) {
    const fallback = {
      why: weaknessExplanation(topic),
      mistake: prefs.language === "es" ? "El error común es escoger una respuesta que suena familiar sin probarla contra la regla." : "The common mistake is choosing an answer that sounds familiar without testing it against the rule.",
      memory: prefs.language === "es" ? "Regla primero, respuesta después." : "Rule first, answer second.",
      fix: prefs.language === "es" ? "Repasa el capítulo y luego haz un quiz enfocado." : "Review the chapter, then take a targeted quiz."
    };
    return WEAKNESS_COACHING[prefs.language]?.[topic] || WEAKNESS_COACHING.en[topic] || fallback;
  }

  function miniLessonCheatCode(topic, coaching) {
    const label = topicLabel(topic);
    const topicCheats = {
      en: {
        general: "Risk = uncertainty. Pure risk can be insured. Speculative risk cannot. Peril causes loss. Hazard increases the chance.",
        annuities: "Ask: payments now or later? Immediate pays soon. Deferred pays later. Fixed shifts risk to insurer. Variable leaves investment risk with owner.",
        "life insurance": "Term is temporary. Whole life is permanent. Universal is flexible. Variable means securities risk.",
        "policy provisions": "Think timelines: grace keeps it alive, reinstatement brings it back, incontestability limits later challenges.",
        underwriting: "Field gathers facts. Home office decides. Risk class controls premium.",
        taxes: "Death benefit usually tax-free. Interest, gain, and annuity earnings are usually taxable when received.",
        texas: "If the question says Texas, stop using generic rules and look for the state-specific deadline, notice, or license rule.",
        contracts: "Adhesion favors insured on ambiguity. Aleatory means unequal values. Unilateral means only insurer has an enforceable promise.",
        riders: "A rider is an add-on. Match the rider to the problem: disability, accidental death, future insurability, long-term care.",
        retirement: "Qualified plans get tax advantages because they obey tax rules. Contributions, growth, and distributions are separate events.",
        ethics: "The strongest ethics choice protects the consumer, tells the truth, documents facts, and avoids pressure.",
        beneficiaries: "Owner controls. Insured is covered. Beneficiary receives. Revocable can change; irrevocable usually must consent.",
        "best interest": "Gather facts first, disclose before sale, document why the recommendation fits."
      },
      es: {
        general: "Riesgo = incertidumbre. Riesgo puro se asegura. Riesgo especulativo no. Peligro causa la pérdida. Una condición de riesgo aumenta la probabilidad.",
        annuities: "Pregunta: pagos ahora o después. Inmediata paga pronto. Diferida paga después. Fija pasa riesgo a la aseguradora. Variable deja riesgo al dueño.",
        "life insurance": "Seguro temporal es temporal. Vida entera es permanente. Vida universal es flexible. Vida variable significa riesgo de valores.",
        "policy provisions": "Piensa en tiempos: gracia mantiene viva la póliza, reinstalación la revive, incontestabilidad limita impugnaciones.",
        underwriting: "El campo recopila datos. La oficina central decide. La clase de riesgo controla la prima.",
        taxes: "Beneficio por muerte normalmente no paga impuesto. Interés, ganancia y anualidad normalmente pagan impuesto al recibirse.",
        texas: "Si la pregunta dice Texas, deja la regla genérica y busca fecha límite, aviso o regla de licencia estatal.",
        contracts: "Adhesión favorece al asegurado si hay ambigüedad. Aleatorio significa valores desiguales. Unilateral significa una promesa exigible.",
        riders: "Una cláusula adicional es un agregado. Une la cláusula con el problema: discapacidad, muerte accidental, asegurabilidad futura o cuidado a largo plazo.",
        retirement: "Planes calificados reciben ventaja fiscal porque obedecen reglas fiscales. Contribución, crecimiento y distribución son eventos distintos.",
        ethics: "La opción ética más fuerte protege al consumidor, dice la verdad, documenta hechos y evita presión.",
        beneficiaries: "Dueño controla. Asegurado está cubierto. Beneficiario recibe. Revocable cambia; irrevocable normalmente consiente.",
        "best interest": "Recopila datos primero, divulga antes de vender y documenta por qué la recomendación encaja."
      }
    };
    const cheat = topicCheats[prefs.language]?.[topic] || topicCheats.en[topic] || coaching.memory;
    if (prefs.language === "es") {
      return `Mini lección de ${label}: ${cheat} Trampa del examen: no escojas la respuesta que solo suena familiar; escoge la que sigue la regla exacta.`;
    }
    return `${label} mini lesson: ${cheat} Exam trap: do not pick the answer that merely sounds familiar; pick the answer that follows the exact rule.`;
  }

  function masteryLabel(item) {
    if (!item.seen) return "Bronze";
    if (item.accuracy >= 90 && item.seen >= 8 && item.missed === 0) return "Master";
    if (item.accuracy >= 80 && item.seen >= 5) return "Gold";
    if (item.accuracy >= 65) return "Silver";
    return "Bronze";
  }

  function renderWeaknessCenter() {
    if (!els.weaknessList) return;
    const weaknesses = topicStats()
      .filter((item) => item.seen || item.missed)
      .sort((a, b) => b.weakness - a.weakness)
      .slice(0, 5);
    els.weaknessList.innerHTML = "";
    if (!weaknesses.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = t("noWeaknessesYet");
      els.weaknessList.appendChild(empty);
      return;
    }
    weaknesses.forEach((item, index) => {
      const coaching = weaknessCoaching(item.topic);
      const miniLessonHtml = hasFullAccess()
        ? `<section class="mini-lesson-block">
              <span>${t("cheatCode")}</span>
              <p>${escapeHtml(miniLessonCheatCode(item.topic, coaching))}</p>
            </section>`
        : "";
      const card = document.createElement("article");
      card.className = "weakness-card";
      card.innerHTML = `
        <div class="weakness-rank">${index + 1}</div>
        <div>
          <div class="topic-top"><strong>${escapeHtml(topicLabel(item.topic))}</strong><span>${item.accuracy}% · ${item.seen} ${t("answered")}</span></div>
          <div class="weakness-coaching">
            ${miniLessonHtml}
            <section>
              <span>${t("whyWeak")}</span>
              <p>${escapeHtml(coaching.why)}</p>
            </section>
            <section>
              <span>${t("commonMistake")}</span>
              <p>${escapeHtml(coaching.mistake)}</p>
            </section>
            <section>
              <span>${t("memoryTip")}</span>
              <p>${escapeHtml(coaching.memory)}</p>
            </section>
            <section>
              <span>${t("recommendedFix")}</span>
              <p>${escapeHtml(coaching.fix)}</p>
            </section>
          </div>
          <div class="weakness-meta">
            <span>${t("mastery")}: ${escapeHtml(masteryLabel(item))}</span>
            <span>${t("missed")}: ${item.missed}</span>
          </div>
          <div class="actions">
            <button class="button secondary compact" type="button" data-action="study" data-topic="${escapeHtml(item.topic)}">${t("studyChapter")}</button>
            <button class="button primary compact" type="button" data-action="quiz" data-topic="${escapeHtml(item.topic)}">${t("targetedQuiz")}</button>
            <button class="button quiet compact" type="button" data-action="cards">${t("reviewFlashcards")}</button>
          </div>
        </div>
      `;
      els.weaknessList.appendChild(card);
    });
  }

  function updateDashboard() {
    const records = Object.values(progress.answers || {});
    const answered = records.reduce((sum, record) => sum + record.seen, 0);
    const correct = records.reduce((sum, record) => sum + record.correct, 0);
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
    els.statAnswered.textContent = String(answered);
    els.statAccuracy.textContent = `${accuracy}%`;
    els.statMissed.textContent = String(Object.keys(progress.missed || {}).length);
    els.statFlagged.textContent = String(Object.keys(progress.flagged || {}).length);
    els.readinessBar.style.width = `${accuracy}%`;
    renderMissionControl();
  }

  function renderProgress() {
    updateDashboard();
    const records = Object.values(progress.answers || {});
    const answered = records.reduce((sum, record) => sum + record.seen, 0);
    const correct = records.reduce((sum, record) => sum + record.correct, 0);
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
    els.progressAnswered.textContent = String(answered);
    els.progressCorrect.textContent = String(correct);
    els.progressAccuracy.textContent = `${accuracy}%`;
    els.progressFlagged.textContent = String(Object.keys(progress.flagged || {}).length);

    els.historyList.innerHTML = "";
    if (!progress.history?.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = t("noHistory");
      els.historyList.appendChild(empty);
      return;
    }

    progress.history.forEach((entry) => {
      const item = document.createElement("div");
      item.className = "history-item";
      item.innerHTML = `<strong>${entry.percent}% · ${entry.correct}/${entry.total}</strong><p class="muted">${new Date(entry.date).toLocaleString()} · ${entry.mode} · ${entry.language.toUpperCase()}</p>`;
      els.historyList.appendChild(item);
    });
  }

  function resetProgress() {
    if (!window.confirm(t("resetConfirm"))) return;
    progress = defaultProgress();
    saveProgress();
    renderProgress();
    updateDashboard();
  }

  function tickTimer() {
    window.clearTimeout(timerId);
    if (activeScreen !== "quiz" || !session) return;
    const elapsed = Math.max(0, Math.floor((Date.now() - session.startedAt) / 1000));
    els.timer.textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
    timerId = window.setTimeout(tickTimer, 1000);
  }

  function bindEvents() {
    els.langEn.addEventListener("click", () => setLanguage("en"));
    els.langEs.addEventListener("click", () => setLanguage("es"));
    els.theme.addEventListener("click", toggleTheme);
    document.getElementById("accountButton").addEventListener("click", () => showScreen("account"));
    document.getElementById("plansButton").addEventListener("click", () => showScreen("pricing"));
    document.getElementById("missionContinueButton").addEventListener("click", () => {
      const model = readinessModel();
      const action = nextStudyAction(model);
      if (action.kind === "diagnostic") openDiagnostic();
      else if (action.kind === "missed") openSetup("missed");
      else if (action.kind === "exam") openExamSimulation();
      else if (model.weakest) startTopicPractice(model.weakest.topic);
      else openDiagnostic();
    });
    document.getElementById("missionResumeButton").addEventListener("click", () => {
      const saved = loadJson(SESSION_KEY, null);
      if (saved?.deck?.length) resumeSession();
      else openSetup("practice");
    });
    document.getElementById("missionWeaknessButton").addEventListener("click", () => showScreen("weakness"));
    document.getElementById("viewProgressButton").addEventListener("click", () => showScreen("progress"));
    document.getElementById("freeTrialPath").addEventListener("click", startTrialSession);
    document.getElementById("studyGuideToolPath").addEventListener("click", () => document.getElementById("studyChapterTitle")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    document.getElementById("flashcardsStudyPath").addEventListener("click", () => openFlashcards());
    document.getElementById("practicePath").addEventListener("click", () => openSetup("practice"));
    document.getElementById("examPath").addEventListener("click", () => openSetup("exam"));
    document.getElementById("missedPath").addEventListener("click", () => openSetup("missed"));
    document.getElementById("progressPath").addEventListener("click", () => showScreen("progress"));
    document.getElementById("weaknessHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("setupHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("resultsHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("progressHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("studyHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("flashcardsHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("pricingHomeButton").addEventListener("click", () => showScreen("home"));
    document.getElementById("practiceAgainButton").addEventListener("click", handlePracticeAgain);
    document.getElementById("progressMissedButton").addEventListener("click", () => openSetup("missed"));
    document.getElementById("resetProgressButton").addEventListener("click", resetProgress);
    document.getElementById("navHome").addEventListener("click", () => showScreen("home"));
    document.getElementById("navStudy").addEventListener("click", () => showScreen("study"));
    document.getElementById("navPractice").addEventListener("click", () => openSetup("practice"));
    document.getElementById("navExam").addEventListener("click", () => openSetup("exam"));
    document.getElementById("navStats").addEventListener("click", () => showScreen("progress"));
    els.introSkip?.addEventListener("click", hideIntro);
    els.topic.addEventListener("change", populateCounts);
    els.simulator.addEventListener("change", populateCounts);
    els.studyChapterSelect?.addEventListener("change", renderStudy);
    els.studyPracticeButton?.addEventListener("click", practiceStudyChapter);
    els.studyFlashcardsButton?.addEventListener("click", () => openFlashcards(currentStudyChapter()?.number || "all"));
    els.flashcardChapterSelect?.addEventListener("change", () => {
      flashcardChapterFilter = els.flashcardChapterSelect.value || "all";
      flashcardIndex = 0;
      flashcardFlipped = false;
      renderFlashcards();
    });
    els.flashcardPracticeChapterButton?.addEventListener("click", practiceFlashcardChapter);
    els.dailyMissionsList?.addEventListener("click", (event) => {
      const button = event.target.closest(".daily-mission");
      if (!button) return;
      const model = readinessModel();
      const action = nextStudyAction(model);
      if (button.dataset.mission === "2") openFlashcards();
      else if (button.dataset.mission === "0" && action.kind === "diagnostic") openDiagnostic();
      else if (button.dataset.mission === "0" && action.kind === "missed") openSetup("missed");
      else if (button.dataset.mission === "0" && action.kind === "exam") openExamSimulation();
      else if (model.weakest) startTopicPractice(model.weakest.topic);
      else openDiagnostic();
    });
    els.weaknessList?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      if (button.dataset.action === "study") openWeakTopicStudy(button.dataset.topic);
      if (button.dataset.action === "quiz") startTopicPractice(button.dataset.topic);
      if (button.dataset.action === "cards") openFlashcards();
    });
    els.flashcardFlipButton?.addEventListener("click", () => {
      flashcardFlipped = !flashcardFlipped;
      renderFlashcards();
    });
    els.flashcardMissedButton?.addEventListener("click", advanceFlashcard);
    els.flashcardKnewButton?.addEventListener("click", advanceFlashcard);
    els.start.addEventListener("click", startSession);
    els.resume.addEventListener("click", resumeSession);
    els.clearSession.addEventListener("click", clearSession);
    els.previous.addEventListener("click", previousQuestion);
    els.flag.addEventListener("click", toggleFlag);
    els.check.addEventListener("click", checkOrNext);
    els.finish.addEventListener("click", finishSession);
    els.reviewLastMissed.addEventListener("click", reviewLastMissed);
    els.authForm?.addEventListener("submit", handleAuth);
    els.authModeButtons.forEach((button) => button.addEventListener("click", () => setAuthMode(button.dataset.authMode)));
    document.getElementById("signupForm")?.addEventListener("submit", handleSignup);
    document.getElementById("loginForm")?.addEventListener("submit", handleLogin);
    document.getElementById("logoutButton").addEventListener("click", handleLogout);
    document.querySelectorAll("[data-plan]").forEach((button) => button.addEventListener("click", () => startCheckout(button.dataset.plan)));
  }

  function setLanguage(language) {
    prefs.language = language;
    saveJson(PREF_KEY, prefs);
    localize();
  }

  function toggleTheme() {
    prefs.theme = prefs.theme === "dark" ? "light" : "dark";
    saveJson(PREF_KEY, prefs);
    applyTheme();
    localize();
  }

  function setupIntro() {
    if (!els.intro) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      hideIntro(true);
      return;
    }

    document.body.classList.add("intro-active");
    playIntroAudio();
    els.intro.addEventListener("pointerdown", playIntroAudio, { once: true });
    els.intro.addEventListener("keydown", playIntroAudio, { once: true });
    window.setTimeout(hideIntro, 3000);
  }

  function playIntroAudio() {
    if (!els.introAudio || introAudioUnlocked) return;
    els.introAudio.volume = 0.72;
    els.introAudio.currentTime = 0;
    const playAttempt = els.introAudio.play();
    if (!playAttempt || typeof playAttempt.catch !== "function") {
      introAudioUnlocked = true;
      return;
    }
    playAttempt
      .then(() => {
        introAudioUnlocked = true;
      })
      .catch(() => {
        const unlock = () => {
          if (!els.introAudio) return;
          els.introAudio.currentTime = 0;
          els.introAudio.play().catch(() => {});
          introAudioUnlocked = true;
        };
        els.intro?.addEventListener("pointerdown", unlock, { once: true });
        els.intro?.addEventListener("keydown", unlock, { once: true });
      });
  }

  function hideIntro(immediate = false) {
    if (!els.intro) return;
    document.body.classList.remove("intro-active");
    if (immediate && els.introAudio) {
      els.introAudio.pause();
      els.introAudio.currentTime = 0;
    }
    els.intro.classList.add("is-hidden");
    if (immediate) {
      els.intro.classList.add("hidden");
      return;
    }
    window.setTimeout(() => {
      els.intro.classList.add("hidden");
    }, 460);
  }

  bindEvents();
  applyTheme();
  initSupabase();
  localize();
  showScreen("home");
  setupIntro();
})();
