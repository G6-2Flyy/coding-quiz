const ul =  document.querySelector("#highscores")
const scores = JSON.parse(localStorage.getItem("scores"))||[]


scores.forEach(function(score) {
    const li = document.createElement("li")
    li.textContent = score.name + " - " + score.score
    ul.appendChild(li)
})

document.querySelector("#clear").addEventListener("click", function(){
    localStorage.removeItem('scores')
    ul.innerHTML=""
})