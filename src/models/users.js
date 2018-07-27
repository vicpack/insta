import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	"name":{
		type:String,
		required:true
	},

	"lastname":{
		type:String,
		required:true
	},

	"nickname":{
		type:String,
		required:true
	},

	"email":{
		type:String,
		required :true
	},

	"password":{
		type:String,
		required:true
	},

	"profile_photo":{
		type:String
	},
   
    "followings":{
		type:[Schema.Types.ObjectId],
		ref:'Users'
	},

    "photos":{
		type:String
	},

	"followers":{
		type:[Schema.Types.ObjectId],
		ref:'Users'
	},
 
	"create_at":{
		type:Date,
		default:new Date()//fecha actual cuando se registras
	},

	"is_active":{
		type:Boolean,
		default:true  //para el borrado fisico
	}

},{ collection:"Users",timestaps:true});//timestaps es un numero enorme que nos dice en que momento se modifca un objeto
       //antes de guardarlo , has esto
      UserSchema.pre('save',function(next)  {
      	let user = this;
      	if(!user.isModified('password')) {return next();}

      	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
      	 		if(err) return next(err);//hashea el pasword
      	 		bcrypt.hash(user.password,salt,function(err,hash){
      	 			if(err) return next(err);
      	 			user.password = hash;
      	 			next();
      	 		});
      	 });
    })

    UserSchema.methods.comparePassword = function(candidatePassword,cb) {
    		bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
    			cb(null,isMatch)
    		}) //para comparar el password de la base con el que envian para el log in
    }
     export default mongoose.model('Users',UserSchema);// para crear el modelo    }
