import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    console.log(data);
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError();

    console.log(`Hi agin from View.....🎨🎨🎨`);
    this._data = data;

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpiner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    console.log(message);
    const markut = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}!</p>
      </div>
    
    `;

    // this.#parentElement.innerHTML = '';
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markut);
  }

  renderMessage(message = this._message) {
    const markut = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}!</p>
      </div>
    
    `;

    // this.#parentElement.innerHTML = '';
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markut);
  }
}
