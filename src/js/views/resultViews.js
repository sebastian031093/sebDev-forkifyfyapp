import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultsViews extends View {
  _parentElement = document.querySelector('ul[class="results"]');

  _generateMarkup() {
    // console.log(this._data);

    this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(recipes) {
    return `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#23456">
          <figure class="preview__fig">
            <img src="${recipes.image}" alt="${recipes.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipes.title}</h4>
            <p class="preview__publisher">${recipes.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>      
      `;
  }
}

export default new ResultsViews();
