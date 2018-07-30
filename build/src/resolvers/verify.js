'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.verifyToken = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //verifica si el token es valido


var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expiresIn = "3d"; //duracion del token
var secret = "samplejwtinstagram"; //en vez del salt,variable de entorno
var tokenPrefix = "JWT"; //el prefijo para el header a la hora de mandarselo
//es mejor hacer todo lo d econst con variables de entorno CHECARLO

var verifyToken = exports.verifyToken = function verifyToken(token) {
	try {
		var _token$split = token.split(' '),
		    _token$split2 = _slicedToArray(_token$split, 2),
		    prefix = _token$split2[0],
		    recivedToken = _token$split2[1];

		var user = null;
		if (!recivedToken) {
			throw new Error('No token provider');
		}

		if (prefix != tokenPrefix) {
			throw new Error('Invalid header format');
		}
		_jsonwebtoken2.default.verify(recivedToken, secret, function (err, payload) {
			//verificamos el token 
			if (err) {
				throw new Error("Invalid Token");
			} else {
				user = _users2.default.findById(data.id).exec();
			}
		});

		if (!user) {
			throw new Error("User doesnt exist");
		}
		return user;
	} catch (err) {
		throw Error("Error not expected");
	}
};