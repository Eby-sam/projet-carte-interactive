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
    };
}

