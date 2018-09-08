var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var crypto = require('crypto');

app.use(bodyParser.json({ limit: '8mb' }));
app.use(cors());

app.use(express.static(__dirname + '/www'));

var port = 8012;
var mongodb = 'mongodb://localhost:27017/';
var db;

app.disable('x-powered-by');

mongoClient.connect(mongodb, function (err, client) {
    if (err) throw err;
    db = client.db("spot");
});

var resDefault = {
    "success": true
}
var resError = {
    "success": false,
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

function combineArray(eventSearch, tagResult) {
    if (!eventSearch) return tagResult;
    if (!tagResult) return eventSearch;
    return eventSearch.concat(tagResult);
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/www/index.html");
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/www/login.html");
});
app.get('/register', function (req, res) {
    res.sendFile(__dirname + "/www/register.html");
});

app.post('/login', function (req, res) {
    db.collection("Users").findOne({ username: req.body.username }, function (err, result) {
        if (err) throw err;
        if (result) {
            var hash = crypto.createHash('sha256');
            hash.update(req.body.password + result.salt);
            if (result.password == hash.digest('base64')) {
                res.send(resWrap({ token: req.body.username }));
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
                db.collection("Profiles").insertOne({ username: req.body.username }, function (err, result) {
                    if (err) throw err;
                    res.send(resDefault);
                });
            });
        };
    });
});

app.post('/createEvent', function (req, res) {
    var tmp = {
        id: generateUUID(),
        creator: req.body.username,
        timestamp: new Date(),
        status: 'active',
        name: req.body.eventname,
        image: req.body.image,
        description: req.body.description,
        tags: req.body.tags,
        location: req.body.location,
        attendees: [],
        max: req.body.max,
        duration: req.body.duration
    }

    db.collection("Events").insertOne(tmp, function (err, result) {
        if (err) throw err;
        res.send(resDefault);
    });

});

app.post('/closeEvent', function (req, res) {
    db.collection("Events").findOne({ id: req.body.eventid }, function (err, result) {
        if (err) throw err;
        else {
            db.collection("Events").updateOne({ id: req.body.eventid }, { $set: { status: "expired" } }, function (err, result) {
                if (err) throw err;
                res.send(resDefault);
            });
        }
    });
});

app.post('/joinEvent', function (req, res) {
    var eventid = req.body.eventid;
    var username = req.body.username;

    db.collection("Events").findOne({ id: eventid }, function (err, result) {
        if (err) throw err;
        else {
            // check if user already an attendee

            db.collection("Events").find({ attendees: username }, function (err, result) {
                if (err) throw err;
                res.send(errWrap("User is already an attendee"));
            });


            // update attendees in events
            var attendees = result.attendees;
            attendees.push(req.body.username);
            db.collection("Events").updateOne({ id: eventid }, { $set: { attendees: attendees } }, function (err, result) {
                if (err) throw err;
            });
            db.collection("Profiles").findOne({ username: req.body.username }, function (err, result) {
                if (err) throw err;
                var attended = result.attended;
                attended.push(req.body.eventid);
                db.collection("Profiles").updateOne({ username: req.body.username }, { $set: { attended: attended } }, function (err, result) {
                    if (err) throw err;
                    res.send(resDefault);
                });
            });
            // update attended


        }
    });
});

app.get('/getEvents', function (req, res) {
    //return all events based on search name 
    db.collection("Events").find({}).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(resWrap(result));
    });

});

app.get('/getUsers', function (req, res) {
    // return all the users
    db.collection("Users").distinct("username", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

app.post('/search', function (req, res) {
    // search on events with names
    var nameSearch;
    var tagSearch;
    db.collection("Events").find({ "name": { $in: req.body.terms } }).toArray(function (err, result) {
        if (err) throw err;
        // res.send(resWrap(result));
        nameSearch = result;
        // console.log(nameSearch); 
    });


    // search on tags
    db.collection("Events").find({ "tags": { $in: req.body.terms } }).toArray(function (err, tagResult) {
        if (err) throw err;
        tagSearch = tagResult;
        // console.log(tagSearch);
        // res.send(resWrap(tagResult));
    });
    console.log(tagSearch);
    console.log(nameSearch);
    var combinedRes = combineArray(nameSearch, tagSearch)
    console.log('combined' + combinedRes);
    res.send(resWrap(combinedRes));
});
app.listen(port, function () {
    // console.log('index.js');
});

function generateUUID() {
    const uuidv4 = require('uuid/v4');
    return uuidv4();
}