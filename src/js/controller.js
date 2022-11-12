const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
console.log('Test bundler');

const showRecipy = async function () {
  try {
    const resFetchPro = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886zzzz'
    );

    const data = await resFetchPro.json();
    // console.log(resFetchPro);
    // console.log(data);

    if (!resFetchPro.ok)
      throw new Error(`${data.message} (${resFetchPro.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
    };
  } catch (error) {
    console.log(error);
  }
};

showRecipy();
