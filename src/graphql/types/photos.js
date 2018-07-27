import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLObjectType,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLList
} from 'graphql'

import {UserType} from './users';
import User from '../../models/users';

export const PhotosType = new GraphQLObjectType({
	name:"ListPhotos",
	description:"Fotos de la BD",
	fields:() => ({//regresa un objeto , este objeto puede ser lo que tiene adentro
		_id:{
			type:GraphQLNonNull(GraphQLID)
		},
		name:{
			type:GraphQLString
		},
		description:{
			type:GraphQLString
		},
        
		likes:{
			type:GraphQLList(GraphQLInt)//llist(int)
		},
		
		url:{
			type:GraphQLString
		},

		user:{
			type:UserType,
				resolve(photo){
					const {user} = photo
					return User.findById(user).exec()
				}
			},

	    is_active:{
			type:GraphQLBoolean
		},

		upload_at:{
			type:GraphQLString
		}

	})
});

export const PhotosInputType = new GraphQLInputObjectType({
		name:"AddPhotos",
	description:"Agrega ,modifica nuevas fotos de la BD",
	fields:() => ({//regresa un objeto , este objeto puede ser lo que tiene adentro
		
		name:{
			type:GraphQLString
		},
		description:{
			type:GraphQLString
		},
		url:{
			type:GraphQLString
		}

    })
})