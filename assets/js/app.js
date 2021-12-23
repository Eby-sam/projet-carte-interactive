mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhbm8xOTkzIiwiYSI6ImNreGl1ZHdibjBtM3UycnBldjJoaG53NnUifQ.KbB963pHATu1-Wii3m9__Q';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    center: [4.037850141715808, 50.01505268559345], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId);
        console.log(inputs)
    };
}

map.on('load', () => {
// Load an image from an external URL.
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
            if (error) throw error;

// Add the image to the map style.
            map.addImage('cat', image);

// Add a data source containing one point feature.
            map.addSource('point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [4.051103, 50.01865]
                            }
                        }
                    ]
                }
            });

// Add a layer to use the image to represent the data.
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'point', // reference the data source
                'layout': {
                    'icon-image': 'cat', // reference the image
                    'icon-size': 0.1
                }
            });
        }
    );
});