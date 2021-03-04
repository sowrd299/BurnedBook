/* This function will convert all unused a-tags into wiki links */

function makeWikiLinks(){
    const links = document.querySelectorAll("a");
    links.forEach(function(e){
        if(!e.href){
            e.href = "/" + e.innerText + "-info";
        }
    });
}

makeWikiLinks();
