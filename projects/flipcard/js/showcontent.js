$(".enter-button").click(() => {
    $("#enter-main-container").fadeOut();
    setTimeout(function(){ $("#game-container").fadeIn(); }, 700);
})