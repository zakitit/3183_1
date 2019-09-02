var express = require('express');
var app = express();
var cors = require('cors');
// const corsOptions = {
//     origin: 'http://localhost:4200'
// }
// app.use(express.static(__dirname + '/www'));
// var fs = require("fs");

app.use(cors());

var path = require('path');

// var auth = require('./routes/api/auth')(app, path);
var group = require('./api/group')(app, path);
var user = require('./api/user')(app, path);


app.listen(3000, () => {
    var d = new Date();
    var n = d.getHours();
    var m = d.getMinutes();

    console.log('Server has been started at : ' + n + ':' + m);
});