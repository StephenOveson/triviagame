$('#submit').on('click', function(){
    let amount = $("#trivia_amount").val()
    let category = $('#category').val()
    let difficulty = $('#difficulty').val()
    window.location.href = "/triviagame/game.html?amount=" + amount + "&category=" + category + "&difficulty=" + difficulty;
})