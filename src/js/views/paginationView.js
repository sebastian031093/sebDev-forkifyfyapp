import icons from 'url:../../img/icons.svg';
import View from './View.js';

class paginationView extends View {
  _parentElement = document.querySelector('div[class="pagination"]');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      event.preventDefault();
      const btnPagination = event.target.closest('.btn--inline');
      console.log(btnPagination);
      if (!btnPagination) return;

      const goToPage = +btnPagination.dataset.goto;
      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    // console.log(numPages);

    // console.log(this._data.page);
    //TODO: Create a generate method like name generateButton and refactor this code :)
    //Page 1 and there are other pages

    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //last page
    //BUG: data-goto="", create a bug an find when you have this mistake data-goto''
    if (currentPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
      
      `;
    }

    //other page
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>


        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    //page 1 and thete NO are other pages
    return '';
  }
}

export default new paginationView();
