const grid = document.getElementById('grid');


grid.style.gridTemplateColumns = `repeat(16, 1fr)`;
grid.style.gridTemplateRows = `repeat(16, 1fr)`;

for (let i = 0; i < 16*16; i++) {

    const gridElement = document.createElement('div')

    gridElement.style.width = `${560/16}px`;
    gridElement.style.height = `${560/16}px`;


    gridElement.classList.add('grid-element')
    grid.appendChild(gridElement)
  }