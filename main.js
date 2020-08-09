var i = 0;
var txt = "Type 'command' to get a list of commands"; /* The text */
var speed = 80; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    //$("#terminal-input").val($("#terminal-input").val() + txt.charAt(i));
    $("#terminal-input").attr("placeholder", $("#terminal-input").attr("placeholder")+ txt.charAt(i))
    i++;
    $("#terminal-input").attr('size', $("#terminal-input").attr("placeholder").length);
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

function resizeInput() {
    if($(this).val()){
        $(this).attr('size', $(this).val().length);
    } else {
        $(this).attr('size', $(this).attr("placeholder").length);
    }
}

$('#terminal-input')
    // event handler
    .keyup(resizeInput)
    // resize on page load
    .each(resizeInput);

var commands_text = {
    "command" : `--about --github --experience --skills --resume`,
    "--about" : `Hey! My name is Fareeha Ahmed. I am an full-stack engineer
                based in Bay Area, CA. When I'm not writing code, I'm probably 
                painting, watching crime shows, or munching on hot cheetos. Check
                my projects for more!`,

    "--github" : `<a href="https://github.com/fbahmed96" target="_blank">fbahmed95</a>`,
    "--experience" : `Three months as an intern at GSVlabs. 1.5 years as a software engineer
                     at GSVlabs. One month as team lead.`,
    "--skills" : `Leadership qualities, Javascript, Node.js`,
    "--resume" : `Go to my linkedin`,

}

const generateTerminalText = (text) => {
    return `<div class="terminal" id="terminal-outer-container">
            <div class="terminal terminal-content-container">
                <div class="terminal terminal-content">${text}</div>
            </div>
        </div>`
}
const generateCommandText = (text) => {
    return `<div class="terminal" id="terminal-outer-container">
            <div class="terminal terminal-content-container">
                <span class="terminal terminal-prepend"></span>
                <div class="terminal terminal-content">${text}</div>
            </div>
        </div>`
}

$("#terminal-input-form").submit(function( event ) {
    event.preventDefault();
    console.log(event);
    let command = $("#terminal-input").val();
    let terminal_command_text = generateCommandText(command);
    $("#terminal-input").val("");
    $("#terminal-input").attr("placeholder", "");
    command = commands_text[command];
    let terminal_text = command ? generateTerminalText(command) : generateTerminalText("this command does not exist");
    $("#terminal-outer-container").html($("#terminal-outer-container").html() + terminal_command_text + terminal_text);
  });

$("input[name=toggle]").on("click", function(){
    let checked = $(this).is(':checked');
    if(checked){
        $("#light").show();
        $("#dark").hide();
        $(".terminal").removeClass("dark")
    } else {
        $("#light").hide();
        $("#dark").show();
        $(".terminal").addClass("dark")
    }
    console.log("switch", $(this).is(':checked'))
})