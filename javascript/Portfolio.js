var button = document.querySelector("#header")

button.addEventListener("click", myfunction);

function myfunction(){
    alert("Header clicked!");
}

  //initialize the map         
  const map = L.map('leaflet').setView([52.527794, 5.434294], 15);

  //Create baselayer - tiles         
  const backgroundMap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 19
    }
  );
  
  backgroundMap.addTo(map);


  var maplibre = new maplibregl.Map({
    container: 'maplibre', // container id
    style: 'https://api.maptiler.com/maps/376f0fdc-7c5a-4c79-8a0a-85ea960874ce/style.json?key=XQDfTzE6Nuck7ThJ2kUb', // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1, // starting zoom
    hash: true
});