

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

maplibre.on('load', function(){
  console.log(maplibre.getStyle ())

  maplibre.setPaintProperty('Water', 'fill-color', '#E0F6FF')
  maplibre.setPaintProperty('Water shadow', 'fill-color', '#90c1d1')
})

function veranderKleur(){
  maplibre.setPaintProperty('Water', 'fill-color', '#90c1d1')
  maplibre.setPaintProperty('Water shadow', 'fill-color', '#113063')
}

var url = 'https://api.pdok.nl/bzk/locatieserver/search/v3_1/lookup?id=wpl-4b405aebf0e238eaff53612e5c6624e2&fl=*'

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.response.docs[0].geometrie_ll)
    
 
    var mijnWKT = data.response.docs[0].geometrie_ll
    
    var mijnGeojson = Terraformer.wktToGeoJSON(mijnWKT);
    
    maplibre.on('load', function (e) {
      // ADD GEOJSON SOURCE
      maplibre.addSource('Houtribsluizen', {
          'type': 'geojson',
          'data': mijnGeojson
      });
    
      maplibre.addLayer({
        'id': 'geojson-polygoon',
        'type': 'fill',
        'source': 'Ommen',
        'layout': {},
        'paint': {
            'fill-color': '#000fff',
        }
    });
    });
  
  
  })