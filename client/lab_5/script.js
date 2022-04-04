// function getRandomIntInclusive(min, max) {
//  const newMin = Math.cell(min);
//  const newMax = Math.floor(max);
//  return Math.floor(Math.random() * (newMin - newMax + 1) + newMin);
//}

//function restoArrayMake(dataArray) {
//  console.log('fired dataHandler');
//  console.table(dataArray);
//  const range = [...Array(15).keys()];
//  const listItems = range.map((item, index) => {
//    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
//    return dataArray[restNum];
//  });
//  console.log(listItems);
//  return listItems;
//  range.forEach((item) => {
//    console.log('range item', item);
//  });
//}

// function createhtmlList(collection) {
////  console.log('fired HTML creator');
//  console.log(collection);
//  const targetList = document.querySelector('.resto-list');
//  targetList.innerHTML = '';
//  collection.forEach((item) => {
//    const {name} = item;
//    const displayName = name.toLowerCase();
//    const injectThisItem = `<li>${displayName}</li>`;
//    targetList.innerHTML += injectThisItem;
//  });
//}

// As the last step of your lab, hook this up to index.html
async function mainEvent() { // the async keyword means we can make API requests
  // console.log('script loaded'); // this is substituting for a "breakpoint"
  const form = document.querySelector('.main_form');
  // const submit = document.querySelector('.submit_button');
  // submit.style.display = 'none';
  // if (arrayFromJson.data.length > 0) {
    // submit.style.display = 'block';
  form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
    submitEvent.preventDefault(); // This prevents your page from refreshing!
    console.log('form submission'); // this is substituting for a "breakpoint"
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    console.table(arrayFromJson.data); // This is called "dot notation "
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it contains all 1,000 records we need
    // const restoArray = restoArrayMake(arrayFromJson.data);
    // createhtmlList(restoArray);
  });
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
