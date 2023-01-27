var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

var min =0;
var sec =0;
var mill =0;

window.onload = function() {
    //game()
}

function game(){
    //initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpg";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

//timer and Start/Refresh Button
function btnStart() {
    game();
    document.getElementById("start").disabled=true;
    t_interval = setInterval(timer, 1000);
}

function btnRefresh() {
    document.getElementById("start").disabled=false;
    clearInterval(t_interval);
    min =0;
    sec =0;
    mill =0;
    write_time();
    //delete all children of board and pieces
    document.getElementById("board").innerHTML='';
    document.getElementById("pieces").innerHTML='';
}

function timer() {
    sec++;
        if(sec>59) {
            sec=0;min++;
        }
    write_time();
}

function write_time() {
    if(min <10) {
        document.getElementById("min").innerText = ('0'+min+':')
    } 
    else document.getElementById("min").innerText = (min+':');
               
    if(sec<10){                     
        document.getElementById("sec").innerText = ('0'+sec);
    }       
    else document.getElementById("sec").innerText = (sec);
}

//wincondition
function win() {
    
}