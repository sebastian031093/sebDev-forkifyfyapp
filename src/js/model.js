import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJson } from './helpers.js';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    //
    const data = await getJson(`${API_URL}/${id}`);

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

    console.log(`Hi from module ${JSON.stringify(state.recipe)}`);
  } catch (error) {
    //Temporary error hendling
    console.log(`${error} 💣💣💣`);
  }
};
