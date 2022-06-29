function drawImageToCanvas(image, canvas){
	// Make sure the image will be correctly scaled on the canvas
	canvas.width = image.naturalWidth;
  	canvas.height = image.naturalHeight;
	const ctx = canvas.getContext('2d');

	// Draw now if the image is already loaded or later if it isn't
	ctx.drawImage(image, 0, 0);
	image.addEventListener('load', e => {
		ctx.drawImage(image, 0, 0);
	});

	image.style.display = "none";
}

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

	// We replace the image with a canvas to get better behavior
	drawImageToCanvas(
		document.getElementById("worldmap-image"), 
		document.getElementById("worldmap-canvas")
	);
})();