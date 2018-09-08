function passCheck() {
    var pass1 = document.getElementById("password").value;
    var pass2 = document.getElementById("pass_check").value;
    var ok = true;
    if (pass1 != pass2) {
        //alert("Passwords Do not match");
        document.getElementById("pass1").style.borderColor = "#E34234";
        document.getElementById("pass2").style.borderColor = "#E34234";
        ok = false;
    }
    else {
        console.log("Passwords Match!!!");
    }
    return ok;
}