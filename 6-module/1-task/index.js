/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;

  #rows = [];

  constructor(rows) {
    this.#rows = rows || this.#rows;

    this.#render();
  }

  #render() {
    const temp = document.createElement('div');
    temp.innerHTML = this.#template();
    this.elem = temp.firstElementChild;

    this.elem.addEventListener('click', event => {
      if (event.target.className != 'removeButton') return;
      event.target.closest('tr').remove();
    })
  }

  #template() {
    return `
    <table>
      <thead>
        <tr>
          ${Object.keys(this.#rows[0]).map(item => `<th>${item}</th>`).join('\n')}
        </tr>
      </thead>
      <tbody>
        ${this.#rows.map(item => Object.values(item).map((item, index, array) => {
          if (index === 0) {
            return `<tr>\n<td>${item}</td>`;
          } else if (index === array.length - 1) {
            return `<td>${item}</td>\n<td><button class='removeButton'>X</button></td>\n</tr>`;
          } else {
            return `<td>${item}</td>`;
          };
        }).join('\n')).join('\n')}
      </tbody>
    </table>
    `;
  }

}
