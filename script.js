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
const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");


let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;


// start quiz function 
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  scoreDisplay.textContent = `Score: ${score}`;
  showQuestion();

}


// show question function
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


// answer checking code part

function checkAnswer(selectedAnswer, selectedButton) {

  if (hasAnswered) {
    return;
  }

  hasAnswered = true;

  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Disable all buttons and remove hover effect
  options.querySelectorAll("button").forEach(button => {

    button.disabled = true;

    // Remove default styling
    button.classList.remove(
      "border-slate-700",
      "bg-slate-900",
      "hover:bg-slate-700"
    );

    // Highlight correct answer in green
    if (button.textContent.trim() === correctAnswer) {
      button.classList.add(
        "border-green-500",
        "bg-green-500/20"
      );
    }

  });

  // Check selected answer
  if (selectedAnswer === correctAnswer) {

    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    feedback.textContent = "Correct Answer!";

  } else {
    feedback.textContent = "Incorrect Answer!";

    // Highlight selected wrong answer in red
    selectedButton.classList.add("border-red-500", "bg-red-500/20");
  }

  // Enable next question button
  nextButton.disabled = false;

}

// next question function
function nextQuestion() {

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}


// show result function 
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScore.textContent = `${score} / ${questions.length}`;

}



// next btn event listener
nextButton.addEventListener('click', nextQuestion);

// restart button event listener
restartButton.addEventListener('click', startQuiz);

startButton.addEventListener('click', startQuiz);

