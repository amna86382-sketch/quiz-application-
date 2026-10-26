// Questions, options aur correct answers
const questions = [
    {
        question: "1. HTML ka full form kya hai?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },
    {
        question: "2. CSS ka use kis liye hota hai?",
        options: [
            "Data save karne ke liye",
            "Website ko style karne ke liye",
            "Server banane ke liye",
            "Database banane ke liye"
        ],
        answer: 1
    },
    {
        question: "3. JavaScript kis liye use hoti hai?",
        options: [
            "Website interactive banane ke liye",
            "Sirf images banane ke liye",
            "Computer repair karne ke liye",
            "Sirf typing ke liye"
        ],
        answer: 0
    },
    {
        question: "4. JavaScript mein array ke liye kya use hota hai?",
        options: ["{}", "()", "[]", "<>"],
        answer: 2
    },
    {
        question: "5. Variable declare karne ke liye kya use hota hai?",
        options: ["style", "let", "color", "body"],
        answer: 1
    },
    {
        question: "6. DOM ka full form kya hai?",
        options: [
            "Document Object Model",
            "Data Order Method",
            "Digital Object Machine",
            "Document Oriented Method"
        ],
        answer: 0
    },
    {
        question: "7. Click event handle karne ke liye kya use hota hai?",
        options: [
            "localStorage",
            "addEventListener()",
            "JSON.parse()",
            "innerHTML"
        ],
        answer: 1
    },
    {
        question: "8. Array ki length check karne ke liye kya use hota hai?",
        options: [".size", ".count", ".length", ".total"],
        answer: 2
    },
    {
        question: "9. localStorage mein data save karne ke liye kya use hota hai?",
        options: [
            "getItem()",
            "setItem()",
            "removeItem()",
            "pushItem()"
        ],
        answer: 1
    },
    {
        question: "10. JSON string ko JavaScript data mein convert karne ke liye kya use hota hai?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.convert()",
            "JSON.change()"
        ],
        answer: 1
    }
];

// HTML elements select karna
const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
const savedResultsElement = document.getElementById("savedResults");

// Starting values
let currentQuestion = 0;
let score = 0;
let answered = false;

// Purane results localStorage se lena
let quizResults = JSON.parse(
    localStorage.getItem("quizResults")
) || [];

// Saved results display karna
function displaySavedResults() {
    savedResultsElement.innerHTML = "";

    for (let i = 0; i < quizResults.length; i++) {
        const item = quizResults[i];

        const card = document.createElement("div");
        card.className = "result-card";

        const scoreText = document.createElement("p");
        scoreText.textContent = "Score: " + item.score;

        // Delete button banana
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        // Selected result delete karna
        deleteBtn.addEventListener("click", function() {
            quizResults.splice(i, 1);

            localStorage.setItem(
                "quizResults",
                JSON.stringify(quizResults)
            );

            displaySavedResults();
        });

        card.appendChild(scoreText);
        card.appendChild(deleteBtn);

        savedResultsElement.appendChild(card);
    }
}

// Question show karna
function showQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";
    message.textContent = "";
    answered = false;

    // Loop se saare options show karna
    for (let i = 0; i < current.options.length; i++) {
        const button = document.createElement("button");

        button.textContent = current.options[i];
        button.className = "option-btn";

        // Answer par click karna
        button.addEventListener("click", function() {
            if (answered === true) {
                return;
            }

            answered = true;

            // Correct ya wrong answer check karna
            if (i === current.answer) {
                score++;
                message.textContent = "Correct Answer!";
            } else {
                message.textContent = "Wrong Answer!";
            }
        });

        optionsElement.appendChild(button);
    }
}

// Next Question button
nextBtn.addEventListener("click", function() {
    if (answered === false) {
        message.textContent = "Please select an answer!";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Final result show aur save karna
function showResult() {
    quiz.style.display = "none";
    result.style.display = "block";

    finalScore.textContent =
        "Your Score: " + score + " / " + questions.length;

    // Naya result banana
    const newResult = {
        score: score + " / " + questions.length
    };

    // Result array mein add karna
    quizResults.push(newResult);

    // Results localStorage mein save karna
    localStorage.setItem(
        "quizResults",
        JSON.stringify(quizResults)
    );

    displaySavedResults();
}

// Restart Quiz button
restartBtn.addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    result.style.display = "none";
    quiz.style.display = "block";

    showQuestion();
});

// Page load par saved results show karna
displaySavedResults();

// Pehla question show karna
showQuestion();