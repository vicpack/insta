'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_WORK_FACTOR = 10;

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
	"name": {
		type: String,
		required: true
	},

	"lastname": {
		type: String,
		required: true
	},

	"nickname": {
		type: String,
		required: true
	},

	"email": {
		type: String,
		required: true
	},

	"password": {
		type: String,
		required: true
	},

	"profile_photo": {
		type: String
	},

	"followings": {
		type: [Schema.Types.ObjectId],
		ref: 'Users'
	},

	"photos": {
		type: String
	},

	"followers": {
		type: [Schema.Types.ObjectId],
		ref: 'Users'
	},

	"create_at": {
		type: Date,
		default: new Date() //fecha actual cuando se registras
	},

	"is_active": {
		type: Boolean,
		default: true //para el borrado fisico
	}

}, { collection: "Users", timestaps: true }); //timestaps es un numero enorme que nos dice en que momento se modifca un objeto
//antes de guardarlo , has esto
UserSchema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}

	_bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err); //hashea el pasword
		_bcrypt2.default.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	_bcrypt2.default.compare(candidatePassword, this.password, function (err, isMatch) {
		cb(null, isMatch);
	}); //para comparar el password de la base con el que envian para el log in
};
exports.default = _mongoose2.default.model('Users', UserSchema); // para crear el modelo    }