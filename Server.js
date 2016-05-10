// server.js

// BASE SETUP ============================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8081;        // Setup da porta

// Rotas da API

var router = express.Router();

router.get('/', function (req, res) {
    res.json({message: 'Api OK!'});
});

// Registra as rotas | prefixo -> /api

router.route('/users')
        .post(function (req, res) {

            var user = new User();
            var response = {};

            user.userEmail = req.body.email;
            user.userPassword = require('crypto')
                    .createHash('sha1')
                    .update(req.body.password)
                    .digest('base64');
            
            user.save(function (err) {
                // save() will run insert() command of MongoDB.
                // it will add new data in collection.
                if (err) {
                    response = {"error": true, "message": "Error adding data"};
                } else {
                    response = {"error": false, "message": "Data added"};
                }
                res.json(response);
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

// STARTA O SERVER =======================================================
app.listen(port);
console.log('Node Server UP! ' + port);

// =======================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/database');

//Instancio os modelos
var User = require('./model/user');