function highlight(table) {

  let rows = table.lastElementChild.rows;

  for (let row of rows) {
    
    if (row.cells[1].textContent < 18) row.style.textDecoration = 'line-through';

    (row.cells[2].textContent === 'm') ? row.classList.add('male') : row.classList.add('female');

    if (row.cells[3].dataset.available) {
      (row.cells[3].dataset.available === 'true') ? row.classList.add('available') : row.classList.add('unavailable');
    } else {
      row.hidden = true;
    };

  }

}
