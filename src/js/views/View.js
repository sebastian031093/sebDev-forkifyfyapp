import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data the date to be render (e.g. recipe)
   * @param {boolean} [render] if false, create markup string instead of rendering to the DOM
   * @returns [undefined | string] A markup string is returned if render=false
   * @this {Object} View instance
   * @author Seb Dev
   * @todo Finish implementation
   */

  render(data, render = true) {
    // console.log(data);
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError();

    // console.log(`Hi agin from View.....🎨🎨🎨`);
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //TODO: How to work this is super important (Developing a DOM Updating Algorithm)
  update(data) {
    this._data = data;
    // console.log(this._data);

    const newMarkup = this._generateMarkup();

    //document.createRange() here return RANGE
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElemnts = Array.from(newDOM.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // console.log(newElemnts);
    // console.log(currentElement);

    newElemnts.forEach((newEl, index) => {
      const currenEl = currentElement[index];

      // console.log(currenEl, newEl.isEqualNode(currenEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(currenEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('🍔', newEl.firstChild?.nodeValue.trim());

        currenEl.textContent = newEl.textContent;
      }

      // Updates change ATTRIBUTES
      if (!newEl.isEqualNode(currenEl))
        Array.from(newEl.attributes).forEach(attr =>
          currenEl.setAttribute(attr.name, attr.value)
        );
    });
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
    // console.log(message);
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
