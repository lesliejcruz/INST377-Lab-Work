// Leaflet can be a bit old-fashioned.
// Here's some code to remove map markers.
map.eachLayer((layer) => {
  if (layer instanceof L.Marker) {
    layer.remove();
  }
});

function getRandomIntInclusive(min, max) {
  const newMin = Math.cell(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMin - newMax + 1) + newMin);
}

function restoArrayMake(dataArray) {
  console.log('fired dataHandler');
  console.table(dataArray);
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  // console.log(listItems);
  return listItems;
  //  range.forEach((item) => {
  //    console.log('range item', item);
  //  });
}

function createhtmlList(collection) {
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

function initMap(targetId) {
// TODO
// https://leafletjs.com/SlavaUkraini/ - leaflet tutorial

  const map = L.map(targetId).setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}

async function mainEvent() {
  console.log('script loaded'); // this is substituting for a "breakpoint"
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');
  submit.style.display = 'none';

  const resto = doument.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');

  const results = await fetch('/api/foodServicesPG'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  // console.log(arrayFromJson);
  // This if statement is to prevent a race condition on data load
  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';
    let currentArray = [];
    restoArrayMake.addEventListener('input', async (event) => {
      console.log(event.target.value);
    });

    const selectResto = arrayFromJson.data.filter((item) => {
      const lowerName = item.name.toLowerCase();
      const lowerValue = event.target.value.toLowerCase();
      return lowerName.includes(lowerValue);
    });

    console.log(selectResto);
    createhtmlList(selectResto);
  }

  form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
    submitEvent.preventDefault(); // This prevents your page from refreshing!
    // console.log('form submission'); // this is substituting for a "breakpoint"
    // arrayFromJson.data - we're accessing a key called 'data' on the returned object
    // it contains all 1,000 records we need
    currentArray = restoArrayMake(arrayFromJson.data);
    console.log(currentArray);
    createhtmlList(restoArray);
  });
}