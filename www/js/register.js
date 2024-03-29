
var baseUrl = "http://10.251.80.142:8012"

function toLogin() {
    var tmp = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    postJSON(tmp, baseUrl + "/register", function (res) {
        if (res.success) {
            showToast('You have successfully registered. <a href="login.html">Click here to login.</a>');
        }
        else {
            showToast(res.error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("continueBtn").addEventListener("click", function (c) {

        var pass1 = document.getElementById("password").value;
        var pass2 = document.getElementById("pass_check").value;
        if (pass1.value == '' || document.getElementById("username").value == '') {
            showToast('Please enter required fields.');
            return;
        }
        if (pass1 != pass2) {
            document.getElementById("password").style.borderColor = "#E34234";
            document.getElementById("pass_check").style.borderColor = "#E34234";
            showToast("Passwords do not match. Try again.")
            return;
        }
        else {
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

function showToast(text = "") {
    document.getElementById("tMessage").innerHTML = text;
    document.getElementById("toast").style.display = "block";
}

function hideToast() {
    document.getElementById("toast").style.display = "none";
}