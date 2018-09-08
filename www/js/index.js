var map;

document.addEventListener("DOMContentLoaded", function (e) {
    // initMap();
})
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        // center in location of device
        center: new google.maps.LatLng(0, 0),
        mapTypeId: 'terrain'
    });
}

function renderMarkers(e) {
    for (var i of e) {
        var latLng = new google.maps.LatLng(e.location.lat, e.location.lon);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}