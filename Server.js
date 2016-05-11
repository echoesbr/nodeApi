// server.js

// BASE SETUP ============================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var router = express.Router();

var port = process.env.PORT || 8081;

//Instancio os modelos
var User = require('./model/user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Rotas da API

router.get('/', function (req, res) {
    res.json({message: 'Api OK!'});
});

router.route('/users')
        .post(function (req, res) {

            var user = new User();

            user.userEmail = req.body.email;
                            /*user.userPassword = require('crypto')
                             .createHash('sha256')
                             .update(req.body.password)
                             .digest('hex');*/
            user.userPassword = req.body.password;
console.log(user);
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json(user);
            });

        })
        .get(function (req, res) {
            User.find(function (err, data) {
                if (err)
                    res.send(err);

                res.json(data);
            })
        });

app.use('/', router);

app.listen(port);
console.log('Node Server UP! ' + port);