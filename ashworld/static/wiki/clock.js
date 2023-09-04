let clockDisp = document.getElementById("datetime");
let template = clockDisp.innerHTML;

let hours = ["Er", "First", "Lurly", "Early Mid", "Late Mid", "Great"];
let sections = ["Night", "Morning", "Afternoon", "Evening"];

function updateTime(disp) {

    var d = new Date();
    var hour = (d.getHours() + 1) % 24;

    disp.innerHTML = template
            .replace("HOUR", hours[hour % hours.length])
            .replace("SECTION", sections[Math.floor(hour / hours.length)]);

    setTimeout(updateTime, 900000, disp);
}

updateTime(clockDisp);