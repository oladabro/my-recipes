const container = document.querySelector('.recipes');

const renderRecipes = async () => {
  let uri = 'http://localhost:3000/recipes';

  const res = await fetch(uri);
  const recipes = await res.json();

  let template = '';

  recipes.forEach((recipe) => {
    template += `
    <div class='recipe'>
      <h2>${recipe.name}</h2>
      <p>${recipe.instructions.slice(0, 200)}</p>
      <a href="/details.html?id=${recipe.id}">read more...</a>
    </div>
    `;
  });

  container.innerHTML = template;
};

window.addEventListener('DOMContentLoaded', () => renderRecipes());
