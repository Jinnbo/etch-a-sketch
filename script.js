// Constant Variables
const INITIAL_SIZE = 16;
const INITIAL_COLOR = "black";
const INITIAL_MODE = "color";

// Initial Variables
let size = INITIAL_SIZE;
let color = INITIAL_COLOR;
let mode = INITIAL_MODE;

// Variables
const grid = document.getElementById('grid');
const colorActive = document.getElementById('color');
const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const rainbow = document.getElementById('rainbow');

// Event Listeners
let colorOn = false;
colorActive.addEventListener("click", colorMode );

clear.addEventListener("click", resetGrid);

let rainbowOn = false;
rainbow.addEventListener("click", rainbowMode );

let eraseOn = false;
eraser.addEventListener("click", erase);

// Check for mousedown
let mouseDown = false;
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

// Initalize webpage
function initAll(){
    colorOn = false;
    colorActive.classList.add('active');
    colorMode();
    setGrid(size);
}


function setGrid(size){

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size*size; i++) {

        let gridElement = document.createElement('div')
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}
    
function changeColor(e){

    if (e.type === 'mouseover' && !mouseDown) return;
   
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

function resetGrid(){
    grid.innerHTML = '';
    setGrid(size);
}

function erase(){

    eraseOn = !eraseOn;

    if (eraseOn && rainbowOn) rainbowMode();
    if (eraseOn && colorOn) colorMode();

    if (eraseOn){
        color = "white";
        eraser.classList.add('active');
    } 
    else{
        color = "black";
        eraser.classList.remove('active');
    } 

}

function rainbowMode(){

    rainbowOn = !rainbowOn;

    if (rainbowOn && colorOn) colorMode();
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

function colorMode(){

    colorOn = !colorOn;

    if (rainbowOn && colorOn) rainbowMode();
    if (eraseOn && colorOn) erase();
    
    
    if (colorOn){
        colorActive.classList.add('active');
    }
    else{
        colorActive.classList.remove('active');
    }
    

}

initAll();

/*
TODO:
- Add icon for website url
- Let user pick color from color button
    - Color wheel with rgb
- Let user pick size from size button
    - size from size 16 to 64

*/