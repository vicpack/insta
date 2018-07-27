import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList
} from 'graphql'


export const UserType = new GraphQLObjectType({
	name:"ListUsers",
	description:"Usuarios de la BD",
	fields:() => ({//regresa un objeto , este objeto puede ser lo que tiene adentro
		_id:{
			type:GraphQLNonNull(GraphQLID)
		},
		name:{
			type:GraphQLString
		},
		lastname:{
			type:GraphQLString
		},
        
        nickname:{
			type:GraphQLString
		},
		
        email:{
			type:GraphQLString
	    },

	    profile_photo:{
			type:GraphQLNonNull(GraphQLID)//resolve para las fotos
		 },
		 
		 photos:{
			type:GraphQLString
			 },
			 
         
          follings:{
		  type:new GraphQLList(UserType),
		  resolve(user){
			  const{follings} = user
			  return Users.find({'_id':{$in:follings}}).exec()
		  }
	     },

	     followers:{
			type:GraphQLList(GraphQLInt)
	     },
         
		create_at:{
		type:GraphQLString
		},

		is_active:{
		type:GraphQLString
		},


	})
});

export const UserInputType = new GraphQLInputObjectType({
		name:"AddUsers",
	description:"Agrega ,modifica nuevos usuarios de la BD",
	fields:() => ({//regresa un objeto , este objeto puede ser lo que tiene adentro
		_id:{
			type:GraphQLNonNull(GraphQLID) //creo este no va
		},
		name:{
			type:GraphQLString
		},
		lastname:{
			type:GraphQLString
		},
		nickname:{
			type:GraphQLString
		},
		password:{
			type:GraphQLString
		},
        
        email:{
			type:GraphQLString
	    },

	    profile_photo:{
		type:GraphQLString
	     },


    })
});

export const FollingsType = new GraphQLInputObjectType({
	name:"addFollings",
	description:"Agrega Seguidores",
	fields:() => ({
		_id:{
			type:GraphQLNonNull(GraphQLID)
		},
		name:{
			type:GraphQLString
		}
	})
})

