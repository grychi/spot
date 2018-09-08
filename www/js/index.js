var map;
var baseUrl = "http://10.251.80.142:8012"

document.addEventListener("DOMContentLoaded", function (e) {
    // initMap();

    if (!window.localStorage.getItem("token")) {
        window.location.href = "login.html"
    };

    var slider = document.getElementById("durationSlider");
    var output = document.getElementById("output");
    output.innerHTML = slider.value + " minutes";

    slider.oninput = function () {
        output.innerHTML = this.value + " minutes";
    }
});

function showLoading() {
    document.getElementById("loading-contain").style.display = "block";
}

function hideLoading() {
    document.getElementById("loading-contain").style.display = "none";
}

function initMap() {
    var myLatLng = { lat: 39.9522188, lng: -75.1932137 };

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
            getJSON(baseUrl + "/getEvents", function (e) {
                if (e.success) {
                    renderMarkers(e.result);
                }
            })
        }, function (e) {
            hideLoading();
            document.getElementById("needLocation").style.display = "block";
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: new google.maps.LatLng(lat, lon),
                mapTypeId: 'roadmap'
            });
            getJSON(baseUrl + "/getEvents", function (e) {
                if (e.success) {
                    renderMarkers(e.result);
                }
            })
        })
    }
    else {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: new google.maps.LatLng(lat, lon),
            mapTypeId: 'roadmap'
        });
        hideLoading();
        getJSON(baseUrl + "/getEvents", function (e) {
            if (e.success) {
                renderMarkers(e.result);
            }
        })
    }
}

function renderMarkers(e) {
    for (var i of e) {
        console.log(i);
        var latLng = new google.maps.LatLng(i.location.lat, i.location.lon);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        marker.setMap(map);
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