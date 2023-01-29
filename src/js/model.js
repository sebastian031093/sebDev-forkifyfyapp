import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const resFetchPro = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await resFetchPro.json();

    if (!resFetchPro.ok)
      throw new Error(`${data.message} (${resFetchPro.status})`);

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
    console.log(error);
  }
};
