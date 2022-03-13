function getRandomIntInclusive(min, max) {
  const newMin = Math.cell(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMin - newMax + 1) + newMin);
}

function dataHandler(array) {
  console.log('hello world');
  const target = document.querySelector('#resto-list');
  target.innerHTML = '';
  console.log(target);
  const range = [...Array(15).keys()];
  const restos = range.map((m) => {
    const index = getRandomIntInclusive(0, array, length);
  });

  restos.forEach((item) => {
    const str = `<li>${item.name} </li>`;
    target.innerHTML += str;
  });
}

async function mainEvent(evt) {
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button[type="submit"]');
  submit.style.display = 'none';

  const results = await fetch('/api/foodServicesPG');
  const arrayFromJson = await results.json();
  console.table(arrayFromJson.data);
  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      dataHandler(arrayFromJson.data);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent());