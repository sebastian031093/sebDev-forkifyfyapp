import icons from 'url:../../img/icons.svg';
import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#addHendlerShowWindow();
    this.#addHendlerHidenWindow();
  }

  toggle() {
    // console.log('Hi from button add');
    // console.log(this);
    // event.preventDefault();
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  #addHendlerShowWindow() {
    this._buttonOpen.addEventListener('click', this.toggle.bind(this));
  }

  #addHendlerHidenWindow() {
    this._buttonClose.addEventListener('click', this.toggle.bind(this));
    this._overlay.addEventListener('click', this.toggle.bind(this));
  }

  addHandlerUpLoad(handlerCallback) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();

      //Here you take all values form de FORM in one array
      // console.log(this);
      const dataArr = [...new FormData(this)];
      // console.log(data);
      // convert data array to object
      const data = Object.fromEntries(dataArr);

      handlerCallback(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
