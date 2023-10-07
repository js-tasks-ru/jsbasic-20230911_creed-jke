function hideSelf() {
  const target = document.querySelector('.hide-self-button');

  target.addEventListener('click', (event) => event.target.hidden = true);
}
