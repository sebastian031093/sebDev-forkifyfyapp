import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class ResultsViews extends View {
  _parentElement = document.querySelector('ul[class="results"]');
  _errorMessage = 'No recipes found for your Query, Please try again ;)';
  _message;

  _generateMarkup() {
    // console.log(this._data);
    //#BUG: HERE YOU HACE A BUG, PLEASE USE THE THE BUGGER FOR FIND IT, REMOVE THE RETURN IN THE FUNTION
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultsViews();
