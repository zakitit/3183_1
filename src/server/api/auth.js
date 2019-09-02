class User {
    constructor(username, email) { //, valid) {
        this.username = username;
        this.email = email;
    }
}

class Channel {

}

var fs = require("fs");

module.exports = function(app) {

    var bodyParse = require('body-parser');
    app.use(bodyParse.json());
    let found = false;

    app.post('/api/auth', function(req, res) {

        let users = [
            new User('user1', 'abc@com.au'),
            new User('user2', 'abd@com.au'),
            new User('user3', 'abe@com.au')

        ];

        if (!req.body) {
            return res.sendStatus(400);
        }

        var customer = {};
        customer.email = req.body.email;
        // customer.username = req.body.username;

        // result = {};
        var user;

        var content = fs.readFileSync(__dirname + "/" + "super-user.json", 'utf8');

        console.log(__dirname);
        user = JSON.parse(content);
        // console.log('user' + user);
        console.log(customer.email);
        console.log(user.super);

        if (customer.email == user.super) {
            console.log('found super user');
            found = true;
        }

        console.log('found: ' + found);
        // fs.close();
        if (!found) {
            res.send({});
            return;
        }

    });
}