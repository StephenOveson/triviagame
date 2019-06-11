// let questions = [{...}, {...}] // response.result
// let cursor = 9 // response.result.length - 1

// let selectedA;

// ajax.then() // setup questions and cursor and invoke questionSetup

// questionSetup() {
//     let question = questions[cursor];
//     // Set the html of question/answer tbody etc... as well as correctAnswer, on click handlers, and the timer
//     triviaQ.html(question.question);
//     triviaA. etc...

//     cursor--;
// }

// onclick() {
//     // set selectedA
//     endOfQuestion()
// }

// endOfQuestion() {
//     // display correct or wrong or timer out
//     // wait a fixed amount of time or wait for continue button press
//     if (cursor < 0) {
//         // end of game
//     } else {
//         questionSetup()
//     }
// }

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
let queryURL = "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    questions = response.results;
    cursor = response.results.length - 1;
    let results = response.results;
    for (let x = 0; x < results.length; x++) {
        let result = results[x];
        correctAnswer = result.correct_answer;
        triviaA.empty();
        triviaQ.html(result.question);
        let randomAnswer = Math.floor(Math.random() * result.incorrect_answers.length + 1);
        result.incorrect_answers.splice(randomAnswer, 0, result.correct_answer);
        for (let a = 0; a < result.incorrect_answers.length; a++) {
            let newRow = $('<tr>').on('click', triviaSelect);
            triviaA.append(newRow);
            newRow.html(result.incorrect_answers[a]);
        }
    }
    async: true;
});

function triviaSelect() {
    let selectedAnswer = this.innerHTML;
    triviaA.empty();
    if (selectedAnswer === correctAnswer) {
        triviaA.html(newGlobalRow.html("Wait you accidentally got that right.\n"));
        triviaA.append(newGlobalRow.append(correctAnswer));
        timesCorrect++;
    } else if (timerQ < 0) {
        triviaA.html(newGlobalRow.html("Try not to take too long. Here's the answer anyways.\n"));
        triviaA.append(newGlobalRow.append(correctAnswer));
        timesIncorrect++;
    } else {
        triviaA.html(newGlobalRow.html("Wrong answer. Nerd.\n"));
        triviaA.append(newGlobalRow.append('Your answer ' + selectedAnswer));
        triviaA.append(newGlobalRow.append('\n\nLet me show you the CORRECT answer\n'));
        triviaA.append(newGlobalRow.append(correctAnswer));
        timesIncorrect++;
    }
};

$( document ).ajaxComplete(function() {
console.log(questions)
});

