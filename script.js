// Constant Variables
const INITIAL_SIZE = 16;
const INITIAL_COLOR = "black";
const INITIAL_MODE = "color";

// Initial Variables
let size = INITIAL_SIZE;
let color = INITIAL_COLOR;
let mode = INITIAL_MODE;

// Variables
const body = document.getElementById('body');
const grid = document.getElementById('grid');
const colorActive = document.getElementById('color');
const colorContainer = document.getElementById('colorcontainer');
const colorpicker = document.getElementById('colorpicker');
const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const rainbow = document.getElementById('rainbow');
var slider = document.getElementById('slider');
var output = document.getElementById('dimension');


const fill = document.getElementById('fill');
const lines = document.getElementById('lines');

const rotateLeft = document.getElementById('rotateLeft');
const rotateRight = document.getElementById('rotateRight');
const download = document.getElementById('download');

// Fill Function variables
var x_coord = null;
var y_coord = null;
var prevColor = null;
var newColor = null;


// Event Listeners
clear.addEventListener("click", resetGrid);

let rainbowOn = false;
rainbow.addEventListener("click", rainbowMode);

let eraseOn = false;
eraser.addEventListener("click", erase);

let linesOn = true;
lines.addEventListener("click", toggleLines);

colorpicker.oninput = (e) => setColor(e.target.value);

let fillOn = false;
fill.addEventListener("click",fillBtn);


// Check for mousedown
let mouseDown = false;
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

// Initalize webpage
function initAll(){
    colorOn = false;
    colorContainer.classList.add('active');
    setGrid(size);
}

// Set grid function
function setGrid(size){

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size; i++) {

        for (let j = 0;j < size; j++){
            let gridElement = document.createElement('div')
            gridElement.classList.add('grid-element');
            
            // Set the gridElement ID to row and column coordinate 
            gridElement.setAttribute('id',`${i},${j}`);

            gridElement.addEventListener('mouseover', changeColor);
            gridElement.addEventListener('mousedown', changeColor);
            grid.appendChild(gridElement);
        }

    }

    for (let i = 0; i < size; i++) {

        for (let j = 0;j < size; j++){
            document.getElementById(`${i},${j}`).onclick = clickid;
            document.getElementById(`${i},${j}`).style.backgroundColor = "white";
        }
    }
}   

function clickid(){
    if (fillOn){

        var xyCoord = this.id.split(",");

        x_coord = xyCoord[0];
        y_coord = xyCoord[1];
        
        newColor = color;
        prevColor = "white";
        
        floodFill(x_coord, y_coord, newColor,prevColor);

    }
}



    
// Paint actual grid 
function changeColor(e){

    if (e.type === 'mouseover' && !mouseDown) return;
   
    if (fillOn) return;

    if (mode == 'color'){
        e.target.style.backgroundColor = color;
    }
    else if (mode == 'rainbow') {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}

// Reset grid
function resetGrid(){
    grid.innerHTML = '';
    setGrid(size);
}

// Erase button
function erase(){

    eraseOn = !eraseOn;

    if (eraseOn && rainbowOn) rainbowMode();

    if (eraseOn){
        color = "white";
        eraser.classList.add('active');
    } 
    else{
        color = "black";
        eraser.classList.remove('active');
        colorMode();
    } 

}

// Rainbow button
function rainbowMode(){

    rainbowOn = !rainbowOn;

    if (rainbowOn && eraseOn) erase();

    if (rainbowOn){
        mode = 'rainbow';
        rainbow.classList.add('active');
    }
    else{
        mode = 'color';
        rainbow.classList.remove('active'); 
    }

}


// Update size variable
output.innerHTML = slider.value;

slider.oninput = function() {
    size = this.value;
    output.innerHTML = this.value;
    resetGrid(size);
}

// Update color variable
function setColor(e){
    color = e;
}

// Toggle lines function
function toggleLines(){
    
    linesOn = !linesOn
    var gridLines = document.querySelectorAll('.grid-element');

    if (!linesOn){
        gridLines.forEach(gridLines => {
            gridLines.style.border = "none";
        });
    }
    else{
        gridLines.forEach(gridLines => {
            gridLines.style.border = "1px black solid";
        });
    }
}

// Fill function

function fillBtn(){

    fillOn = !fillOn;

    if (fillOn){
        fill.classList.add('active');
        body.classList.add('active');
    }   
    else{
        fill.classList.remove('active');
        body.classList.remove('active');
    }

}

// Flood fill                       curcolor      white
function floodFill(x_coord, y_coord, newColor, prevColor){

    //console.log(x_coord);
    //console.log(y_coord);

    // Check if coords are out of bound
    if (x_coord > (size-1) || y_coord > (size-1) || x_coord < 0 || y_coord < 0) return;
    
    //console.log(document.getElementById(`${x_coord},${y_coord}`).style.backgroundColor);

    if (document.getElementById(`${x_coord},${y_coord}`).style.backgroundColor != "white") return;


    document.getElementById(`${x_coord},${y_coord}`).style.backgroundColor = newColor;


    floodFill(parseInt(x_coord)-1,y_coord,newColor,prevColor);
    floodFill(parseInt(x_coord)+1,y_coord,newColor,prevColor);
    floodFill(x_coord, parseInt(y_coord)+1,newColor,prevColor);
    floodFill(x_coord, parseInt(y_coord)-1,newColor,prevColor);

}

initAll();

/*
TODO:
- Add fill button
- Add download button

- Make tablet and mobile compatible 

*/