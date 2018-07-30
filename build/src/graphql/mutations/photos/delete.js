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
		id: {
			name: "ID",
			type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
		}
	},

	resolve: function resolve(root, params) {
		var deletedPhoto = _photos2.default.findByIdAndRemove(params.id).exec();
		if (!deletedPhoto) throw new Error("Error al borrar usuario");
		return deletedPhoto;
	}
};