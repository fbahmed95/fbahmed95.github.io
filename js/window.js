$(".folders-container").on("dblclick", function(e){
    let name = $(this).data("name");
    if($(`#${name}`)){
        $(`#${name}`).show();
    }
});

const closeModal = (id) => {
    $(`#${id}`).hide();
}



var drag = d3.drag()
	.on("start", started),

	data = [
		{x: 40, y: 40, w: 500, title: "about.pdf", name: "about"},
		{x: 170, y: 310, w: 500, title: "Skills", name: "skills"},
        {x: 300, y: 120, w: 500, title: "Projects", name: "projects"},
        {x: 400, y: 80, w: 500, title: "resume.pdf", name: "resume"}
    ],
    data_terminal = [
		{x: 0, y: 0}
    ],
	winElemsCreate = d3.select("body").selectAll(".draggable")
		.data(data)
		.enter()
		.append("div")
        .attr("class", "draggable window box rounded-box box-shadow")
        .attr("id", function(d) { return d.name; })
        .style("display", "none")
		.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
		.style("width", function(d) { return d.w + "px"; })
        .style("z-index", function(d,i) { return i + 4; });
        
// append nav to windows
winElemsCreate
	.append("div")
    .attr("class", "window-top top-nav")
    .html(function(d) {
        let id =  d.name;
        let title = d.title;
        let html = `<div id="nav-button-container">
        <div class="round-nav-button" id="close" onclick="closeModal('${id}')"></div>
        <div class="round-nav-button" id="minimize"></div>
        <div class="round-nav-button" id="expand"></div>
    </div>
    <div class="window-title">${title}</div>`
        return html; 
    });


    // terminal
    var terminal = d3.select("body").selectAll("#terminal-container")
    .data([{x: 0, y: 0}])
    .classed("draggable", true)

    var winElems = d3.selectAll(".draggable")
    winElems.call(drag);

function started() {
	console.log("drag start");
    var dragElem = d3.select(this).classed("dragging", true);
    console.log("drageElem", dragElem)
    console.log("winElems", winElems)
	// Z-index switch - needs improvement
	winElems.style("z-index", 2);
	dragElem.style("z-index", 100);

	d3.event.on("drag", dragged).on("end", ended);

	function dragged(d) {
		d.x = d3.event.x;
		d.y = d3.event.y;
		dragElem
			.style("left", d.x + "px")
			.style("top", d.y + "px");
	}

	function ended() {
		console.log("drag stop");
		dragElem.classed("dragging", false);
	}
}