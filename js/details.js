const id = new URLSearchParams(window.location.search).get('id'); //1
const nav = document.querySelector('nav');

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
    <h2>${details.name}</h2>
    
    <img src=${details.image} alt=${details.imageName}>
    <p>Składniki:</p>
    <ul>${renderIngredients()}</ul>
    <p>${details.instructions}</p>
    <a href="/" class='main-site'>Strona główna...</a>
  </div>
  
  `;

  nav.innerHTML = template;
};

window.addEventListener('DOMContentLoaded', () => renderDetails());
