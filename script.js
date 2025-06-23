const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    correctAnswer: "Au"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

document.addEventListener("DOMContentLoaded", () => {
  showQuestion();
  startTimer();
});

function showQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question-text").textContent = question.question;
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (selectedOption === correctAnswer) {
    score++;
  }
  document.querySelectorAll("#options-container button").forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.style.backgroundColor = "green";
    } else if (button.textContent === selectedOption) {
      button.style.backgroundColor = "red";
    }
  });
  document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById("next-button").disabled = true;
    resetTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("time-left").textContent = timeLeft;
  startTimer();
}

function endQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";
  document.getElementById("score-text").textContent = `Your score: ${score} out of ${questions.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  showQuestion();
  resetTimer();
}
