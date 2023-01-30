import * as model from './model.js';
import recipeView from './views/recipeView.js';

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
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
  }
};

// showRecipy();

// console.log(showRecipy());

//Publisher-Subscriber Pattern application
const init = function () {
  recipeView.addHandlerMethod(controlRecipy);
};

init();
