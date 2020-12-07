(function () {
    let markerXText = document.getElementById("markerx");
    let markerYText = document.getElementById("markery");
    let marker = document.getElementById("mapmarker");
    let map = document.getElementById("worldmap");

    map.ondblclick = function(event) {
        console.log("Moving the flag!");
        marker.style.left = event.offsetX + "px";
        marker.style.top = event.offsetY + "px";
        markerXText.innerText = event.offsetX;
        markerYText.innerText = event.offsetY;
    }
})();