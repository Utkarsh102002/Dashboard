let quesJSON = [
  {
    correctAnswer: "Three ",
    options: ["vansh", "Three ", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: "L. Frank Baum",
    options: [
      "Suzanne Collins",
      "James Fenimore Cooper",
      "L. Frank Baum",
      "Donna Leon",
    ],
    question: "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: "Atlanta United",
    options: [
      "Atlanta United",
      "Atlanta Impact",
      "Atlanta Bulls",
      "Atlanta Stars",
    ],
    question: "Which of these is a soccer team based in Atlanta?",
  },
  {
    correctAnswer: "A Nanny",
    options: ["A Sow", "A Lioness", "A Hen", "A Nanny"],
    question: "A female goat is known as what?",
  },
  {
    correctAnswer: "P. L. Travers",
    options: [
      "J. R. R. Tolkien",
      "P. L. Travers",
      "Lewis Carroll",
      "Enid Blyton",
    ],
    question: "Which author wrote 'Mary Poppins'?",
  },
];

let score = 0;
let currentQuestion = 0;
let totalScore = quesJSON.length;

//Accessing all the elements:
const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextEl = document.getElementById("next");

nextEl.addEventListener("click", () => {
  scoreEl.textContent = `Score: ${score} / ${totalScore}`;
  nextQuestion();
});

function showQuestion() {
  // Destructuring the object
  let { correctAnswer, options, question } = quesJSON[currentQuestion];

  //Setting question text content
  questionEl.textContent = question;

  let shuffledOptions = shuffleOptions(options);

  //Populating the Options div with the buttons.
  shuffledOptions.forEach((i) => {
    let btn = document.createElement("button");
    btn.textContent = i;
    optionEl.appendChild(btn); // append is very imp.

    // Event handling on the button:
    btn.addEventListener("click", () => {
      if (i === correctAnswer) {
        score++;
      } else {
        score = score - 0.25;
      }
      scoreEl.textContent = `Score: ${score} / ${totalScore}`;
      nextQuestion();
    });
  });
}
//  next question
function nextQuestion() {
  currentQuestion++;
  // Clear old options
  optionEl.innerHTML = "";
  if (currentQuestion < quesJSON.length) {
    showQuestion();
  } else {
    questionEl.textContent = "Quiz Completed!! 🎉";
    optionEl.innerHTML = "";
    nextEl.remove();
  }
}

// Shuffling the Options  imp part of app.
function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

// Start quiz
showQuestion();
