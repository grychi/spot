var map;

document.addEventListener("DOMContentLoaded", function (e) {
    // initMap();
    if(!window.localStorage.getItem("token")) {
        // window.location.href = "login.html"
    };
})
function initMap() {
    var lat = 40.6942036,
        lon = -73.9887677;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (e) {
            lat = e.coords.latitude;
            lon = e.coords.longitude;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: new google.maps.LatLng(lat, lon),
                mapTypeId: 'roadmap'
            });
        })
    }
    else {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: new google.maps.LatLng(lat, lon),
            mapTypeId: 'roadmap'
        });
    }
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