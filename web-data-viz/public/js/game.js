
const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual time venceu a Copa do Mundo de 2018?",
    answers: [
      { text: "Alemanha", correct: false },
      { text: "Brasil", correct: false },
      { text: "França", correct: true },
      { text: "Argentina", correct: false }
    ]
  },
  {
    question: "Quem é conhecido como o 'Rei do Futebol'?",
    answers: [
      { text: "Lionel Messi", correct: false },
      { text: "Diego Maradona", correct: false },
      { text: "Pelé", correct: true },
      { text: "Zinedine Zidane", correct: false }
    ]
  },
  {
    question: 'Qual jogador detém o recorde de maior número de gols em uma única Copa do Mundo?',
    answers: [
      { text: 'Miroslav Klose', correct: false },
      { text: 'Just Fontaine', correct: true },
      { text: 'Ronaldo', correct: false },
      { text: "Gerd Müller", correct: false }
    ]
  },
  {
    question: 'O Brasil foi a primeira seleção a ganhar a Copa do Mundo de Futebol?',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Qual clube venceu a Liga dos Campeões da UEFA pela primeira vez em 2005?',
    answers: [
      { text: 'Barcelona', correct: false },
      { text: 'Manchester United', correct: false },
      { text: 'Chelsea', correct: false },
      { text: 'Liverpool', correct: true }
    ]
  },
  {
    question: 'Quem marcou o gol da vitória na final da Copa do Mundo de 2010?',
    answers: [
      { text: 'Wesley Sneijder', correct: false },
      { text: 'Andrés Iniesta', correct: true },
      { text: 'David Villa', correct: false },
      { text: 'Robin van Persie', correct: false }
    ]
  },
  {
    question: 'Qual seleção nacional venceu a Eurocopa em 2004?',
    answers: [
      { text: 'Espanha', correct: false },
      { text: 'Itália', correct: false },
      { text: 'Grécia', correct: true },
      { text: 'Portugal', correct: false },
    ]
  },
]