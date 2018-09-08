var map;

document.addEventListener("DOMContentLoaded", function (e) {
    // initMap();
    
    /* if (!window.localStorage.getItem("token")) {
        window.location.href = "login.html"
    }; */
})

function showLoading() {
    document.getElementById("loading-contain").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading-contain").style.display = "none";
}

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
        }, function (e) {
            hideLoading();
            document.getElementById("needLocation").style.display = "block";
        })
    }
    else {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: new google.maps.LatLng(lat, lon),
            mapTypeId: 'roadmap'
        });
        document.getElementById("loading-contain").style.display = "none";
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

function getJSON(url, loaded) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
            result = JSON.parse(xhr.responseText);
            loaded(result);
        }
        return;
    };
    xhr.send();
}

function postJSON(data, url, loaded) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
            result = JSON.parse(xhr.responseText);
            loaded(result);
        }
        return;
    };
    xhr.send(JSON.stringify(data));
}