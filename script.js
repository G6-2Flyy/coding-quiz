
var questions = [
    {
        quiz: "What was Prince's real-name?",
        correctAnswer: "Prince Rogers Nelson",
        answers: [
            "Prince Rogers Nelson", "Prince Roderick Neilson", "Prince Rodgers Nailson","Prince Rogers Neelson"
        ]
    },
    {
        quiz: "What was the name of Prince's Recording Studio",
        correctAnswer: "Paisley Park",
        answers: [
            "Paisley Park", "Purple Park", "Praisley Park", "Passion Park"
        ]
    },
    {
        quiz: "Prince was raised as a ______ ? ",
        correctAnswer: "Seventh Day Adventist",
        answers: [
            "Seventh Day Adventist", "Baptist", "Jehovah's Witness", "Buddhist"
        ]
    },
    {
        quiz: "What was Prince's most popular song? ",
        correctAnswer: "Purple Rain",
        answers: [
            "Purple Rain", "1999", "Purple Reign", "When Doves Cry"
        ]
    },
    {
        quiz: "Which song did Michael Jackson want to sing as a duet with Prince? ",
        correctAnswer: "BAD",
        answers: [
            "BAD", "BEAT IT", "MAN IN THE MIRROR", "DARLING NIKKI"
        ]
    }
]
var currentIndex = 0;
var timerId;
var counter = 0;
var timer = document.querySelector("#timer")
var correctAnswer = 0;
const scoreInput = document.querySelector("#score")
const scoreButton = document.querySelector("#score-button")

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
    var answerArr = selectedAnswer.split(' ')
    answerArr.shift()
    var response = answerArr.join(' ')

    var result = document.querySelector("#result")
    if (response === questions[currentIndex].correctAnswer) {
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
    if (event.target.tagName === "BUTTON" && currentIndex < questions.length) {
        
        checkAnswer(event.target.innerText)
        currentIndex++;
        if (currentIndex>=questions.length) {
            // game over
            clearInterval(timerId);
            document.querySelector("#question-container").style.display="none"
            document.querySelector(".final-score").style.display="block"
            document.querySelector("#total-score").innerText = correctAnswer * counter
            return
        }
        setTimeout(function(){
            showQuestion();
        }, 500);
        
    }
}

function showQuestion() {
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

    scoreButton.addEventListener("click", function(){
        const scores = JSON.parse(localStorage.getItem("scores"))||[]
        scores.push({
            score:correctAnswer * counter,
            name:scoreInput.value,



        })
        localStorage.setItem("scores", JSON.stringify(scores))
        location.href="./highscore.html"
    })



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

