let triviaQ = $('#triviaQ');
let triviaA = $('#triviaA');
let triviaTimer = $('#triviaTimer');
let triviaUpdate = $('#triviaUpdate');
let triviaTitle = $('#triviaTitle');
let queryURL = "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy";


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    let results = response.results;
    for (let x = 0; x < results.length; x++) {
        let result = results[x];
        triviaQ.html(result.question);
        let randomAnswer = Math.floor(Math.random() * result.incorrect_answers.length + 1);
        result.incorrect_answers.splice(randomAnswer, 0, result.correct_answer);
        triviaA.html(result.incorrect_answers);
        for (let a = 0; a < result.incorrect_answers.length; a++) {
            let newRow = $('tbody').append('<tr>');
            newRow.html(result.incorrect_answers[a]);
        }
        console.log(result.incorrect_answers);
    }
});



