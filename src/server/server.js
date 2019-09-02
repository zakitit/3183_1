var express = require('express');
var app = express();
var cors = require('cors');
// const corsOptions = {
//     origin: 'http://localhost:4200'
// }

app.use(cors());

var path = require('path');


// var api = require('./routes/api/home')(app, path);
var group = require('./api/group')(app, path);
var user = require('./api/user')(app, path);

// app.use(express.static(__dirname + '/www'));

// var fs = require("fs");

app.listen(3000, () => {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();

    console.log('Server has been started at : ' + n + ':' + m);
});