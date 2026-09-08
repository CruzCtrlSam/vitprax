// Public preview questions only.
// The full protected bank loads from Supabase after paid access is confirmed.
const CERTIVO_QUESTIONS = [
  {
    "id": "s1q1",
    "topic": "annuities",
    "simulator": 1,
    "en": {
      "question": "An annuity primarily protects the owner against the risk of:",
      "answers": [
        {
          "id": "s1q1-a1",
          "text": "Dying prematurely"
        },
        {
          "id": "s1q1-a2",
          "text": "Outliving their own savings"
        },
        {
          "id": "s1q1-a3",
          "text": "Becoming disabled"
        },
        {
          "id": "s1q1-a4",
          "text": "Property damage"
        }
      ],
      "explanation": "The annuity covers longevity risk (living too long). (A is life insurance.)"
    },
    "es": {
      "question": "Una anualidad protege principalmente al titular contra el riesgo de:",
      "answers": [
        {
          "id": "s1q1-a1",
          "text": "Morir prematuramente"
        },
        {
          "id": "s1q1-a2",
          "text": "Sobrevivir a sus propios ahorros"
        },
        {
          "id": "s1q1-a3",
          "text": "Quedar discapacitado"
        },
        {
          "id": "s1q1-a4",
          "text": "Daños a su propiedad"
        }
      ],
      "explanation": "La anualidad cubre el riesgo de longevidad (vivir demasiado). (A es el seguro de vida.)"
    },
    "correctAnswerId": "s1q1-a2"
  },
  {
    "id": "s1q2",
    "topic": "life insurance",
    "simulator": 1,
    "en": {
      "question": "In life insurance, insurable interest must exist:",
      "answers": [
        {
          "id": "s1q2-a1",
          "text": "Only at the time of death"
        },
        {
          "id": "s1q2-a2",
          "text": "Both at issue and at death"
        },
        {
          "id": "s1q2-a3",
          "text": "Only at the time of application/issue"
        },
        {
          "id": "s1q2-a4",
          "text": "At any point during the policy term"
        }
      ],
      "explanation": "For life, insurable interest is required only at issue. (B mixes in the property rule.)"
    },
    "es": {
      "question": "En el seguro de vida, el interés asegurable debe existir:",
      "answers": [
        {
          "id": "s1q2-a1",
          "text": "Solo al momento de la muerte"
        },
        {
          "id": "s1q2-a2",
          "text": "Tanto al emitir como al morir"
        },
        {
          "id": "s1q2-a3",
          "text": "Solo al momento de solicitar/emitir la póliza"
        },
        {
          "id": "s1q2-a4",
          "text": "En cualquier momento de la vigencia"
        }
      ],
      "explanation": "En vida, el interés asegurable solo se exige al emitir. (B mezcla la regla de propiedad.)"
    },
    "correctAnswerId": "s1q2-a3"
  },
  {
    "id": "s1q3",
    "topic": "texas",
    "simulator": 1,
    "en": {
      "question": "How many hours of continuing education, including ethics, does Texas require per 2-year license period?",
      "answers": [
        {
          "id": "s1q3-a1",
          "text": "20 hours, 2 of ethics"
        },
        {
          "id": "s1q3-a2",
          "text": "24 hours, 3 of ethics"
        },
        {
          "id": "s1q3-a3",
          "text": "30 hours, 5 of ethics"
        },
        {
          "id": "s1q3-a4",
          "text": "12 hours, 1 of ethics"
        }
      ],
      "explanation": "Texas: 24 hours / 3 of ethics per 2-year period."
    },
    "es": {
      "question": "¿Cuántas horas de educación continua, incluida la ética, exige Texas por periodo de licencia de 2 años?",
      "answers": [
        {
          "id": "s1q3-a1",
          "text": "20 horas, 2 de ética"
        },
        {
          "id": "s1q3-a2",
          "text": "24 horas, 3 de ética"
        },
        {
          "id": "s1q3-a3",
          "text": "30 horas, 5 de ética"
        },
        {
          "id": "s1q3-a4",
          "text": "12 horas, 1 de ética"
        }
      ],
      "explanation": "Texas: 24 horas / 3 de ética por periodo de 2 años."
    },
    "correctAnswerId": "s1q3-a2"
  },
  {
    "id": "s1q4",
    "topic": "policy provisions",
    "simulator": 1,
    "en": {
      "question": "The nonforfeiture option applied automatically if the owner does not choose another is usually:",
      "answers": [
        {
          "id": "s1q4-a1",
          "text": "Cash surrender value"
        },
        {
          "id": "s1q4-a2",
          "text": "Reduced paid-up insurance"
        },
        {
          "id": "s1q4-a3",
          "text": "Extended term insurance"
        },
        {
          "id": "s1q4-a4",
          "text": "Automatic premium loan"
        }
      ],
      "explanation": "The automatic option is extended term (same face, limited period). (D is a clause, not a nonforfeiture option.)"
    },
    "es": {
      "question": "La opción de no confiscación que se aplica automáticamente si el dueño no elige otra suele ser:",
      "answers": [
        {
          "id": "s1q4-a1",
          "text": "Valor de rescate en efectivo"
        },
        {
          "id": "s1q4-a2",
          "text": "Seguro saldado reducido"
        },
        {
          "id": "s1q4-a3",
          "text": "Seguro de término extendido"
        },
        {
          "id": "s1q4-a4",
          "text": "Préstamo automático de prima"
        }
      ],
      "explanation": "La opción automática es extended term (misma suma, plazo limitado). (D es una cláusula, no nonforfeiture.)"
    },
    "correctAnswerId": "s1q4-a3"
  },
  {
    "id": "s1q5",
    "topic": "retirement",
    "simulator": 1,
    "en": {
      "question": "At what age must Required Minimum Distributions (RMDs) from a traditional IRA generally begin under current rules?",
      "answers": [
        {
          "id": "s1q5-a1",
          "text": "59½"
        },
        {
          "id": "s1q5-a2",
          "text": "65"
        },
        {
          "id": "s1q5-a3",
          "text": "70½"
        },
        {
          "id": "s1q5-a4",
          "text": "73"
        }
      ],
      "explanation": "RMD at 73 (SECURE 2.0). (C, 70½, is the old rule.)"
    },
    "es": {
      "question": "¿A qué edad deben comenzar generalmente las distribuciones mínimas obligatorias (RMD) de una IRA tradicional bajo las reglas vigentes?",
      "answers": [
        {
          "id": "s1q5-a1",
          "text": "59½"
        },
        {
          "id": "s1q5-a2",
          "text": "65"
        },
        {
          "id": "s1q5-a3",
          "text": "70½"
        },
        {
          "id": "s1q5-a4",
          "text": "73"
        }
      ],
      "explanation": "RMD a los 73 (SECURE 2.0). (C, 70½, es la regla antigua.)"
    },
    "correctAnswerId": "s1q5-a4"
  },
  {
    "id": "s1q6",
    "topic": "texas",
    "simulator": 1,
    "en": {
      "question": "The Texas Life and Health Insurance Guaranty Association (TLHIGA) coverage limit for a life insurance death benefit is:",
      "answers": [
        {
          "id": "s1q6-a1",
          "text": "$100,000"
        },
        {
          "id": "s1q6-a2",
          "text": "$250,000"
        },
        {
          "id": "s1q6-a3",
          "text": "$300,000"
        },
        {
          "id": "s1q6-a4",
          "text": "$500,000"
        }
      ],
      "explanation": "TLHIGA: $300,000 death benefit. (A is the cash value limit.)"
    },
    "es": {
      "question": "El límite de cobertura de la Texas Life and Health Insurance Guaranty Association para el beneficio por muerte de una póliza de vida es:",
      "answers": [
        {
          "id": "s1q6-a1",
          "text": "$100,000"
        },
        {
          "id": "s1q6-a2",
          "text": "$250,000"
        },
        {
          "id": "s1q6-a3",
          "text": "$300,000"
        },
        {
          "id": "s1q6-a4",
          "text": "$500,000"
        }
      ],
      "explanation": "TLHIGA: $300,000 de beneficio por muerte. (A es el límite de valor en efectivo.)"
    },
    "correctAnswerId": "s1q6-a3"
  },
  {
    "id": "s1q7",
    "topic": "contracts",
    "simulator": 1,
    "en": {
      "question": "An applicant’s answers on an insurance application are legally considered:",
      "answers": [
        {
          "id": "s1q7-a1",
          "text": "Absolutely true warranties"
        },
        {
          "id": "s1q7-a2",
          "text": "Representations true to the best of their knowledge"
        },
        {
          "id": "s1q7-a3",
          "text": "Opinions with no legal effect"
        },
        {
          "id": "s1q7-a4",
          "text": "Independent contract clauses"
        }
      ],
      "explanation": "They are representations (only material misrepresentation voids)."
    },
    "es": {
      "question": "Las respuestas de un solicitante en la solicitud de seguro se consideran legalmente:",
      "answers": [
        {
          "id": "s1q7-a1",
          "text": "Garantías absolutamente verdaderas"
        },
        {
          "id": "s1q7-a2",
          "text": "Representaciones ciertas a su leal saber y entender"
        },
        {
          "id": "s1q7-a3",
          "text": "Opiniones sin efecto legal"
        },
        {
          "id": "s1q7-a4",
          "text": "Cláusulas contractuales independientes"
        }
      ],
      "explanation": "Son representaciones (solo la material misrepresentation anula)."
    },
    "correctAnswerId": "s1q7-a2"
  },
  {
    "id": "s1q8",
    "topic": "annuities",
    "simulator": 1,
    "en": {
      "question": "In a non-qualified annuity, withdrawals (non-annuitized) are taxed under the:",
      "answers": [
        {
          "id": "s1q8-a1",
          "text": "FIFO method, basis first"
        },
        {
          "id": "s1q8-a2",
          "text": "LIFO method, gain first"
        },
        {
          "id": "s1q8-a3",
          "text": "Equal proration"
        },
        {
          "id": "s1q8-a4",
          "text": "Always tax-free"
        }
      ],
      "explanation": "LIFO: gain comes out first and is taxable (+10% if under 59½)."
    },
    "es": {
      "question": "En una anualidad no calificada, los retiros (no anualizados) se gravan bajo el método:",
      "answers": [
        {
          "id": "s1q8-a1",
          "text": "FIFO, primero la base"
        },
        {
          "id": "s1q8-a2",
          "text": "LIFO, primero la ganancia"
        },
        {
          "id": "s1q8-a3",
          "text": "Prorrateo igual"
        },
        {
          "id": "s1q8-a4",
          "text": "Exentos siempre"
        }
      ],
      "explanation": "LIFO: la ganancia sale primero y es gravable (+10% si <59½)."
    },
    "correctAnswerId": "s1q8-a2"
  },
  {
    "id": "s1q9",
    "topic": "retirement",
    "simulator": 1,
    "en": {
      "question": "Which type of retirement plan receives contributions only from the employer?",
      "answers": [
        {
          "id": "s1q9-a1",
          "text": "SIMPLE IRA"
        },
        {
          "id": "s1q9-a2",
          "text": "Traditional 401(k)"
        },
        {
          "id": "s1q9-a3",
          "text": "SEP IRA"
        },
        {
          "id": "s1q9-a4",
          "text": "Roth IRA"
        }
      ],
      "explanation": "In the SEP IRA only the employer contributes."
    },
    "es": {
      "question": "¿Qué tipo de plan de retiro recibe aportaciones únicamente del empleador?",
      "answers": [
        {
          "id": "s1q9-a1",
          "text": "SIMPLE IRA"
        },
        {
          "id": "s1q9-a2",
          "text": "401(k) tradicional"
        },
        {
          "id": "s1q9-a3",
          "text": "SEP IRA"
        },
        {
          "id": "s1q9-a4",
          "text": "Roth IRA"
        }
      ],
      "explanation": "En el SEP IRA solo aporta el empleador."
    },
    "correctAnswerId": "s1q9-a3"
  },
  {
    "id": "s1q10",
    "topic": "beneficiaries",
    "simulator": 1,
    "en": {
      "question": "An irrevocable beneficiary must give consent before the owner can:",
      "answers": [
        {
          "id": "s1q10-a1",
          "text": "Pay the premium"
        },
        {
          "id": "s1q10-a2",
          "text": "Take a loan against the cash value"
        },
        {
          "id": "s1q10-a3",
          "text": "Read the policy"
        },
        {
          "id": "s1q10-a4",
          "text": "Receive the statement"
        }
      ],
      "explanation": "The irrevocable beneficiary must consent to loans, changes, assignment, or cancellation."
    },
    "es": {
      "question": "Un beneficiario irrevocable debe dar su consentimiento para que el dueño pueda:",
      "answers": [
        {
          "id": "s1q10-a1",
          "text": "Pagar la prima"
        },
        {
          "id": "s1q10-a2",
          "text": "Tomar un préstamo sobre el valor en efectivo"
        },
        {
          "id": "s1q10-a3",
          "text": "Leer la póliza"
        },
        {
          "id": "s1q10-a4",
          "text": "Recibir el estado de cuenta"
        }
      ],
      "explanation": "El irrevocable debe consentir préstamos, cambios, cesión o cancelación."
    },
    "correctAnswerId": "s1q10-a2"
  }
];
