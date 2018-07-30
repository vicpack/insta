'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphql = require('graphql');

var _photos = require('../../../models/photos');

var _photos2 = _interopRequireDefault(_photos);

var _photos3 = require('../../types/photos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var querySinglePhoto = {
	type: _photos3.PhotosType,
	args: {
		id: {
			name: 'ID',
			type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
		}
	},

	resolve: function resolve(root, params) {
		var photos = _photos2.default.findById(params.id).exec(); //si el id de antes esta con mayusuculas el de aqui debe ser lo contrario , no pueden ser iguales
		return photos;
	}
};

exports.default = querySinglePhoto;