require('leaflet')

window.addEventListener("DOMContentLoaded", () => {
    const initialLatitude = 4.04827;
    const initialLongitude = 9.70428;
    var map = L.map('map').setView([initialLatitude, initialLongitude], 14);

    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    map.addLayer(osmLayer);

})
