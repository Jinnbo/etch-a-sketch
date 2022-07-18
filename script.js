// Initial Variables
let size = 16;
let color = "black";

// Variables
const grid = document.getElementById('grid');
const clear = document.getElementById('clear');
const eraser = document.getElementById('eraser');

// Event Listeners
clear.addEventListener("click", resetGrid);

let eraseOn = false;
eraser.addEventListener("click", erase);


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

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

    e.target.style.backgroundColor = color;
    
}

function resetGrid(){
    grid.innerHTML = '';
    setGrid(size);
}

function erase(){

    eraseOn = !eraseOn;

    if (eraseOn){
        color = "white";
        eraser.classList.add('active');
    } 
    else{
        color = "black";
        eraser.classList.remove('active');
    } 


    console.log(eraseOn);

}



setGrid(size);