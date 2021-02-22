const container = document.querySelector('.recipes');
const searchForm = document.querySelector('.search');

window.addEventListener('DOMContentLoaded', () => renderRecipes());

const renderRecipes = async (term) => {
  try {
    let uri = 'http://localhost:3000/recipes?_sort=likes&_order=desc';

    if (term) {
      console.log(term);
      uri += `&q=${term}`;
      console.log(uri);
    }
    // default order is to go from lowest to highest

    const res = await fetch(uri);
    const recipes = await res.json();

    let template = '';

    recipes.forEach((recipe) => {
      template += `
      <div class='recipe'>
        <h2>${recipe.name}</h2>
        <p><small>${recipe.likes} likes</small></p>
        <p>${recipe.instructions.slice(0, 200)} </p>
        <a href="/details.html?id=${recipe.id}">więcej...</a>
      </div>
      `;
    });
    container.innerHTML = template;
  } catch (err) {
    template = `<div class="recipe">Failed to fetch data</div>`;
    container.innerHTML = template;
  }
};

const searchTerm = (e) => {
  e.preventDefault();

  renderRecipes(searchForm.term.value.trim());
};

searchForm.addEventListener('submit', searchTerm);
