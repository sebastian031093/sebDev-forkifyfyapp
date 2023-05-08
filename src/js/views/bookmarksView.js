import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class BoomarksView extends View {
  _parentElement = document.querySelector('ul[class="bookmarks__list"]');
  _errorMessage = 'No boockmarks yes, Find a nice recipe and bookmark it ;)';
  _message;

  _generateMarkup() {
    // console.log(this._data);
    //#BUG: HERE YOU HACE A BUG, PLEASE USE THE THE BUGGER FOR FIND IT, REMOVE THE RETURN IN THE FUNTION
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }

  addHendlerRender(callbackHendler) {
    window.addEventListener('load', callbackHendler);
  }
}

export default new BoomarksView();
