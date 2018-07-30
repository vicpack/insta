'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PhotosInputType = exports.PhotosType = undefined;

var _graphql = require('graphql');

var _users = require('./users');

var _users2 = require('../../models/users');

var _users3 = _interopRequireDefault(_users2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhotosType = exports.PhotosType = new _graphql.GraphQLObjectType({
	name: "ListPhotos",
	description: "Fotos de la BD",
	fields: function fields() {
		return { //regresa un objeto , este objeto puede ser lo que tiene adentro
			_id: {
				type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
			},
			name: {
				type: _graphql.GraphQLString
			},
			description: {
				type: _graphql.GraphQLString
			},

			likes: {
				type: (0, _graphql.GraphQLList)(_graphql.GraphQLInt) //llist(int)
			},

			url: {
				type: _graphql.GraphQLString
			},

			user: {
				type: _users.UserType,
				resolve: function resolve(photo) {
					var user = photo.user;

					return _users3.default.findById(user).exec();
				}
			},

			is_active: {
				type: _graphql.GraphQLBoolean
			},

			upload_at: {
				type: _graphql.GraphQLString
			}

		};
	}
});

var PhotosInputType = exports.PhotosInputType = new _graphql.GraphQLInputObjectType({
	name: "AddPhotos",
	description: "Agrega ,modifica nuevas fotos de la BD",
	fields: function fields() {
		return { //regresa un objeto , este objeto puede ser lo que tiene adentro

			name: {
				type: _graphql.GraphQLString
			},
			description: {
				type: _graphql.GraphQLString
			},
			url: {
				type: _graphql.GraphQLString
			}

		};
	}
});