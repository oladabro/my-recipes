// find objects

const id = new URLSearchParams(window.location.search).get('id'); //1
const nav = document.querySelector('nav');
const deleteBtn = document.querySelector('.delete-recipe-btn');
const likesBtn = document.querySelector('.far');
const likes = document.querySelector('.likes');

// console.log(window.location.search); //?id=1

// run render recipe details when DOM is loaded

window.addEventListener('DOMContentLoaded', () => renderDetails());

// render details of a recipe

let details = '';

const renderDetails = async () => {
  const response = await fetch(`http://localhost:3000/recipes/${id}`);
  details = await response.json();

  let array = '';
  const renderIngredients = () => {
    details.ingredients.forEach((el) => {
      array += `<li>${el},</li>`;
    });
    return array;
  };
  // create template that will be injected into HTML
  const template = `
  <div class='recipe'>
      <h2>${details.name}</h2>
        <img src=${details.image} alt="" title=${details.imageName}>
    <p>Składniki:</p>
    <ul>${renderIngredients()}</ul>
    <p>${details.instructions}</p>
    <a href="/" class='main-site-btn'>Strona główna...</a>
  </div>
  `;
  // inject details and number of likes
  nav.innerHTML = template;
  likes.innerHTML = details.likes;
};

// function that increases number of likes by one

const addLike = async () => {
  const response = await fetch(`http://localhost:3000/recipes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      likes: details.likes + 1,
    }),
  });

  details = await response.json();
  likes.innerHTML = details.likes;
  // change of thumbs up from far to fas
  likesBtn.classList.add('fas');
  likesBtn.removeEventListener('click', addLike);
};

likesBtn.addEventListener('click', addLike);

// function that removes recipe from database

const removeRecipe = async (e) => {
  await fetch(`http://localhost:3000/recipes/${id}`, {
    method: 'DELETE',
  });
  window.location.replace('/index.html');
};
deleteBtn.addEventListener('click', removeRecipe);
