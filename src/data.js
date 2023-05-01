const data = [
    {
        lavel: 1,
        questions: [
            {   'id' : 1,
                'time-remaining': 30,
                'passed' : false,
                'question' : 'Patient-provider accountability is<br/>critical to improve the<br/>quality of health care services',
                'type' : 'true-false',
                'viewed-time': null, // timestamp when user open this question 
                'correct-answer' : true,
                'user-answer' : null,
                'user-answer-is' : 'not-attempted' // correct , incorrect, not attempted
            },
            {
                'id' : 2,
                'time-remaining': 30,
                'passed' : false,
                'question' : 'Seeking patient feedback should be avoided for fear of getting nevigative comments',
                'type' : 'true-false',
                'viewed-time': null, // timestamp when user open this question 
                'correct-answer' : true,
                'user-answer' : null,
                'user-answer-is' : 'not-attempted' // correct , incorrect, not attempted
            },
            {
                'id' : 3,
                'time-remaining': 30,
                'passed' : false,
                'question' : 'Patients and their families do not have any responsibility towards the health facility and healthcare provider',
                'type' : 'true-false',
                'viewed-time': null, // timestamp when user open this question 
                'correct-answer' : false,
                'user-answer' : null,
                'user-answer-is' : 'not-attempted' // correct , incorrect, not attempted
            }
        ]
    },
    {
        lavel: 2,
        questions: [
            {
                'id' : 4,
                'time-remaining': 45,
                'passed' : false,
                'question' : [
                            'Work-related stress is the adverse reaction people have to excessive _____ and demands placed on them at work.',
                            'Symptoms in staf such as fatigue, nitabilty, anxiety, aggression, lack of performance may indicate _____ stress.',
                            'Periodic recognition and rewards for high performing staf helps keep their _____ high.',
                            ],
                'type' : 'fill-in-the-blanks',
                'viewed-time': null, // timestamp when user open this question 
                'correct-answer' : ['Workplace', 'Motivation', 'Pressures'],
                'arrangement' : ['Motivation', 'Pressures', 'Workplace'],
                'user-answer' : null,
                'user-answer-is' : 'not-attempted' // correct , incorrect, not attempted
            }
            
        ]
    },
    {
        lavel: 3,
        questions: [
            {
                'id' : 5,
                'time-remaining': 45,
                'passed' : false,
                'question' : [
                    'Not responding to a woman’s call for help',
                    'A woman with HIV observed less frequently in labour than recommended',
                    'Shouting, scolding using abusive language',
                    'Not using curtains or screens during examinations or during labor',
                    'Performing physical examinations without giving an gexplanation'
                    ],
                'type' : 'match-following',
                'viewed-time': null, // timestamp when user open this question 
                'correct-answer' : [
                                    'Abandonment and neglect', 
                                    'Discrimination', 
                                    'Non-dignified care',
                                    'Non-confidential care',
                                    'Non-consented care'
                                ],
                'arrangement' : [
                                'Non-confidential care', 
                                'Non-consented care', 
                                'Abandonment and neglect',
                                'Discrimination',
                                'Non-dignified care'
                                ],
                'user-answer' : null,
                'user-answer-is' : 'not-attempted'
            }
            
        ]
    }
];

export {data}