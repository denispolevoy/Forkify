import * as model from './model';
import recipeView from './views/recipeViews';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

// const addRecipeIngredient = function () {};

//////////////////////SHOW RECIPE////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Render spinner
    recipeView.renderSpinner();

    // 1) Loading erecipe
    await model.loadRecipe(id);

    // 2) Rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Render spinner
    resultView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();

    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());
    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultView.render(model.getSearchResultsPage(goToPage));
  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
