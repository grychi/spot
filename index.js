var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

app.use(bodyParser.json({ limit: '8mb' }));
app.use(cors());

var port = 8012;
var mongodb = 'mongodb://localhost:27017/';
var db;

app.disable('x-powered-by');

mongoClient.connect(mongodb, function (err, client) {
    if (err) throw err;
    db = client.db("spot");
});

var resDefault = {
    "success": "true"
}
var resError = {
    "success": "false",
    "error": "Unknown error. Please try again."
}

function resWrap(obj) {
    var res = Object.assign({}, resDefault);
    res.result = obj;
    return res;
}

function errWrap(str) {
    var res = Object.assign({}, resError);
    res.error = str;
    return res;
}

app.post('/login', function (req, res) {
    db.collection("Users").findOne({ username: req.body.username }, function (err, result) {
        if (err) throw err;
        if (result) {
            var hash = crypto.createHash('sha256');
            hash.update(req.body.password + result.salt);
            if (result.password == hash.digest('base64')) {
                res.send(resDefault);
                return;
            }
        }
        res.send(errWrap("Invalid username and password combination."));
    });
});

function randStr(length, charset = 'abcdefghijklmnopqrstuvwxyz') {
    var tmp = '';
    for (var i = 0; i < length; i++) {
        tmp += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return tmp;
}

app.post('/register', function (req, res) {
    var salt = randStr(6);

    var hash = crypto.createHash('sha256');
    hash.update(req.body.password + salt);

    if (req.body.password.length <= 6) {
        res.send(errWrap("Please check password format."));
        return;
    }

    var tmp = {
        username: req.body.username,
        password: hash.digest('base64'),
        salt: salt
    }

    db.collection("Users").findOne({ username: req.body.username }, function (err, result) {
        if (err) throw err;
        if (result) {
            res.send(errWrap("Username is already taken."));
        }
        else {
            db.collection("Users").insertOne(tmp, function (err, result) {
                if (err) throw err;
                res.send(resDefault);
            });
        };
    });
});

app.listen(port, function () {
    // console.log('index.js');
});