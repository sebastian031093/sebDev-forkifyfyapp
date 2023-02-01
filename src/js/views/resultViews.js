import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultsViews extends View {
  _parentElement = document.querySelector('ul[class="results"]');
}

export default new ResultsViews();
