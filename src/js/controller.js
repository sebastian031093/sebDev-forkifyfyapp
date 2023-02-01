import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

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
  } catch (error) {
    console.log(error);
    // recipeView.renderError(`${error} 💥💥💥💥`); this message don't have any meaningfull for the user's
    recipeView.renderError();
  }
};

const controlSearctResult = async function () {
  try {
    //TODO: this function don't return enything, All it does is manipilated STATE
    //1) Get search QUERY
    const query = searchView.getQuery();

    if (!query) return;
    console.log(query);

    //2) load search result
    await model.loadSearchResult(query);

    //3)Render results
    console.log(model.state.search.results);
  } catch (error) {}
};

// showRecipy();

// console.log(showRecipy());

//Publisher-Subscriber Pattern application
const init = function () {
  recipeView.addHandlerMethod(controlRecipy);
  searchView.addHandlerSearch(controlSearctResult);
};

// controlSearctResult();

init();
