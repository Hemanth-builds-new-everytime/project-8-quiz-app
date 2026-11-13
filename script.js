const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    correctAnswer: "New Delhi"
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    correctAnswer: "CSS"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    correctAnswer: "Netscape"
  },
  {
    question: "Which keyword declares a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    correctAnswer: "const"
  },
  {
    question: "Which method adds an element at the end of an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Digital Ordinance Model",
      "Document Oriented Method"
    ],
    correctAnswer: "Document Object Model"
  },
  {
    question: "Which symbol is used for strict equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "==="
  },
  {
    question: "Which method selects an element by its ID?",
    options: [
      "querySelectorAll()",
      "getElementById()",
      "getElementsByClassName()",
      "getElementsByTagName()"
    ],
    correctAnswer: "getElementById()"
  },
  {
    question: "Which event occurs when a user clicks an element?",
    options: ["change", "submit", "click", "load"],
    correctAnswer: "click"
  },
  {
    question: "Which method converts JSON text into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()"
    ],
    correctAnswer: "JSON.parse()"
  }
];

const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const questionNumber = document.querySelector("#question-number");
const scoreDisplay = document.querySelector("#score");
const progressBar = document.querySelector("#progress-bar");
const question = document.querySelector("#question");
const options = document.querySelector("#options");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const finalScore = document.querySelector("#final-score");
const restartButton = document.querySelector("#restart-button");



let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;

  quizScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  scoreDisplay.textContent = `Score: ${score}`;
  showQuestion();
}


const showQuestion = () => {
  const currentQuestion = questions[currentQuestionIndex];

  question.textContent = currentQuestion.question;
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`

  // reset previous questions state  
  hasAnswered = false;
  feedback.textContent = "";
  nextButton.disabled = true;

  // progress bar update
  progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

  options.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");

    button.className = "w-full rounded-lg border border-slate-700 bg-slate-900 p-4 text-left transition hover:bg-slate-700"

    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(option, button);
    })


    options.append(button);

  });



}

function checkAnswer (selectedAnswer, selectedButton) {

  // checking if user has answered it already or not
  if (hasAnswered) {
    return;
  }

  hasAnswered = true;

  // answer matching
  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    score++;
    scoreDisplay.textContent = `Score ${score}`;
    feedback.textContent = "Correct Answer!";

  } else {

  }
}



startQuiz();



