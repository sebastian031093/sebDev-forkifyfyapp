import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultViews from './views/resultViews.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

// import svg from 'bundle-text:../img/icons.svg';
// const logo = new URL('../img/icons.svg', import.meta.url);
// console.log(icons);
// console.log('TEST....');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipy = async function () {
  //Loading the recipe
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpiner();

    //1)Loading recipe
    await model.loadRecipe(id);

    //2) Rendering recipe
    //TODO: this function don't return enything, All it does is manipilated STATE
    recipeView.render(model.state.recipe);
    //TEST: controler
    // controlServings();
  } catch (error) {
    console.log(error);
    // recipeView.renderError(`${error} 💥💥💥💥`); this message don't have any meaningfull for the user's
    recipeView.renderError();
  }
};

const controlSearctResult = async function () {
  try {
    resultViews.renderSpiner();

    //whole protitype change..... view father class and others inheritence
    // console.log(resultViews);

    //TODO: this function don't return enything, All it does is manipilated STATE
    //1) Get search QUERY
    const query = searchView.getQuery();

    if (!query) return;
    console.log(query);

    //2) load search result
    await model.loadSearchResult(query);

    //3) Render results
    // console.log(model.state.search.results);
    // resultViews.render(model.state.search.results);
    resultViews.render(model.getSearchtResultPage(3));

    //4) Render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
    searchView.renderError();
  }
};

const controlPgination = function (goToPage = '') {
  console.log('Hi from pag controler ' + goToPage);
  //1) Render NEW results
  // console.log(model.getSearchtResultPage(goToPage));
  resultViews.render(model.getSearchtResultPage(goToPage));

  //2) Render NEW  pagination buttons
  paginationView.render(model.state.search);
};

// showRecipy();

// console.log(showRecipy());

const controlServings = function (newServings) {
  //1)Update the recipe Servings (in state)

  //here you controle the num of serving fron the view.
  model.updateServings(newServings);

  // 2)Update the recipe in the view
  recipeView.render(model.state.recipe);
  // console.log(model.state.recipe.servings);
};

//Publisher-Subscriber Pattern application
const init = function () {
  recipeView.addHandlerMethod(controlRecipy);
  recipeView.addHendlerUpDateServings(controlServings);
  searchView.addHandlerSearch(controlSearctResult);
  paginationView.addHandlerClick(controlPgination);

  //BUG: ASYNCHROUNOS BEAHEVOR HERE YOU DON'T HAVE THE DATE DANGGER
  //controlServings();
};

// controlSearctResult();

init();
