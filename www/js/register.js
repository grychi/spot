
var baseUrl = "http://localhost:8012"

function toLogin(){
    var tmp = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            }
        postJSON(tmp, baseUrl + "/register", function (res) {
            if (res.success) {
                location.href = "login.html";
            }
            else {
                // show error
                console.log("wait something wrong xD");
            }
        });
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("continueBtn").addEventListener("click", function (c) {

        var pass1 = document.getElementById("password").value;
        var pass2 = document.getElementById("pass_check").value;
        var ok = true;
        if (pass1 != pass2) {
            document.getElementById("password").style.borderColor = "#E34234";
            document.getElementById("pass_check").style.borderColor = "#E34234";
            return; 
        }
        else {
            console.log("Passwords Match!!!");
            toLogin();

        }
    });
    document.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key == 13) {
            toLogin();
        }

    });
});

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

