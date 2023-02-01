import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJson } from './helpers.js';

//state === data in the aplication KEEP IN MAIN
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    //
    const data = await getJson(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(`Hi from module} ⚙🤖`);
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
    console.log(data);

    state.search.results = data.data.recipes.map(elem => {
      return {
        id: elem.id,
        title: elem.title,
        publisher: elem.publisher,
        image: elem.image_url,
      };
    });
  } catch (error) {
    console.log(`${error} 💣💣💣`);
    throw error;
  }
};

// loadSearchResult('avocado');
// console.log(state.search.query);
