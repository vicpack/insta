"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PhotoSchema = new Schema({
	"name": {
		type: String,
		required: true
	},

	"description": {
		type: String
	},

	"likes": {
		type: [Schema.Types.ObjectId],
		ref: 'User'
	},

	"url": {
		type: String,
		required: true
	},
	"user": {
		type: [Schema.Types.ObjectId],
		ref: 'Users'
	},

	"is_active": {
		type: Boolean,
		default: true
	},

	"upload_at": {
		type: Date,
		default: new Date()
	}

}, { collection: "Photos", timestamps: true });

exports.default = _mongoose2.default.model('Photos', PhotoSchema);