'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
		},
		data: {
			name: "data",
			type: new _graphql.GraphQLNonNull(_photos3.PhotosInputType)
		}
	},
	resolve: function resolve(root, params) {
		return _photos2.default.findByIdAndUpdate(params.id, { $set: _extends({}, params.data) }).then(function (photos) {
			return photos;
		}).catch(function (err) {
			throw new Error("Error al hacer update");
		});
	}
};