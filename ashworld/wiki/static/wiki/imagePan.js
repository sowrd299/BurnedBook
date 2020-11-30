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

        // enforce bounds
        var rightBound = target.parentNode.clientWidth - target.clientWidth;
        if(marginX <= rightBound){
            marginX = rightBound;
        }
        if(marginX > 0){
            marginX = 0;
        }
        var bottomBound = target.parentNode.clientHeight - target.clientHeight;
        if(marginY <= bottomBound){
            marginY = bottomBound;
        }
        if(marginY > 0){
            marginY = 0;
        }

        // actually move
        target.style.margin = marginY + "px 0px 0px " + marginX + "px";
    }

}

function onMouseUp(event) {

    console.log("Panning ending!");

    if(event.currentTarget == target){
        target.onmousemove = null;
    }
}



// SETUP
var pannables = document.getElementsByClassName("pannable");
for(var i = 0; i < pannables.length; i++){
    console.log("Setting up for " + pannables.item(i));
    pannables.item(i).onmousedown = onMouseDown;
    pannables.item(i).onmouseup = onMouseUp;
    pannables.item(i).draggable = false;

    var children = pannables.item(i).children;
    for(var i = 0; i < children.length; i++){
        children.item(i).draggable = false;
    }

}