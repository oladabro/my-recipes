// javascript for create.html

//     method: 'POST',
//     body: JSON.stringify(newRecipe),
//     headers: { 'Content-Type': 'application/json' },

const form = document.querySelector('form');

const createRecipe = async (e) => {
  e.preventDefault();

  const stringToArray = form.ingredients.value;
  const array = stringToArray.split(',');
  console.log(array);

  const newRecipe = {
    name: form.name.value,
    image: '',
    imageName: form.name.value,
    ingredients: array,
    instructions: form.instructions.value,
    likes: 0,
  };

  await fetch('http://localhost:3000/recipes', {
    method: 'POST',
    body: JSON.stringify(newRecipe),
    headers: { 'Content-Type': 'application/json' },
  });

  window.location.replace('/index.html');
};

form.addEventListener('submit', createRecipe);
