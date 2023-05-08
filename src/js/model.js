import { API_URL, KEY, RES_PER_PAGE } from './config.js';
import { getJson, sendJson } from './helpers.js';

//state === data in the aplication KEEP IN MAIN
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },

  bookMarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    //
    const data = await getJson(`${API_URL}${id}`);
    state.recipe = createRecipeObject(data);

    if (state.bookMarks.some(boockmarck => boockmarck.id == id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(`Hi from module} ⚙🤖`);
  } catch (error) {
    //Temporary error hendling
    console.log(`${error} 💣💣💣`);
    throw error;
  }
};

export const loadSearchResult = async function (query) {
  try {
    //https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>

    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    // console.log(data);

    state.search.results = data.data.recipes.map(elem => {
      return {
        id: elem.id,
        title: elem.title,
        publisher: elem.publisher,
        image: elem.image_url,
      };
    });

    state.search.page = 1;
  } catch (error) {
    console.log(`${error} 💣💣💣`);
    throw error;
  }
};

export const getSearchtResultPage = function (page = state.search.page) {
  state.search.page = page;
  // console.log(state.search.page);
  const start = (page - 1) * state.search.resultPerPage; //0;
  const end = page * state.search.resultPerPage; //9;

  // console.log(start, end);

  return state.search.results.slice(start, end);
};

// loadSearchResult('avocado');
// console.log(state.search.query);

export const updateServings = function (newServings) {
  // console.log(state.recipe.servings);
  // console.log(newServings);
  state.recipe.ingredients.forEach(ing => {
    // console.log(`old ing ${ing.quantity}`);
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServing / oldServings // 2 * 8 / 4 = 4
    // console.log(`new ${ing.quantity}`);
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};

export const addBookMark = function (recipe) {
  //Add boockmat
  state.bookMarks.push(recipe);
  // console.log(recipe);

  //Marck current recipe as a boockmarked
  if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;

  // console.log(state.recipe);

  persistBookmarks();
};

export const deleteBookMark = function (id) {
  //Delete boockmark
  const index = state.bookMarks.findIndex(element => element.id === id);
  state.bookMarks.splice(index, 1);

  //Marck current recipe as NOT boockmarked
  if (id == state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);
    // console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      .filter(entry => {
        if (entry[0].startsWith('ingredient') && entry[1] !== '') {
          // console.log(entry);
          return entry;
        }
      })
      .map(ing => {
        console.log(ing);
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) {
          throw new Error(
            'Wrong ingredinat format! Please use the correct format :)'
          );
        }

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // console.log(ingredients);

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceURL,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // console.log(recipe);

    const data = await sendJson(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);

    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (error) {
    console.log('💥', error);
    throw error;
  }
};
