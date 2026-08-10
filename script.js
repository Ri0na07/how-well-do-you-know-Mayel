/* =========================================
   RIO'S "HOW WELL DO YOU KNOW ME?"
   QUIZ GAME
========================================= */


/* =========================================
   QUESTIONS
========================================= */

const questions = [

    {
        category: "EASY START",
        question: "What is Rio's nickname?",
        answers: [
            "Riri",
            "Rio",
            "Rona",
            "Ria"
        ],
        correct: 1
    },

    {
        category: "SCHOOL LIFE",
        question: "What is Rio studying in college?",
        answers: [
            "Bachelor of Fine Arts",
            "Psychology",
            "Information Technology",
            "Multimedia Arts"
        ],
        correct: 2
    },

    {
        category: "HOBBIES",
        question: "What is something Rio enjoys reading?",
        answers: [
            "Manhwa",
            "Cookbooks",
            "Newspapers",
            "Car manuals"
        ],
        correct: 0
    },

    {
        category: "CREATIVE SIDE",
        question: "Which of these is one of Rio's creative hobbies?",
        answers: [
            "Digital art",
            "Woodworking",
            "Pottery",
            "Knitting"
        ],
        correct: 0
    },

    {
        category: "FREE TIME",
        question: "Which combination sounds most like Rio?",
        answers: [
            "Reading, movies, and gaming",
            "Golf, fishing, and running",
            "Cooking, hiking, and boxing",
            "Dancing, surfing, and cycling"
        ],
        correct: 0
    },

    {
        category: "ANIMAL PERSON",
        question: "What kind of videos does Rio enjoy watching?",
        answers: [
            "Car restoration videos",
            "Wildlife documentaries and shelter rescue videos",
            "Cooking competitions",
            "Professional wrestling"
        ],
        correct: 1
    },

    {
        category: "ACADEMIA",
        question: "Before studying IT, which senior high strand did Rio take?",
        answers: [
            "STEM",
            "ABM",
            "HUMSS",
            "TVL"
        ],
        correct: 2
    },

    {
        category: "ARTISTIC ERA",
        question: "What program did Rio take during high school?",
        answers: [
            "Special Program for the Arts",
            "Sports Track",
            "Science Program",
            "Engineering Program"
        ],
        correct: 0
    },

    {
        category: "LANGUAGE LEVEL-UP",
        question: "Which language is Rio learning?",
        answers: [
            "French",
            "Japanese",
            "Spanish",
            "German"
        ],
        correct: 1
    },

    {
        category: "TECH GIRL",
        question: "What career field is Rio currently preparing for?",
        answers: [
            "Information Technology",
            "Medicine",
            "Architecture",
            "Law"
        ],
        correct: 0
    },

    {
        category: "VERY IMPORTANT",
        question: "What is Rio's relationship with group projects?",
        answers: [
            "She absolutely loves them",
            "She thinks they are relaxing",
            "She has opinions about people who leave 'seen' as participation",
            "She never notices them"
        ],
        correct: 2
    },

    {
        category: "FINAL BOSS",
        question: "What should you probably give Rio if you want to make her happy?",
        answers: [
            "An unnecessarily complicated spreadsheet",
            "An animal documentary and something to read",
            "A 6-hour meeting",
            "A broken laptop"
        ],
        correct: 1
    }

];


/* =========================================
   GAME VARIABLES
========================================= */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* =========================================
   DOM ELEMENTS
========================================= */

const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const questionCategory = document.getElementById("question-category");

const answersContainer = document.getElementById("answers");

const scoreDisplay = document.getElementById("score");

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const questionCard = document.getElementById("question-card");

const transitionOverlay =
    document.getElementById("transition-overlay");


/* =========================================
   START GAME
========================================= */

startButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    scoreDisplay.textContent = score;

    showScreen(quizScreen);

    loadQuestion();

});


/* =========================================
   LOAD QUESTION
========================================= */

function loadQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        String(currentQuestion + 1).padStart(2, "0");

    questionText.textContent = question.question;

    questionCategory.textContent = question.category;

    progressText.textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;


    /* Reset transition classes */

    questionCard.classList.remove(
        "transition-next",
        "transition-slice",
        "transition-leaf",
        "transition-bounce"
    );


    /* Pick a different animation */

    const transitions = [
        "transition-next",
        "transition-slice",
        "transition-leaf",
        "transition-bounce"
    ];

    const randomTransition =
        transitions[
            currentQuestion % transitions.length
        ];

    void questionCard.offsetWidth;

    questionCard.classList.add(randomTransition);


    /* Create answer buttons */

    answersContainer.innerHTML = "";


    const shuffledAnswers =
        shuffleAnswers(question.answers, question.correct);


    shuffledAnswers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer-button";

        button.innerHTML = `
            <span class="answer-letter">
                ${String.fromCharCode(65 + index)}
            </span>

            ${answer.text}
        `;

        button.addEventListener("click", () => {

            selectAnswer(
                button,
                answer.isCorrect
            );

        });

        answersContainer.appendChild(button);

    });

}


/* =========================================
   SHUFFLE ANSWERS
========================================= */

function shuffleAnswers(answers, correctIndex) {

    const answerObjects = answers.map(
        (answer, index) => ({
            text: answer,
            isCorrect: index === correctIndex
        })
    );

    for (
        let i = answerObjects.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [
            answerObjects[i],
            answerObjects[j]
        ] =
        [
            answerObjects[j],
            answerObjects[i]
        ];

    }

    return answerObjects;
}


/* =========================================
   SELECT ANSWER
========================================= */

function selectAnswer(button, isCorrect) {

    if (answered) return;

    answered = true;


    /* Disable every button */

    const buttons =
        document.querySelectorAll(".answer-button");

    buttons.forEach(btn => {
        btn.style.pointerEvents = "none";
    });


    if (isCorrect) {

        button.classList.add("correct");

        score++;

        scoreDisplay.textContent = score;

    } else {

        button.classList.add("wrong");

        /* Show correct answer */

        buttons.forEach(btn => {

            const text =
                btn.textContent.trim();

            const current =
                questions[currentQuestion];

            if (
                current.answers.includes(
                    text.substring(1).trim()
                )
            ) {

                const correctText =
                    current.answers[current.correct];

                if (
                    text.includes(correctText)
                ) {
                    btn.classList.add("correct");
                }

            }

        });

    }


    /* Give the user a moment to see result */

    setTimeout(() => {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            nextQuestion();

        } else {

            showResults();

        }

    }, 900);

}


/* =========================================
   NEXT QUESTION
========================================= */

function nextQuestion() {

    transitionToNext(() => {

        currentQuestion++;

        loadQuestion();

    });

}


/* =========================================
   TRANSITION
========================================= */

function transitionToNext(callback) {

    transitionOverlay.classList.remove("active");

    void transitionOverlay.offsetWidth;

    transitionOverlay.classList.add("active");

    setTimeout(() => {

        callback();

    }, 350);

}


/* =========================================
   SCREEN SWITCHING
========================================= */

function showScreen(screen) {

    homeScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");

    screen.classList.add("active");

}


/* =========================================
   RESULTS
========================================= */

function showResults() {

    showScreen(resultScreen);


    const total =
        questions.length;

    const percentage =
        Math.round(
            (score / total) * 100
        );


    document.getElementById(
        "final-score"
    ).textContent = score;


    document.getElementById(
        "correct-count"
    ).textContent = score;


    document.getElementById(
        "percentage"
    ).textContent = `${percentage}%`;


    const resultTitle =
        document.getElementById("result-title");

    const resultMessage =
        document.getElementById("result-message");

    const resultEmoji =
        document.getElementById("result-emoji");


    /* ==========================
       SCORE MESSAGES
    ========================== */

    if (percentage === 100) {

        resultEmoji.textContent = "👑";

        resultTitle.textContent =
            "YOU ACTUALLY KNOW ME.";

        resultMessage.textContent =
            "Okay. I'm impressed. You officially know Rio better than you probably should.";

        celebrate();

    }

    else if (percentage >= 80) {

        resultEmoji.textContent = "🍊";

        resultTitle.textContent =
            "Okayyyy, Bestie.";

        resultMessage.textContent =
            "You clearly pay attention. I'm slightly impressed. Don't let it go to your head.";

        celebrate();

    }

    else if (percentage >= 60) {

        resultEmoji.textContent = "🌿";

        resultTitle.textContent =
            "Not Bad.";

        resultMessage.textContent =
            "You know me... mostly. There are definitely some things we need to discuss.";

    }

    else if (percentage >= 40) {

        resultEmoji.textContent = "😭";

        resultTitle.textContent =
            "We Need To Talk.";

        resultMessage.textContent =
            "You got some right, but I'm starting to question this friendship.";

    }

    else {

        resultEmoji.textContent = "💀";

        resultTitle.textContent =
            "Are We Even Friends?";

        resultMessage.textContent =
            "Honestly, please study harder before attempting this quiz again.";

    }


    /* Score circle */

    const degree =
        (percentage / 100) * 360;

    document
        .querySelector(".score-circle")
        .style
        .setProperty(
            "--score-degree",
            `${degree}deg`
        );

}


/* =========================================
   CONFETTI
========================================= */

function celebrate() {

    const container =
        document.getElementById(
            "confetti-container"
        );

    container.innerHTML = "";


    const emojis = [
        "🍊",
        "🍊",
        "✨",
        "🌿",
        "🧡"
    ];


    for (let i = 0; i < 60; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti";

        piece.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.fontSize =
            `${12 + Math.random() * 15}px`;

        piece.style.animationDelay =
            `${Math.random() * 1.5}s`;

        container.appendChild(piece);

    }


    setTimeout(() => {

        container.innerHTML = "";

    }, 4500);

}


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        currentQuestion = 0;
        score = 0;

        scoreDisplay.textContent = 0;

        showScreen(quizScreen);

        loadQuestion();

    }
);


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !quizScreen.classList.contains("active")
        ) {
            return;
        }


        const key =
            event.key.toUpperCase();


        if (
            ["A", "B", "C", "D"].includes(key)
        ) {

            const index =
                key.charCodeAt(0) - 65;


            const buttons =
                document.querySelectorAll(
                    ".answer-button"
                );


            if (buttons[index]) {

                buttons[index].click();

            }

        }

    }
);
