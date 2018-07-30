'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users = require('./src/models/users');

var _users2 = _interopRequireDefault(_users);

var _create = require('./src/resolvers/create');

var _verify = require('./src/resolvers/verify');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _graphql = require('./src/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//agregado despues de las queries
var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;

_mongoose2.default.connect('mongodb://vicpack:peliculas1@ds049598.mlab.com:49598/clonegram');

var db = _mongoose2.default.connection;
db.on('error', function () {
    return console.log("Error al conectar a la BD");
}).once('open', function () {
    return console.log("Conectado a la BD!!");
});

app.use(_bodyParser2.default.json());

app.post('/signup', function (req, res) {
    var user = req.body;
    _users2.default.create(user).then(function (user) {
        return res.status(201).json({ "message": "Usuario creado", "id": user._id });
    }).catch(function (err) {
        console.log(err);
        return res.json(err);
    });
});

app.post('/login', function (req, res) {
    var token = (0, _create.createToken)(req.body.email, req.body.password).then(function (token) {
        res.status(201).json({ token: token });
    }).catch(function () {
        res.status(403).json({
            message: "Login Failed!!!! :( Invalid credentials"
        });
    });
});
app.get('/', function (req, res) {
    res.send("Estoy funcionando");
});
//Middleware para proteger graphql
app.use('/graphql', function (req, res, next) {
    var token = req.headers['authorization'];
    try {
        req.user = (0, _verify.verifyToken)(token); //le asgina el usuario de la base de datos
        next(); //para pasarse a las querys si esta bien
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});
app.use('/graphql', (0, _expressGraphql2.default)(function (req, res) {
    return {
        schema: _graphql2.default,
        graphiql: true, //cliente de graphql , abre el navegador
        pretty: true,
        context: {
            user: req.user
        }
    };
}));

app.listen(PORT, function () {
    console.log("Magic Happens in port" + PORT);
});