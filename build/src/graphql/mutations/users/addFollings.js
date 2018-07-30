'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _users = require('../../../models/users');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('../../types/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    type: _users3.UserType,
    args: {
        id: {
            name: "ID",
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
        },
        data: {
            name: "data",
            type: new _graphql.GraphQLNonNull(_users3.FollingsType)
        }

    }, resolve: function resolve(root, params) {
        var id = params.id,
            data = params.data;

        console.log(params);
        return _users2.default.findByIdAndUpdate(id, { $push: { follings: data._id } }).then(function (user) {
            console.log(user);
            return _users2.default.findById(user.id).exec();
        });
    }
};