import {
	GraphQLList,GraphQLID,GraphQLNonNull
} from 'graphql';


import Photos from '../../../models/photos';
import {PhotosType} from '../../types/photos'; //tipo usuario , para la lista de usuarios
import User from '../../../models/photos';
import {UserType} from '../../types/users';


const queryAllPhotos = {
	type:UserType,
		args:{
        	id:{
            name:'ID',
            type:GraphQLNonNull(GraphQLID)
        },
    },
    type:new GraphQLList(PhotosType),
	resolve(root,params){
		const photos = Photos.find({"user": params.id}).exec()
		if(!photos)throw new Error("Error al traer de la bd")
			return photos
	}
}

export default queryAllPhotos;