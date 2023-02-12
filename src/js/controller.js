import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultViews from './views/resultViews.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

    //0)Update results view to marck selected search results
    resultViews.update(model.getSearchtResultPage());

    //1) Updating bookmarks view
    bookmarksView.update(model.state.bookMarks);

    //2)Loading recipe
    await model.loadRecipe(id);

    //3) Rendering recipe
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

    // console.log(query);

    //2) load search result
    await model.loadSearchResult(query);

    //3) Render results
    // console.log(model.state.search.results);
    // resultViews.render(model.state.search.results);
    resultViews.render(model.getSearchtResultPage());

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
  // recipeView.render(model.state.recipe);
  // console.log(model.state.recipe.servings);
  recipeView.update(model.state.recipe);
};

const controlAddBockmark = function () {
  //1) add/remove bookmark.
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  // console.log(model.state.recipe);

  //2) Update recipe view.
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

  // 3) Render the bookmarks.
  bookmarksView.render(model.state.bookMarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookMarks);
};

const controlAddRecipe = async function (newRecipeData) {
  try {
    // console.log(newRecipeData);
    //Upload the new recipedata
    await model.uploadRecipe(newRecipeData);
  } catch (error) {
    console.log('💥', error);
    recipeView.renderError(error);
  }
};

//Publisher-Subscriber Pattern application
const init = function () {
  bookmarksView.addHendlerRender(controlBookmarks);
  recipeView.addHandlerMethod(controlRecipy);
  recipeView.addHendlerUpDateServings(controlServings);
  recipeView.addHendlerAddBoocmark(controlAddBockmark);

  searchView.addHandlerSearch(controlSearctResult);

  paginationView.addHandlerClick(controlPgination);

  //BUG: ASYNCHROUNOS BEAHEVOR HERE YOU DON'T HAVE THE DATE DANGGER
  //controlServings();

  addRecipeView.addHandlerUpLoad(controlAddRecipe);
};

// controlSearctResult();

init();
