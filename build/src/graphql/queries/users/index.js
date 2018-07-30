'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _all = require('./all');

var _all2 = _interopRequireDefault(_all);

var _single = require('./single');

var _single2 = _interopRequireDefault(_single);

var _feed = require('./feed');

var _feed2 = _interopRequireDefault(_feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	allUsers: _all2.default,
	singleUser: _single2.default,
	feed: _feed2.default
};