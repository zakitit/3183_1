var fs = require("fs");
module.exports = function(app, path) {

    // get all the users
    app.get('/api/users', function(req, res) {
        fs.readFile("users.json", 'utf8', function(err, data) {
            // console.log(data);
            res.end(data);
        });
    });

    app.get('/api/users/:username', function(req, res) {

        const username = req.params.username;
        console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);
            let user = users.filter(
                item => item.username == username
            )[0];
            res.json(user);
        });
    });

    //add a user
    app.post('/api/users', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        var user = {};
        user.username = req.body.username;
        user.email = req.body.email;
        user.groupList = req.body.groupList;
        user.adminGroupList = req.body.adminGroupList;
        user.ofGroupAdminsRole = req.body.ofGroupAdminsRole;

        // const target = { username: "user1", email: "e1" };
        // const source = { b: 4, c: 5 };

        // const returnedTarget = Object.assign(target, source);
        // var jsonContent = JSON.stringify(returnedTarget);

        // console.log(jsonContent);
        fs.readFile("groups.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            // group.id = Math.max.apply(Math, data.map(function(o) { return o.id; })) + 1;
            console.log();
            data.push(user);
            var jsonContent = JSON.stringify(data);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
                // res.status(200).json({
                //     isSuccess: true
                // });

                res.send(user);
            });
        });
    });

    app.put('/api/users/:username', function(req, res) {
        username = req.params.username;
        console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            users = JSON.parse(data);
            let user = users.filter(
                item => item.username == username
            )[0];

            const index = users.indexOf(user);

            user.email = req.body.email;
            user.groupList = req.body.groupList;
            user.adminGroupList = req.body.adminGroupList;
            user.ofGroupAdminsRole = req.body.ofGroupAdminsRole;

            users[index] = user;


            var jsonContent = JSON.stringify(users);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
                // res.status(200).json({
                //     isSuccess: true
                // });

                res.json(users[index]);
            });


        });

    });


    app.delete('/api/users/:username', function(req, res) {

        if (!req.body) {
            return res.sendStatus(400);
        }

        username = req.params.username;
        console.log(username);

        fs.readFile("users.json", 'utf8', function(err, data) {
            data = JSON.parse(data);
            // console.log(data);
            data = data.filter(item => item.username != username);
            console.log(data);
            var jsonContent = JSON.stringify(data);

            fs.writeFile("users.json", jsonContent, 'utf8', function(err) {
                if (err) throw err;
                console.log('complete');
                console.log("JSON file has been saved.");
                res.status(200).json({
                    isSuccess: true
                });
            });
        });
    });
}