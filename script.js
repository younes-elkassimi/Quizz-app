const questions = [
  {
    question: "Wich is larger animal in the world",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Blue whale",
        correct: true,
      },
      {
        text: "Elephent",
        correct: false,
      },
      {
        text: "Giraffe",
        correct: false,
      },
    ],
  },

  {
    question: "what is the touristic city in morooco",
    answers: [
      {
        text: "agadir",
        correct: false,
      },
      {
        text: "casa",
        correct: false,
      },
      {
        text: "kech",
        correct: true,
      },
      {
        text: "jadida",
        correct: false,
      },
    ],
  },

  {
    question: "wich the capital of france ",
    answers: [
      {
        text: "monaco",
        correct: false,
      },
      {
        text: "monpolie",
        correct: false,
      },
      {
        text: "marsielle",
        correct: false,
      },
      {
        text: "paris",
        correct: true,
      },
    ],
  },

  {
    question: "ho is the first black prsdt of USA",
    answers: [
      {
        text: "bush",
        correct: false,
      },
      {
        text: "obbama",
        correct: true,
      },
      {
        text: "bayden",
        correct: false,
      },
      {
        text: "kinnidy",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
