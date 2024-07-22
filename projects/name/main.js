
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

$("#enter").click(()=> {
    const newName = `${adjectives[getRandomInt(adjectives.length)]} ${nouns[getRandomInt(nouns.length)]}`;
    $("#name-container").text(newName);

    $(".enter-blob-text").hide();

    $("#name-outer-container").show();
    $("body").addClass("disco");
})

$("#refresh").click(() => {
    $("body").removeClass("disco");
    $("#name-outer-container").hide();
    $("#name-container").text("");
    $(".enter-blob-text").show();
});