import {GraphQLList,GraphQLNonNull,GraphQLID} from 'graphql';
import Photos from '../../../models/photos';
import {PhotosType} from '../../types/photos';
import User from '../../../models/users';
import {UserInputType,UserType,FollingsType} from '../../types/users';

const queryFeed = {
	type:UserType,
		args:{
        	id:{
            name:'ID',
            type:GraphQLNonNull(GraphQLID)
        },
    },
    type:new GraphQLList(FollingsType),
         args:{
             id:{
                 name:'ID',
                 type:GraphQLNonNull(GraphQLID)
             },
         },
    
	resolve(root,params, context){
        context.user.then((u)=>{
            console.log(u)
        })
		const photos = Photos.find({"user": params.id}).exec()
		if(!photos)throw new Error("Error al traer de la bd")
			return photos
	}
}


export default queryFeed;