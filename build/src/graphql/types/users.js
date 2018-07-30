"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FollingsType = exports.UserInputType = exports.UserType = undefined;

var _graphql = require("graphql");

var UserType = exports.UserType = new _graphql.GraphQLObjectType({
	name: "ListUsers",
	description: "Usuarios de la BD",
	fields: function fields() {
		return { //regresa un objeto , este objeto puede ser lo que tiene adentro
			_id: {
				type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
			},
			name: {
				type: _graphql.GraphQLString
			},
			lastname: {
				type: _graphql.GraphQLString
			},

			nickname: {
				type: _graphql.GraphQLString
			},

			email: {
				type: _graphql.GraphQLString
			},

			profile_photo: {
				type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID) //resolve para las fotos
			},

			photos: {
				type: _graphql.GraphQLString
			},

			follings: {
				type: new _graphql.GraphQLList(UserType),
				resolve: function resolve(user) {
					var follings = user.follings;

					return Users.find({ '_id': { $in: follings } }).exec();
				}
			},

			followers: {
				type: (0, _graphql.GraphQLList)(_graphql.GraphQLInt)
			},

			create_at: {
				type: _graphql.GraphQLString
			},

			is_active: {
				type: _graphql.GraphQLString
			}

		};
	}
});

var UserInputType = exports.UserInputType = new _graphql.GraphQLInputObjectType({
	name: "AddUsers",
	description: "Agrega ,modifica nuevos usuarios de la BD",
	fields: function fields() {
		return { //regresa un objeto , este objeto puede ser lo que tiene adentro
			_id: {
				type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID) //creo este no va
			},
			name: {
				type: _graphql.GraphQLString
			},
			lastname: {
				type: _graphql.GraphQLString
			},
			nickname: {
				type: _graphql.GraphQLString
			},
			password: {
				type: _graphql.GraphQLString
			},

			email: {
				type: _graphql.GraphQLString
			},

			profile_photo: {
				type: _graphql.GraphQLString
			}

		};
	}
});

var FollingsType = exports.FollingsType = new _graphql.GraphQLInputObjectType({
	name: "addFollings",
	description: "Agrega Seguidores",
	fields: function fields() {
		return {
			_id: {
				type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
			},
			name: {
				type: _graphql.GraphQLString
			}
		};
	}
});