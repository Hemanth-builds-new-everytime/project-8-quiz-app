const questions = [
  {
    question: "Which keyword is used to declare a block-scoped variable that can be reassigned?",
    options: ["const", "let", "static", "final"],
    correctAnswer: "let"
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "==="
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  {
    question: "Which operator is used to check the data type of a value?",
    options: ["type()", "typeof", "instance", "datatype"],
    correctAnswer: "typeof"
  },
  {
    question: "Which method selects an HTML element using its ID?",
    options: [
      "querySelectorAll()",
      "getElementById()",
      "getElementsByClassName()",
      "getElementsByTagName()"
    ],
    correctAnswer: "getElementById()"
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.object()"
    ],
    correctAnswer: "JSON.parse()"
  },
  {
    question: "Which method is used to attach an event listener to an element?",
    options: [
      "addEventListener()",
      "appendChild()",
      "createElement()",
      "querySelector()"
    ],
    correctAnswer: "addEventListener()"
  },
  {
    question: "Which syntax represents an arrow function in JavaScript?",
    options: [
      "function =>",
      "() => {}",
      "function() ->",
      "=> function()"
    ],
    correctAnswer: "() => {}"
  },
  {
    question: "Which array method creates a new array containing elements that pass a condition?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    correctAnswer: "filter()"
  },
  {
    question: "What does an async function always return?",
    options: [
      "An Array",
      "A String",
      "A Promise",
      "An Object"
    ],
    correctAnswer: "A Promise"
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

    button.className =
      "w-full rounded-xl border-2 border-[#D9DCE5] bg-white px-5 py-3.5 text-left font-medium text-[#1B1E28] transition-colors duration-150 hover:border-[#1F3FD1] hover:bg-[#F3F5FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1F3FD1] disabled:cursor-not-allowed";

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
      "border-[#D9DCE5]",
      "bg-white",
      "text-[#1B1E28]",
      "hover:border-[#1F3FD1]",
      "hover:bg-[#F3F5FF]"
    );
    // Highlight correct answer in green
    if (button.textContent.trim() === correctAnswer) {
      button.classList.add(
        "border-[#12915A]",
        "bg-[#E8F6EE]",
        "text-[#0B5E3A]"
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
    selectedButton.classList.add("border-[#D93A2B]", "bg-[#FDEDEB]", "text-[#8F2018]");
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

