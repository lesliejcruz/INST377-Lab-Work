function getRandomIntInclusive(min, max) {
  const newMin = Math.cell(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMin - newMax + 1) + newMin);
}

function restoArrayMake(dataArray) {
  console.log('fired dataHandler');
  // console.table(dataArray); // this is called "dot notation"
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  //  range.forEach((item) => {
  //  console.log('range item', item);
  // });
  });
  // console.log(listItems);
  // return listItems;
}

function createHtmlList(collection) {
  console.log('fired HTML creator');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() {
  console.log('script loaded'); // this is substituting for a "breakpoint"
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');
  submit.style.display = 'none';

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  if (arrayFromJson.data.length > 0) {
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      submit.style.display = 'block';
      const restoArray = restoArrayMake(arrayFromJson.data);
      createHtmlList(restoArray);
    });
  }
}
// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent());