'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphql = require('graphql');

var _photos = require('../../../models/photos');

var _photos2 = _interopRequireDefault(_photos);

var _photos3 = require('../../types/photos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	type: _photos3.PhotosType,
	args: {
		data: {
			type: new _graphql.GraphQLNonNull(_photos3.PhotosInputType)
		}
	},

	resolve: function resolve(root, params) {
		var photos = new _photos2.default(params.data); //creando un nuevo objeto usuario
		var newPhotos = photos.save();
		if (!newPhotos) throw new Error("Error al agregar una foto");
		return newPhotos;
	}
};