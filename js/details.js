const id = new URLSearchParams(window.location.search).get('id'); //1
const nav = document.querySelector('nav');
const deleteBtn = document.querySelector('.delete-recipe-btn');
const likesBtn = document.querySelector('.far');
console.log(likesBtn);

console.log(window.location.search); //?id=1

const renderDetails = async () => {
  const response = await fetch(`http://localhost:3000/recipes/${id}`);
  const details = await response.json();
  console.log(details.ingredients);

  let array = '';
  const renderIngredients = () => {
    details.ingredients.forEach((el) => {
      array += `<li>${el},</li>`;
    });
    return array;
  };

  const template = `
  <div class='recipe'>
  <div class ='likes-container'>
    <h2>${details.name}</h2><small>${
    details.likes
  } <i class="far fa-thumbs-up"></i></small></div>
 
        <img src=${details.image} alt="" title=${details.imageName}>

    <p>Składniki:</p>
    <ul>${renderIngredients()}</ul>
    <p>${details.instructions}</p>
    <a href="/" class='main-site-btn'>Strona główna...</a>
  </div>
  
  `;

  nav.innerHTML = template;
};

const removeRecipe = async (e) => {
  await fetch(`http://localhost:3000/recipes/${id}`, {
    method: 'DELETE',
  });
  window.location.replace('/index.html');
};

const addLike = () => {
  console.log('add like');
};
likesBtn.addEventListener('click', addLike);

deleteBtn.addEventListener('click', removeRecipe);

window.addEventListener('DOMContentLoaded', () => renderDetails());
