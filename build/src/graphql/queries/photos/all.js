'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _queryAllPhotos;

var _graphql = require('graphql');

var _photos = require('../../../models/photos');

var _photos2 = _interopRequireDefault(_photos);

var _photos3 = require('../../types/photos');

var _users = require('../../types/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } //tipo usuario , para la lista de usuarios


var queryAllPhotos = (_queryAllPhotos = {
	type: _users.UserType,
	args: {
		id: {
			name: 'ID',
			type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
		}
	}
}, _defineProperty(_queryAllPhotos, 'type', new _graphql.GraphQLList(_photos3.PhotosType)), _defineProperty(_queryAllPhotos, 'resolve', function resolve(root, params) {
	var photos = _photos2.default.find({ "user": params.id }).exec();
	if (!photos) throw new Error("Error al traer de la bd");
	return photos;
}), _queryAllPhotos);

exports.default = queryAllPhotos;