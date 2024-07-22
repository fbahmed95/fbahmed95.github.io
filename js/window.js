$(".folders-container").on("dblclick", function(e){
    let name = $(this).data("name");
    if($(`#${name}`)){
        $(`.draggable`).css("z-index", "2");
        $(`#${name}`).css("z-index", "100");
        $(`#${name}`).show();
    }
});

const closeModal = (id) => {
    $(`#${id}`).hide();
}

var drag = d3.drag()
	.on("start", started),

	data = [
		{x: 40, y: 40, w: 500, h: 400, title: "about.txt", name: "about"},
		{x: 170, y: 310, w: 500, h: 400, title: "Skills", name: "skills"},
        {x: 300, y: 120, w: 500, h: 400, title: "Projects", name: "projects"},
        {x: 400, y: 80, w: 570, h: 600, title: "experience.pdf", name: "experience"}
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
        .style("height", function(d) { return d.h + "px"; })
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
        <div class="window-title">${title}</div>
        `
            return html;
        });

    // append content to windows
    winElemsCreate
        .append("div")
        .attr("class", "window-content")
        .attr("id", function(d){ return "content-" + d.name })

    d3.selectAll("#content-skills")
        .html(`<div id="skill_icons">
        <div class="skill-icon-container">
            <i class="devicon-amazonwebservices-original colored"></i>
            <span class="skills-title">AWS</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-confluence-plain colored"></i>
            <span class="skills-title">Confluence</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-css3-plain colored"></i>
            <span class="skills-title">CSS</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-git-plain colored"></i>
            <span class="skills-title">Git</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-github-plain colored"></i>
            <span class="skills-title">GitHub</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-html5-plain colored"></i>
            <span class="skills-title">HTML</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-java-plain colored"></i>
            <span class="skills-title">Java</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-javascript-plain colored"></i>
            <span class="skills-title">Javascript</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-jquery-plain colored"></i>
            <span class="skills-title">jQuery</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-mongodb-plain colored"></i>
            <span class="skills-title">MongoDB</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-nodejs-plain colored"></i>
            <span class="skills-title">Nodejs</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-postgresql-plain colored"></i>
            <span class="skills-title">Postgres</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-ruby-plain colored"></i>
            <span class="skills-title">Ruby</span>
        </div>
        <div class="skill-icon-container">
            <i class="devicon-vuejs-plain colored"></i>
            <span class="skills-title">Vuejs</span>
        </div>
    </div>`)

    d3.selectAll("#content-projects")
        .html(`<div id="projects-icons">
            <a href="./projects/flipcard/index.html">
                <div class="app-icon" id="flip">f.</div>
            </a>
            <a href="./projects/weather/index.html">
                <div class="app-icon" id="weather">☀︎</div>
            </a>
            <a href="./projects/name/index.html">
                <div class="app-icon" id="name">🪩</div>
            </a>

        </div>`)

    d3.selectAll("#content-experience")
        .html(`
        <div class="resume-top-container">
            <div class="resume-top">
                <div>Fareeha Ahmed • Front-End Developer</div>
            </div>
            <div class="resume-prof-pic">
                <img src="./images/resume/prof-pic.jpeg"/>
            </div>
            <div class="experience-container">
                <div class="experience-top-container">
                    <div class="experience-title">Software Engineer</div>
                    <div class="experience-time">Feb 2019 - Now</div>
                </div>
                <div class="experience-content">
                    Team lead for a five person team, overseeing team members’ progress on tasks simultaneous to own tasks. Handled clients one-on-one, providing deliverables, fielding feature requests, and managed customer service for high SLA customers. Created security documentation and architecture designs. Instrumental in the development and launch of multiple projects, each with 2-3 month turnaround time using jQuery, HTML, CSS, Node.js and Java
                </div>
            </div>
            <div class="experience-container">
                <div class="experience-top-container">
                    <div class="experience-title">Software Engineer Intern</div>
                    <div class="experience-time">Oct 2018 - January 2019</div>
                </div>
                <div class="experience-content">
                    Built web pages from mockups primarily using HTML, CSS, and Javascript. Launched beta release of flagship product within a 3 month timeframe.
                </div>
            </div>
        </div>
        `)

        d3.selectAll("#content-about")
        .html(`
            <div class="about-container">
                <h3> Hey there! I'm Fareeha. </h3>
                <p>I'm a Sacramento based front-end focused developer. I'm currently working in the startup industry, creating platforms for various startup communities.</p>
                <p>I've primarily worked with HTML, CSS, JavaScript, Node.js, Vue.js, Java, and Velocity.</p>
                <p>When I'm not coding, I'm probably drawing, surfing through Reddit, or laughing at the next meme.</p>
            </div>
        `)


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