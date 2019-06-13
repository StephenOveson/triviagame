let questions;
let cursor;
let selectedAnswer;
let correctAnswer;
let timerQ;
let timesCorrect = 0;
let timesIncorrect = 0;
let triviaQ = $('#triviaQ');
let triviaA = $('tbody');
let triviaTimer = $('#triviaTimer');
let triviaUpdate = $('#triviaUpdate');
let triviaTitle = $('#triviaTitle');
let newGlobalRow = $('<tr>')
let timeLeft;
let timerId;


let urlParams = new URLSearchParams(window.location.search);
function getParamOrDefault(param, defaultValue) {
    return urlParams.has(param) ? urlParams.get(param) : defaultValue;
}
let amount = getParamOrDefault('amount', '10');
let category = getParamOrDefault('category', '11');
let difficulty = getParamOrDefault('difficulty', 'hard');
let queryURL = "https://opentdb.com/api.php?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty;


$('#submit').on('click', function(){
    window.location.href = "/game.html?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty;
})


function questionSetup() {
    if (cursor < 0){
        $('#triviaUpdate').empty();
        $('#triviaUpdate').html('<h1>You Tried!</h1>');
        $('#triviaUpdate').append('<h2>Look you got something right for once.</h2>' + timesCorrect);
        $('#triviaUpdate').append('<h2>No surprise</h2>' + timesCorrect);
        return;
    }
    let question = questions[cursor]
    cursor--;
    correctAnswer = question.correct_answer;
    triviaA.empty();
    triviaQ.empty();
    triviaQ.html(question.question);
    let randomAnswer = Math.floor(Math.random() * question.incorrect_answers.length + 1);
    question.incorrect_answers.splice(randomAnswer, 0, question.correct_answer);
    for (let a = 0; a < question.incorrect_answers.length; a++) {
        let newRow = $('<tr>').on('click', triviaSelect);
        triviaA.append(newRow);
        newRow.html(question.incorrect_answers[a]);
    }
    timeLeft = 30;
    timerId = setInterval(countdown, 1000);
}

function triviaSelect() {
    let selectedAnswer = this.innerHTML;
    triviaA.empty();
    clearTimeout(timerId)
    if (selectedAnswer === correctAnswer) {
        triviaA.html(newGlobalRow.html("Wait you accidentally got that right.\n"));
        triviaA.append(newGlobalRow.append(correctAnswer));
        timesCorrect++;
        setTimeout(questionSetup, 5000)
    } else if (timeLeft == -1) {
        triviaA.html(newGlobalRow.html("Try not to take too long. Here's the answer anyways.\n"));
        triviaA.append(newGlobalRow.append(correctAnswer));
        timesIncorrect++;
        setTimeout(questionSetup, 5000)
    } else {
        triviaA.html(newGlobalRow.html("Wrong answer. Nerd.\n"));
        triviaA.append(newGlobalRow.append('Your answer: ' + selectedAnswer));
        triviaA.append(newGlobalRow.append('\n\nLet me show you the CORRECT answer\n'));
        triviaA.append(newGlobalRow.append(correctAnswer));
        timesIncorrect++;
        setTimeout(questionSetup, 5000)
    }
}

function countdown() {
    if (timeLeft == -1) {
        triviaSelect();
    } else if (selectedAnswer === correctAnswer) {
        triviaSelect();
    } else {
        $('#triviaTimer').html(timeLeft + ' seconds remaining')
        timeLeft--;
    }
}

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    questions = response.results;
    cursor = response.results.length - 1;
    questionSetup();
});