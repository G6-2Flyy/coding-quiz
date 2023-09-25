
var questions = [
    {
        quiz: "Ask a question",
        correctAnswer: "answer1",
        answers: [
            "answer1", "answer2", "answer3","answer4"
        ]
    },
    {
        quiz: "Ask a question",
        correctAnswer: "answer1",
        answers: [
            "answer1", "answer2", "answer3","answer4"
        ]
    },
    {
        quiz: "Ask a question",
        correctAnswer: "answer1",
        answers: [
            "answer1", "answer2", "answer3","answer4"
        ]
    },
    {
        quiz: "Ask a question",
        correctAnswer: "answer1",
        answers: [
            "answer1", "answer2", "answer3","answer4"
        ]
    },
    {
        quiz: "Ask a question",
        correctAnswer: "answer1",
        answers: [
            "answer1", "answer2", "answer3","answer4"
        ]
    }
]
var currentIndex = 0;
var timerId;
var counter = 0;
var timer = document.querySelector("#timer")
var correctAnswer = 0;

function startTimer() {
    timerId = setInterval(function() {
        counter--;
        if (counter <= 0) {
            // game over
            clearInterval(timerId);
        }
        timer.innerText = counter;
    }, 1000) 
}

function randomize(arr){
    return arr.sort(() => Math.random()- 0.5)
}

function checkAnswer(selectedAnswer) {
    var result = document.querySelector("#result")
    console.log(currentIndex);
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
        correctAnswer = correctAnswer + 5
        result.innerText = "Correct!"
    } else {
        counter = counter - 10;
        if (counter<=0) {
            counter = 0;
            clearInterval(timerId);
        }
        result.innerText = "Wrong!"
    } 
}

var nextQuestion = (event) => {
    if (event.target.tagName === "BUTTON") {
        if (currentIndex>=questions.length) {
            // game over
            clearInterval(timerId);
            return
        }
        checkAnswer(event.target.innerText)
        currentIndex++;
        setTimeout(function(){
            console.log("running")
            showQuestion();
        }, 500);
        
    }
}

function showQuestion() {
    console.log(currentIndex);
    var question = questions[currentIndex]
    question.answers = randomize(question.answers)
    var content = `
    <h1>${question.quiz}</h1>
    <div class="answers">
        <button>1. ${question.answers[0]}</button>
        <button>2. ${question.answers[1]}</button>
        <button>3. ${question.answers[2]}</button>
        <button>4. ${question.answers[3]}</button>
    </div>
    <hr>
    <p id="result"></p>`
    document.querySelector("#question-container").innerHTML = content
    document.querySelector(".answers").addEventListener("click", nextQuestion)
}



function start() {
    document.querySelector("#intro").style.display="none"
    document.querySelector("#question-container").style.display="block"
    counter = 60;
    timer.innerText = counter;
    startTimer();
    questions = randomize(questions)
    showQuestion();
}



var startBtn = document.querySelector("#start")

startBtn.addEventListener("click", start)

