export const chapters = [
    {
        id: 1,
        title: "Chapter 1: Introductions",
        subtitle: "はじめまして (Hajimemashite)",
        description: "Learn basic sentence structures, self-introductions, and simple particles.",
        activities: {
            vocabulary: [
                { jp: "わたし", romaji: "watashi", en: "I" },
                { jp: "あなた", romaji: "anata", en: "you" },
                { jp: "せんせい", romaji: "sensei", en: "teacher" },
                { jp: "がくせい", romaji: "gakusei", en: "student" },
                { jp: "はい", romaji: "hai", en: "yes" },
                { jp: "いいえ", romaji: "iie", en: "no" },
            ],
            quiz: [
                {
                    id: 'q1',
                    question: "「私は学生です」 means:",
                    options: [
                        "I am a student",
                        "You are a student",
                        "I am a teacher",
                        "Are you a student?"
                    ],
                    correctIndex: 0
                },
                {
                    id: 'q2',
                    question: "Which particle marks the topic?",
                    options: [
                        "か (ka)",
                        "も (mo)",
                        "の (no)",
                        "は (wa)"
                    ],
                    correctIndex: 3
                },
                {
                    id: 'q3',
                    question: "Select the correct translation for 'Are you a teacher?'",
                    options: [
                        "あなたはせんせいですか (Anata wa sensei desu ka)",
                        "わたしはせんせいです (Watashi wa sensei desu)",
                        "あなたはせんせいです (Anata wa sensei desu)",
                        "せんせいはあなたですか (Sensei wa anata desu ka)"
                    ],
                    correctIndex: 0
                }
            ],
            scramble: [
                {
                    id: 's1',
                    question: "Form the sentence: 'I am Mike.'",
                    parts: ["マイク (Mike)", "は (wa)", "です (desu)", "わたし (Watashi)"],
                    correctOrder: ["わたし (Watashi)", "は (wa)", "マイク (Mike)", "です (desu)"]
                },
                {
                    id: 's2',
                    question: "Form the sentence: 'Mr. Sato is a teacher.'",
                    parts: ["せんせい (sensei)", "さとうさん (Sato-san)", "は (wa)", "です (desu)"],
                    correctOrder: ["さとうさん (Sato-san)", "は (wa)", "せんせい (sensei)", "です (desu)"]
                }
            ],
            conjugation: [
                {
                    id: 'c1',
                    form: 'Negative Form (Polite)',
                    a: 'です (desu)',
                    hint: 'to be',
                    b: ['じゃありません', 'ではありません', 'ja arimasen']
                },
                {
                    id: 'c2',
                    form: 'Past Form (Polite)',
                    a: 'です (desu)',
                    hint: 'to be',
                    b: ['でした', 'deshita']
                }
            ]
        }
    },
    {
        id: 2,
        title: "Chapter 2: This, That, Which",
        subtitle: "これ、それ、あれ、どれ",
        description: "Learn to point at things and ask what they are.",
        locked: false,
        activities: {}
    }
];
