

  //initialize the map         
  const map = L.map('leaflet').setView([52.35659612390365, 5.223194719579083], 17);

  //Create baselayer - tiles         
  const backgroundMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
    attribution: '<a href="https://openstreetmap.org">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 19
    }
  );
  backgroundMap.addTo(map);

  // coordinaten polygoon school
var latlngs = [
  [52.35678540189037, 5.2229856752965],
  [52.356710109770226, 5.223406722292131],
  [52.35634407240467, 5.223218958091378],
  [52.35641357340344, 5.222843429689868]
];

// polygoon school op kaart
L.polygon(latlngs, {
  color: '#e0b922',      
  weight: 2,         
  fillColor: '#113063', 
  fillOpacity: 0.3  
}).addTo(map);


  var maplibre = new maplibregl.Map({
    container: 'maplibre', // container id
    style: 'https://api.maptiler.com/maps/376f0fdc-7c5a-4c79-8a0a-85ea960874ce/style.json?key=XQDfTzE6Nuck7ThJ2kUb', // style URL
    center: [6.4524, 52.5103], // starting position [lng, lat]
    zoom: 9, // starting zoom
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
      maplibre.addSource('Ommen', {
          'type': 'geojson',
          'data': mijnGeojson
      });
    
      maplibre.addLayer({
        'id': 'geojson-polygoon',
        'type': 'fill',
        'source': 'Ommen',
        'layout': {},
        'paint': {
            'fill-color': '#113063',
            'fill-opacity': 0.3
        }
    });
    });
  
  
  })

