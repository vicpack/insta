import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
	"name":{
		type:String,
		required:true
	},

    "description":{
		type:String
	},

	"likes":{
		type:[Schema.Types.ObjectId],
		ref:'User'
	},
    
	"url":{
		type:String,
		required:true
	},
    "user":{
		type:[Schema.Types.ObjectId],
		ref:'Users'
	},

	"is_active":{
		type:Boolean,
		default:true
	},

	"upload_at":{
		type:Date,
		default:new Date()
	}

},{collection:"Photos",timestamps:true});

export default mongoose.model('Photos',PhotoSchema);