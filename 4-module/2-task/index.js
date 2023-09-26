function makeDiagonalRed(table) {
  
  let counter = 0;

  for (let tr of table.firstElementChild.children) {
    tr.cells[counter].style.backgroundColor = 'red';
    counter++;
  }
}
