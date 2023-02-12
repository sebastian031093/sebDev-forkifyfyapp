import icons from 'url:../../img/icons.svg';
import View from './view.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('form[class="upload"]');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonOpen = document.querySelector('.nav__btn--add-recipe');
  _buttonClose = document.querySelector('.btn--close-modal"');

  constructor() {
    super();
    this.#addHendlerShowWindow();
    // this.#addHendlerHidenWindow();
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

  // #addHendlerHidenWindow() {
  //   this._buttonClose.addEventListener('click', this.toggle.bind(this));
  //   this._overlay.addEventListener('click', this.toggle.bind(this));
  // }

  _generateMarkup() {}
}

export default new AddRecipeView();
