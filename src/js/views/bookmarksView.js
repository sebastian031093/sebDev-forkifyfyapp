import icons from 'url:../../img/icons.svg';
import View from './view.js';

class BoomarksView extends View {
  _parentElement = document.querySelector('ul[class="bookmarks__list"]');
  _errorMessage = 'No boockmarks yes, Find a nice recipe and bookmark it ;)';
  _message;

  _generateMarkup() {
    // console.log(this._data);
    //#BUG: HERE YOU HACE A BUG, PLEASE USE THE THE BUGGER FOR FIND IT, REMOVE THE RETURN IN THE FUNTION
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(recipes) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          recipes.id == id ? 'preview__link--active' : ''
        } " href="#${recipes.id}">
          <figure class="preview__fig">
            <img src="${recipes.image}" alt="${recipes.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipes.title}</h4>
            <p class="preview__publisher">${recipes.publisher}</p>
          </div>
        </a>
      </li>      
      `;
  }
}

export default new BoomarksView();
