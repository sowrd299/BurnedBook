var target;

var marginX = 0;
var marginY = 0;

var startX;
var startY;

function onMouseDown(event) {

    console.log("Panning starting!");
    
    target = event.currentTarget;

    startX =  event.screenX;
    startY =  event.screenY;

    target.onmousemove = onMouseMove

    console.log("Panning started!");

}

function onMouseMove(event) {


    if(event.currentTarget == target){

        // move the local margin copies
        marginX += Math.floor(event.screenX - startX);
        marginY += Math.floor(event.screenY - startY);

        startX = event.screenX;
        startY = event.screenY;

        // actually move
        _panTo(marginX, marginY);
    }

}

function onMouseUp(event) {

    console.log("Panning ending!");

    if(event.currentTarget == target){
        target.onmousemove = null;
    }
}

/*
Leave the object should stop the pan, just like letting go of the mouse
*/
function onMouseOut(event){
	onMouseUp(event);
}

/*
Executes a pan
 */
function _panTo(x, y) {

    console.log("Panning!");

    marginX = x;
    marginY = y;

    // enforce bounds
    var rightBound = target.parentNode.clientWidth - target.clientWidth;
    if(x <= rightBound){
        x = rightBound;
    }
    if(x > 0){
        x = 0;
    }
    var bottomBound = target.parentNode.clientHeight - target.clientHeight;
    if(y <= bottomBound){
        y = bottomBound;
    }
    if(y > 0){
        y = 0;
    }

    if(target){
        target.style.margin = y + "px 0px 0px " + x + "px";
    }
}

/*centers the given coords
 */
function panTo(x,y) {
    _panTo(target.parentNode.clientWidth/2 - x, target.parentNode.clientHeight/2 - y);
}


// SETUP
var pannables = document.getElementsByClassName("pannable");
for(var i = 0; i < pannables.length; i++){
    console.log("Setting up for " + pannables.item(i));
    pannables.item(i).onmousedown = onMouseDown;
    pannables.item(i).onmouseup = onMouseUp;
	pannables.item(i).onmouseout = onMouseOut;
    pannables.item(i).draggable = false;

    var children = pannables.item(i).children;
    for(var i = 0; i < children.length; i++){
        children.item(i).draggable = false;
    }

}

target = pannables.item(0); // give us A target to start with