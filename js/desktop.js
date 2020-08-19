// set date
let day_map = {
    0 : "Sun", 
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thurs",
    5: "Fri",
    6: "Sat"
}
const customHours = (date) => { return (date.getHours() + 24) % 12 || 12; }
const customMins = (date) => { return date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes(); }
const getAMPM = (date) => { return date.getHours() > 11 ? "PM" : "AM"; }

setInterval(displayclock,500);
function displayclock(){
    let today = new Date();
    let day = day_map[today.getDay()]
    let hour = customHours(today);
    let min = customMins(today);
    let am_pm = getAMPM(today);
    $("#date").html(
        `${day} ${hour}:${min} ${am_pm}`
    )
}