var baseUrl = "http://10.251.80.142:8012"

function passOn () {
    var tmp = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }
    postJSON(tmp, baseUrl + "/login", function (res) {
            if (res.success) {
                window.localStorage.setItem("token", res.result.token);
                location.href = "index.html";
            }
            else {
                // show error
                console.log("wait something wrong");
            }
        })
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("continueBtn").addEventListener("click", function (c) {
        passOn(); 
        
    })

    document.addEventListener('keypress', function (e) {
        if (document.getElementById("username").value === null) {
            alert('no username');
        }
        var key = e.which || e.keyCode;
        if (key == 13) {
            passOn();
        }

    });
})

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