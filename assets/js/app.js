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
    map.addSource('places', {
// This GeoJSON contains features that include an "icon"
// property. The value of the "icon" property corresponds
// to an image in the Mapbox Streets style's sprite.
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Théâtre Municipale Jean Ferrat</strong><p>Lien du ' +
                            '<a href="https://theatre.fourmies.fr/" target="_blank">théâtre</a>' +
                            ', Parvis François Mitterrand, Rue Saint-Louis, 59610 Fourmies</p>',
                        'icon': 'theatre-15',
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [4.047129, 50.0155968]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Le Celtique</strong><p>Lieu <a href="https://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Celtique</a>, 12 Rue de Grenoble, 59610 Fourmies</p>',
                        'icon': 'bar-15'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [4.052752029370823, 50.01558677910946]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description':
                            '<strong>Chez Samuel</strong><p>Pour rencontrer <a href="https://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Samuel</a> </p>',
                        'icon': 'rocket-15'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [4.051103, 50.01865]
                    }
                },
            ]
        }
    });
// Add a layer showing the places.
    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': '{icon}',
            'icon-allow-overlap': true
        }
    });

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
    map.on('click', 'places', (e) => {
// Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});