'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _queryFeed;

var _graphql = require('graphql');

var _photos = require('../../../models/photos');

var _photos2 = _interopRequireDefault(_photos);

var _photos3 = require('../../types/photos');

var _users = require('../../../models/users');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('../../types/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var queryFeed = (_queryFeed = {
    type: _users3.UserType,
    args: {
        id: {
            name: 'ID',
            type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
        }
    }
}, _defineProperty(_queryFeed, 'type', new _graphql.GraphQLList(_users3.FollingsType)), _defineProperty(_queryFeed, 'args', {
    id: {
        name: 'ID',
        type: (0, _graphql.GraphQLNonNull)(_graphql.GraphQLID)
    }
}), _defineProperty(_queryFeed, 'resolve', function resolve(root, params, context) {
    context.user.then(function (u) {
        console.log(u);
    });
    var photos = _photos2.default.find({ "user": params.id }).exec();
    if (!photos) throw new Error("Error al traer de la bd");
    return photos;
}), _queryFeed);

exports.default = queryFeed;