class SearchViews {
  #parentEl = document.querySelector('form[class="search"]');

  getQuery() {
    const query = this.#parentEl.querySelector(
      'input[class="search__field"]'
    ).value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('input[class="search__field"]').value = '';
  }

  //Here callback is passed as a parameter
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', event => {
      event.preventDefault();
      //TODO: here the function is called no just pass as a parameter
      handler();
    });
  }
}

export default new SearchViews();
