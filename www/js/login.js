var baseUrl = "localhost:8012"

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("continueBtn").addEventListener("click", function (c) {
        postJSON(baseUrl + "/login", function (res) {
            if (res.success) {
                window.localStorage.setItem("token", res.result.token);
                location.href = "index.html";
            }
            else {
                // show error
            }
        })
    })
})